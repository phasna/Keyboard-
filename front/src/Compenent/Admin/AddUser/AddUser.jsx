import { useState } from "react";
import { motion } from "framer-motion";
import axios from "axios";
import Swal from "sweetalert2";

function AddUserForm() {
    const [user, setUser] = useState({
        identifiant: "",
        mot_de_passe: "",
        nom: "",
        prenom: "",
        email: "",
        telephone: "",
        adresse: "",
        image: ""
    });

    const handleChange = (e) => {
        setUser({ ...user, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log("Données envoyées:", user);
        try {
            const response = await axios.post("http://localhost:8000/api/utilisateurs", user);
            console.log("Réponse API:", response.data);

            Swal.fire({
                title: "Succès",
                text: response.data.message,
                icon: "success",
                confirmButtonText: "OK",
            });
        } catch (error) {
            console.error("Erreur lors de l'ajout de l'utilisateur:", error);
            Swal.fire({
                title: "Erreur",
                text: "Échec de l'ajout de l'utilisateur",
                icon: "error",
                confirmButtonText: "OK",
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
            <h2 className="text-5xl font-light text-white my-10 mb-10">
                AJOUTER UN UTILISATEUR.
            </h2>

            <div className="w-full mx-auto bg-white bg-opacity-25 p-20 rounded-lg shadow-lg">
                <form onSubmit={handleSubmit} className="space-y-5">
                    <div className="flex flex-col space-y-4">
                        <div className="w-full flex lg:flex-row flex-col space-x-2">
                            <input
                                type="text"
                                name="identifiant"
                                placeholder="Identifiant"
                                value={user.identifiant}
                                onChange={handleChange}
                                required
                                className="w-1/2 bg-black p-3 text-white border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300"
                            />
                            <input
                                type="password"
                                name="mot_de_passe"
                                placeholder="Mot de passe"
                                value={user.mot_de_passe}
                                onChange={handleChange}
                                required
                                className="w-1/2 p-3 bg-black text-white border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300"
                            />
                        </div>
                        <div className="w-full flex lg:flex-row flex-col space-x-2">
                            <input
                                type="text"
                                name="nom"
                                placeholder="Nom"
                                value={user.nom}
                                onChange={handleChange}
                                required
                                className="w-1/2 p-3 bg-black text-white border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300"
                            />
                            <input
                                type="text"
                                name="prenom"
                                placeholder="Prénom"
                                value={user.prenom}
                                onChange={handleChange}
                                required
                                className="w-1/2 p-3 bg-black text-white border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300"
                            />
                        </div>
                        <input
                            type="email"
                            name="email"
                            placeholder="Email"
                            value={user.email}
                            onChange={handleChange}
                            className="w-full p-3 bg-black text-white border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300"
                        />
                        <input
                            type="text"
                            name="telephone"
                            placeholder="Téléphone"
                            value={user.telephone}
                            onChange={handleChange}
                            className="w-full p-3 bg-black text-white border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300"
                        />
                        <input
                            type="text"
                            name="adresse"
                            placeholder="Adresse"
                            value={user.adresse}
                            onChange={handleChange}
                            className="w-full p-3 bg-black text-white border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300"
                        />
                        <input
                            type="text"
                            name="image"
                            placeholder="URL de l'image"
                            value={user.image}
                            onChange={handleChange}
                            className="w-full p-3 bg-black text-white border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300"
                        />
                    </div>
                    <div className={"flex justify-end "}>
                    <button
                        type="submit"
                        className="w-1/4 bg-yellow-500 text-black p-4 rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300"
                    >
                        Ajouter
                    </button>
                    </div>
                </form>
            </div>
        </motion.div>
    );
}

export default AddUserForm;
