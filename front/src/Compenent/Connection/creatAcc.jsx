import { useState } from "react";
import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa"; // Importer les icônes d'œil
import Swal from "sweetalert2"; // Importer SweetAlert2

const RegisterPage = () => {
    const [formData, setFormData] = useState({
        identifiant: "",
        mot_de_passe: "",
        nom: "",
        prenom: "",
        email: "",
        telephone: "",
        adresse: "",
    });

    const [message, setMessage] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setMessage("");

        try {
            const response = await fetch("http://localhost:8000/api/utilisateurs", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData),
            });

            const data = await response.json();

            if (response.ok) {
                // Afficher un message de succès avec SweetAlert
                Swal.fire({
                    title: "Succès!",
                    text: "Inscription réussie !",
                    icon: "success",
                    confirmButtonText: "OK",
                }).then(() => {
                    navigate("/Connexion"); // Rediriger vers la page de connexion après confirmation
                });
            } else {
                // Afficher un message d'erreur avec SweetAlert
                Swal.fire({
                    title: "Erreur",
                    text: data.message || "Une erreur est survenue.",
                    icon: "error",
                    confirmButtonText: "OK",
                });
            }
        } catch (error) {
            // Afficher une erreur de serveur avec SweetAlert
            Swal.fire({
                title: "Erreur",
                text: "Erreur de connexion au serveur.",
                icon: "error",
                confirmButtonText: "OK",
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

            <div className="relative z-10 bg-white bg-opacity-25 p-8 rounded-lg shadow-lg w-full max-w-xl">
                <h2 className="text-2xl font-bold text-center mb-4 text-white">Inscription</h2>
                {message && <p className="text-center text-red-500">{message}</p>}

                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label className="block text-white mb-2">Nom</label>
                        <input
                            type="text"
                            name="nom"
                            value={formData.nom}
                            onChange={handleChange}
                            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                            placeholder="Votre nom"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-white mb-2">Prénom</label>
                        <input
                            type="text"
                            name="prenom"
                            value={formData.prenom}
                            onChange={handleChange}
                            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                            placeholder="Votre prénom"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-white mb-2">Email</label>
                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                            placeholder="Votre email"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-white mb-2">Téléphone</label>
                        <input
                            type="tel"
                            name="telephone"
                            value={formData.telephone}
                            onChange={handleChange}
                            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                            placeholder="Votre téléphone"
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-white mb-2">Adresse</label>
                        <input
                            type="text"
                            name="adresse"
                            value={formData.adresse}
                            onChange={handleChange}
                            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                            placeholder="Votre adresse"
                        />
                    </div>

                    <div className="mb-4">
                        <label className="block text-white mb-2">Identifiant</label>
                        <input
                            type="text"
                            name="identifiant"
                            value={formData.identifiant}
                            onChange={handleChange}
                            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                            placeholder="Votre identifiant"
                            required
                        />
                    </div>

                    <div className="mb-4 relative">
                        <label className="block text-white mb-2">Mot de passe</label>
                        <input
                            type={showPassword ? "text" : "password"}
                            name="mot_de_passe"
                            value={formData.mot_de_passe}
                            onChange={handleChange}
                            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                            placeholder="Votre mot de passe"
                            required
                        />
                        <button
                            type="button"
                            className="absolute right-3 top-11 text-gray-600"
                            onClick={() => setShowPassword(!showPassword)}
                        >
                            {showPassword ? <FaEyeSlash /> : <FaEye />}  {/* Utilisation des icônes d'œil */}
                        </button>
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition my-5"
                    >
                        S'inscrire
                    </button>
                </form>

                <p className="text-center text-white">
                    Déjà un compte ?{" "}
                    <Link to="/connexion" className="text-blue-300 underline">Se connecter</Link>
                </p>
            </div>
        </div>
    );
};

export default RegisterPage;
