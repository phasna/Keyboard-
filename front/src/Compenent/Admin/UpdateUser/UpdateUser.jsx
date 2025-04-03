import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import axios from "axios";
import Swal from 'sweetalert2';

function EditUserForm() {
    const [users, setUsers] = useState([]); // Liste des utilisateurs
    const [search, setSearch] = useState(""); // Barre de recherche
    const [suggestions, setSuggestions] = useState([]); // Suggestions dynamiques
    const [selectedUser, setSelectedUser] = useState(null); // Utilisateur sélectionné
    const [formData, setFormData] = useState({}); // Données du formulaire

    // Récupération des utilisateurs depuis l'API
    useEffect(() => {
        axios.get("http://localhost:8000/api/utilisateurs")
            .then(response => {
                console.log("Données utilisateurs chargées:", response.data);
                setUsers(response.data);
            })
            .catch(error => console.error("Erreur lors du chargement des utilisateurs:", error));
    }, []);

    // Met à jour les suggestions en fonction de la recherche (avec debounce)
    useEffect(() => {
        const timeoutId = setTimeout(() => {
            if (search.trim() === "") {
                setSuggestions([]);
            } else {
                const filtered = users.filter(user => {
                    const nom = user.nom ? user.nom.toLowerCase() : "";
                    const prenom = user.prenom ? user.prenom.toLowerCase() : "";
                    const email = user.email ? user.email.toLowerCase() : "";

                    return nom.includes(search.toLowerCase()) ||
                        prenom.includes(search.toLowerCase()) ||
                        email.includes(search.toLowerCase());
                });
                setSuggestions(filtered);
                console.log("Suggestions mises à jour:", filtered);
            }
        }, 300); // Debouncing de 300ms

        return () => clearTimeout(timeoutId);
    }, [search, users]);

    // Sélection d'un utilisateur
    const handleUserSelect = (user) => {
        console.log("Utilisateur sélectionné:", user);  // Vérification de l'utilisateur sélectionné
        setSelectedUser(user);  // Stocker l'utilisateur sélectionné
        setFormData({ ...user });  // Remplir les données du formulaire avec les informations de l'utilisateur
        setSearch(""); // Effacer la barre de recherche après sélection
        setSuggestions([]); // Masquer les suggestions après sélection
    };

    // Gestion des changements dans le formulaire
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log("selectedUser avant soumission:", selectedUser);  // Vérifie l'ID ici

        if (!selectedUser || !selectedUser.id) {  // Vérifie si l'ID est bien défini
            Swal.fire({
                icon: 'error',
                title: 'Erreur',
                text: 'Veuillez sélectionner un utilisateur valide',
            });
            return;
        }

        try {
            // Log pour vérifier les données envoyées
            console.log("Données envoyées:", formData);

            await axios.put(`http://localhost:8000/api/utilisateurs/${selectedUser.id}`, formData);
            Swal.fire({
                icon: 'success',
                title: 'Succès',
                text: 'Utilisateur modifié avec succès !',
            });
        } catch (error) {
            console.error("Erreur lors de la mise à jour:", error);
            Swal.fire({
                icon: 'error',
                title: 'Échec de la mise à jour',
                text: 'Une erreur est survenue lors de la mise à jour de l\'utilisateur.',
            });
        }
    };

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="p-5"
        >
            <h2 className="text-5xl font-light text-white my-10">
                MODIFIER UN UTILISATEUR.
            </h2>

            {/* Barre de recherche avec suggestions */}
            <div className="relative mb-4">
                <input
                    type="text"
                    placeholder="Rechercher un utilisateur..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="w-1/3 p-3 bg-black text-white border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500"
                />
                {/* Suggestions dynamiques */}
                {suggestions.length > 0 && (
                    <ul className="absolute w-full bg-white text-black shadow-lg rounded-lg mt-2 z-50">
                        {suggestions.map((user) => (
                            <li
                                key={user.id}
                                className="p-2 hover:bg-gray-200 cursor-pointer"
                                onClick={() => handleUserSelect(user)}
                            >
                                {user.nom} {user.prenom} - {user.email}
                            </li>
                        ))}
                    </ul>
                )}
            </div>

            {/* Formulaire de modification (Toujours affiché) */}
            <div className="w-full mx-auto bg-white bg-opacity-25 p-10 rounded-lg shadow-lg">

                {/* Liste déroulante (Select) */}
                <select
                    onChange={(e) => {
                        const user = users.find(u => u.id === parseInt(e.target.value));
                        if (user) handleUserSelect(user);
                    }}
                    className="w-full p-3 bg-black text-white border border-gray-300 rounded-lg shadow-sm mb-5"
                >
                    <option value="">Sélectionner un utilisateur</option>
                    {users.map((user) => (
                        <option key={user.id} value={user.id}>
                            {user.nom} {user.prenom} - {user.email}
                        </option>
                    ))}
                </select>

                <form onSubmit={handleSubmit} className="space-y-5">
                    <div className="flex flex-col space-y-4">
                        <input
                            type="text"
                            name="identifiant"
                            placeholder="Identifiant"
                            value={formData.identifiant || ""}
                            onChange={handleChange}
                            className="w-full p-3 bg-black text-white border border-gray-300 rounded-lg shadow-sm"
                        />
                        <input
                            type="password"
                            name="mot_de_passe"
                            placeholder="Nouveau mot de passe"
                            value={formData.mot_de_passe || ""}
                            onChange={handleChange}
                            className="w-full p-3 bg-black text-white border border-gray-300 rounded-lg shadow-sm"
                        />
                        <div className="w-full flex lg:flex-row flex-col space-x-2">
                            <input
                                type="text"
                                name="nom"
                                placeholder="Nom"
                                value={formData.nom || ""}
                                onChange={handleChange}
                                className="w-1/2 p-3 bg-black text-white border border-gray-300 rounded-lg shadow-sm"
                            />
                            <input
                                type="text"
                                name="prenom"
                                placeholder="Prénom"
                                value={formData.prenom || ""}
                                onChange={handleChange}
                                className="w-1/2 p-3 bg-black text-white border border-gray-300 rounded-lg shadow-sm"
                            />
                        </div>
                        <input
                            type="email"
                            name="email"
                            placeholder="Email"
                            value={formData.email || ""}
                            onChange={handleChange}
                            className="w-full p-3 bg-black text-white border border-gray-300 rounded-lg shadow-sm"
                        />
                        <input
                            type="text"
                            name="telephone"
                            placeholder="Téléphone"
                            value={formData.telephone || ""}
                            onChange={handleChange}
                            className="w-full p-3 bg-black text-white border border-gray-300 rounded-lg shadow-sm"
                        />
                        <input
                            type="text"
                            name="adresse"
                            placeholder="Adresse"
                            value={formData.adresse || ""}
                            onChange={handleChange}
                            className="w-full p-3 bg-black text-white border border-gray-300 rounded-lg shadow-sm"
                        />
                        <input
                            type="text"
                            name="image"
                            placeholder="URL de l'image"
                            value={formData.image || ""}
                            onChange={handleChange}
                            className="w-full p-3 bg-black text-white border border-gray-300 rounded-lg shadow-sm"
                        />
                    </div>
                    <div className={"flex justify-end "}>
                    <button
                        type="submit"
                        className="w-1/4 bg-green-500 hover:bg-green-600 text-white p-3 rounded-lg shadow-md "
                    >
                        Modifier
                    </button>
                    </div>
                </form>
            </div>
        </motion.div>
    );
}

export default EditUserForm;
