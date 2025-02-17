import axios from 'axios';
import { useState, useEffect } from 'react';
import Swal from 'sweetalert2';

const AddProductForm = () => {
    const [formData, setFormData] = useState({
        title: '',
        price: '',
        rating: 1,
        image: ''
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [products, setProducts] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [productsPerPage] = useState(3);
    const [searchQuery, setSearchQuery] = useState('');

    // Mise à jour des champs du formulaire
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    // Ajouter un produit
    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            const response = await axios.post('http://localhost:8000/api/products', formData);
            if (response.status === 201) {
                Swal.fire({
                    title: 'Succès !',
                    text: 'Produit ajouté avec succès !',
                    icon: 'success',
                    confirmButtonColor: '#000', // Bouton noir selon ton design
                    confirmButtonText: 'OK'
                });                setFormData({ title: '', price: '', rating: 1, image: '' });
                fetchProducts(); // Recharger la liste des produits après ajout
            }
        } catch (err) {
            Swal.fire({
                title: 'Erreur',
                text: 'Erreur lors de l\'ajout du produit.',
                icon: 'error',
                confirmButtonColor: '#000'
            });
        } finally {
            setLoading(false);
        }
    };

    // Supprimer un produit
    const handleDelete = async (id) => {
        Swal.fire({
            title: 'Êtes-vous sûr ?',
            text: 'Cette action est irréversible !',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#d33', // Bouton rouge pour suppression
            cancelButtonColor: '#000',  // Bouton noir pour annuler
            confirmButtonText: 'Oui, supprimer',
            cancelButtonText: 'Annuler'
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    await axios.delete(`http://localhost:8000/api/products/${id}`);

                    Swal.fire({
                        title: 'Supprimé !',
                        text: 'Produit supprimé avec succès.',
                        icon: 'success',
                        confirmButtonColor: '#000' // Bouton noir pour ton design
                    });

                    fetchProducts(); // Rafraîchir la liste
                } catch (err) {
                    Swal.fire({
                        title: 'Erreur',
                        text: 'Erreur lors de la suppression du produit.',
                        icon: 'error',
                        confirmButtonColor: '#000'
                    });
                }
            }
        });
    };


    // Récupérer les produits
    const fetchProducts = async () => {
        try {
            const response = await axios.get('http://localhost:8000/api/products');
            // Trier les produits par date ou ID pour afficher les nouveaux produits en premier
            const sortedProducts = response.data.reverse();  // Inverser l'ordre des produits
            setProducts(sortedProducts);
        } catch (err) {
            console.error('Erreur récupération produits:', err);
        }
    };

    useEffect(() => {
        fetchProducts(); // Charger les produits au démarrage
    }, []);

    // Calculer les produits à afficher pour la page courante
    const indexOfLastProduct = currentPage * productsPerPage;
    const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
    const filteredProducts = products.filter(product =>
        product.title.toLowerCase().includes(searchQuery.toLowerCase())
    );
    const currentProducts = filteredProducts.slice(indexOfFirstProduct, indexOfLastProduct);

    // Changer de page
    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    return (
        <div className="flex justify-between max-w-full mx-auto p-20 mt-28 ">
            {/* Formulaire d'ajout */}
            <div className="w-1/2 bg-gradient-to-r from-indigo-500 to-blue-500 shadow-lg rounded-lg p-6">
                <h2 className="text-2xl font-bold text-center text-white mb-4">Ajouter un Produit</h2>
                {error && <p className="text-red-500 text-center">{error}</p>}

                <form onSubmit={handleSubmit} className="space-y-4 bg-white p-6 rounded-lg shadow-md">
                    <input
                        type="text"
                        name="title"
                        value={formData.title}
                        onChange={handleChange}
                        placeholder="Nom du produit"
                        className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                        required
                    />

                    <input
                        type="number"
                        name="price"
                        value={formData.price}
                        onChange={handleChange}
                        placeholder="Prix"
                        className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                        required
                    />

                    <input
                        type="number"
                        name="rating"
                        value={formData.rating}
                        onChange={handleChange}
                        min="1" max="5"
                        placeholder="Note (1-5)"
                        className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                        required
                    />

                    <input
                        type="text"
                        name="image"
                        value={formData.image}
                        onChange={handleChange}
                        placeholder="URL de l'image"
                        className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                    />

                    <button
                        type="submit"
                        className="w-full bg-blue-600 text-white p-3 rounded-lg transition duration-300 ease-in-out hover:bg-blue-500"
                        disabled={loading}
                    >
                        {loading ? 'Ajout...' : 'Ajouter'}
                    </button>
                </form>
            </div>

            {/* Liste des produits */}
            <div className="w-1/2 ml-8 bg-white p-6 rounded-lg shadow-md px-20">
                <h3 className="text-xl font-bold mb-3">Produits</h3>

                {/* Barre de recherche */}
                <input
                    type="text"
                    placeholder="Rechercher un produit"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full p-3 border rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-blue-400"
                />

                {filteredProducts.length === 0 ? (
                    <p>Aucun produit trouvé</p>
                ) : (
                    <ul className="space-y-4">
                        {currentProducts.map((product) => (
                            <li
                                key={product.id}
                                className="flex items-center justify-between bg-white p-4 rounded-lg shadow-md border border-gray-200 transition-transform transform hover:scale-105"
                            >
                                <div className="flex items-center gap-4 ">
                                    <div>
                                        <p className="text-xs text-gray-400">ID: {product.id}</p>
                                        <h3 className="font-semibold text-lg">{product.title}</h3>
                                        <p className="text-gray-600">${product.price} | ⭐ {product.rating}/5</p>
                                    </div>
                                    <img src={product.image} alt={product.title} className={"w-1/3 ml-10"}/>
                                </div>
                                <button
                                    onClick={() => handleDelete(product.id)}
                                    className="px-8 py-3 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-red-600 transition"
                                >
                                    Supprimer
                                </button>
                            </li>
                        ))}
                    </ul>
                )}

                {/* Pagination */}
                <div className="flex justify-center mt-4">
                    <button
                        onClick={() => paginate(currentPage - 1)}
                        disabled={currentPage === 1}
                        className="px-4 py-2 bg-blue-500 text-white rounded-lg disabled:opacity-50"
                    >
                        Précédent
                    </button>
                    <span className="px-4 py-2 text-gray-700">
                        Page {currentPage}
                    </span>
                    <button
                        onClick={() => paginate(currentPage + 1)}
                        disabled={currentPage * productsPerPage >= filteredProducts.length}
                        className="px-4 py-2 bg-blue-500 text-white rounded-lg disabled:opacity-50"
                    >
                        Suivant
                    </button>
                </div>
            </div>
        </div>
    );
};

export default AddProductForm;
