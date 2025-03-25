import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { FaShoppingCart, FaUser, FaBars, FaTimes } from "react-icons/fa";
import Logo from "../assets/Logo/Logo_01.png";

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const location = useLocation();
    const [cartItems, setCartItems] = useState(0); // Valeur initiale à 0

    // Empêcher le défilement du body quand le menu est ouvert
    useEffect(() => {
        if (isOpen) {
            document.body.classList.add("overflow-hidden");
        } else {
            document.body.classList.remove("overflow-hidden");
        }
        return () => document.body.classList.remove("overflow-hidden");
    }, [isOpen]);

    // Mettre à jour le nombre d'articles dans le panier en temps réel
    const updateCartItems = () => {
        const cart = JSON.parse(localStorage.getItem("cart")) || [];
        const totalItems = cart.reduce((acc, item) => acc + item.quantity, 0);
        setCartItems(totalItems);
    };

    // Utiliser ce useEffect pour mettre à jour le nombre d'articles quand le composant est monté
    useEffect(() => {
        updateCartItems();  // Initialisation
    }, []);

    // Fonction pour ajouter un article au panier et mettre à jour cartItems en temps réel
    const addToCart = (item) => {
        const cart = JSON.parse(localStorage.getItem("cart")) || [];
        const itemIndex = cart.findIndex(cartItem => cartItem.id === item.id);

        if (itemIndex === -1) {
            // Si l'article n'est pas encore dans le panier, on l'ajoute
            cart.push(item);
        } else {
            // Si l'article est déjà dans le panier, on met à jour la quantité
            cart[itemIndex].quantity += item.quantity;
        }

        // Mettre à jour le localStorage
        localStorage.setItem("cart", JSON.stringify(cart));

        // Mettre à jour immédiatement le nombre d'articles dans l'état
        updateCartItems();
    };

    const menuItems = [
        { name: "Home", path: "/" },
        { name: "Produites", path: "/shop" },
        { name: "À propos", path: "/about" },
        { name: "Contact", path: "/contact" }
    ];

    return (
        <nav className="fixed top-0 left-0 w-full bg-black shadow-md p-4 z-50">
            <div className="lg:container lg:mx-auto flex justify-between items-center relative lg:mt-10">

                {/* Logo Centré */}
                <div className="absolute left-1/2 transform -translate-x-1/2 text-xl font-bold">
                    <Link to="/">
                        <img className="w-20 h-auto object-cover object-center" src={Logo} alt="Logo" />
                    </Link>
                </div>

                {/* Bloc Burger (Mobile) */}
                <button
                    className="md:hidden text-2xl text-white z-50"
                    onClick={() => setIsOpen(!isOpen)}
                >
                    {isOpen ? <FaTimes /> : <FaBars />}
                </button>
            </div>

            {/* Bloc Desktop */}
            <ul className="hidden md:flex justify-center gap-8 text-lg text-white mt-10">
                {menuItems.map((item, index) => {
                    const isActive = location.pathname === item.path;
                    return (
                        <li key={index} className="relative group">
                            <Link to={item.path} className="relative">
                                {item.name}
                            </Link>
                            <motion.div
                                className="absolute left-0 bottom-0 w-full h-[2px] bg-white"
                                initial={{ scaleX: 0 }}
                                animate={{ scaleX: isActive ? 1 : 0 }}
                                whileHover={{ scaleX: 1 }}
                                transition={{ duration: 0.3, ease: "easeInOut" }}
                            />
                        </li>
                    );
                })}

                {/* Icônes à gauche */}
                <div className="flex gap-4 text-2xl absolute right-10 bottom-7">
                    <Link to="/panier" className="">
                        <FaShoppingCart className="text-3xl" />
                        {cartItems > 0 && (
                            <span className="absolute -top-2 right-8 text-red-500 text-sm font-bold">
                                {cartItems}
                            </span>
                        )}
                    </Link>
                    <Link to="/connexion">
                        <FaUser />
                    </Link>
                </div>
            </ul>

            {/* Bloc Mobile (Sans Overflow) */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        className="absolute top-0 left-0 w-full h-screen bg-black text-white shadow-md flex flex-col justify-center items-center md:hidden overflow-hidden"
                    >
                        <ul className="flex flex-col gap-6 text-lg text-center max-w-[90%] mx-auto">
                            {menuItems.map((item, index) => {
                                const isActive = location.pathname === item.path;
                                return (
                                    <li key={index} className="relative group">
                                        <Link
                                            to={item.path}
                                            onClick={() => setIsOpen(false)}
                                            className="relative inline-block"
                                        >
                                            {item.name}
                                        </Link>
                                        <motion.div
                                            className="absolute left-0 bottom-0 w-full h-[2px] bg-white"
                                            initial={{ scaleX: 0 }}
                                            animate={{ scaleX: isActive ? 1 : 0 }}
                                            whileHover={{ scaleX: 1 }}
                                            transition={{ duration: 0.3, ease: "easeInOut" }}
                                        />
                                    </li>
                                );
                            })}
                        </ul>

                        {/* Icônes centrées sur mobile */}
                        <div className="flex justify-center gap-6 text-2xl mt-6">
                            <Link to="/panier" className="relative">
                                <FaShoppingCart />
                                {cartItems > 0 && (
                                    <span className="text-red-500 text-xs font-bold">
                                        {cartItems}
                                    </span>
                                )}
                            </Link>
                            <Link to="/connexion">
                                <FaUser />
                            </Link>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </nav>
    );
};

export default Navbar;
