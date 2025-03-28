import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

const CartItem = ({ item, onRemove, onUpdateQuantity }) => {
    return (
        <div className="bg-gray-800 rounded-lg p-5 sm:p-6 shadow-md hover:shadow-xl transition duration-300 flex items-center justify-between ">
            <div className="flex items-center space-x-4 sm:space-x-6 ">
                <img src={item.image} alt={item.title} className="w-20 h-20 sm:w-24 sm:h-24 object-contain rounded-lg" />
                <div>
                    <h3 className="text-lg sm:text-2xl font-bold text-white">{item.title}</h3>
                    <p className="text-sm sm:text-lg font-semibold text-gray-400">${item.price}</p>
                </div>
            </div>
            <div className="flex items-center space-x-4 sm:space-x-6 ">
                <button onClick={() => onUpdateQuantity(item, -1)} className="px-3 py-2 bg-red-600 text-white rounded-md transition hover:bg-red-700">-</button>
                <p className="text-lg sm:text-xl text-white">{item.quantity}</p>
                <button onClick={() => onUpdateQuantity(item, 1)} className="px-3 py-2 bg-green-600 text-white rounded-md transition hover:bg-green-700">+</button>
                <button onClick={() => onRemove(item)} className="px-4 py-2 bg-red-500 text-white rounded-md transition hover:bg-red-700">Supprimer</button>
            </div>
        </div>
    );
};

CartItem.propTypes = {
    item: PropTypes.object.isRequired,
    onRemove: PropTypes.func.isRequired,
    onUpdateQuantity: PropTypes.func.isRequired,
};

const CartPage = ({ goToNextStep }) => {
    const [cartItems, setCartItems] = useState([]);

    useEffect(() => {
        const storedCart = JSON.parse(localStorage.getItem('cart')) || [];
        setCartItems(storedCart);
    }, []);

    useEffect(() => {
        console.log("Panier mis à jour :", cartItems);
    }, [cartItems]);

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
        <div className="bg-gradient-to-r from-gray-800 via-black to-gray-900 min-h-screen flex flex-col items-center py-8 sm:py-10 lg:py-12 xl:mt-28">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white mb-6 sm:mb-10">Mon Panier</h1>
            <div className="w-full flex flex-col sm:flex-row gap-6 sm:gap-8 p-6">
                <div className="sm:w-1/2 bg-gray-700 bg-opacity-70 p-6 rounded-lg flex flex-col shadow-lg">
                    <div className="flex justify-end">
                        <button onClick={handleClearCart} className="w-1/4 py-3 bg-red-600 text-white rounded-lg mb-6 transition hover:bg-red-700">
                            Vider le panier
                        </button>
                    </div>
                    {cartItems.length > 0 ? (
                        <div className="space-y-5 sm:space-y-6 overflow-auto flex-1">
                            {cartItems.map(item => (
                                <CartItem key={item.id} item={item} onRemove={handleRemoveItem} onUpdateQuantity={handleUpdateQuantity} />
                            ))}
                        </div>
                    ) : (
                        <p className="text-center text-gray-300">Votre panier est vide</p>
                    )}
                </div>

                {cartItems.length > 0 && (
                    <div className="sm:w-1/2 hidden bg-gray-700 bg-opacity-70 p-6 rounded-lg text-white text-sm sm:text-lg h-full lg:flex flex-col shadow-lg">
                        <h2 className="text-2xl sm:text-3xl font-bold mb-6">Résumé du panier</h2>
                        <div className="space-y-3 sm:space-y-4 overflow-auto flex-1">
                            {cartItems.map(item => (
                                <div key={item.id} className="flex justify-between items-center border-b pb-2">
                                    <div>
                                        <h3 className="text-sm sm:text-lg font-semibold">{item.title}</h3>
                                        <p className="text-sm sm:text-base">Quantité: {item.quantity}</p>
                                    </div>
                                    <p className="text-sm sm:text-lg font-medium">${(item.price * item.quantity).toFixed(2)}</p>
                                </div>
                            ))}
                        </div>
                        <div className="mt-6 sm:mt-8">
                            <h3 className="text-xl sm:text-2xl font-bold">Total: ${getTotalPrice().toFixed(2)}</h3>
                            <button
                                onClick={() => goToNextStep(2, cartItems)}
                                className="mt-4 py-3 w-full bg-green-500 rounded-lg transition hover:bg-green-700">
                                Passer à la livraison
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default CartPage;
