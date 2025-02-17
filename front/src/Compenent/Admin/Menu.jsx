import { useState } from "react";
import { motion } from "framer-motion";
import { FaHome, FaUser, FaCog, FaBars, FaTimes } from "react-icons/fa";

const AdminPage = () => {
    const [menuOpen, setMenuOpen] = useState(false);

    return (
        <div className="flex min-h-screen bg-gray-100">
            {/* Sidebar */}
            <motion.div
                initial={{ x: -250 }}
                animate={{ x: 0 }}
                transition={{ duration: 0.5 }}
                className={`bg-gray-900 text-white w-1/5 min-h-screen p-5 fixed md:relative ${menuOpen ? "left-0" : "-left-60"} md:left-0 transition-all duration-300 z-50`}
            >
                <div className="flex items-center justify-between mb-8">
                    <h2 className="text-xl font-bold">Admin Panel</h2>
                    <button
                        className="text-white md:hidden"
                        onClick={() => setMenuOpen(false)}
                    >
                        <FaTimes size={24} />
                    </button>
                </div>
                <nav className="space-y-4">
                    <a href="#" className="flex items-center space-x-2 hover:bg-gray-700 p-2 rounded">
                        <FaHome /> <span>Dashboard</span>
                    </a>
                    <a href="#" className="flex items-center space-x-2 hover:bg-gray-700 p-2 rounded">
                        <FaUser /> <span>Utilisateurs</span>
                    </a>
                    <a href="#" className="flex items-center space-x-2 hover:bg-gray-700 p-2 rounded">
                        <FaCog /> <span>Paramètres</span>
                    </a>
                </nav>
            </motion.div>

            {/* Contenu Principal */}
            <div className="flex-1 md:ml-1/5 p-6 transition-all duration-300">
                {/* Menu Burger pour Mobile */}
                <button
                    className="text-gray-900 md:hidden absolute top-4 left-4"
                    onClick={() => setMenuOpen(true)}
                >
                    <FaBars size={24} />
                </button>

                <h1 className="text-2xl font-bold">Bienvenue sur l'Admin Panel</h1>
                <p className="mt-4 text-gray-700">
                    Ceci est une page d'administration où tu peux gérer tes utilisateurs, configurations et plus encore.
                </p>
            </div>
        </div>
    );
};

export default AdminPage;
