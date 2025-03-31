import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { motion } from 'framer-motion';
import Swal from 'sweetalert2';
import { FaPaypal, FaCcVisa, FaCcMastercard, FaApplePay } from 'react-icons/fa'; // Import des icônes de paiement
import { FaStar, FaRegStar } from 'react-icons/fa'; // Import des icônes d'étoiles

import Image from "../../../public/Clavier/Clavier72.png"

const ProductDetaille = () => {
    const { id } = useParams();
    const [product, setProduct] = useState(null);
    const [similarProducts, setSimilarProducts] = useState([]);

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const response = await axios.get(`http://localhost:8000/api/products/${id}`);
                console.log(response.data.image);  // Afficher le chemin de l'image
                setProduct(response.data);
                fetchSimilarProducts(response.data.category);
            } catch (error) {
                console.error("Erreur lors de la récupération du produit :", error);
            }
        };

        const fetchSimilarProducts = async (category) => {
            try {
                const response = await axios.get(`http://localhost:8000/api/products?category=${category}`);
                // Limite à 4 produits et filtre les produits ayant le même id
                setSimilarProducts(response.data.filter(p => p.id !== id).slice(0, 4));
            } catch (error) {
                console.error("Erreur lors de la récupération des produits similaires :", error);
            }
        };

        fetchProduct();
    }, [id]);

    const handleAddToCart = () => {
        if (!product) return;

        let cart = JSON.parse(localStorage.getItem('cart')) || [];
        const existingProduct = cart.find(item => item.id === product.id);

        if (existingProduct) {
            existingProduct.quantity += 1;
        } else {
            cart.push({ ...product, quantity: 1 });
        }

        localStorage.setItem('cart', JSON.stringify(cart));

        Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: `${product.title} ajouté au panier`,
            showConfirmButton: false,
            timer: 2000,
            toast: true,
            background: '#1a1a1a',
            color: '#fff'
        });
    };

    if (!product) return <p className="text-white text-center mt-10">Chargement...</p>;

    // Fonction pour afficher les étoiles de rating
    const renderStars = (rating) => {
        const stars = [];
        for (let i = 1; i <= 5; i++) {
            if (i <= rating) {
                stars.push(<FaStar key={i} className="text-yellow-400" />);
            } else {
                stars.push(<FaRegStar key={i} className="text-yellow-400" />);
            }
        }
        return stars;
    };

    return (
        <div className="container mx-auto px-6 py-10 mt-[5vh]">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                <motion.img
                    src={product.image || '/path/to/default-image.jpg'}  // Image par défaut si product.image est vide
                    alt={product.title}
                    className="w-full h-96 object-cover rounded-lg"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5 }}
                />
                <div className="text-white">
                    <h1 className="text-3xl font-bold mb-4">{product.title}</h1>
                    <p className="text-xl text-green-400 mb-4">${product.price}</p>
                    <p className="text-gray-300 mb-6">{product.description}</p>

                    {/* Affichage du rating */}
                    <div className="flex items-center mb-6">
                        <div className="flex">{renderStars(product.rating)}</div>
                        <span className="ml-2 text-gray-300">({product.rating}/5)</span>
                    </div>

                    <button onClick={handleAddToCart}
                            className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-800">
                        Ajouter au panier
                    </button>

                    {/* Section des icônes de paiement */}
                    <div className="flex justify-left mt-8 space-x-6">
                        <FaPaypal className="text-5xl text-blue-600" />
                        <FaCcVisa className="text-5xl text-blue-500" />
                        <FaCcMastercard className="text-5xl text-red-600" />
                        <FaApplePay className="text-5xl text-white" />
                    </div>
                </div>
            </div>

            <h2 className="text-2xl text-white mt-10 mb-6">Vous pourriez aussi aimer</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {similarProducts.map(item => (
                    <motion.div key={item.id} className="bg-gray-800 shadow-md rounded-lg overflow-hidden p-5"
                                whileHover={{ scale: 1.05 }}>
                        {/* Vérification de l'image */}
                        <img src={item.image} alt={item.title} className="w-full h-40 object-cover rounded-md" />
                        <h3 className="text-lg font-semibold text-white mt-2">{item.title}</h3>
                        <p className="text-green-400">${item.price}</p>
                    </motion.div>
                ))}

            </div>
        </div>
    );
};

export default ProductDetaille;
