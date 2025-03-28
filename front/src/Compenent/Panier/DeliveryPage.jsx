import { useState } from "react";
import { FaTruck } from "react-icons/fa";

const DeliveryPage = ({ goToNextStep }) => {
    const [selectedOption, setSelectedOption] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [phone, setPhone] = useState("");
    const [email, setEmail] = useState("");
    const [address, setAddress] = useState("");
    const [city, setCity] = useState("");
    const [postalCode, setPostalCode] = useState("");
    const [country, setCountry] = useState("");

    const handleSubmit = () => {
        const deliveryData = {
            nom: firstName,
            prenom: lastName,
            telephone: phone,
            email: email,
            adresse: address,
            mode_livraison: selectedOption,
            pays: country,
            ville: city,
            code_postal: postalCode,
        };;
        goToNextStep(3, deliveryData);
    };

    return (
        <div className="min-h-screen bg-gradient-to-r from-indigo-900 via-gray-900 to-black flex items-center justify-center py-12 px-4">
            <div className="w-full max-w-4xl bg-white/10 p-8 rounded-xl shadow-2xl backdrop-blur-lg mt-20 border border-gray-700">
                {/* Titre */}
                <h1 className="text-3xl font-bold text-white text-center mb-8">
                    Choisissez votre mode de livraison
                </h1>

                {/* Conteneur principal */}
                <div className="space-y-10">
                    {/* Options de livraison */}
                    <div className="space-y-4">
                        {[
                            { type: "standard", label: "Livraison Standard (5-7 jours)", price: "5.99€", color: "text-green-400" },
                            { type: "express", label: "Livraison Express (2-3 jours)", price: "15.99€", color: "text-yellow-400" },
                        ].map((option) => (
                            <div
                                key={option.type}
                                className={`flex items-center p-5 rounded-xl border-2 cursor-pointer transition-all duration-200 shadow-md 
                                    ${
                                    selectedOption === option.type
                                        ? "border-blue-500 bg-blue-600/20 backdrop-blur-sm"
                                        : "border-gray-500 hover:bg-gray-800/30"
                                }`}
                                onClick={() => setSelectedOption(option.type)}
                            >
                                <FaTruck className={`text-2xl ${option.color} mr-4`} />
                                <div className="flex-1">
                                    <label className="text-lg font-medium text-white cursor-pointer flex items-center">
                                        <input
                                            type="radio"
                                            value={option.type}
                                            checked={selectedOption === option.type}
                                            onChange={(e) => setSelectedOption(e.target.value)}
                                            className="hidden"
                                        />
                                        <span
                                            className={`w-5 h-5 mr-3 flex items-center justify-center rounded-full border-2 ${
                                                selectedOption === option.type
                                                    ? "border-blue-500 bg-blue-500"
                                                    : "border-gray-500"
                                            }`}
                                        >
                                            {selectedOption === option.type && <span className="w-2.5 h-2.5 bg-white rounded-full"></span>}
                                        </span>
                                        {option.label}
                                    </label>
                                    <p className="text-sm font-semibold text-white">{option.price}</p>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Formulaire d'adresse */}
                    <div className="space-y-10">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {[
                                { label: "Prénom", value: firstName, setter: setFirstName, placeholder: "Entrez votre prénom" },
                                { label: "Nom", value: lastName, setter: setLastName, placeholder: "Entrez votre nom" },
                                { label: "Téléphone", value: phone, setter: setPhone, placeholder: "Entrez votre numéro" },
                                { label: "Email", value: email, setter: setEmail, placeholder: "Entrez votre email", type: "email" },
                                { label: "Adresse", value: address, setter: setAddress, placeholder: "Entrez votre adresse" },
                                { label: "Ville", value: city, setter: setCity, placeholder: "Entrez la ville" },
                                { label: "Code Postal", value: postalCode, setter: setPostalCode, placeholder: "Entrez le code postal" },
                                { label: "Pays", value: country, setter: setCountry, placeholder: "Entrez le pays" },
                            ].map((field, index) => (
                                <div key={index}>
                                    <label className="block text-lg font-medium text-white mb-1">
                                        {field.label}
                                    </label>
                                    <input
                                        type={field.type || "text"}
                                        value={field.value}
                                        onChange={(e) => field.setter(e.target.value)}
                                        placeholder={field.placeholder}
                                        className="w-full p-3 bg-gray-800/50 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    />
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Bouton de soumission */}
                    <button
                        onClick={handleSubmit}
                        disabled={
                            !selectedOption ||
                            !firstName ||
                            !lastName ||
                            !phone ||
                            !email ||
                            !address ||
                            !city ||
                            !postalCode ||
                            !country
                        }
                        className="w-full py-3 bg-blue-600 text-white rounded-lg font-semibold text-lg transition-all duration-300 hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed shadow-md"
                    >
                        Passer au paiement
                    </button>
                </div>
            </div>
        </div>
    );
};

export default DeliveryPage;
