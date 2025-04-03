import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { FaShoppingCart, FaUser, FaBars, FaTimes } from "react-icons/fa";
import Logo from "../../assets/Logo/Logo_01.png";

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const location = useLocation();
    const [cartItems, setCartItems] = useState(0);

    useEffect(() => {
        if (isOpen) {
            document.body.classList.add("overflow-hidden");
        } else {
            document.body.classList.remove("overflow-hidden");
        }
        return () => document.body.classList.remove("overflow-hidden");
    }, [isOpen]);

    const updateCartItems = () => {
        const cart = JSON.parse(localStorage.getItem("cart")) || [];
        const totalItems = cart.reduce((acc, item) => acc + item.quantity, 0);
        setCartItems(totalItems);
    };

    useEffect(() => {
        updateCartItems();
    }, []);

    const menuItems = [
        { name: "Home", path: "/" },
        { name: "Produits", path: "/shop" },
        { name: "À propos", path: "/about" },
        { name: "Contact", path: "/contact" }
    ];

    // Variantes d'animation
    const menuVariants = {
        closed: {
            scale: 0,
            opacity: 0,
            transition: { duration: 0.4, ease: "circIn" }
        },
        open: {
            scale: 1,
            opacity: 1,
            transition: { duration: 0.6, ease: "circOut" }
        }
    };

    const backdropVariants = {
        closed: { opacity: 0, transition: { duration: 0.3 } },
        open: { opacity: 1, transition: { duration: 0.4 } }
    };

    const itemVariants = {
        closed: { opacity: 0, y: 30, rotateX: -15 },
        open: (i) => ({
            opacity: 1,
            y: 0,
            rotateX: 0,
            transition: { delay: i * 0.15, duration: 0.5, ease: [0.6, 0, 0.2, 1] }
        })
    };

    return (
        <nav className="fixed top-0 left-0 w-full bg-black shadow-md p-4 z-50">
            <div className="lg:container lg:mx-auto flex justify-between items-center relative lg:mt-10">
                {/* Logo centré */}
                <div className="absolute left-1/2 transform -translate-x-1/2 text-xl font-bold">
                    <Link to="/">
                        <img className="w-20 h-auto object-cover object-center" src={Logo} alt="Logo" />
                    </Link>
                </div>

                {/* Bouton menu mobile aligné à droite */}
                <div className="flex items-center justify-end w-full md:hidden">
                    <button
                        className="text-2xl text-white z-50"
                        onClick={() => setIsOpen(!isOpen)}
                    >
                        {isOpen ? <FaTimes /> : <FaBars />}
                    </button>
                </div>
            </div>

            {/* Desktop Menu (inchangé) */}
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

            {/* Menu Mobile Ultime */}
            <AnimatePresence>
                {isOpen && (
                    <div className="md:hidden">
                        {/* Fond avec effet flou et particules */}
                        <motion.div
                            variants={backdropVariants}
                            initial="closed"
                            animate="open"
                            exit="closed"
                            className="fixed inset-0 bg-gradient-to-t from-black/80 to-gray-900/90 backdrop-blur-md z-40"
                            onClick={() => setIsOpen(false)}
                        >
                            <div className="absolute inset-0 opacity-20 pointer-events-none">
                                {[...Array(20)].map((_, i) => (
                                    <motion.div
                                        key={i}
                                        className="absolute w-1 h-1 bg-white rounded-full"
                                        initial={{
                                            x: Math.random() * 100 + "%",
                                            y: Math.random() * 100 + "%"
                                        }}
                                        animate={{
                                            y: ["0%", "-100%"],
                                            opacity: [0, 1, 0]
                                        }}
                                        transition={{
                                            duration: Math.random() * 3 + 2,
                                            repeat: Infinity,
                                            delay: Math.random() * 2
                                        }}
                                    />
                                ))}
                            </div>
                        </motion.div>

                        {/* Menu principal */}
                        <motion.div
                            variants={menuVariants}
                            initial="closed"
                            animate="open"
                            exit="closed"
                            className="fixed inset-0 bg-gradient-to-br from-gray-950 via-black to-gray-900 z-50 flex flex-col items-center justify-center"
                        >
                            {/* Bouton de fermeture */}
                            <motion.button
                                initial={{ opacity: 0, scale: 0 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ delay: 0.6, duration: 0.3 }}
                                className="absolute top-6 right-6 p-2 bg-white/10 rounded-full text-white text-2xl hover:bg-white/20 transition-colors"
                                onClick={() => setIsOpen(false)}
                            >
                                <FaTimes />
                            </motion.button>

                            <ul className="space-y-10 text-center">
                                {menuItems.map((item, index) => {
                                    const isActive = location.pathname === item.path;
                                    return (
                                        <motion.li
                                            key={index}
                                            custom={index}
                                            variants={itemVariants}
                                            initial="closed"
                                            animate="open"
                                            className="relative"
                                        >
                                            <Link
                                                to={item.path}
                                                onClick={() => setIsOpen(false)}
                                                className={`block text-3xl font-bold py-4 px-8 rounded-2xl transition-all duration-300 ${
                                                    isActive
                                                        ? "bg-gradient-to-r from-purple-500/20 to-pink-500/20 text-white shadow-xl"
                                                        : "text-gray-200 hover:text-white hover:bg-white/10"
                                                }`}
                                            >
                                                {item.name}
                                                {isActive && (
                                                    <motion.div
                                                        className="absolute inset-0 -z-10 bg-gradient-to-r from-purple-500 to-pink-500 opacity-20 blur-xl"
                                                        initial={{ scale: 0 }}
                                                        animate={{ scale: 1 }}
                                                        transition={{ duration: 0.5 }}
                                                    />
                                                )}
                                            </Link>
                                        </motion.li>
                                    );
                                })}
                            </ul>

                            {/* Icônes stylées */}
                            <motion.div
                                initial={{ opacity: 0, scale: 0.8 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ delay: 0.7, duration: 0.4 }}
                                className="absolute bottom-16 flex justify-center gap-16"
                            >
                                <Link
                                    to="/panier"
                                    onClick={() => setIsOpen(false)}
                                    className="relative text-white text-4xl"
                                >
                                    <motion.div
                                        whileHover={{ scale: 1.2, rotate: 10 }}
                                        whileTap={{ scale: 0.9 }}
                                        className="relative"
                                    >
                                        <FaShoppingCart />
                                        {cartItems > 0 && (
                                            <motion.span
                                                initial={{ scale: 0 }}
                                                animate={{ scale: 1 }}
                                                transition={{ type: "spring", stiffness: 500, damping: 15 }}
                                                className="absolute -top-5 -right-5 w-7 h-7 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full text-white text-sm flex items-center justify-center shadow-lg"
                                            >
                                                {cartItems}
                                            </motion.span>
                                        )}
                                    </motion.div>
                                </Link>
                                <Link
                                    to="/connexion"
                                    onClick={() => setIsOpen(false)}
                                    className="text-white text-4xl"
                                >
                                    <motion.div
                                        whileHover={{ scale: 1.2, rotate: -10 }}
                                        whileTap={{ scale: 0.9 }}
                                    >
                                        <FaUser />
                                    </motion.div>
                                </Link>
                            </motion.div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </nav>
    );
};

export default Navbar;