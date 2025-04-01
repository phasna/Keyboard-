import { useEffect, useState } from "react";
import { FaEdit, FaTrash } from "react-icons/fa";
import Swal from "sweetalert2";
import { motion } from "framer-motion";
import { CgProfile } from "react-icons/cg";

const UserList = () => {
    const [users, setUsers] = useState([]);
    const [filteredUsers, setFilteredUsers] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const usersPerPage = 6;

    useEffect(() => {
        fetch("http://localhost:8000/api/utilisateurs")
            .then(response => response.json())
            .then(data => {
                setUsers(data);
                setFilteredUsers(data);
            })
            .catch(error => console.error("Erreur de récupération :", error));
    }, []);

    useEffect(() => {
        const filtered = users.filter(user =>
            user.nom.toLowerCase().includes(searchTerm.toLowerCase()) ||
            user.email.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setFilteredUsers(filtered);
        setCurrentPage(1);
    }, [searchTerm, users]);

    const indexOfLastUser = currentPage * usersPerPage;
    const indexOfFirstUser = indexOfLastUser - usersPerPage;
    const currentUsers = filteredUsers.slice(indexOfFirstUser, indexOfLastUser);
    const totalPages = Math.ceil(filteredUsers.length / usersPerPage);

    const paginate = (pageNumber) => setCurrentPage(pageNumber);
    const nextPage = () => setCurrentPage((prev) => (prev < totalPages ? prev + 1 : prev));
    const prevPage = () => setCurrentPage((prev) => (prev > 1 ? prev - 1 : prev));

    return (
        <div className="w-full mx-auto text-white mt-10 p-5 relative">
            <h2 className="text-5xl font-light mb-10">LISTES DES UTILISATEURS.</h2>

            <div className="mb-4 flex justify-start">
                <input
                    type="text"
                    placeholder="Rechercher par nom ou email..."
                    className="p-3 w-1/3 border rounded-lg text-white bg-black"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
            </div>

            <div className="overflow-x-auto shadow-2xl rounded-xl">
                <table className="w-full border-collapse bg-white bg-opacity-20 rounded-3xl text-white">
                    <thead>
                    <tr className="bg-zinc-600 text-white text-lg">
                        <th className="p-4">Image</th>
                        <th className="p-4">Nom</th>
                        <th className="p-4">Prénom</th>
                        <th className="p-4">Email</th>
                        <th className="p-4">Téléphone</th>
                        <th className="p-4">Adresse</th>
                        <th className="p-4">Actions</th>
                    </tr>
                    </thead>
                    <tbody>
                    {currentUsers.map(user => (
                        <motion.tr key={user.id} className="border-b border-gray-600 hover:bg-opacity-15 hover:bg-white transition-all">
                            <td className="p-4 text-center">
                                {user.image ? (
                                    <img src={user.image.trim()} alt={user.nom} className="w-20 h-20 rounded-full object-cover" />
                                ) : (
                                    <CgProfile className="w-10 h-10 ml-4 text-white" />
                                )}
                            </td>
                            <td className="p-4 text-center">{user.nom || "N/A"}</td>
                            <td className="p-4 text-center">{user.prenom || "N/A"}</td>
                            <td className="p-4 text-center">{user.email || "Non renseigné"}</td>
                            <td className="p-4 text-center">{user.telephone || "Non renseigné"}</td>
                            <td className="p-4 text-center">{user.adresse || "Non renseignée"}</td>
                            <td className="p-4 flex justify-center gap-4">
                                <button className="p-3 bg-blue-500 text-white rounded-full shadow-lg hover:bg-blue-600 transform hover:scale-110 transition">
                                    <FaEdit size={20} />
                                </button>
                                <button className="p-3 bg-red-500 text-white rounded-full shadow-lg hover:bg-red-600 transform hover:scale-110 transition">
                                    <FaTrash size={20} />
                                </button>
                            </td>
                        </motion.tr>
                    ))}
                    </tbody>
                </table>
            </div>

            <div className="flex justify-center items-center mt-4 gap-2">
                <button
                    onClick={prevPage}
                    disabled={currentPage === 1}
                    className="px-4 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-600 transition"
                >
                    Précédent
                </button>

                {Array.from({ length: totalPages }, (_, index) => (
                    <button
                        key={index}
                        onClick={() => paginate(index + 1)}
                        className={`px-4 py-2 mx-1 rounded-lg text-white ${
                            currentPage === index + 1 ? "bg-blue-600" : "bg-gray-700"
                        } hover:bg-blue-500 transition`}
                    >
                        {index + 1}
                    </button>
                ))}

                <button
                    onClick={nextPage}
                    disabled={currentPage === totalPages}
                    className="px-4 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-600 transition"
                >
                    Suivant
                </button>
            </div>
        </div>
    );
};

export default UserList;
