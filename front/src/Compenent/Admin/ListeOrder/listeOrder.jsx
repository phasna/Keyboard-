import { useState, useEffect } from 'react';

const CartList = () => {
    const [carts, setCarts] = useState([]);
    const [clients, setClients] = useState([]);
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [searchTerm, setSearchTerm] = useState("");
    const [statusFilter, setStatusFilter] = useState("");
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
            case 'En cours': return 'bg-yellow-200 text-yellow-800';
            case 'Terminé': return 'bg-green-200 text-green-800';
            case 'Abandonné': return 'bg-red-200 text-red-800';
            default: return 'bg-gray-200 text-gray-800';
        }
    };

    const filteredCarts = carts.filter(cart =>
        (searchTerm === "" || (cart.client && `${cart.client.nom} ${cart.client.prenom}`.toLowerCase().includes(searchTerm.toLowerCase()))) &&
        (statusFilter === "" || cart.statut === statusFilter)
    );

    // Trier les commandes pour que "En cours" soit toujours en premier
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

    if (loading) return <div className="text-center py-4">Chargement...</div>;
    if (error) return <div className="text-center py-4 text-red-600">Erreur : {error}</div>;

    return (
        <div className="container mx-auto p-10">
            <h1 className="text-5xl font-light text-white my-10">LISTE DES COMMANDES</h1>
            <div className="flex justify-between mb-4 border-white">
                <input
                    type="text"
                    placeholder="Rechercher un client..."
                    className="px-4 py-3 border rounded w-1/3 bg-white/20"
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
                    <thead className="text-md text-gray-100 uppercase bg-blue-600">
                    <tr>
                        <th className="px-6 py-8">Id</th>
                        <th className="px-6 py-8">Client</th>
                        <th className="px-6 py-8">Produit</th>
                        <th className="px-6 py-8">Quantité</th>
                        <th className="px-6 py-8">Date Commande</th>
                        <th className="px-6 py-8">Statut</th>
                    </tr>
                    </thead>
                    <tbody>
                    {currentItems.map((cart) => (
                        <tr key={cart.id} className="bg-white border-b hover:bg-gray-100">
                            <td className="px-6 py-10 font-medium text-gray-900">
                                {cart.client ? `${cart.client.id}` : 'Client non trouvé'}
                            </td>
                            <td className="px-6 py-4 font-medium text-gray-900">
                                {cart.client ? `${cart.client.nom} ${cart.client.prenom}` : 'Client non trouvé'}
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
                <button onClick={handlePreviousPage} disabled={currentPage === 1} className="px-4 py-2 border rounded-lg bg-white/20 text-white cursor-pointer hover:bg-blue-600">Précédent</button>
                {[...Array(totalPages)].map((_, index) => (
                    <button key={index} onClick={() => setCurrentPage(index + 1)} className={`px-4 py-2 border rounded ${currentPage === index + 1 ? 'bg-blue-600 text-white' : 'bg-white'}`}>{index + 1}</button>
                ))}
                <button onClick={handleNextPage} disabled={currentPage === totalPages} className="px-4 py-2 border rounded-lg bg-white/20 text-white cursor-pointer hover:bg-blue-600">Suivant</button>
            </div>
        </div>
    );
};

export default CartList;
