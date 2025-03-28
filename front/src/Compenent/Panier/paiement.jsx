import React, { useState } from 'react';
import Swal from 'sweetalert2';
import { FaPaypal, FaCcVisa, FaCcMastercard, FaApplePay } from 'react-icons/fa';

const PaymentPage = ({ goToNextStep }) => {
    const [formData, setFormData] = useState({
        nameCard: '',
        cardNumber: '',
        expirationDate: '',
        cvv: '',
        paymentMethod: '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!formData.paymentMethod) {
            Swal.fire({
                title: 'Erreur!',
                text: 'Veuillez sélectionner un mode de paiement.',
                icon: 'error',
                confirmButtonText: 'OK',
            });
            return;
        }

        Swal.fire({
            title: 'Paiement réussi!',
            text: 'Votre paiement a été effectué avec succès.',
            icon: 'success',
            confirmButtonText: 'OK',
        }).then(() => {
            localStorage.clear();
            goToNextStep(4, formData); // 🔥 Passage à l'étape 4 avec les données de paiement
        });
    };

    const selectPaymentMethod = (method) => {
        setFormData({ ...formData, paymentMethod: method });
    };

    return (
        <div className="bg-gradient-to-r from-indigo-900 via-gray-900 to-black min-h-screen flex flex-col items-center justify-center py-8 sm:py-10 lg:py-12 xl:mt-5">
            <div className="bg-white/40 p-8 rounded-lg shadow-md w-full max-w-xl">
                <h2 className="text-2xl font-bold mb-6 text-center text-white">Page de Paiement</h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label className="block text-sm font-semibold text-gray-300">Nom</label>
                        <input
                            type="text"
                            name="nameCard"
                            value={formData.nameCard}
                            onChange={handleChange}
                            className="w-full px-4 py-2 mt-2 border border-gray-300 rounded-lg"
                            placeholder="Entrez votre nom"
                            required
                        />
                    </div>

                    <div className="mb-4">
                        <label className="block text-sm font-semibold text-gray-300">Numéro de Carte</label>
                        <input
                            type="text"
                            name="cardNumber"
                            value={formData.cardNumber}
                            onChange={handleChange}
                            className="w-full px-4 py-2 mt-2 border border-gray-300 rounded-lg"
                            placeholder="Entrez le numéro de votre carte"
                            required
                        />
                    </div>

                    <div className="mb-4 flex space-x-4">
                        <div className="w-1/2">
                            <label className="block text-sm font-semibold text-gray-300">Date d'Expiration</label>
                            <input
                                type="text"
                                name="expirationDate"
                                value={formData.expirationDate}
                                onChange={handleChange}
                                className="w-full px-4 py-2 mt-2 border border-gray-300 rounded-lg"
                                placeholder="MM/AA"
                                required
                            />
                        </div>
                        <div className="w-1/2">
                            <label className="block text-sm font-semibold text-gray-300">CVV</label>
                            <input
                                type="text"
                                name="cvv"
                                value={formData.cvv}
                                onChange={handleChange}
                                className="w-full px-4 py-2 mt-2 border border-gray-300 rounded-lg"
                                placeholder="Entrez le CVV"
                                required
                            />
                        </div>
                    </div>

                    <p className="text-gray-300 mb-5">Sélectionnez un mode de paiement:</p>
                    <div className="mb-4 flex justify-center space-x-4">
                        {[
                            { method: 'PayPal', icon: FaPaypal, color: 'bg-blue-500' },
                            { method: 'Visa', icon: FaCcVisa, color: 'bg-blue-500' },
                            { method: 'MasterCard', icon: FaCcMastercard, color: 'bg-red-600' },
                            { method: 'Apple Pay', icon: FaApplePay, color: 'bg-black' },
                        ].map(({ method, icon: Icon, color }) => (
                            <button
                                key={method}
                                type="button"
                                onClick={() => selectPaymentMethod(method)}
                                className={`p-2 rounded-md ${formData.paymentMethod === method ? color : 'bg-white'} shadow-md`}
                            >
                                <Icon size={40} className={formData.paymentMethod === method ? 'text-white' : 'text-gray-800'} />
                            </button>
                        ))}
                    </div>

                    <button type="submit" className="w-full bg-blue-500 text-white py-3 px-4 rounded-lg mt-4 hover:bg-blue-600">
                        Finaliser le paiement
                    </button>
                </form>
            </div>
        </div>
    );
};

export default PaymentPage;
