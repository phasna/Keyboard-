import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { motion } from 'framer-motion';
import Swal from 'sweetalert2';
import { FaPaypal, FaCcVisa, FaCcMastercard, FaApplePay } from 'react-icons/fa';
import { FaStar, FaRegStar } from 'react-icons/fa';

const ProductDetaille = () => {
    const { id } = useParams();
    const [product, setProduct] = useState(null);
    const [similarProducts, setSimilarProducts] = useState([]);
    const [quantity, setQuantity] = useState(1); // État pour la quantité du produit

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const response = await axios.get(`http://localhost:8000/api/products/${id}`);
                setProduct(response.data);
                fetchSimilarProducts(response.data.category);
            } catch (error) {
                console.error("Erreur lors de la récupération du produit :", error);
            }
        };

        const fetchSimilarProducts = async (category) => {
            try {
                const response = await axios.get(`http://localhost:8000/api/products?category=${category}`);
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
            existingProduct.quantity += quantity; // Ajoute la quantité sélectionnée
        } else {
            cart.push({ ...product, quantity });
        }

        localStorage.setItem('cart', JSON.stringify(cart));

        Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: `${product.title} ajouté au panier avec ${quantity} article(s)`,
            showConfirmButton: false,
            timer: 2000,
            toast: true,
            background: '#1a1a1a',
            color: '#fff'
        });
    };

    const handleQuantityChange = (e) => {
        setQuantity(parseInt(e.target.value)); // Met à jour la quantité sélectionnée
    };

    if (!product) return <p className="text-white text-center mt-10">Chargement...</p>;

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
                    src={product.image || '/path/to/default-image.jpg'}
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

                    {/* Sélecteur de quantité */}
                    <div className="flex items-center mb-6">
                        <label htmlFor="quantity" className="mr-4 text-gray-300 text-lg">Quantité :</label>

                        <div className="flex items-center border border-gray-600 rounded-md overflow-hidden">
                            {/* Bouton moins */}
                            <button
                                onClick={() => setQuantity(quantity > 1 ? quantity - 1 : 1)}
                                className="px-3 py-2 bg-gray-700 text-white hover:bg-gray-600 focus:outline-none"
                            >
                                -
                            </button>

                            {/* Champ de quantité sans flèches */}
                            <input
                                id="quantity"
                                type="number"
                                min="1"
                                value={quantity}
                                onChange={handleQuantityChange}
                                className="w-16 text-center p-2 bg-gray-700 text-white focus:outline-none"
                                style={{
                                    appearance: 'none',  /* Suppression des flèches */
                                    MozAppearance: 'textfield',  /* Suppression pour Firefox */
                                    WebkitAppearance: 'none', /* Suppression pour Chrome/Safari */
                                }}
                            />

                            {/* Bouton plus */}
                            <button
                                onClick={() => setQuantity(quantity + 1)}
                                className="px-3 py-2 bg-gray-700 text-white hover:bg-gray-600 focus:outline-none"
                            >
                                +
                            </button>
                        </div>
                    </div>


                    <button onClick={handleAddToCart}
                            className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-800">
                        Ajouter au panier
                    </button>

                    {/* Section des icônes de paiement */}
                    <div className="flex justify-left mt-8 space-x-6">
                        <FaPaypal className="text-5xl text-blue-600"/>
                        <FaCcVisa className="text-5xl text-blue-500"/>
                        <FaCcMastercard className="text-5xl text-red-600"/>
                        <FaApplePay className="text-5xl text-white"/>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductDetaille;
