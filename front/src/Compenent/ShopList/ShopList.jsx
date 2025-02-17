import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import axios from "axios";
import { motion } from 'framer-motion'; // Importez Framer Motion

const ProductCard = ({ product, onAddToCart }) => {
    const renderStars = (rating) => {
        return [...Array(5)].map((_, i) => (
            <svg
                key={i}
                xmlns="http://www.w3.org/2000/svg"
                fill={i < rating ? 'yellow' : 'gray'}
                viewBox="0 0 24 24"
                width="20"
                height="20"
                className="mr-1"
            >
                <path d="M12 17.27L18.18 21 16.54 13.97 22 9.24l-6.91-.59L12 2 8.91 8.65 2 9.24l5.46 4.73L5.82 21z" />
            </svg>
        ));
    };

    return (
        <motion.div
            className="bg-zinc-500 bg-opacity-60 shadow-md rounded-lg overflow-hidden transform transition-transform hover:scale-105 hover:shadow-lg p-10"
            initial={{ opacity: 0 }} // L'élément commence avec une opacité de 0
            animate={{ opacity: 1 }} // L'élément devient complètement opaque
            transition={{ duration: 0.5 }} // Animation pendant 0.5 seconde
        >
            <img src={product.image} alt={product.title} className="w-full h-40 object-cover" />
            <div className="p-4">
                <h3 className="text-xl font-semibold text-white mb-2">{product.title}</h3>
                <p className="text-lg font-medium text-white mb-2">${product.price}</p>
                <div className="flex items-center mb-2">{renderStars(product.rating)}</div>
                <button
                    onClick={() => onAddToCart(product)}
                    className="w-full py-2 px-4 bg-green-500 text-white rounded-md hover:bg-gray-800 mt-5"
                >
                    Add to Cart
                </button>
            </div>
        </motion.div>
    );
};

const ProductGrid = () => {
    const [products, setProducts] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");
    const [sortOption, setSortOption] = useState("other");

    useEffect(() => {
        const getProducts = async () => {
            try {
                const response = await axios.get('http://localhost:8000/api/products');
                setProducts(response.data);
            } catch (error) {
                console.error(error);
            }
        };
        getProducts();
    }, []);

    const handleAddToCart = (product) => {
        const cart = JSON.parse(localStorage.getItem('cart')) || [];
        const existingProduct = cart.find(item => item.id === product.id);
        if (existingProduct) {
            existingProduct.quantity += 1;
        } else {
            product.quantity = 1;
            cart.push(product);
        }
        localStorage.setItem('cart', JSON.stringify(cart));
        setShowModal(true);
        setTimeout(() => {
            setShowModal(false);
        }, 500);
    };

    const filteredProducts = products
        .filter(product =>
            product.title.toLowerCase().includes(searchTerm.toLowerCase())
        )
        .sort((a, b) => {
            if (sortOption === "ascending") {
                return a.price - b.price;
            } else if (sortOption === "descending") {
                return b.price - a.price;
            } else if (sortOption === "other") {
                return a.someOtherProperty - b.someOtherProperty;
            } else {
                return 0;
            }
        });

    return (
        <div className="px-10 py-10 container mx-auto">
            <h1 className="text-7xl font-bold text-center text-green-400 mb-10 bg-gradient-to-r from-white via-gray-400 to-gray-600 text-transparent bg-clip-text">Nos produits</h1>

            {/* Barre de recherche et options alignées */}
            <div className="flex justify-between items-center mb-10">
                <input
                    type="text"
                    placeholder="Rechercher un produit..."
                    className="p-3 border border-gray-300 rounded-lg w-1/3"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
                <div className="flex gap-4">
                    {/* Sélecteur de tri */}
                    <div>
                        <label className="text-white">Filtrer par: </label>
                        <select
                            value={sortOption}
                            onChange={(e) => setSortOption(e.target.value)}
                            className="p-2 border border-gray-300 rounded-lg"
                        >
                            <option value="other">Autre Option</option>
                            <option value="ascending">Prix Croissant</option>
                            <option value="descending">Prix Décroissant</option>
                        </select>
                    </div>
                </div>
            </div>

            {/* Animation de l'affichage des produits un par un avec un décalage basé sur l'index */}
            <motion.div
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8"
                initial="hidden"
                animate="show"
                variants={{
                    hidden: { opacity: 0 },
                    show: { opacity: 1, transition: { staggerChildren: 0.6 } } // Le délai entre chaque produit est basé sur l'index multiplié par 0.6
                }}
            >
                {filteredProducts.length > 0 ? (
                    filteredProducts.map((product, index) => (
                        <motion.div
                            key={product.id}
                            variants={{
                                hidden: { opacity: 0 },
                                show: { opacity: 1, transition: { duration: 0.5, delay: index * 0.2 } } // Calcul du délai en fonction de l'index
                            }}
                        >
                            <ProductCard product={product} onAddToCart={handleAddToCart} />
                        </motion.div>
                    ))
                ) : (
                    <p className="text-white text-center">Aucun produit disponible</p>
                )}
            </motion.div>

            {showModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
                    <div className="bg-white p-8 rounded-lg shadow-lg max-w-sm w-full">
                        <h2 className="text-2xl font-semibold text-green-600 mb-4">Produit ajouté au panier !</h2>
                        <p className="text-gray-700 mb-4">Votre produit a été ajouté avec succès.</p>
                        <div className="flex justify-center">
                            <button
                                onClick={() => setShowModal(false)}
                                className="py-2 px-6 bg-green-600 text-white rounded-md hover:bg-green-800 transition duration-300"
                            >
                                Fermer
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ProductGrid;
