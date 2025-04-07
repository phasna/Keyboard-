import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { MdOutlineDelete } from "react-icons/md";
const CartItem = ({ item, onRemove, onUpdateQuantity }) => {
    return (
        <div className="bg-gray-800 rounded-lg p-4 sm:p-6 shadow-md hover:shadow-xl transition duration-300 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center space-x-4 w-full sm:w-auto">
                <img
                    src={item.image}
                    alt={item.title}
                    className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 object-contain rounded-lg"
                />
                <div className="flex-1">
                    <h3 className="text-base sm:text-lg md:text-2xl font-bold text-white line-clamp-2">{item.title}</h3>
                    <p className="text-sm sm:text-base md:text-lg font-semibold text-gray-400">${item.price}</p>
                </div>
            </div>
            <div className="flex items-center space-x-2 sm:space-x-4 w-full sm:w-auto justify-between sm:justify-start">
                <button
                    onClick={() => onUpdateQuantity(item, -1)}
                    className="px-2 py-1 sm:px-3 sm:py-2 bg-transparent border-2 border-white text-white rounded-md transition hover:bg-red-700 text-sm sm:text-base"
                >
                    -
                </button>
                <p className="text-base sm:text-lg md:text-xl text-white">{item.quantity}</p>
                <button
                    onClick={() => onUpdateQuantity(item, 1)}
                    className="px-2 py-1 sm:px-3 sm:py-2 bg-transparent border-2 border-white text-white rounded-md transition hover:bg-green-700 text-sm sm:text-base"
                >
                    +
                </button>
                <button
                    onClick={() => onRemove(item)}
                    className="px-3 py-1 sm:px-2 sm:py-2 bg-red-600 text-white rounded-md transition hover:bg-red-700 sm:text-base"
                >
                     <MdOutlineDelete className={"text-3xl"}/>
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

const CartPage = ({ goToNextStep }) => {
    const [cartItems, setCartItems] = useState([]);

    useEffect(() => {
        const storedCart = JSON.parse(localStorage.getItem('cart')) || [];
        if (Array.isArray(storedCart)) {
            setCartItems(storedCart);
        } else {
            localStorage.setItem('cart', JSON.stringify([]));
            setCartItems([]);
        }
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
        <div className="bg-gradient-to-r from-gray-800 via-black to-gray-900 min-h-screen flex flex-col items-center py-6 sm:py-8 md:py-10 lg:py-12">
            <h1 className="text-3xl sm:text-3xl md:text-4xl lg:text-5xl font-light text-white mb-4 sm:mb-6 md:mb-8 lg:mb-10 lg:mt-28 mt-5">Mon Panier</h1>
            <div className="w-full max-w-7xl px-4 sm:px-8 lg:px-8">
                <div className="flex flex-col gap-6">
                    <div className="bg-gray-700 bg-opacity-70 p-4 sm:p-6 rounded-lg shadow-lg">
                        <div className="flex justify-end mb-4">
                            <button
                                onClick={handleClearCart}
                                className="w-full sm:w-auto px-4 py-2 bg-red-600 text-white rounded-lg transition hover:bg-red-700 text-sm sm:text-base"
                            >
                                Vider le panier
                            </button>
                        </div>
                        {cartItems.length > 0 ? (
                            <div className="space-y-4 sm:space-y-6">
                                {cartItems.map(item => (
                                    <CartItem
                                        key={item.id}
                                        item={item}
                                        onRemove={handleRemoveItem}
                                        onUpdateQuantity={handleUpdateQuantity}
                                    />
                                ))}
                            </div>
                        ) : (
                            <p className="text-center text-gray-300 text-sm sm:text-base">Votre panier est vide</p>
                        )}
                    </div>

                    {cartItems.length > 0 && (
                        <div className="bg-gray-700 bg-opacity-70 p-4 sm:p-6 rounded-lg text-white shadow-lg">
                            <h2 className="text-xl sm:text-2xl md:text-3xl font-bold mb-4 sm:mb-6">Résumé du panier</h2>
                            <div className="space-y-3 sm:space-y-4 mb-6">
                                {cartItems.map(item => (
                                    <div key={item.id} className="flex justify-between items-center border-b pb-2 text-sm sm:text-base">
                                        <div>
                                            <h3 className="font-semibold line-clamp-1">{item.title}</h3>
                                            <p>Quantité: {item.quantity}</p>
                                        </div>
                                        <p className="font-medium">${(item.price * item.quantity).toFixed(2)}</p>
                                    </div>
                                ))}
                            </div>
                            <div>
                                <h3 className="text-lg sm:text-xl md:text-2xl font-bold mb-4">Total:
                                    ${getTotalPrice().toFixed(2)}</h3>
                                <div className={"flex justify-end items-end flex-col"}>
                                    <button
                                        onClick={() => goToNextStep(2, cartItems)}
                                        className="w-1/4 lg:py-4 sm:py-4 bg-transparent border-2 border-white hover:text-black rounded-2xl transition hover:bg-yellow-400 text-sm sm:text-base"
                                    >
                                        Passer à la livraison
                                    </button>
                                </div>

                                </div>
                            </div>
                            )}
                        </div>
                        </div>
                        </div>
                        );
};

export default CartPage;