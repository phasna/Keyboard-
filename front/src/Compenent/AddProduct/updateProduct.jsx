import axios from 'axios';
import { useState, useEffect } from 'react';
import Swal from 'sweetalert2';
import { motion } from 'framer-motion';
import { FaStar, FaRegStar } from 'react-icons/fa';

const ProductList = ({ products, onEdit }) => {
    const [searchQuery, setSearchQuery] = useState('');

    return (
        <div className="bg-black bg-opacity-25 shadow-lg rounded-lg p-6 w-full ">
            <h2 className="text-5xl text-black font-medium text-center mb-6 my-10">LISTES DES PRODUITS MODIFIER</h2>
            {/* Barre de recherche */}
            <input
                type="text"
                placeholder="Rechercher un produit"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-1/4 p-3 border rounded-lg mb-4"
            />

            {/* Liste des produits */}
            <ul>
                {products
                    .filter((product) =>
                        product.title.toLowerCase().includes(searchQuery.toLowerCase())
                    )
                    .map((product) => (
                        <li key={product.id} className="flex items-center mb-4 p-4 border-b">
                            <div className="flex w-full items-center justify-between">
                                {/* Image du produit */}
                                <img src={product.image} alt={product.title} className="w-40 h-24 object-cover" />

                                {/* Détails du produit alignés en ligne */}
                                <div className="flex w-2/5 items-center justify-center">
                                    <h3 className="font-medium text-black text-center">{product.title}</h3>
                                </div>

                                {/* Prix du produit */}
                                <p className="w-1/5 text-center text-black">{product.price}€</p>

                                {/* Étoiles (Note) */}
                                <div className="w-1/5 flex justify-center">
                                    {Array.from({ length: 5 }, (_, index) => (
                                        <span key={index}>
                                            {index < product.rating ? (
                                                <FaStar className="text-yellow-500" />
                                            ) : (
                                                <FaRegStar className="text-yellow-500" />
                                            )}
                                        </span>
                                    ))}
                                </div>

                                {/* Bouton Modifier */}
                                <button
                                    onClick={() => onEdit(product.id)}
                                    className="text-white rounded-lg bg-black hover:bg-zinc-800 w-40 py-3 transition duration-200 ml-4"
                                >
                                    Modifier
                                </button>
                            </div>
                        </li>
                    ))}
            </ul>
        </div>
    );
};

const UpdateProductForm = () => {
    const [formData, setFormData] = useState({
        id: '',
        title: '',
        price: '',
        rating: 1,
        image: ''
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [productId, setProductId] = useState(null);
    const [products, setProducts] = useState([]);

    const fetchProducts = async () => {
        try {
            const response = await axios.get('http://localhost:8000/api/products');
            if (response.status === 200) {
                setProducts(response.data);
            }
        } catch (err) {
            Swal.fire({
                title: 'Erreur',
                text: 'Erreur lors de la récupération des produits.',
                icon: 'error',
                confirmButtonColor: '#000'
            });
        }
    };

    const fetchProduct = async (id) => {
        try {
            const response = await axios.get(`http://localhost:8000/api/products/${id}`);
            if (response.status === 200) {
                setFormData(response.data);
            }
        } catch (err) {
            Swal.fire({
                title: 'Erreur',
                text: 'Produit introuvable.',
                icon: 'error',
                confirmButtonColor: '#000'
            });
        }
    };

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            const response = await axios.put(`http://localhost:8000/api/products/${productId}`, formData);
            if (response.status === 200) {
                Swal.fire({
                    title: 'Succès !',
                    text: 'Produit mis à jour avec succès !',
                    icon: 'success',
                    confirmButtonColor: '#000'
                });
                fetchProducts();
                setProductId(null);
            }
        } catch (err) {
            Swal.fire({
                title: 'Erreur',
                text: 'Erreur lors de la mise à jour du produit.',
                icon: 'error',
                confirmButtonColor: '#000'
            });
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchProducts();
    }, []);

    useEffect(() => {
        if (productId) {
            fetchProduct(productId);
        }
    }, [productId]);

    return (
        <div className="relative w-full min-h-screen flex justify-center items-center">
            <div className={`w-full transition-all duration-300 ${productId ? 'blur-md' : ''}`}>
                <ProductList products={products} onEdit={(id) => setProductId(id)} />
            </div>
            {productId && (
                <motion.div
                    className="fixed top-0 left-0 w-full h-full flex justify-center items-center bg-black bg-opacity-50"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.3 }}
                >
                    <motion.div
                        className="shadow-lg rounded-lg p-10 bg-white"
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ duration: 0.3 }}
                    >
                        <h2 className="text-5xl font-medium text-black text-center mt-6">Mise à Jour du Produit</h2>
                        {error && <p className="text-red-500 text-center">{error}</p>}
                        <form onSubmit={handleSubmit} className="space-y-4 p-10">
                            <input
                                type="text"
                                name="id"
                                value={formData.id}
                                onChange={handleChange}
                                className="w-full p-3 border rounded-lg text-gray-900 bg-gray-100"
                            />
                            <input
                                type="text"
                                name="title"
                                value={formData.title}
                                onChange={handleChange}
                                placeholder="Nom du produit"
                                className="w-full p-3 border rounded-lg text-gray-900 bg-gray-100"
                                required
                            />
                            <input
                                type="number"
                                name="price"
                                value={formData.price}
                                onChange={handleChange}
                                placeholder="Prix"
                                className="w-full p-3 border rounded-lg text-gray-900 bg-gray-100"
                                required
                            />
                            <input
                                type="number"
                                name="rating"
                                value={formData.rating}
                                onChange={handleChange}
                                min="1"
                                max="5"
                                placeholder="Note (1-5)"
                                className="w-full p-3 border rounded-lg text-gray-900 bg-gray-100"
                                required
                            />
                            <input
                                type="text"
                                name="image"
                                value={formData.image}
                                onChange={handleChange}
                                placeholder="URL de l'image"
                                className="w-full p-3 border rounded-lg text-gray-900 bg-gray-100"
                            />
                            <button
                                type="submit"
                                className="w-full bg-green-500 text-white p-3 rounded-lg transition duration-300 hover:bg-opacity-70"
                                disabled={loading}
                            >
                                {loading ? 'Mise à jour...' : 'Mettre à jour'}
                            </button>
                            <button
                                onClick={() => setProductId(null)}
                                className="mt-4 w-full bg-red-500 text-white p-3 rounded-lg transition duration-300 hover:bg-gray-500"
                            >
                                Annuler
                            </button>
                        </form>
                    </motion.div>
                </motion.div>
            )}
        </div>
    );
};

export default UpdateProductForm;
