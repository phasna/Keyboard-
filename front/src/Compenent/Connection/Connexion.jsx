import { useState } from "react";
import {Link, useNavigate} from "react-router-dom"; // Remplacer useHistory par useNavigate
import { motion } from "framer-motion";
import Swal from 'sweetalert2'; // Importation de Swal
import { FaEye, FaEyeSlash } from "react-icons/fa"; // Importation des icônes d'œil

const ConnexionPage = () => {
    const [identifiant, setIdentifiant] = useState("");
    const [motDePasse, setMotDePasse] = useState("");
    const [showPassword, setShowPassword] = useState(false); // État pour basculer le mot de passe visible
    const navigate = useNavigate(); // Remplacer useHistory par useNavigate

    const handleLogin = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch("http://localhost:8000/api/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ identifiant, mot_de_passe: motDePasse }),
            });

            const data = await response.json();

            if (response.ok) {
                // Connexion réussie
                Swal.fire({
                    icon: 'success',
                    title: 'Connexion réussie!',
                    text: 'Bienvenue sur votre tableau de bord.',
                    confirmButtonText: 'D\'accord',
                }).then(() => {
                    // Stocker le token dans le localStorage
                    localStorage.setItem('token', data.token);

                    // Rediriger en fonction du rôle
                    navigate(data.redirect);  // Redirection en fonction du rôle
                });
            } else {
                // Erreur de connexion
                Swal.fire({
                    icon: 'error',
                    title: 'Erreur',
                    text: data.message || 'Une erreur est survenue.',
                    confirmButtonText: 'Fermer',
                });
            }
        } catch (error) {
            // Erreur de serveur
            Swal.fire({
                icon: 'error',
                title: 'Erreur de connexion',
                text: 'Impossible de se connecter au serveur.',
                confirmButtonText: 'Réessayer',
            });
        }
    };


    return (
        <div className="relative flex items-center justify-center min-h-screen bg-black overflow-hidden">
            <div className="absolute inset-0 z-0">
                {[...Array(10)].map((_, i) => (
                    <motion.div
                        key={i}
                        className="absolute bg-blue-500 rounded-full opacity-50 blur-lg"
                        initial={{ x: Math.random() * 1000, y: Math.random() * 1000, scale: Math.random() * 2 }}
                        animate={{ x: Math.random() * 1000, y: Math.random() * 1000, scale: Math.random() * 2 }}
                        transition={{ duration: 5, repeat: Infinity, repeatType: "reverse" }}
                        style={{ width: `${Math.random() * 150 + 50}px`, height: `${Math.random() * 150 + 50}px` }}
                    />
                ))}
            </div>

            <div className="relative z-10 bg-white bg-opacity-25 p-8 rounded-lg shadow-lg w-1/4">
                <h2 className="text-2xl font-bold text-center mb-4 text-white">Connexion</h2>
                <form onSubmit={handleLogin}>
                    <div className="mb-4">
                        <label className="block text-white mb-2">Identifiant</label>
                        <input
                            type="text"
                            value={identifiant}
                            onChange={(e) => setIdentifiant(e.target.value)}
                            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="Votre identifiant"
                        />
                    </div>
                    <div className="mb-4 relative">
                        <label className="block text-white mb-2">Mot de passe</label>
                        <input
                            type={showPassword ? "text" : "password"} // Basculer entre "text" et "password" en fonction de l'état
                            value={motDePasse}
                            onChange={(e) => setMotDePasse(e.target.value)}
                            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="Votre mot de passe"
                        />
                        <p className="text-right text-white mt-3">
                            <Link to="/cree_un_compte" className="text-blue-300 ">Mot de passe oublier.</Link>
                        </p>
                        <button
                            type="button"
                            className="absolute right-3 top-10 text-gray-600"
                            onClick={() => setShowPassword(!showPassword)} // Basculer l'état de showPassword
                        >
                            {showPassword ? <FaEyeSlash size={20}/> :
                                <FaEye size={20}/>} {/* Utilisation des icônes d'œil */}
                        </button>
                    </div>
                    <button
                        type="submit"
                        className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition my-5"
                    >
                    Se connecter
                    </button>
                </form>
                <p className="text-center text-white">
                    Pas de compte ?{" "}
                    <Link to="/cree_un_compte" className="text-blue-300 underline">Crée un compte</Link>
                </p>
            </div>
        </div>
    );
};

export default ConnexionPage;
