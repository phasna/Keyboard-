import { useState } from "react";
import { motion } from "framer-motion";
import { Link } from 'react-router-dom'

const LoginPage = () => {
    const [identifiant, setIdentifiant] = useState("");
    const [motDePasse, setMotDePasse] = useState("");
    const [message, setMessage] = useState("");
    const [showPassword, setShowPassword] = useState(false);

    const handleLogin = async (e) => {
        e.preventDefault();
        setMessage("");

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
                setMessage("Connexion réussie !");
                console.log("Utilisateur:", data.user);
                // Ici, tu peux stocker les infos utilisateur dans le localStorage ou le contexte
            } else {
                setMessage(data.error);
            }
        } catch (error) {
            setMessage("Erreur de connexion au serveur");
        }
    };

    return (
        <div className="relative flex items-center justify-center min-h-screen h- bg-black overflow-hidden">
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
                {message && <p className="text-center text-red-500">{message}</p>}
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
                            type={showPassword ? "text" : "password"}
                            value={motDePasse}
                            onChange={(e) => setMotDePasse(e.target.value)}
                            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="Votre mot de passe"
                        />
                        <button
                            type="button"
                            className="absolute right-3 top-9 text-gray-600"
                            onClick={() => setShowPassword(!showPassword)}
                        >
                            {showPassword ? "👁️" : "🔒"}
                        </button>
                    </div>
                    <Link to={"/admin"}>
                    <button
                        type="submit"
                        className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition my-5"
                    >
                        Se connecter
                    </button>
                </Link>

            </form>
            </div>
        </div>
    );
};

export default LoginPage;
