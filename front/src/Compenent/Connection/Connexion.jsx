import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import Swal from 'sweetalert2';
import { FaEye, FaEyeSlash } from "react-icons/fa";

const ConnexionPage = () => {
    const [identifiant, setIdentifiant] = useState("");
    const [motDePasse, setMotDePasse] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate();

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
                Swal.fire({
                    icon: 'success',
                    title: 'Connexion réussie!',
                    text: 'Bienvenue sur votre tableau de bord.',
                    confirmButtonText: 'D\'accord',
                }).then(() => {
                    localStorage.setItem('token', data.token);
                    navigate(data.redirect);
                });
            } else {
                Swal.fire({
                    icon: 'error',
                    title: 'Erreur',
                    text: data.message || 'Une erreur est survenue.',
                    confirmButtonText: 'Fermer',
                });
            }
        } catch (error) {
            Swal.fire({
                icon: 'error',
                title: 'Erreur de connexion',
                text: 'Impossible de se connecter au serveur.',
                confirmButtonText: 'Réessayer',
            });
        }
    };

    return (
        <div className="relative flex items-center justify-center min-h-screen bg-black overflow-hidden px-4 sm:px-6 lg:px-8">
            <div className="absolute inset-0 z-0">
                {[...Array(10)].map((_, i) => (
                    <motion.div
                        key={i}
                        className="absolute bg-blue-500 rounded-full opacity-50 blur-lg"
                        initial={{ x: Math.random() * 1000, y: Math.random() * 1000, scale: Math.random() * 2 }}
                        animate={{ x: Math.random() * 1000, y: Math.random() * 1000, scale: Math.random() * 2 }}
                        transition={{ duration: 5, repeat: Infinity, repeatType: "reverse" }}
                        style={{
                            width: `${Math.random() * 100 + 30}px`,
                            height: `${Math.random() * 100 + 30}px`,
                            transform: 'translate(-50%, -50%)' // Center the circles
                        }}
                    />
                ))}
            </div>

            <div className="relative z-10 bg-white bg-opacity-25 p-6 sm:p-8 rounded-lg shadow-lg w-full max-w-md md:max-w-lg lg:max-w-xl">
                <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-center mb-6 sm:mb-8 text-white">
                    Connexion
                </h2>
                <form onSubmit={handleLogin} className="space-y-6">
                    <div>
                        <label className="block text-white text-sm sm:text-base mb-2">
                            Identifiant
                        </label>
                        <input
                            type="text"
                            value={identifiant}
                            onChange={(e) => setIdentifiant(e.target.value)}
                            className="w-full px-3 sm:px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm sm:text-base bg-white/80"
                            placeholder="Votre identifiant"
                        />
                    </div>
                    <div className="relative">
                        <label className="block text-white text-sm sm:text-base mb-2">
                            Mot de passe
                        </label>
                        <input
                            type={showPassword ? "text" : "password"}
                            value={motDePasse}
                            onChange={(e) => setMotDePasse(e.target.value)}
                            className="w-full px-3 sm:px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm sm:text-base bg-white/80"
                            placeholder="Votre mot de passe"
                        />
                        <button
                            type="button"
                            className="absolute right-3 top-10 sm:top-11 text-gray-600"
                            onClick={() => setShowPassword(!showPassword)}
                        >
                            {showPassword ? <FaEyeSlash size={20} /> : <FaEye size={20} />}
                        </button>
                        <p className="text-right text-white mt-2 sm:mt-3 text-sm sm:text-base">
                            <Link to="/cree_un_compte" className="text-blue-300 hover:underline">
                                Mot de passe oublié ?
                            </Link>
                        </p>
                    </div>
                    <button
                        type="submit"
                        className="w-full bg-blue-500 text-white py-2 sm:py-3 rounded-lg hover:bg-blue-600 transition text-sm sm:text-base font-semibold"
                    >
                        Se connecter
                    </button>
                </form>
                <p className="text-center text-white mt-4 sm:mt-6 text-sm sm:text-base">
                    Pas de compte ?{" "}
                    <Link to="/cree_un_compte" className="text-blue-300 underline hover:text-blue-400">
                        Crée un compte
                    </Link>
                </p>
            </div>
        </div>
    );
};

export default ConnexionPage;