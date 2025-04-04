import { useState, useEffect } from "react";
import axios from "axios";
import { motion, AnimatePresence } from "framer-motion";

const CartList = () => {
  const [data, setData] = useState({
    carts: [],
    clients: [],
    products: [],
  });
  const [uiState, setUiState] = useState({
    loading: true,
    error: null,
    searchTerm: "",
    statusFilter: "",
    selectedCart: null,
  });

  // Récupération des données API
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [cartsRes, clientsRes, productsRes] = await Promise.all([
          axios.get("http://localhost:8000/api/listeCommande"),
          axios.get("http://localhost:8000/api/clients"),
          axios.get("http://localhost:8000/api/products"),
        ]);

        setData({
          carts: cartsRes.data,
          clients: clientsRes.data,
          products: productsRes.data,
        });
      } catch (err) {
        setUiState((prev) => ({
          ...prev,
          error: "Erreur lors de la récupération des données.",
        }));
      } finally {
        setUiState((prev) => ({ ...prev, loading: false }));
      }
    };

    fetchData();
  }, []);

  const { carts, clients, products } = data;
  const { loading, error, searchTerm, statusFilter, selectedCart } = uiState;

  // Filtrage des commandes
  const filteredCarts = carts.filter(
    (cart) =>
      (searchTerm === "" ||
        clients
          .find((client) => client.id === cart.clientId)
          ?.nom?.toLowerCase()
          .includes(searchTerm.toLowerCase())) &&
      (statusFilter === "" || cart.statut === statusFilter)
  );

  // Fonctions pour mettre à jour l'état UI
  const updateSearch = (value) =>
    setUiState((prev) => ({ ...prev, searchTerm: value }));
  const updateStatusFilter = (value) =>
    setUiState((prev) => ({ ...prev, statusFilter: value }));
  const selectCart = (cart) =>
    setUiState((prev) => ({ ...prev, selectedCart: cart }));
  const closeModal = () =>
    setUiState((prev) => ({ ...prev, selectedCart: null }));

  // Helper pour obtenir les données du client
  const getClientInfo = (clientId, field) =>
    clients.find((c) => c.id === clientId)?.[field] || "Inconnu";

  // Helper pour le statut avec couleur
  const getStatusClass = (status) => {
    switch (status) {
      case "Terminé":
        return "text-green-400";
      case "En cours":
        return "text-yellow-400";
      default:
        return "text-red-400";
    }
  };

  if (loading)
    return (
      <div className="flex items-center justify-center h-screen bg-gray-900 text-white">
        Chargement...
      </div>
    );
  if (error)
    return (
      <div className="flex items-center justify-center h-screen bg-gray-900 text-red-600">
        {error}
      </div>
    );

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 text-white p-6">
      <header className="mb-8 ">
        <h1 className="text-3xl font-light mb-2">Gestion des Commandes</h1>
        <p className="text-gray-400">
          Suivez et gérez facilement toutes vos commandes
        </p>
      </header>

      {/* Filtres et Recherche */}
      <div className="bg-gray-800/50 backdrop-blur-sm p-4 rounded-xl shadow-lg mb-8">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <svg
                  className="w-5 h-5 text-gray-500"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  ></path>
                </svg>
              </div>
              <input
                type="text"
                placeholder="Rechercher un client..."
                className="pl-10 w-full p-3 bg-gray-700/50 border border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none transition-all"
                value={searchTerm}
                onChange={(e) => updateSearch(e.target.value)}
              />
            </div>
          </div>
          <div className="md:w-1/3">
            <select
              className="w-full p-3 bg-gray-700/50 border border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none transition-all"
              value={statusFilter}
              onChange={(e) => updateStatusFilter(e.target.value)}
            >
              <option value="">Tous les statuts</option>
              <option value="En cours">En cours</option>
              <option value="Terminé">Terminé</option>
              <option value="Abandonné">Abandonné</option>
            </select>
          </div>
        </div>
      </div>

      {/* Liste des commandes */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
        <AnimatePresence>
          {filteredCarts.length > 0 ? (
            filteredCarts.map((cart) => (
              <motion.div
                key={cart.id}
                className="bg-gray-800/80 backdrop-blur-sm border border-gray-700 rounded-xl overflow-hidden shadow-lg hover:shadow-blue-900/20 hover:border-blue-700/50 transition-all duration-300"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
              >
                <div className="p-5">
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="text-xl font-bold">Commande #{cart.id}</h3>
                    <span
                      className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusClass(
                        cart.statut
                      )} bg-gray-700/50`}
                    >
                      {cart.statut}
                    </span>
                  </div>

                  <div className="space-y-2 mb-4">
                    <p className="text-gray-300">
                      <span className="text-gray-400">Client:</span>{" "}
                      {getClientInfo(cart.clientId, "nom")}
                    </p>
                    <p className="text-gray-300">
                      <span className="text-gray-400">Produit:</span>{" "}
                      {products.find((p) => p.id === cart.productId)?.title ||
                        "Non disponible"}
                    </p>
                    <p className="text-gray-300">
                      <span className="text-gray-400">Quantité:</span>{" "}
                      {cart.quantity}
                    </p>
                  </div>

                  <button
                    onClick={() => selectCart(cart)}
                    className="w-full bg-[#FFB800] text-black font-medium py-3 rounded-3xl transition-all duration-300"
                  >
                    Voir détails
                  </button>
                </div>
              </motion.div>
            ))
          ) : (
            <motion.div
              className="col-span-full text-center p-8 bg-gray-800/80 rounded-xl"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              <p className="text-xl text-gray-400">Aucune commande trouvée</p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Modal avec détails */}
      <AnimatePresence>
        {selectedCart && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="bg-gradient-to-b from-gray-800 to-gray-900 rounded-xl shadow-2xl w-full max-w-2xl border border-gray-700"
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="p-6">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-2xl font-bold">
                    Commande #{selectedCart.id}
                  </h2>
                  <button
                    onClick={closeModal}
                    className="p-2 rounded-full hover:bg-gray-700/50 transition-colors"
                  >
                    <svg
                      className="w-6 h-6"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M6 18L18 6M6 6l12 12"
                      ></path>
                    </svg>
                  </button>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <h3 className="text-xl font-semibold border-b border-gray-700 pb-2">
                      Client
                    </h3>
                    <div className="space-y-2">
                      <p>
                        <span className="text-gray-400">Nom:</span>{" "}
                        {getClientInfo(selectedCart.clientId, "nom")}
                      </p>
                      <p>
                        <span className="text-gray-400">Prénom:</span>{" "}
                        {getClientInfo(selectedCart.clientId, "prenom")}
                      </p>
                      <p>
                        <span className="text-gray-400">Email:</span>{" "}
                        {getClientInfo(selectedCart.clientId, "email")}
                      </p>
                      <p>
                        <span className="text-gray-400">Téléphone:</span>{" "}
                        {getClientInfo(selectedCart.clientId, "telephone")}
                      </p>
                      <p>
                        <span className="text-gray-400">Adresse:</span>{" "}
                        {getClientInfo(selectedCart.clientId, "adresse")}
                      </p>
                      <p>
                        <span className="text-gray-400">Ville:</span>{" "}
                        {getClientInfo(selectedCart.clientId, "ville")}
                      </p>
                      <p>
                        <span className="text-gray-400">Code Postal:</span>{" "}
                        {getClientInfo(selectedCart.clientId, "code_postal")}
                      </p>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h3 className="text-xl font-semibold border-b border-gray-700 pb-2">
                      Commande
                    </h3>
                    <div className="space-y-2">
                      <p>
                        <span className="text-gray-400">Produit:</span>{" "}
                        {products.find((p) => p.id === selectedCart.productId)
                          ?.title || "Non disponible"}
                      </p>
                      <p>
                        <span className="text-gray-400">Quantité:</span>{" "}
                        {selectedCart.quantity}
                      </p>
                      <p>
                        <span className="text-gray-400">Statut:</span>
                        <span
                          className={`ml-2 px-3 py-1 rounded-full text-sm font-medium ${getStatusClass(
                            selectedCart.statut
                          )} bg-gray-700/50`}
                        >
                          {selectedCart.statut}
                        </span>
                      </p>
                    </div>
                  </div>
                </div>

                <div className="mt-8 flex justify-end">
                  <button
                    className="bg-[#FFB800] hover:bg-[#FFB800] text-black font-medium px-5 py-2 rounded-lg transition-colors"
                    onClick={closeModal}
                  >
                    Fermer
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default CartList;
