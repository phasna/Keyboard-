import { Link, useLocation } from "react-router-dom";
import Logo from "../../assets/Logo/Logo_01.png";
import { FaPlus, FaEdit, FaUserPlus, FaUserCircle,FaHome } from "react-icons/fa";

const Sidebar = () => {
    const location = useLocation();

    return (
        <div className="w-1/4 h-screen bg-white/20 text-white fixed left-0 top-0 p-6 flex flex-col items-center rounded-r-3xl shadow-lg backdrop-blur-lg">

            {/* Logo */}
            <Link to="/" className="mb-10">
                <img className="w-20 h-auto" src={Logo} alt="Logo" />
            </Link>

            {/* Menu */}
            <ul className="space-y-4 w-full">
                <li>
                    <Link
                        to="/accueiladmin"
                        className={`flex items-center gap-3 px-4 py-4 rounded-xl transition duration-300 ${
                            location.pathname === "/accueiladmin"
                                ? "bg-white text-black font-semibold shadow-md"
                                : "hover:bg-gray-700/50"
                        }`}
                    >
                        <FaHome className="text-lg"/> Accueil
                    </Link>
                </li>
                <li>
                    <Link
                        to="/addproduct"
                        className={`flex items-center gap-3 px-4 py-4 rounded-xl transition duration-300 ${
                            location.pathname === "/addproduct"
                                ? "bg-white text-black font-semibold shadow-md"
                                : "hover:bg-gray-700/50"
                        }`}
                    >
                        <FaPlus className="text-lg"/> Ajouter un produit
                    </Link>
                </li>
                <li>
                    <Link
                        to="/listeutilisateurs"
                        className={`flex items-center gap-3 px-4 py-4 rounded-xl transition duration-300 ${
                            location.pathname === "/listeutilisateurs"
                                ? "bg-white text-black font-semibold shadow-md"
                                : "hover:bg-gray-700/50"
                        }`}
                    >
                        <FaUserCircle className="text-lg"/> Listes des utilisateur
                    </Link>
                </li>
                <li>
                    <Link
                        to="/adduser"
                        className={`flex items-center gap-3 px-4 py-4 rounded-xl transition duration-300 ${
                            location.pathname === "/adduser"
                                ? "bg-white text-black font-semibold shadow-md"
                                : "hover:bg-gray-700/50"
                        }`}
                    >
                        <FaUserPlus className="text-lg"/> Ajouter un utilisateur
                    </Link>
                </li>
                <li>
                    <Link
                        to="/updateuser/:id"
                        className={`flex items-center gap-3 px-4 py-4 rounded-xl transition duration-300 ${
                            location.pathname.startsWith("/updateuser")
                                ? "bg-white text-black font-semibold shadow-md"
                                : "hover:bg-gray-700/50"
                        }`}
                    >
                        <FaEdit className="text-lg"/> Modifier un utilisateur
                    </Link>
                </li>
            </ul>
        </div>
    );
};

export default Sidebar;
