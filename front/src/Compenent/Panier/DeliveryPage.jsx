import React, { useState, useEffect } from 'react';
import { FaTruck } from 'react-icons/fa'; // Pour ajouter des icônes
import { GoogleMap, LoadScript, Autocomplete } from '@react-google-maps/api';

const DeliveryPage = ({ goToNextStep }) => {
    const [selectedOption, setSelectedOption] = useState('');
    const [address, setAddress] = useState('');
    const [city, setCity] = useState('');
    const [postalCode, setPostalCode] = useState('');
    const [country, setCountry] = useState('');
    const [suggestions, setSuggestions] = useState([]);

    // Gestion des changements dans l'input d'adresse
    const handleAddressChange = (event) => {
        setAddress(event.target.value);
    };

    const handleOptionChange = (event) => {
        setSelectedOption(event.target.value);
    };

    const handleAddressSelect = (place) => {
        const addressComponents = place.address_components;
        let city = '';
        let postalCode = '';
        let country = '';

        // Parcours des composants d'adresse pour extraire la ville, le code postal et le pays
        addressComponents.forEach((component) => {
            if (component.types.includes('locality')) {
                city = component.long_name;
            }
            if (component.types.includes('postal_code')) {
                postalCode = component.long_name;
            }
            if (component.types.includes('country')) {
                country = component.long_name;
            }
        });

        setAddress(place.formatted_address);
        setCity(city);
        setPostalCode(postalCode);
        setCountry(country);
    };

    return (
        <div className="bg-gradient-to-r from-indigo-900 via-gray-900 to-black min-h-screen flex flex-col items-center justify-center py-8 sm:py-10 lg:py-12 xl:mt-5">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white mb-6 sm:mb-10 text-center">Choisir un mode de livraison</h1>

            <div className="w-full sm:w-1/2 bg-gray-800 bg-opacity-80 p-8 rounded-lg shadow-2xl ">
                <div className="space-y-6">
                    <div className="flex items-center space-x-4">
                        <FaTruck className="text-2xl text-green-500" />
                        <label className="text-lg sm:text-xl font-semibold text-white">
                            <input
                                type="radio"
                                value="standard"
                                checked={selectedOption === 'standard'}
                                onChange={handleOptionChange}
                                className="mr-2"
                            />
                            Livraison Standard (5-7 jours) - <span className="font-bold text-gray-300">$5.99</span>
                        </label>
                    </div>

                    <div className="flex items-center space-x-4">
                        <FaTruck className="text-2xl text-yellow-400" />
                        <label className="text-lg sm:text-xl font-semibold text-white">
                            <input
                                type="radio"
                                value="express"
                                checked={selectedOption === 'express'}
                                onChange={handleOptionChange}
                                className="mr-2"
                            />
                            Livraison Express (2-3 jours) - <span className="font-bold text-gray-300">$15.99</span>
                        </label>
                    </div>
                </div>

                {/* Formulaire d'adresse de livraison */}
                <div className="mt-8 space-y-4">
                    <div>
                        <label className="block text-lg sm:text-xl font-semibold text-white">Adresse de livraison</label>
                        <LoadScript googleMapsApiKey="https://maps.googleapis.com/maps/api/geocode/json?address=1600+Amphitheatre+Parkway,+Mountain+View,+CA&key=AIzaSyAOVYRIgupAurZup5y1PRh8Ismb1A3lLao" libraries={["places"]}>
                            <Autocomplete
                                onPlaceChanged={() => handleAddressSelect(document.getElementById('address-input').value)}
                            >
                                <input
                                    id="address-input"
                                    type="text"
                                    value={address}
                                    onChange={handleAddressChange}
                                    placeholder="Entrer l'adresse"
                                    className="w-full p-3 mt-2 bg-gray-700 rounded-lg text-white"
                                />
                            </Autocomplete>
                        </LoadScript>
                    </div>

                    <div>
                        <label className="block text-lg sm:text-xl font-semibold text-white">Ville</label>
                        <input
                            type="text"
                            name="city"
                            value={city}
                            onChange={(e) => setCity(e.target.value)}
                            placeholder="Entrer la ville"
                            className="w-full p-3 mt-2 bg-gray-700 rounded-lg text-white"
                        />
                    </div>

                    <div>
                        <label className="block text-lg sm:text-xl font-semibold text-white">Code Postal</label>
                        <input
                            type="text"
                            name="postalCode"
                            value={postalCode}
                            onChange={(e) => setPostalCode(e.target.value)}
                            placeholder="Entrer le code postal"
                            className="w-full p-3 mt-2 bg-gray-700 rounded-lg text-white"
                        />
                    </div>

                    <div>
                        <label className="block text-lg sm:text-xl font-semibold text-white">Pays</label>
                        <input
                            type="text"
                            name="country"
                            value={country}
                            onChange={(e) => setCountry(e.target.value)}
                            placeholder="Entrer le pays"
                            className="w-full p-3 mt-2 bg-gray-700 rounded-lg text-white"
                        />
                    </div>
                </div>

                <button
                    onClick={() => goToNextStep(3)}
                    disabled={!selectedOption || !address || !city || !postalCode || !country}
                    className={`mt-6 py-3 w-full ${!selectedOption || !address || !city || !postalCode || !country ? 'bg-gray-500' : 'bg-green-600'} text-white rounded-lg font-semibold transition-all duration-300 hover:bg-green-700 disabled:opacity-50`}>
                    Passer au paiement
                </button>
            </div>
        </div>
    );
};

export default DeliveryPage;
