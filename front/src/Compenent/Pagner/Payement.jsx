import React, { useState } from "react";
import { motion } from "framer-motion";

const Checkout = () => {
    const [step, setStep] = useState(1);

    const nextStep = () => setStep((prev) => prev + 1);
    const prevStep = () => setStep((prev) => prev - 1);

    return (
        <div className="min-h-screen flex justify-center items-center bg-gray-100 p-4">
            <motion.div
                key={step}
                initial={{ opacity: 0, x: 100 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -100 }}
                className="bg-white p-8 rounded-lg shadow-lg w-full max-w-lg"
            >
                {step === 1 && <CartStep nextStep={nextStep} />}
                {step === 2 && <PaymentStep nextStep={nextStep} prevStep={prevStep} />}
                {step === 3 && <DeliveryStep prevStep={prevStep} />}
            </motion.div>
        </div>
    );
};

const CartStep = ({ nextStep }) => (
    <div>
        <h2 className="text-xl font-semibold mb-4">🛒 Votre Panier</h2>
        <p>Produit 1 - 20€</p>
        <p>Produit 2 - 15€</p>
        <p className="font-bold mt-4">Total: 35€</p>
        <button onClick={nextStep} className="w-full bg-blue-500 text-white py-2 rounded-lg mt-4">Suivant</button>
    </div>
);

const PaymentStep = ({ nextStep, prevStep }) => (
    <div>
        <h2 className="text-xl font-semibold mb-4">💳 Paiement</h2>
        <input type="text" placeholder="Numéro de carte" className="w-full border p-2 rounded mb-2" />
        <input type="text" placeholder="Date d'expiration" className="w-full border p-2 rounded mb-2" />
        <input type="text" placeholder="CVV" className="w-full border p-2 rounded mb-4" />
        <div className="flex justify-between">
            <button onClick={prevStep} className="bg-gray-400 text-white py-2 px-4 rounded">Précédent</button>
            <button onClick={nextStep} className="bg-blue-500 text-white py-2 px-4 rounded">Suivant</button>
        </div>
    </div>
);

const DeliveryStep = ({ prevStep }) => (
    <div>
        <h2 className="text-xl font-semibold mb-4">📦 Livraison</h2>
        <select className="w-full border p-2 rounded mb-4">
            <option>Standard - 5€</option>
            <option>Express - 10€</option>
        </select>
        <div className="flex justify-between">
            <button onClick={prevStep} className="bg-gray-400 text-white py-2 px-4 rounded">Précédent</button>
            <button className="bg-green-500 text-white py-2 px-4 rounded">Confirmer</button>
        </div>
    </div>
);

export default Checkout;
