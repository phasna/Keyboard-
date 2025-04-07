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
    const [showEditModal, setShowEditModal] = useState(false);
    const [selectedUser, setSelectedUser] = useState(null);
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

    const handleDelete = (id) => {
        Swal.fire({
            title: "Êtes-vous sûr ?",
            text: "Cette action est irréversible !",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#d33",
            cancelButtonColor: "#3085d6",
            confirmButtonText: "Oui, supprimer !"
        }).then((result) => {
            if (result.isConfirmed) {
                fetch(`http://localhost:8000/api/utilisateurs/${id}`, { method: "DELETE" })
                    .then(() => {
                        setUsers(users.filter(user => user.id !== id));
                    });
                Swal.fire("Supprimé !", "L'utilisateur a été supprimé.", "success");
            }
        });
    };

    const handleEdit = (user) => {
        setSelectedUser(user);
        setShowEditModal(true);
    };

    const handleModalClose = () => {
        setShowEditModal(false);
        setSelectedUser(null);
    };

    const handleFormChange = (e) => {
        const { name, value } = e.target;
        setSelectedUser({ ...selectedUser, [name]: value });
    };

    const handleFormSubmit = () => {
        fetch(`http://localhost:8000/api/utilisateurs/${selectedUser.id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(selectedUser),
        }).then(() => {
            const updatedUsers = users.map(user =>
                user.id === selectedUser.id ? selectedUser : user
            );
            setUsers(updatedUsers);
            setShowEditModal(false);
            Swal.fire({
                title: "Succès",
                text: "Les informations de l'utilisateur ont été modifiées.",
                icon: "success",
                confirmButtonColor: "#3085d6",
                confirmButtonText: "OK"
            });
        });
    };

    return (
        <div className="w-full mx-auto text-white mt-10 p-5 relative">
            <h2 className={`text-5xl font-light mb-10${showEditModal ? "filter blur-xl" : ""}`}>LISTES DES UTILISATEURS.</h2>

            <div className={`mb-4 flex justify-start ${showEditModal ? "filter blur-sm" : ""}`}>
                <input
                    type="text"
                    placeholder="Rechercher par nom ou email..."
                    className="p-3 w-1/3 border rounded-lg text-white bg-black"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
            </div>

            <div className={`overflow-x-auto shadow-2xl rounded-xl z-50 ${showEditModal ? "filter blur-sm" : ""}`}>
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
                        <motion.tr
                            key={user.id}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.3 }}
                            className="border-b border-gray-600 hover:bg-opacity-15 hover:bg-white transition-all"
                        >
                            <td className="p-4 text-center">
                                {user.image ? (
                                    <img
                                        src={user.image.trim()}
                                        alt={user.nom}
                                        className="w-20 h-20 rounded-full object-cover"
                                        onError={(e) => {
                                            e.target.onerror = null; // Empêche la boucle infinie
                                            e.target.src = ""; // Remplace par une URL invalide
                                        }}
                                    />
                                ) : (
                                    <CgProfile className="w-10 h-10 ml-4 text-white" />
                                )}
                            </td>
                            <td className="p-4 text-center">{user.nom || "N/A"}</td>
                            <td className="p-4 text-center">{user.prenom || "N/A"}</td>
                            <td className="p-4 text-center">{user.email || "Non renseigné"}</td>
                            <td className="p-4 text-center">{user.telephone || "Non renseigné"}</td>
                            <td className="p-4 text-center">{user.adresse || "Non renseignée"}</td>
                            <td className="p-4 flex justify-center gap-4 mt-5">
                                <button
                                    onClick={() => handleEdit(user)}
                                    className="p-3 bg-yellow-500 text-black rounded-full shadow-lg hover:bg-yellow-400 transform hover:scale-110 transition"
                                >
                                    <FaEdit size={20} />
                                </button>
                                <button
                                    onClick={() => handleDelete(user.id)}
                                    className="p-3 bg-red-500 text-white rounded-full shadow-lg hover:bg-red-600 transform hover:scale-110 transition"
                                >
                                    <FaTrash size={20} />
                                </button>
                            </td>
                        </motion.tr>
                    ))}
                    </tbody>
                </table>
            </div>

            {showEditModal && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-70">
                    <div
                        className="p-6 rounded-lg w-1/2 bg-gray-700 absolute right-52 shadow-3xl shadow-zinc-200"
                        onKeyDown={(e) => {
                            if (e.key === "Enter") handleFormSubmit();
                        }}
                        tabIndex="0"
                    >
                        <div className="flex justify-between items-center mb-4">
                            <h2 className="text-3xl font-medium">Modifier l'utilisateur</h2>
                            <button
                                onClick={handleModalClose}
                                className="text-red-500 text-2xl font-bold"
                            >
                                &times;
                            </button>
                        </div>

                        <label className="block mb-2">Identifiant :</label>
                        <input
                            type="text"
                            name="id"
                            value={selectedUser.id}
                            disabled
                            className="py-3 px-2 border rounded-lg w-full mb-4 bg-white text-black"
                        />
                        <label className="block mb-2">Nom :</label>
                        <input
                            type="text"
                            name="nom"
                            value={selectedUser.nom}
                            onChange={handleFormChange}
                            className="py-3 px-2 border rounded-lg w-full mb-4 bg-white text-black"
                        />
                        <label className="block mb-2">Prénom :</label>
                        <input
                            type="text"
                            name="prenom"
                            value={selectedUser.prenom}
                            onChange={handleFormChange}
                            className="py-3 px-2 border rounded-lg w-full mb-4 bg-white text-black"
                        />
                        <label className="block mb-2">Email :</label>
                        <input
                            type="email"
                            name="email"
                            value={selectedUser.email}
                            onChange={handleFormChange}
                            className="py-3 px-2 border rounded-lg w-full mb-4 bg-white text-black"
                        />
                        <label className="block mb-2">Téléphone :</label>
                        <input
                            type="text"
                            name="telephone"
                            value={selectedUser.telephone}
                            onChange={handleFormChange}
                            className="py-3 px-2 border rounded-lg w-full mb-4 bg-white text-black"
                        />
                        <label className="block mb-2">Adresse :</label>
                        <input
                            type="text"
                            name="adresse"
                            value={selectedUser.adresse}
                            onChange={handleFormChange}
                            className="py-3 px-2 border rounded-lg w-full mb-4 bg-white text-black"
                        />
                        <label className="block mb-2">Mot de passe :</label>
                        <input
                            type="password"
                            name="mot_de_passe"
                            value={selectedUser.mot_de_passe || ""}
                            onChange={handleFormChange}
                            className="py-3 px-2 border rounded-lg w-full mb-4 bg-white text-black"
                        />
                        <label className="block mb-2">Image :</label>
                        <input
                            type="text"
                            placeholder="Saisissez un URL de votre image"
                            name="image"
                            value={selectedUser.image}
                            onChange={handleFormChange}
                            className="py-3 px-2 border rounded-lg w-full mb-4 bg-black text-white"
                        />

                        <div className="flex justify-end gap-4">
                            <button
                                onClick={handleModalClose}
                                className="px-4 py-2 bg-red-500 rounded"
                            >
                                Annuler
                            </button>
                            <button
                                onClick={handleFormSubmit}
                                className="px-4 py-2 bg-yellow-500 text-black rounded"
                            >
                                Enregistrer
                            </button>
                        </div>
                    </div>
                </div>
            )}


            <div className="flex justify-center mt-4" >
                {Array.from({ length: totalPages }, (_, index) => (
                    <button
                        key={index}
                        onClick={() => paginate(index + 1)}
                        className={`px-4 py-2 mx-1 rounded-lg ${
                            currentPage === index + 1 ? "bg-yellow-500 text-black" : "bg-gray-700 text-white"
                        } hover:bg-blue-500 transition`}
                    >
                        {index + 1}
                    </button>
                ))}
            </div>
        </div>
    );
};

export default UserList;
