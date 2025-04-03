import axios from 'axios';
import { useState, useEffect } from 'react';
import Swal from 'sweetalert2';
import { FaPlus, FaEdit, FaTrash, FaSearch, FaTimes, FaStar, FaBox } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";

const MobileProductManager = () => {
    const [formData, setFormData] = useState({
        id: '',
        title: '',
        price: '',
        rating: 1,
        image: '',
        stock: '',
        description: ''
    });
    const [loading, setLoading] = useState(false);
    const [products, setProducts] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [showForm, setShowForm] = useState(false);
    const [showSearch, setShowSearch] = useState(false);
    const [editMode, setEditMode] = useState(false);
    const [editProductId, setEditProductId] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        fetchProducts();
    }, []);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            const productData = {
                ...formData,
                price: parseFloat(formData.price),
                rating: parseFloat(formData.rating),
                stock: parseInt(formData.stock)
            };

            if (editMode) {
                const existingProduct = products.find(product => product.id === formData.id && product.id !== editProductId);
                if (existingProduct) {
                    Swal.fire({
                        title: 'Erreur',
                        text: `L'ID ${formData.id} existe déjà.`,
                        icon: 'error',
                        confirmButtonColor: '#000',
                        background: '#000',
                        color: '#ffffff'
                    });
                    return;
                }

                await axios.put(`http://localhost:8000/api/products/${editProductId}`, productData);
                Swal.fire({
                    title: 'Succès !',
                    text: 'Produit modifié avec succès !',
                    icon: 'success',
                    confirmButtonColor: '#22c55e',
                    background: '#000',
                    color: '#ffffff'
                });
            } else {
                await axios.post('http://localhost:8000/api/products', productData);
                Swal.fire({
                    title: 'Succès !',
                    text: 'Produit ajouté avec succès !',
                    icon: 'success',
                    confirmButtonColor: '#22c55e',
                    background: '#000',
                    color: '#ffffff'
                });
            }

            setFormData({ id: '', title: '', price: '', rating: 1, image: '', stock: '', description: '' });
            setShowForm(false);
            setEditMode(false);
            setEditProductId(null);
            fetchProducts();
        } catch (err) {
            console.error(err);
            Swal.fire({
                title: 'Erreur',
                text: 'Erreur lors de l\'opération.',
                icon: 'error',
                confirmButtonColor: '#000',
                background: '#000',
                color: '#ffffff'
            });
        } finally {
            setLoading(false);
        }
    };

    const fetchProducts = async () => {
        setIsLoading(true);
        try {
            const response = await axios.get('http://localhost:8000/api/products');
            setProducts(response.data.reverse());
        } catch (err) {
            console.error('Erreur récupération produits:', err);
            Swal.fire({
                title: 'Erreur',
                text: 'Impossible de récupérer les produits.',
                icon: 'error',
                confirmButtonColor: '#000',
                background: '#000',
                color: '#ffffff'
            });
        } finally {
            setIsLoading(false);
        }
    };

    const handleDelete = (id) => {
        Swal.fire({
            title: 'Êtes-vous sûr ?',
            text: "Cette action est irréversible !",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#22c55e',
            cancelButtonColor: '#ef4444',
            confirmButtonText: 'Oui, supprimer',
            cancelButtonText: 'Annuler',
            background: '#000',
            color: '#ffffff'
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    await axios.delete(`http://localhost:8000/api/products/${id}`);
                    Swal.fire({
                        title: 'Supprimé !',
                        text: 'Produit supprimé avec succès.',
                        icon: 'success',
                        confirmButtonColor: '#22c55e',
                        background: '#000',
                        color: '#ffffff'
                    });
                    fetchProducts();
                } catch (err) {
                    Swal.fire({
                        title: 'Erreur',
                        text: 'Erreur lors de la suppression du produit.',
                        icon: 'error',
                        confirmButtonColor: '#000',
                        background: '#000',
                        color: '#ffffff'
                    });
                }
            }
        });
    };

    const handleEdit = (product) => {
        setFormData({
            id: product.id,
            title: product.title,
            price: product.price,
            rating: product.rating,
            image: product.image,
            stock: product.stock,
            description: product.description || ''
        });
        setEditMode(true);
        setEditProductId(product.id);
        setShowForm(true);
    };

    const renderStars = (rating) => {
        const stars = [];
        for (let i = 0; i < 5; i++) {
            stars.push(
                <FaStar
                    key={i}
                    className={i < Math.round(rating) ? "text-yellow-400" : "text-gray-600"}
                />
            );
        }
        return stars;
    };

    const filteredProducts = products.filter(product =>
        product.title.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
            className="flex flex-col w-screen min-h-screen bg-white/10 text-white pb-14">

            {/* Header */}
            <div className="sticky top-0 z-10 flex justify-between items-center py-4 px-5 bg-black border-b border-gray-800 w-full shadow-lg">
                <h3 className="text-2xl font-bold text-white">PRODUITS</h3>
                <div className="flex space-x-3">
                    <button
                        onClick={() => setShowSearch(!showSearch)}
                        className="p-2.5 bg-black hover:bg-gray-900 text-white border border-gray-700 rounded-full shadow transition duration-200"
                    >
                        {showSearch ? <FaTimes /> : <FaSearch />}
                    </button>
                    <motion.button
                        whileTap={{ scale: 0.95 }}
                        onClick={() => {
                            setShowForm(true);
                            setEditMode(false);
                            setFormData({id: '', title: '', price: '', rating: 1, image: '', stock: '', description: ''});
                        }}
                        className="p-2.5 bg-green-600 hover:bg-green-700 text-white rounded-full shadow transition duration-200"
                    >
                        <FaPlus />
                    </motion.button>
                </div>
            </div>

            {/* Search bar - animated */}
            <AnimatePresence>
                {showSearch && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="w-full overflow-hidden px-4 py-3 bg-black border-b border-gray-800"
                    >
                        <div className="relative">
                            <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                            <input
                                type="text"
                                value={searchQuery}
                                onChange={(e) => {
                                    setSearchQuery(e.target.value);
                                }}
                                placeholder="Rechercher un produit"
                                className="p-3 pl-10 w-full border rounded-xl text-white bg-black border-gray-700 focus:border-green-500 focus:ring-2 focus:ring-green-500 focus:outline-none"
                            />
                            {searchQuery && (
                                <button
                                    onClick={() => setSearchQuery('')}
                                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                                >
                                    <FaTimes />
                                </button>
                            )}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Product list - Now showing all products without pagination */}
            <div className="flex-grow w-full p-3 overflow-auto">
                {isLoading ? (
                    <div className="flex justify-center items-center h-64">
                        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-500"></div>
                    </div>
                ) : filteredProducts.length > 0 ? (
                    <ul className="space-y-4 w-full pb-4">
                        {filteredProducts.map((product) => (
                            <motion.li
                                key={product.id}
                                layout
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -20 }}
                                transition={{ duration: 0.3 }}
                                className="flex flex-col p-4 rounded-xl shadow-lg bg-black border border-gray-800 w-full"
                            >
                                <div className="flex items-center mb-3 w-full">
                                    {product.image ? (
                                        <img
                                            src={product.image}
                                            alt={product.title}
                                            className="w-20 h-20 object-cover rounded-lg mr-4 shadow-md"
                                            onError={(e) => {
                                                e.target.onerror = null;
                                                e.target.src = "https://via.placeholder.com/150?text=No+Image";
                                            }}
                                        />
                                    ) : (
                                        <div className="w-20 h-20 bg-gray-900 rounded-lg mr-4 flex items-center justify-center">
                                            <span className="text-gray-400">No image</span>
                                        </div>
                                    )}
                                    <div className="flex-grow">
                                        <h3 className="font-bold text-lg text-white">{product.title}</h3>
                                        <div className="flex items-center mt-1">
                                            <div className="flex mr-3">
                                                {renderStars(product.rating)}
                                            </div>
                                            <span className="text-gray-300 text-sm">({product.rating}/5)</span>
                                        </div>
                                        <div className="flex items-center mt-1 space-x-4">
                                            <div className="flex items-center text-white">
                                                <span className="font-bold">${product.price}</span>
                                            </div>
                                            <div className="flex items-center text-green-500">
                                                <FaBox className="mr-1 text-sm" />
                                                <span>{product.stock} en stock</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>



                                <div className="flex justify-end gap-3 mt-2 w-full">
                                    <motion.button
                                        whileTap={{ scale: 0.95 }}
                                        className="px-4 py-2 bg-white hover:bg-gray-200 text-black text-sm rounded-lg transition duration-200 flex items-center"
                                        onClick={() => handleEdit(product)}
                                    >
                                        <FaEdit className="mr-2" /> Modifier
                                    </motion.button>
                                    <motion.button
                                        whileTap={{ scale: 0.95 }}
                                        className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white text-sm rounded-lg transition duration-200 flex items-center"
                                        onClick={() => handleDelete(product.id)}
                                    >
                                        <FaTrash className="mr-2" /> Supprimer
                                    </motion.button>
                                </div>
                            </motion.li>
                        ))}
                    </ul>
                ) : (
                    <div className="flex flex-col items-center justify-center text-center text-gray-400 py-16">
                        <FaSearch className="text-4xl mb-4" />
                        <p className="text-xl font-light">
                            {searchQuery ? "Aucun produit trouvé." : "Aucun produit disponible."}
                        </p>
                        {searchQuery && (
                            <button
                                onClick={() => setSearchQuery('')}
                                className="mt-4 px-4 py-2 bg-green-600 rounded-lg text-white"
                            >
                                Effacer la recherche
                            </button>
                        )}
                    </div>
                )}
            </div>

            {/* Modal Form - black and white with green accents */}
            <AnimatePresence>
                {showForm && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 bg-black bg-opacity-80 backdrop-blur-sm flex justify-center items-center z-50 p-4"
                        onClick={() => setShowForm(false)}
                    >
                        <motion.div
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.9, opacity: 0 }}
                            transition={{ type: "spring", stiffness: 300, damping: 30 }}
                            className="bg-black rounded-2xl shadow-2xl w-full max-w-md relative overflow-hidden border border-gray-800"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <div className="bg-black py-5 border-b border-gray-800">
                                <h2 className="text-xl font-bold text-white text-center">
                                    {editMode ? 'MODIFIER PRODUIT' : 'AJOUTER PRODUIT'}
                                </h2>
                                <button
                                    className="absolute top-5 right-5 text-white hover:text-gray-200 transition duration-200"
                                    onClick={() => setShowForm(false)}
                                >
                                    <FaTimes size={20} />
                                </button>
                            </div>

                            <form onSubmit={handleSubmit} className="p-6 space-y-5">
                                <div className="space-y-2">
                                    <label className="text-sm text-gray-300 block">Nom du produit</label>
                                    <input
                                        type="text"
                                        name="title"
                                        value={formData.title}
                                        onChange={handleChange}
                                        placeholder="ex: Smartphone Galaxy S21"
                                        className="w-full p-3 border bg-black text-white rounded-lg border-gray-700 focus:border-green-500 focus:ring-2 focus:ring-green-500 focus:outline-none"
                                        required
                                    />
                                </div>

                                <div className="grid grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <label className="text-sm text-gray-300 block">Prix ($)</label>
                                        <input
                                            type="number"
                                            name="price"
                                            value={formData.price}
                                            onChange={handleChange}
                                            placeholder="ex: 499.99"
                                            className="w-full p-3 border bg-black text-white rounded-lg border-gray-700 focus:border-green-500 focus:ring-2 focus:ring-green-500 focus:outline-none"
                                            required
                                            step="0.01"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-sm text-gray-300 block">Stock</label>
                                        <input
                                            type="number"
                                            name="stock"
                                            value={formData.stock}
                                            onChange={handleChange}
                                            placeholder="ex: 50"
                                            className="w-full p-3 border bg-black text-white rounded-lg border-gray-700 focus:border-green-500 focus:ring-2 focus:ring-green-500 focus:outline-none"
                                            required
                                        />
                                    </div>
                                </div>

                                <div className="grid grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <label className="text-sm text-gray-300 block">Note (1-5)</label>
                                        <div className="relative">
                                            <input
                                                type="number"
                                                name="rating"
                                                value={formData.rating}
                                                onChange={handleChange}
                                                min="1"
                                                max="5"
                                                step="0.1"
                                                className="w-full p-3 border bg-black text-white rounded-lg border-gray-700 focus:border-green-500 focus:ring-2 focus:ring-green-500 focus:outline-none"
                                            />
                                            <div className="absolute right-3 top-1/2 transform -translate-y-1/2 flex">
                                                {[1, 2, 3, 4, 5].map((star) => (
                                                    <FaStar
                                                        key={star}
                                                        className={parseFloat(formData.rating) >= star ? "text-yellow-400" : "text-gray-600"}
                                                        onClick={() => setFormData({...formData, rating: star})}
                                                    />
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-sm text-gray-300 block">URL image</label>
                                        <input
                                            type="text"
                                            name="image"
                                            value={formData.image}
                                            onChange={handleChange}
                                            placeholder="https://..."
                                            className="w-full p-3 border bg-black text-white rounded-lg border-gray-700 focus:border-green-500 focus:ring-2 focus:ring-green-500 focus:outline-none"
                                        />
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <label className="text-sm text-gray-300 block">Description</label>
                                    <textarea
                                        name="description"
                                        value={formData.description}
                                        onChange={handleChange}
                                        placeholder="Description détaillée du produit"
                                        className="w-full p-3 border bg-black text-white rounded-lg border-gray-700 focus:border-green-500 focus:ring-2 focus:ring-green-500 focus:outline-none"
                                        rows="3"
                                    />
                                </div>

                                <div className="pt-2">
                                    <motion.button
                                        whileTap={{ scale: 0.98 }}
                                        type="submit"
                                        disabled={loading}
                                        className="w-full py-4 bg-green-600 hover:bg-green-700 text-white rounded-xl font-bold shadow-lg transition duration-200 flex items-center justify-center"
                                    >
                                        {loading ? (
                                            <>
                                                <div className="animate-spin rounded-full h-5 w-5 border-t-2 border-b-2 border-white mr-3"></div>
                                                {editMode ? 'MISE À JOUR EN COURS...' : 'AJOUT EN COURS...'}
                                            </>
                                        ) : (
                                            editMode ? 'METTRE À JOUR' : 'AJOUTER LE PRODUIT'
                                        )}
                                    </motion.button>
                                </div>
                            </form>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.div>
    );
};

export default MobileProductManager;