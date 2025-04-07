import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const CartList = () => {
    const [carts, setCarts] = useState([]);
    const [clients, setClients] = useState([]);
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [searchTerm, setSearchTerm] = useState("");
    const [statusFilter, setStatusFilter] = useState("");
    const [selectedClient, setSelectedClient] = useState(null);
    const [selectedClientOrders, setSelectedClientOrders] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const modalRef = useRef(null);
    const itemsPerPage = 5;

    useEffect(() => {
        const fetchCartsAndClientsAndProducts = async () => {
            try {
                const cartsResponse = await fetch('http://localhost:8000/api/listeCommande');
                const clientsResponse = await fetch('http://localhost:8000/api/clients');
                const productsResponse = await fetch('http://localhost:8000/api/products');

                if (!cartsResponse.ok || !clientsResponse.ok || !productsResponse.ok) {
                    throw new Error('Erreur lors de la récupération des données');
                }

                const cartsData = await cartsResponse.json();
                const clientsData = await clientsResponse.json();
                const productsData = await productsResponse.json();

                const groupedCarts = cartsData.map(cart => ({
                    id: cart.id,
                    clientId: cart.clientId,
                    date_commande: cart.date_commande,
                    quantity: cart.quantity,
                    productId: cart.productId,
                    statut: cart.statut,
                    client: clientsData.find(client => client.id === cart.clientId) || null,
                    product: productsData.find(product => product.id === cart.productId) || null
                }));

                setCarts(groupedCarts);
                setClients(clientsData);
                setProducts(productsData);
                setLoading(false);
            } catch (error) {
                setError(error.message);
                setLoading(false);
            }
        };

        fetchCartsAndClientsAndProducts();
    }, []);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (modalRef.current && !modalRef.current.contains(event.target)) {
                setIsModalOpen(false);
            }
        };

        if (isModalOpen) {
            document.addEventListener('mousedown', handleClickOutside);
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [isModalOpen]);

    const handleStatusChange = async (orderId, newStatus) => {
        try {
            const response = await fetch(`http://localhost:8000/api/listeCommande/status/${orderId}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ statut: newStatus })
            });

            if (!response.ok) {
                throw new Error('Échec de la mise à jour du statut');
            }

            setCarts(prevCarts =>
                prevCarts.map(cart =>
                    cart.id === orderId ? { ...cart, statut: newStatus } : cart
                )
            );
        } catch (error) {
            console.error('Erreur lors de la mise à jour du statut :', error);
        }
    };

    const getStatusColor = (status) => {
        switch (status) {
            case 'En cours': return 'bg-yellow-300 text-yellow-700';
            case 'Terminé': return 'bg-green-300 text-green-700';
            case 'Abandonné': return 'bg-red-100 text-red-700';
            default: return 'bg-gray-100 text-gray-700';
        }
    };

    const filteredCarts = carts.filter(cart =>
        (searchTerm === "" || (cart.client && `${cart.client.nom} ${cart.client.prenom}`.toLowerCase().includes(searchTerm.toLowerCase()))) &&
        (statusFilter === "" || cart.statut === statusFilter)
    );

    const sortedCarts = filteredCarts.sort((a, b) => {
        if (a.statut === "En cours" && b.statut !== "En cours") return -1;
        if (b.statut === "En cours" && a.statut !== "En cours") return 1;
        return 0;
    });

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = sortedCarts.slice(indexOfFirstItem, indexOfLastItem);
    const totalPages = Math.ceil(sortedCarts.length / itemsPerPage);

    const handlePreviousPage = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    };

    const handleNextPage = () => {
        if (currentPage < totalPages) {
            setCurrentPage(currentPage + 1);
        }
    };

    const handleClientClick = (client) => {
        setSelectedClient(client);
        const clientOrders = carts.filter(cart => cart.clientId === client.id);
        setSelectedClientOrders(clientOrders);
        setIsModalOpen(true);
    };

    if (loading) return <div className="text-center py-4">Chargement...</div>;
    if (error) return <div className="text-center py-4 text-red-600">Erreur : {error}</div>;

    const modalVariants = {
        hidden: { opacity: 0, scale: 0.95, y: 20 },
        visible: {
            opacity: 1,
            scale: 1,
            y: 0,
            transition: {
                duration: 0.3,
                ease: "easeOut"
            }
        },
        exit: {
            opacity: 0,
            scale: 0.95,
            y: 20,
            transition: {
                duration: 0.2,
                ease: "easeIn"
            }
        }
    };

    const backdropVariants = {
        hidden: { opacity: 0 },
        visible: { opacity: 1, transition: { duration: 0.3 } },
        exit: { opacity: 0, transition: { duration: 0.2 } }
    };

    return (
        <div className="container mx-auto p-10">
            <h1 className="text-5xl font-light text-white my-10">LISTE DES COMMANDES</h1>
            <div className="flex justify-between mb-4 border-white">
                <input
                    type="text"
                    placeholder="Rechercher un client..."
                    className="px-4 py-3 border rounded w-1/3 bg-white/20 text-white"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
                <select
                    className="px-4 py-2 border bg-white/10 text-white rounded w-1/3"
                    value={statusFilter}
                    onChange={(e) => setStatusFilter(e.target.value)}
                >
                    <option value="">Tous les statuts</option>
                    <option value="En cours">En cours</option>
                    <option value="Terminé">Terminé</option>
                    <option value="Abandonné">Abandonné</option>
                </select>
            </div>
            <div className="overflow-x-auto shadow-md sm:rounded-lg">
                <table className="w-full text-sm text-left text-gray-500">
                    <thead className="text-md text-gray-900 uppercase bg-gray-400">
                    <tr>
                        <th className="px-6 py-5">Id</th>
                        <th className="px-6 py-5">Client</th>
                        <th className="px-6 py-5">Produit</th>
                        <th className="px-6 py-5">Quantité</th>
                        <th className="px-6 py-5">Date Commande</th>
                        <th className="px-6 py-5">Statut</th>
                    </tr>
                    </thead>
                    <tbody>
                    {currentItems.map((cart) => (
                        <tr key={cart.id} className="bg-white border-b hover:bg-gray-100">
                            <td className="px-6 py-10 font-medium text-gray-900">
                                {cart.client ? (
                                    <button
                                        onClick={() => handleClientClick(cart.client)}
                                        className="text-gray-900 hover:underline"
                                    >
                                        {cart.client.id}
                                    </button>
                                ) : 'Client non trouvé'}
                            </td>
                            <td className="px-6 py-4 font-medium text-gray-900">
                                {cart.client ? (
                                    <button
                                        onClick={() => handleClientClick(cart.client)}
                                        className="text-blue-600 hover:underline"
                                    >
                                        {cart.client.nom} {cart.client.prenom}
                                    </button>
                                ) : 'Client non trouvé'}
                            </td>
                            <td className="px-6 py-4">{cart.product?.title || 'Produit non disponible'}</td>
                            <td className="px-6 py-4">{cart.quantity}</td>
                            <td className="px-6 py-4">{new Date(cart.date_commande).toLocaleDateString()}</td>
                            <td className="px-6 py-4">
                                <select
                                    value={cart.statut}
                                    onChange={(e) => handleStatusChange(cart.id, e.target.value)}
                                    className={`px-6 py-2 text-xs font-semibold rounded-full ${getStatusColor(cart.statut)}`}
                                >
                                    <option value="En cours">En cours</option>
                                    <option value="Terminé">Terminé</option>
                                    <option value="Abandonné">Abandonné</option>
                                </select>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
            <div className="flex justify-center mt-10 space-x-2">
                <button
                    onClick={handlePreviousPage}
                    disabled={currentPage === 1}
                    className="px-4 py-2 border rounded-lg bg-white/20 text-white cursor-pointer hover:bg-yellow-500 hover:text-gray-900"
                >
                    Précédent
                </button>
                {[...Array(totalPages)].map((_, index) => (
                    <button
                        key={index}
                        onClick={() => setCurrentPage(index + 1)}
                        className={`px-4 py-2 border rounded-xl ${currentPage === index + 1 ? 'bg-yellow-500 text-gray-900' : 'bg-white/20 text-white hover:bg-yellow-500 hover:text-gray-900'}`}
                    >
                        {index + 1}
                    </button>
                ))}
                <button
                    onClick={handleNextPage}
                    disabled={currentPage === totalPages}
                    className="px-4 py-2 border rounded-lg bg-white/20 text-white cursor-pointer hover:bg-yellow-500 hover:text-gray-900"
                >
                    Suivant
                </button>
            </div>

            {/* Modal professionnel */}
            <AnimatePresence>
                {isModalOpen && selectedClient && (
                    <motion.div
                        className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50 "
                        variants={backdropVariants}
                        initial="hidden"
                        animate="visible"
                        exit="exit"
                    >
                        <motion.div
                            ref={modalRef}
                            className="bg-white rounded-lg shadow-lg max-w-4xl w-full mx-6 p-6 relative border border-gray-200 ml-[30vh]"
                            variants={modalVariants}
                            initial="hidden"
                            animate="visible"
                            exit="exit"
                        >
                            {/* Bouton de fermeture */}
                            <button
                                onClick={() => setIsModalOpen(false)}
                                className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-full bg-gray-200 hover:bg-gray-300 text-gray-600 hover:text-gray-800 transition-colors duration-200"
                            >
                                <span className="text-xl font-medium">×</span>
                            </button>

                            {/* En-tête */}
                            <div className="mb-6 border-b border-gray-200 pb-4">
                                <h2 className="text-2xl font-semibold text-gray-800">Dossier Client</h2>
                                <p className="text-sm text-gray-500 mt-1">Informations détaillées et historique des commandes</p>
                            </div>

                            {/* Informations du client */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                                <div className="space-y-2">
                                    <p className="text-sm text-gray-600"><span className="font-medium text-gray-800">Nom complet :</span> {selectedClient.nom} {selectedClient.prenom}</p>
                                    <p className="text-sm text-gray-600"><span className="font-medium text-gray-800">Email :</span> {selectedClient.email}</p>
                                    <p className="text-sm text-gray-600"><span className="font-medium text-gray-800">Téléphone :</span> {selectedClient.telephone}</p>
                                    <p className="text-sm text-gray-600"><span className="font-medium text-gray-800">Mode de livraison :</span> {selectedClient.mode_livraison}</p>
                                </div>
                                <div className="space-y-2">
                                    <p className="text-sm text-gray-600"><span className="font-medium text-gray-800">Adresse :</span> {selectedClient.adresse}</p>
                                    <p className="text-sm text-gray-600"><span className="font-medium text-gray-800">Code postal :</span> {selectedClient.code_postal}</p>
                                    <p className="text-sm text-gray-600"><span className="font-medium text-gray-800">Ville :</span> {selectedClient.ville}</p>
                                    <p className="text-sm text-gray-600"><span className="font-medium text-gray-800">Pays :</span> {selectedClient.pays}</p>
                                </div>
                            </div>

                            {/* Commandes */}
                            <div className="max-h-72 overflow-y-auto">
                                <h3 className="text-lg font-medium text-gray-800 mb-4">Historique des commandes</h3>
                                {selectedClientOrders.length > 0 ? (
                                    <div className="space-y-3">
                                        {selectedClientOrders.map(order => (
                                            <div key={order.id} className="bg-gray-50 rounded-md p-3 border border-gray-100">
                                                <div className="flex justify-between items-center">
                                                    <div>
                                                        <p className="text-sm text-gray-700 font-medium">{order.product?.title || "Produit inconnu"}</p>
                                                        <p className="text-sm text-gray-600">Quantité : {order.quantity}</p>
                                                        <p className="text-sm text-gray-600">Date : {new Date(order.date_commande).toLocaleDateString()}</p>
                                                    </div>
                                                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(order.statut)}`}>
                                                        {order.statut}
                                                    </span>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                ) : (
                                    <p className="text-sm text-gray-500 bg-gray-50 p-3 rounded-md">Aucune commande enregistrée pour ce client.</p>
                                )}
                            </div>

                            {/* Pied de page */}
                            <div className="mt-6 flex justify-end">
                                <button
                                    onClick={() => setIsModalOpen(false)}
                                    className="px-6 py-2 bg-gray-700 text-white rounded-md hover:bg-gray-800 transition-colors duration-200 font-medium"
                                >
                                    Fermer
                                </button>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default CartList;