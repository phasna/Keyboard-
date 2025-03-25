import { useState } from 'react';
import { FaPaypal, FaCcVisa, FaCcMastercard, FaApplePay } from 'react-icons/fa';
import Swal from 'sweetalert2';

const PaymentPage = () => {
    const [selectedPaymentMethod, setSelectedPaymentMethod] = useState('');
    const [formData, setFormData] = useState({
        cardholderName: '',
        cardNumber: '',
        expirationDate: '',
        cvv: '',
    });
    const [formErrors, setFormErrors] = useState({
        cardholderName: false,
        cardNumber: false,
        expirationDate: false,
        cvv: false,
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));

        // Clear error on input change
        setFormErrors((prevErrors) => ({
            ...prevErrors,
            [name]: value === '',
        }));
    };

    const handlePaymentOptionChange = (method) => {
        setSelectedPaymentMethod(method);
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        // Validate all fields
        const newErrors = {
            cardholderName: formData.cardholderName === '',
            cardNumber: formData.cardNumber === '',
            expirationDate: formData.expirationDate === '',
            cvv: formData.cvv === '',
        };
        setFormErrors(newErrors);

        // Check if there are any errors
        if (Object.values(newErrors).includes(true) || !selectedPaymentMethod) {
            Swal.fire({
                icon: 'error',
                title: 'Erreur',
                text: 'Veuillez remplir tous les champs et sélectionner un mode de paiement.',
            });
            return;
        }

        // Proceed with form submission (e.g., API call or next step)
        Swal.fire({
            icon: 'success',
            title: 'Succès',
            text: 'Paiement effectué avec succès!',
        });
    };

    return (
        <div className="bg-gradient-to-r from-gray-800 via-black to-gray-900 min-h-screen flex flex-col items-center xl:mt-32">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white mb-6 sm:mb-10 text-center xl:mt-20">Informations de Paiement</h1>

            <div className="w-full sm:w-1/2 bg-gray-700 bg-opacity-80 p-10 rounded-lg shadow-lg">
                {/* Form Inputs */}
                <form onSubmit={handleSubmit}>
                    <div className="space-y-4">
                        <label className="text-white text-lg font-semibold">Nom sur la carte</label>
                        <input
                            type="text"
                            name="cardholderName"
                            value={formData.cardholderName}
                            onChange={handleInputChange}
                            className={`w-full p-3 rounded-lg bg-gray-800 text-white focus:outline-none focus:ring-2 ${formErrors.cardholderName ? 'border-2 border-red-500' : 'border-transparent'}`}
                            placeholder="John Doe"
                        />
                        {formErrors.cardholderName && <p className="text-red-400 text-sm">Le nom sur la carte est obligatoire</p>}

                        <label className="text-white text-lg font-semibold">Numéro de carte</label>
                        <input
                            type="text"
                            name="cardNumber"
                            value={formData.cardNumber}
                            onChange={handleInputChange}
                            className={`w-full p-3 rounded-lg bg-gray-800 text-white focus:outline-none focus:ring-2 ${formErrors.cardNumber ? 'border-2 border-red-500' : 'border-transparent'}`}
                            placeholder="1234 5678 1234 5678"
                        />
                        {formErrors.cardNumber && <p className="text-red-400 text-sm">Le numéro de carte est obligatoire</p>}

                        <div className="flex space-x-4">
                            <div className="w-1/2">
                                <label className="text-white text-lg font-semibold">Date d'expiration</label>
                                <input
                                    type="text"
                                    name="expirationDate"
                                    value={formData.expirationDate}
                                    onChange={handleInputChange}
                                    className={`w-full p-3 rounded-lg bg-gray-800 text-white focus:outline-none focus:ring-2 ${formErrors.expirationDate ? 'border-2 border-red-500' : 'border-transparent'}`}
                                    placeholder="MM/YY"
                                />
                                {formErrors.expirationDate && <p className="text-red-400 text-sm">La date d'expiration est obligatoire</p>}
                            </div>
                            <div className="w-1/2">
                                <label className="text-white text-lg font-semibold">CVV</label>
                                <input
                                    type="text"
                                    name="cvv"
                                    value={formData.cvv}
                                    onChange={handleInputChange}
                                    className={`w-full p-3 rounded-lg bg-gray-800 text-white focus:outline-none focus:ring-2 ${formErrors.cvv ? 'border-2 border-red-500' : 'border-transparent'}`}
                                    placeholder="123"
                                />
                                {formErrors.cvv && <p className="text-red-400 text-sm">Le CVV est obligatoire</p>}
                            </div>
                        </div>
                    </div>

                    {/* Payment Method Selection */}
                    <div className="space-y-4">
                        <p className="text-white text-lg font-semibold mt-5 text-center">Choisir un mode de paiement</p>
                        <div className="flex space-x-10 justify-center">
                            <button
                                onClick={() => handlePaymentOptionChange('paypal')}
                                type="button"
                                className={`p-4 rounded-lg hover:bg-gray-500 ${selectedPaymentMethod === 'paypal' ? 'bg-blue-600' : 'bg-gray-600'} text-white flex items-center justify-center`}
                            >
                                <FaPaypal className="text-2xl" />
                            </button>
                            <button
                                onClick={() => handlePaymentOptionChange('visa')}
                                type="button"
                                className={`p-4 rounded-lg hover:bg-gray-500 ${selectedPaymentMethod === 'visa' ? 'bg-blue-700' : 'bg-gray-600'} text-white flex items-center justify-center`}
                            >
                                <FaCcVisa className="text-2xl" />
                            </button>
                            <button
                                onClick={() => handlePaymentOptionChange('mastercard')}
                                type="button"
                                className={`p-4 rounded-lg hover:bg-gray-500 ${selectedPaymentMethod === 'mastercard' ? 'bg-red-600' : 'bg-gray-600'} text-white flex items-center justify-center`}
                            >
                                <FaCcMastercard className="text-2xl" />
                            </button>
                            <button
                                onClick={() => handlePaymentOptionChange('applepay')}
                                type="button"
                                className={`p-4 rounded-lg hover:bg-gray-500 ${selectedPaymentMethod === 'applepay' ? 'bg-black' : 'bg-gray-600'} text-white flex items-center justify-center`}
                            >
                                <FaApplePay className="text-2xl" />
                            </button>
                        </div>
                    </div>

                    {/* Finalisation Button */}
                    <button
                        disabled={!selectedPaymentMethod || Object.values(formErrors).includes(true)}
                        type="submit"
                        className={`mt-6 py-3 w-full ${!selectedPaymentMethod || Object.values(formErrors).includes(true) ? 'bg-gray-500' : 'bg-green-600'} text-white rounded-lg font-semibold transition-all duration-300 hover:bg-green-700 disabled:opacity-50`}
                    >
                        Finaliser l'achat
                    </button>
                </form>
            </div>
        </div>
    );
};

export default PaymentPage;