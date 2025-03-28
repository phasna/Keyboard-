import React from 'react';

const Summary = ({ cartData = [], deliveryData = {}, paymentData = {} }) => {
    // Calcul du prix total
    const totalPrice = cartData.reduce((acc, { quantity, price }) => acc + quantity * price, 0);

    const renderCartItems = () => {
        if (cartData.length === 0) {
            return <p className="text-sm text-gray-400">Aucun article dans le panier</p>;
        }
        return (
            <ul className="text-lg font-light text-gray-200 space-y-2">
                {cartData.map((item, index) => (
                    <li key={index} className="border-b border-gray-700 pb-2">
                        <span className="font-semibold">{item.title}</span> - {item.quantity} x {item.price} €
                    </li>
                ))}
            </ul>
        );
    };

    const renderDeliveryInfo = () => {
        if (!deliveryData.address) {
            return <p className="text-sm text-gray-400">Aucune information de livraison</p>;
        }
        return (
            <div className="text-lg font-light text-gray-200">
                <p><span className="font-semibold">Nom :</span> {deliveryData.firstName}</p>
                <p><span className="font-semibold">prénom :</span> {deliveryData.lastName}</p>
                <p><span className="font-semibold">Téléphone :</span> {deliveryData.phone}</p>
                <p><span className="font-semibold">Email :</span> {deliveryData.email}</p>
                <p><span className="font-semibold">Adresse :</span> {deliveryData.address}</p>
                <p><span className="font-semibold">Ville :</span> {deliveryData.city}</p>
                <p><span className="font-semibold">Code postal :</span> {deliveryData.postalCode}</p>
                <p><span className="font-semibold">Pays :</span> {deliveryData.country}</p>
            </div>
        );
    };

    const renderPaymentInfo = () => {
        if (!paymentData.name) {
            return <p className="text-lg font-light text-gray-400">Aucune information de paiement</p>;
        }
        return (
            <div className="text-lg font-light text-gray-200">
                <p><span className="font-semibold">Nom sur la carte :</span> {paymentData.name}</p>
                <p><span className="font-semibold">Méthode :</span> {paymentData.paymentMethod}</p>
            </div>
        );
    };

    return (
        <div className="bg-gradient-to-r from-indigo-900 via-gray-900 to-black min-h-screen flex flex-col items-center justify-center py-8 sm:py-10 lg:py-12 xl:mt-10">
            <div className="bg-white/40 p-8 rounded-lg shadow-xl w-full max-w-4xl">
                <h2 className="text-2xl font-bold mb-6 text-center text-white">Résumé de la commande</h2>

                {/* Section Panier */}
                <div className="mb-4">
                    <h3 className="text-2xl font-medium text-white">Panier</h3>
                    {renderCartItems()}
                </div>

                {/* Section Livraison */}
                <div className="mb-4">
                    <h3 className="text-2xl font-medium text-white">Livraison</h3>
                    {renderDeliveryInfo()}
                </div>

                {/* Section Paiement */}
                <div className="mb-4">
                    <h3 className="text-2xl font-medium text-white">Paiement</h3>
                    {renderPaymentInfo()}
                </div>

                {/* Section Prix Total */}
                <div className="mt-6 border-t border-gray-600 pt-4">
                    <h3 className="text-xl font-semibold text-white text-center">
                        Total : <span className="text-green-400">{totalPrice.toFixed(2)} €</span>
                    </h3>
                </div>

                {/* Bouton Imprimer */}
                <button
                    onClick={() => window.print()}
                    className="w-full bg-green-500 text-white py-3 px-4 rounded-lg mt-4 hover:bg-green-600"
                >
                    Imprimer le résumé
                </button>
            </div>
        </div>
    );
};

export default Summary;
