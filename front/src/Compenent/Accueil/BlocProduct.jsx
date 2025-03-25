import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import axios from "axios";

// Composant ProductCard (chaque produit)
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
        <div className="bg-zinc-500 bg-opacity-60 shadow-md rounded-lg overflow-hidden transform transition-transform hover:scale-105 hover:shadow-lg p-10">
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
        </div>
    );
};

ProductCard.propTypes = {
    product: PropTypes.object.isRequired,
    onAddToCart: PropTypes.func.isRequired
};

// Composant du popup (modal en dehors des produits)
const GlobalPopup = ({ show, onClose }) => {
    if (!show) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
            <div className="bg-white p-8 rounded-lg shadow-lg max-w-sm w-full">
                <h2 className="text-2xl font-semibold text-green-600 mb-4">Produit ajouté au panier !</h2>
                <p className="text-gray-700 mb-4">Votre produit a été ajouté avec succès.</p>
                <div className="flex justify-center">
                    <button
                        onClick={onClose}
                        className="py-2 px-6 bg-green-600 text-white rounded-md hover:bg-green-800 transition duration-300"
                    >
                        Fermer
                    </button>
                </div>
            </div>
        </div>
    );
};

GlobalPopup.propTypes = {
    show: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired
};

// Composant principal ProductGrid (affichage des produits)
const ProductGrid = () => {
    const [products, setProducts] = useState([]);
    const [showModal, setShowModal] = useState(false);

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

        // Afficher le popup
        setShowModal(true);

        // Masquer le popup après 3 secondes
        setTimeout(() => {
            setShowModal(false);
        }, 500);
    };

    return (
        <div className="px-10 py-10 container mx-auto md:mb-40">
            <h1 className="text-5xl font-light text-center text-green-400 mb-20 bg-gradient-to-r from-white via-gray-400 to-gray-600 text-transparent bg-clip-text">
                NOS TOP DES PRODUITS !
            </h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                {products.length > 0 ? (
                    products.slice(0, 4).map((product) => (
                        <ProductCard key={product.id} product={product} onAddToCart={handleAddToCart} />
                    ))
                ) : (
                    <p className="text-white text-center">No products available</p>
                )}
            </div>

            {/* Popup affiché en dehors des produits */}
            <GlobalPopup show={showModal} onClose={() => setShowModal(false)} />
        </div>
    );
};

export default ProductGrid;
