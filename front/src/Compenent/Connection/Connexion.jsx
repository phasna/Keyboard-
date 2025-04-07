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
                    confirmButtonColor: '#EAB308', // yellow-500
                });
                localStorage.setItem('token', data.token);
                navigate(data.redirect);
            } else {
                Swal.fire({
                    icon: 'error',
                    title: 'Erreur',
                    text: data.message || 'Une erreur est survenue.',
                    confirmButtonText: 'Fermer',
                    confirmButtonColor: '#EAB308', // yellow-500
                });
            }
        } catch (error) {
            Swal.fire({
                icon: 'error',
                title: 'Erreur de connexion',
                text: 'Impossible de se connecter au serveur.',
                confirmButtonText: 'Réessayer',
                confirmButtonColor: '#EAB308', // yellow-500
            });
        }
    };

    return (
        <div className="relative flex items-center justify-center min-h-screen bg-gray-900 overflow-hidden px-4 sm:px-6 lg:px-8">
            <div className="absolute inset-0 z-0">
                {[...Array(10)].map((_, i) => (
                    <motion.div
                        key={i}
                        className="absolute bg-yellow-500 rounded-full opacity-40 blur-lg"
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

            <div className="relative z-10 bg-gray-800 bg-opacity-80 p-6 sm:p-8 rounded-lg shadow-lg w-full max-w-md md:max-w-lg lg:max-w-xl ">
                <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-center mb-6 sm:mb-8 text-yellow-400">
                    Connexion
                </h2>
                <form onSubmit={handleLogin} className="space-y-6">
                    <div>
                        <label className="block text-yellow-500 text-sm sm:text-base mb-2">
                            Identifiant
                        </label>
                        <input
                            type="text"
                            value={identifiant}
                            onChange={(e) => setIdentifiant(e.target.value)}
                            className="w-full px-3 sm:px-4 lg:py-5 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500 text-sm sm:text-base bg-gray-700 text-white"
                            placeholder="Votre identifiant"
                        />
                    </div>
                    <div className="relative">
                        <label className="block text-yellow-500 text-sm sm:text-base mb-2">
                            Mot de passe
                        </label>
                        <input
                            type={showPassword ? "text" : "password"}
                            value={motDePasse}
                            onChange={(e) => setMotDePasse(e.target.value)}
                            className="w-full px-3 sm:px-4 lg:py-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500 text-sm sm:text-base bg-gray-700 text-white"
                            placeholder="Votre mot de passe"
                        />
                        <button
                            type="button"
                            className="absolute right-3 top-10 sm:top-11 text-yellow-500"
                            onClick={() => setShowPassword(!showPassword)}
                        >
                            {showPassword ? <FaEyeSlash size={20} /> : <FaEye size={20} />}
                        </button>
                        <p className="text-right mt-2 sm:mt-3 text-sm sm:text-base">
                            <Link to="/cree_un_compte" className="text-yellow-400 hover:text-yellow-300 hover:underline">
                                Mot de passe oublié ?
                            </Link>
                        </p>
                    </div>
                    <button
                        type="submit"
                        className="w-full bg-yellow-500 text-gray-900 py-2 sm:py-3 rounded-lg hover:bg-yellow-400 transition text-sm sm:text-base font-semibold"
                    >
                        Se connecter
                    </button>
                </form>
                <p className="text-center text-yellow-100 mt-4 sm:mt-6 text-sm sm:text-base">
                    Pas de compte ?{" "}
                    <Link to="/cree_un_compte" className="text-yellow-400 underline hover:text-yellow-300">
                        Crée un compte
                    </Link>
                </p>
            </div>
        </div>
    );
};

export default ConnexionPage;