import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import axios from "axios";
import { motion } from 'framer-motion';
import Swal from 'sweetalert2';
import { Link } from 'react-router-dom'; // Import du Link pour la redirection

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
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
        >
            {/* Envelopper l'image du produit dans un Link */}
            <Link to={`/product/${product.id}`}>
                <img src={product.image} alt={product.title} className="w-full h-40 object-cover" />
            </Link>

            <div className="p-4">
                <h3 className="text-xl font-semibold text-white mb-2">{product.title}</h3>
                <p className="text-lg font-medium text-white mb-2">${product.price}</p>
                <div className="flex items-center mb-2">{renderStars(product.rating)}</div>
                <button
                    onClick={() => onAddToCart(product)}
                    className="w-full py-2 px-4 bg-green-500 text-white rounded-md hover:bg-gray-800 mt-5"
                >
                    Ajouter au panier
                </button>
            </div>
        </motion.div>
    );
};

const ProductGrid = () => {
    const [products, setProducts] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [sortOption, setSortOption] = useState("other");
    const [currentPage, setCurrentPage] = useState(1);
    const productsPerPage = 8;

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

        // Afficher l'alerte SweetAlert2
        Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: `${product.title} a été ajouté au panier`,
            showConfirmButton: false,
            timer: 2000, // Affichage pendant 2 secondes
            toast: true,
            background: '#1a1a1a',
            color: '#fff'
        });
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
            } else {
                return 0;
            }
        });

    const indexOfLastProduct = currentPage * productsPerPage;
    const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
    const currentProducts = filteredProducts.slice(indexOfFirstProduct, indexOfLastProduct);
    const totalPages = Math.ceil(filteredProducts.length / productsPerPage);

    return (
        <div className="px-10 py-10 container mx-auto">
            <h1 className="text-7xl font-bold text-center text-green-400 mb-10 bg-gradient-to-r from-white via-gray-400 to-gray-600 text-transparent bg-clip-text">Nos produits</h1>

            <div className="flex justify-between items-center mb-10">
                <input
                    type="text"
                    placeholder="Rechercher un produit..."
                    className="p-3 border bg-black rounded-lg w-1/3"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
                <select
                    value={sortOption}
                    onChange={(e) => setSortOption(e.target.value)}
                    className="p-4 border border-gray-300 rounded-lg bg-black text-white"
                >
                    <option value="other">Trier votre prix</option>
                    <option value="ascending">Prix Croissant</option>
                    <option value="descending">Prix Décroissant</option>
                </select>
            </div>

            <motion.div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                {currentProducts.length > 0 ? (
                    currentProducts.map(product => (
                        <ProductCard key={product.id} product={product} onAddToCart={handleAddToCart} />
                    ))
                ) : (
                    <p className="text-white text-center">Aucun produit disponible</p>
                )}
            </motion.div>

            <div className="flex justify-center mt-8 space-x-4">
                <button
                    className="px-4 py-2 bg-gray-700 text-white rounded-lg"
                    disabled={currentPage === 1}
                    onClick={() => setCurrentPage(currentPage - 1)}
                >
                    Précédent
                </button>
                {Array.from({ length: totalPages }, (_, i) => (
                    <button
                        key={i}
                        className={`px-4 py-2 rounded-lg ${currentPage === i + 1 ? 'bg-green-500 text-white' : 'bg-gray-700 text-gray-200'}`}
                        onClick={() => setCurrentPage(i + 1)}
                    >
                        {i + 1}
                    </button>
                ))}
                <button
                    className="px-4 py-2 bg-gray-700 text-white rounded-lg"
                    disabled={currentPage === totalPages}
                    onClick={() => setCurrentPage(currentPage + 1)}
                >
                    Suivant
                </button>
            </div>
        </div>
    );
};

export default ProductGrid;
