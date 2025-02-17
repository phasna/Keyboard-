import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

// Composant CartItem pour afficher chaque produit dans le panier
const CartItem = ({ item, onRemove, onUpdateQuantity }) => {
    return (
        <div className="bg-zinc-500 bg-opacity-60 shadow-md rounded-lg overflow-hidden p-4 mb-4 flex items-center justify-between space-x-10">
            <div className="flex items-center space-x-6">
                <img src={item.image} alt={item.title} className="w-20 h-20 object-cover rounded" />
                <div>
                    <h3 className="text-xl font-semibold text-white">{item.title}</h3>
                    <p className="text-lg font-medium text-white">${item.price}</p>
                </div>
            </div>

            <div className="flex flex-col md:flex-row items-center justify-between space-y-6 md:space-y-0 md:space-x-10">
                <div className="text-lg font-medium text-white">
                    ${item.price}
                </div>

                <div className="flex items-center space-x-4">
                    <button
                        onClick={() => onUpdateQuantity(item, -1)}
                        className="py-1 px-2 bg-gray-500 text-white rounded-md hover:bg-gray-600 transition-all"
                    >
                        -
                    </button>
                    <p className="text-white">{item.quantity}</p>
                    <button
                        onClick={() => onUpdateQuantity(item, 1)}
                        className="py-1 px-2 bg-gray-500 text-white rounded-md hover:bg-gray-600 transition-all"
                    >
                        +
                    </button>
                </div>

                <button
                    onClick={() => onRemove(item)}
                    className="py-2 px-4 bg-red-500 text-white rounded-md hover:bg-red-700 transition-all duration-200 transform hover:scale-105"
                >
                    Remove
                </button>
            </div>
        </div>
    );
};

CartItem.propTypes = {
    item: PropTypes.object.isRequired,
    onRemove: PropTypes.func.isRequired,
    onUpdateQuantity: PropTypes.func.isRequired,
};

// Composant CartPage pour afficher tous les produits du panier
const CartPage = () => {
    const [cartItems, setCartItems] = useState([]);

    useEffect(() => {
        const storedCart = JSON.parse(localStorage.getItem('cart')) || [];
        setCartItems(storedCart);
    }, []);

    const handleRemoveItem = (itemToRemove) => {
        const updatedCart = cartItems.filter(item => item.id !== itemToRemove.id);
        setCartItems(updatedCart);
        localStorage.setItem('cart', JSON.stringify(updatedCart));
    };

    const handleUpdateQuantity = (itemToUpdate, change) => {
        const updatedCart = cartItems.map(item => {
            if (item.id === itemToUpdate.id) {
                const updatedItem = { ...item, quantity: item.quantity + change };
                return updatedItem.quantity > 0 ? updatedItem : null;
            }
            return item;
        }).filter(item => item !== null);

        setCartItems(updatedCart);
        localStorage.setItem('cart', JSON.stringify(updatedCart));
    };

    const handleClearCart = () => {
        setCartItems([]);
        localStorage.removeItem('cart');
    };

    const getTotalPrice = () => {
        return cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
    };

    return (
        <div className={`flex justify-center items-center flex-col`}>
            <h1 className="text-5xl text-ceneter font-bold text-white mt-44 mb-10">MON PANIER</h1>
        <div className="px-10 py-10 container mx-auto flex flex-col lg:flex-row gap-10">
            {/* Section du panier */}
            <div className="lg:w-1/2 bg-white bg-opacity-25 shadow-lg rounded-lg p-6">
                <div className="flex justify-between mb-6">
                    <button
                        onClick={handleClearCart}
                        className="py-2 px-4 bg-red-500 text-white rounded-md hover:bg-red-700 transition"
                    >
                        Vider le panier
                    </button>
                </div>

                <div className="space-y-8">
                    {cartItems.length > 0 ? (
                        cartItems.map(item => (
                            <CartItem
                                key={item.id}
                                item={item}
                                onRemove={handleRemoveItem}
                                onUpdateQuantity={handleUpdateQuantity}
                            />
                        ))
                    ) : (
                        <p className="text-white text-center">Votre panier est vide</p>
                    )}
                </div>
            </div>

            {/* Section Résumé */}
            {cartItems.length > 0 && (
                <div className="lg:w-1/2 bg-white bg-opacity-25 shadow-lg rounded-lg p-6">
                    <h2 className="text-3xl font-bold text-white mb-6">Résumé du panier</h2>

                    <div className="space-y-4">
                        {cartItems.map(item => (
                            <div key={item.id} className="flex justify-between items-center border-b pb-2">
                                <div>
                                    <h3 className="text-lg font-semibold text-white">{item.title}</h3>
                                    <p className="text-white">Quantité: {item.quantity}</p>
                                </div>
                                <p className="text-lg font-medium text-white">${(item.price * item.quantity).toFixed(2)}</p>
                            </div>
                        ))}
                    </div>

                    <div className="mt-6">
                        <h3 className="text-2xl font-bold text-white">Total: ${getTotalPrice().toFixed(2)}</h3>
                        <button className="mt-4 py-2 px-4 w-full bg-green-500 text-white rounded-md hover:bg-green-700">
                            Passer à la caisse
                        </button>
                    </div>
                </div>
            )}
        </div>
        </div>
    );
};

export default CartPage;
