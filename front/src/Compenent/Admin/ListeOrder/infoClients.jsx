import { useState } from "react";

const ClientFormModal = ({ client, onClose, onSave }) => {
    const [formData, setFormData] = useState({
        nom: client.nom,
        prenom: client.prenom,
        email: client.email,
        telephone: client.telephone,
        adresse: client.adresse
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = () => {
        onSave(formData);
        onClose();
    };

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white p-6 rounded-lg shadow-lg w-96">
                <h2 className="text-xl font-semibold mb-4">Fiche Client</h2>
                <div className="space-y-4">
                    <input type="text" name="nom" value={formData.nom} onChange={handleChange} className="w-full p-2 border rounded" placeholder="Nom" />
                    <input type="text" name="prenom" value={formData.prenom} onChange={handleChange} className="w-full p-2 border rounded" placeholder="Prénom" />
                    <input type="email" name="email" value={formData.email} onChange={handleChange} className="w-full p-2 border rounded" placeholder="Email" />
                    <input type="tel" name="telephone" value={formData.telephone} onChange={handleChange} className="w-full p-2 border rounded" placeholder="Téléphone" />
                    <input type="text" name="adresse" value={formData.adresse} onChange={handleChange} className="w-full p-2 border rounded" placeholder="Adresse" />
                </div>
                <div className="flex justify-end space-x-4 mt-4">
                    <button onClick={onClose} className="px-4 py-2 bg-gray-400 text-white rounded">Fermer</button>
                    <button onClick={handleSubmit} className="px-4 py-2 bg-blue-600 text-white rounded">Enregistrer</button>
                </div>
            </div>
        </div>
    );
};

export default ClientFormModal;
