import { useState } from "react";
import { motion } from "framer-motion";
import axios from "axios";
import Swal from "sweetalert2";

function AddUserForm() {
  const [user, setUser] = useState({
    identifiant: "",
    mot_de_passe: "",
    nom: "",
    prenom: "",
    email: "",
    telephone: "",
    adresse: "",
    image: "",
  });

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Données envoyées:", user);
    try {
      const response = await axios.post(
        "http://localhost:8000/api/utilisateurs",
        user
      );
      console.log("Réponse API:", response.data);

      Swal.fire({
        title: "Succès",
        text: response.data.message,
        icon: "success",
        confirmButtonText: "OK",
      });
    } catch (error) {
      console.error("Erreur lors de l'ajout de l'utilisateur:", error);
      Swal.fire({
        title: "Erreur",
        text: "Échec de l'ajout de l'utilisateur",
        icon: "error",
        confirmButtonText: "OK",
      });
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
      className="min-h-screen bg-black p-4"
    >
      <div className="max-w-md mx-auto">
        <div className="bg-white/20 rounded-xl shadow-xl p-6 border border-white">
          <div className="text-center mb-8">
            <h2 className="text-4xl font-light text-white">
              Nouvel utilisateur
            </h2>
            <p className="text-gray-400 text-sm mt-1">
              Remplissez les informations ci-dessous
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1.5">
                  Nom
                </label>
                <input
                  type="text"
                  name="nom"
                  value={user.nom}
                  onChange={handleChange}
                  required
                  className="w-full px-3 py-2.5 bg-gray-700 text-white border border-gray-600 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 transition duration-200 placeholder-gray-400"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1.5">
                  Prénom
                </label>
                <input
                  type="text"
                  name="prenom"
                  value={user.prenom}
                  onChange={handleChange}
                  required
                  className="w-full px-3 py-2.5 bg-gray-700 text-white border border-gray-600 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 transition duration-200 placeholder-gray-400"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1.5">
                Identifiant
              </label>
              <input
                type="text"
                name="identifiant"
                value={user.identifiant}
                onChange={handleChange}
                required
                className="w-full px-3 py-2.5 bg-gray-700 text-white border border-gray-600 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 transition duration-200 placeholder-gray-400"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1.5">
                Mot de passe
              </label>
              <input
                type="password"
                name="mot_de_passe"
                value={user.mot_de_passe}
                onChange={handleChange}
                required
                className="w-full px-3 py-2.5 bg-gray-700 text-white border border-gray-600 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 transition duration-200 placeholder-gray-400"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1.5">
                Email
              </label>
              <input
                type="email"
                name="email"
                value={user.email}
                onChange={handleChange}
                className="w-full px-3 py-2.5 bg-gray-700 text-white border border-gray-600 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 transition duration-200 placeholder-gray-400"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1.5">
                Téléphone
              </label>
              <input
                type="text"
                name="telephone"
                value={user.telephone}
                onChange={handleChange}
                className="w-full px-3 py-2.5 bg-gray-700 text-white border border-gray-600 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 transition duration-200 placeholder-gray-400"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1.5">
                Adresse
              </label>
              <input
                type="text"
                name="adresse"
                value={user.adresse}
                onChange={handleChange}
                className="w-full px-3 py-2.5 bg-gray-700 text-white border border-gray-600 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 transition duration-200 placeholder-gray-400"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1.5">
                URL de l&apos;image
              </label>
              <input
                type="text"
                name="image"
                value={user.image}
                onChange={handleChange}
                className="w-full px-3 py-2.5 bg-gray-700 text-white border border-gray-600 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 transition duration-200 placeholder-gray-400"
              />
            </div>

            <div className="pt-2">
              <button
                type="submit"
                className="w-full py-3 bg-[#FFB800] text-black font-medium rounded-3xl hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-800 transition duration-200"
              >
                Créer l&apos;utilisateur
              </button>
            </div>
          </form>
        </div>
      </div>
    </motion.div>
  );
}

export default AddUserForm;
