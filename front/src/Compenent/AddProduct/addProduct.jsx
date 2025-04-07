import axios from "axios";
import { useState, useEffect } from "react";
import Swal from "sweetalert2";
import { FaPlus, FaEdit, FaTrash } from "react-icons/fa";
import { motion } from "framer-motion";

const AddProductForm = () => {
  const [formData, setFormData] = useState({
    id: "",
    title: "",
    price: "",
    rating: 1,
    image: "",
    stock: "",
    description: "", // Added description field
  });
  const [loading, setLoading] = useState(false);
  const [products, setProducts] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [editProductId, setEditProductId] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [productsPerPage] = useState(10);

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
        stock: parseInt(formData.stock),
      };

      if (editMode) {
        const existingProduct = products.find(
          (product) =>
            product.id === formData.id && product.id !== editProductId
        );
        if (existingProduct) {
          Swal.fire({
            title: "Erreur",
            text: `L'ID ${formData.id} existe déjà.`,
            icon: "error",
            confirmButtonColor: "#000",
          });
          return;
        }

        await axios.put(
          `http://localhost:8000/api/products/${editProductId}`,
          productData
        );
        Swal.fire({
          title: "Succès !",
          text: "Produit modifié avec succès !",
          icon: "success",
          confirmButtonColor: "#000",
        });
      } else {
        await axios.post("http://localhost:8000/api/products", productData);
        Swal.fire({
          title: "Succès !",
          text: "Produit ajouté avec succès !",
          icon: "success",
          confirmButtonColor: "#000",
        });
      }

      setFormData({
        id: "",
        title: "",
        price: "",
        rating: 1,
        image: "",
        stock: "",
        description: "",
      });
      setShowForm(false);
      setEditMode(false);
      setEditProductId(null);
      fetchProducts();
    } catch (err) {
      console.error(err);
      Swal.fire({
        title: "Erreur",
        text: "Erreur lors de l'opération.",
        icon: "error",
        confirmButtonColor: "#000",
      });
    } finally {
      setLoading(false);
    }
  };

  const fetchProducts = async () => {
    try {
      const response = await axios.get("http://localhost:8000/api/products");
      setProducts(response.data.reverse());
    } catch (err) {
      console.error("Erreur récupération produits:", err);
    }
  };

  const handleDelete = (id) => {
    Swal.fire({
      title: "Êtes-vous sûr ?",
      text: "Cette action est irréversible !",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Oui, supprimer",
      cancelButtonText: "Annuler",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await axios.delete(`http://localhost:8000/api/products/${id}`);
          Swal.fire({
            title: "Supprimé !",
            text: "Produit supprimé avec succès.",
            icon: "success",
            confirmButtonColor: "#000",
          });
          fetchProducts();
        } catch (err) {
          Swal.fire({
            title: "Erreur",
            text: "Erreur lors de la suppression du produit.",
            icon: "error",
            confirmButtonColor: "#000",
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
      description: product.description || "", // Include description in edit
    });
    setEditMode(true);
    setEditProductId(product.id);
    setShowForm(true);
  };

  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = products.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );

  const paginate = (pageNumber) => setCurrentPage(pageNumber);
  const totalPages = Math.ceil(products.length / productsPerPage);

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="flex h-screen flex-col p-10"
    >
      <h3 className="text-5xl text-white font-light my-5 mb-10 ">
        LISTES DES PRODUITS{" "}
      </h3>

      <div className="mb-5 flex justify-start">
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Rechercher un produit"
          className="p-3 w-1/3 border rounded-lg text-white bg-black"
        />
      </div>

      <div className="w-full p-10 overflow-auto bg-opacity-25 bg-white rounded-xl">
        <div className="flex justify-end mb-8">
          <button
            onClick={() => {
              setShowForm(true);
              setEditMode(false);
              setFormData({
                id: "",
                title: "",
                price: "",
                rating: 1,
                image: "",
                stock: "",
                description: "",
              });
            }}
            className="px-8 py-4 bg-transparent border-2 text-white rounded-lg hover:bg-white hover:text-black"
          >
            <FaPlus className="inline mr-2" /> Ajouter un produit
          </button>
        </div>
        <ul className="space-y-4">
          {currentProducts
            .filter((product) =>
              product.title.toLowerCase().includes(searchQuery.toLowerCase())
            )
            .map((product) => (
              <li
                key={product.id}
                className="flex items-center justify-between p-4 rounded-xl shadow-md bg-black bg-opacity-10 border border-gray-200"
              >
                <div className="flex items-center gap-4">
                  {product.image && (
                    <img
                      src={product.image}
                      alt={product.title}
                      className="w-32 h-auto object-cover"
                    />
                  )}
                  <div>
                    <h3 className="font-semibold text-lg text-white">
                      {product.title}
                    </h3>
                    <p className="text-white">
                      ${product.price} | ⭐ {product.rating}/5 | Stock:{" "}
                      {product.stock}
                    </p>
                  </div>
                </div>
                <div className="flex gap-2">
                  <button
                    className="px-6 py-2 bg-yellow-500 text-gray-900 rounded-lg hover:bg-yellow-400"
                    onClick={() => handleEdit(product)}
                  >
                    <FaEdit className="inline mr-2" /> Modifier
                  </button>
                  <button
                    className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-500"
                    onClick={() => handleDelete(product.id)}
                  >
                    <FaTrash className="inline mr-2" /> Supprimer
                  </button>
                </div>
              </li>
            ))}
        </ul>

        <div className="flex justify-center space-x-4 mt-10">
          <button
            onClick={handlePrevPage}
            className="px-4 py-2 border bg-white/20 text-white rounded-lg hover:bg-yellow-500 cursor-pointer hover:text-black"
            disabled={currentPage === 1}
          >
            Précédent
          </button>
          <div className="flex space-x-2">
            {Array.from({ length: totalPages }, (_, index) => (
              <button
                key={index + 1}
                onClick={() => paginate(index + 1)}
                className={`px-4 py-2 border rounded-xl ${
                  currentPage === index + 1
                    ? "bg-yellow-500 text-gray-900"
                    : "bg-white"
                }`}
              >
                {index + 1}
              </button>
            ))}
          </div>
          <button
            onClick={handleNextPage}
            className="px-4 py-2 border bg-white/20 text-white rounded-lg hover:bg-yellow-500 cursor-pointer hover:text-black"
            disabled={currentPage === totalPages}
          >
            Suivant
          </button>
        </div>
      </div>

      {showForm && (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex justify-center items-center z-50">
          <div className="bg-white bg-opacity-50 p-10 rounded-lg shadow-3xl absolute right-64 w-1/2">
            <button
              className="absolute top-2 right-2 text-sm text-white bg-white hover:bg-gray-200 px-4 py-3 rounded-full "
              onClick={() => setShowForm(false)}
            >
              ✖
            </button>
            <h2 className="text-4xl mb-5 font-light text-white text-center ">
              {editMode ? "MODIFIER LE PRODUIT" : "AJOUTER UN PRODUIT"}
            </h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                placeholder="Nom du produit"
                className="w-full p-3 border bg-black text-white rounded-lg"
                required
              />
              <input
                type="number"
                name="price"
                value={formData.price}
                onChange={handleChange}
                placeholder="Prix"
                className="w-full p-3 border bg-black text-white rounded-lg"
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
                className="w-full p-3 border bg-black text-white rounded-lg"
              />
              <input
                type="text"
                name="image"
                value={formData.image}
                onChange={handleChange}
                placeholder="URL de l'image"
                className="w-full p-3 border bg-black text-white rounded-lg"
                required
              />
              <input
                type="number"
                name="stock"
                value={formData.stock}
                onChange={handleChange}
                placeholder="Quantité en stock"
                className="w-full p-3 border bg-black text-white rounded-lg"
                required
              />
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                placeholder="Description du produit"
                className="w-full p-3 border bg-black text-white rounded-lg"
                rows="4"
              />
              <button
                type="submit"
                className="w-1/4 px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-500"
              >
                {loading
                  ? "Chargement..."
                  : editMode
                  ? "Mettre à jour"
                  : "Ajouter"}
              </button>
            </form>
          </div>
        </div>
      )}
    </motion.div>
  );
};

export default AddProductForm;
