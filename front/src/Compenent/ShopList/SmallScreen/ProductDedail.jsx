import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { motion, AnimatePresence } from "framer-motion";
import Swal from "sweetalert2";
import {
  FaPaypal,
  FaCcVisa,
  FaCcMastercard,
  FaApplePay,
  FaStar,
  FaRegStar,
  FaShoppingCart,
  FaTruck,
  FaShieldAlt,
  FaExchangeAlt,
  FaHeart,
  FaShareAlt,
} from "react-icons/fa";

const ProductDetaille = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [similarProducts, setSimilarProducts] = useState([]);
  const [quantity, setQuantity] = useState(1);
  const [isFavorite, setIsFavorite] = useState(false);
  const [selectedImage, setSelectedImage] = useState(0);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8000/api/products/${id}`
        );
        setProduct(response.data);
        fetchSimilarProducts(response.data.category);
      } catch (error) {
        console.error("Erreur lors de la récupération du produit :", error);
      }
    };

    const fetchSimilarProducts = async (category) => {
      try {
        const response = await axios.get(
          `http://localhost:8000/api/products?category=${category}`
        );
        setSimilarProducts(
          response.data.filter((p) => p.id !== id).slice(0, 4)
        );
      } catch (error) {
        console.error(
          "Erreur lors de la récupération des produits similaires :",
          error
        );
      }
    };

    fetchProduct();
  }, [id]);

  const handleAddToCart = () => {
    if (!product) return;

    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    const existingProduct = cart.find((item) => item.id === product.id);

    if (existingProduct) {
      existingProduct.quantity += quantity;
    } else {
      cart.push({ ...product, quantity });
    }

    localStorage.setItem("cart", JSON.stringify(cart));

    Swal.fire({
      position: "top-end",
      icon: "success",
      title: `${product.title} ajouté au panier avec ${quantity} article(s)`,
      showConfirmButton: false,
      timer: 2000,
      toast: true,
      background: "#1a1a1a",
      color: "#fff",
    });
  };

  const increaseQuantity = () => setQuantity((prev) => prev + 1);
  const decreaseQuantity = () =>
    setQuantity((prev) => (prev > 1 ? prev - 1 : 1));
  const handleQuantityChange = (e) => {
    const value = parseInt(e.target.value) || 1;
    setQuantity(value < 1 ? 1 : value);
  };

  if (!product)
    return <p className="text-white text-center mt-10">Chargement...</p>;

  const renderStars = (rating) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        i <= rating ? (
          <FaStar key={i} className="text-yellow-400" />
        ) : (
          <FaRegStar key={i} className="text-yellow-400" />
        )
      );
    }
    return stars;
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      className="container mx-auto px-4 sm:px-6 py-10 mt-[5vh]"
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
        <motion.div
          className="relative space-y-4"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <div className="relative overflow-hidden rounded-2xl shadow-2xl bg-[#1A1A1A] group">
            <motion.img
              src={product.image || "/path/to/default-image.jpg"}
              alt={product.title}
              className="w-full h-96 object-cover rounded-2xl transform group-hover:scale-105 transition-transform duration-500"
            />
            <div className="absolute top-4 right-4 flex space-x-2">
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => setIsFavorite(!isFavorite)}
                className="bg-black/50 backdrop-blur-sm rounded-full p-3 text-white hover:text-white transition-colors duration-300"
              >
                <FaHeart
                  className={`text-xl ${isFavorite ? "text-white" : ""}`}
                />
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="bg-black/50 backdrop-blur-sm rounded-full p-3 text-white hover:text-white transition-colors duration-300"
              >
                <FaShareAlt className="text-xl" />
              </motion.button>
            </div>
            <div className="absolute bottom-4 left-4 bg-black/50 backdrop-blur-sm rounded-full px-3 py-1">
              <span className="text-white text-sm">1/3</span>
            </div>
          </div>
          <div className="grid grid-cols-3 gap-4">
            {[1, 2, 3].map((index) => (
              <motion.div
                key={index}
                whileHover={{ scale: 1.05 }}
                className={`relative overflow-hidden rounded-xl cursor-pointer ${
                  selectedImage === index - 1 ? "ring-2 ring-white" : ""
                }`}
                onClick={() => setSelectedImage(index - 1)}
              >
                <img
                  src={product.image || "/path/to/default-image.jpg"}
                  alt={`Vue ${index}`}
                  className="w-full h-24 object-cover"
                />
              </motion.div>
            ))}
          </div>
        </motion.div>

        <motion.div
            className="text-white space-y-8"
            initial={{opacity: 0, x: 20}}
            animate={{opacity: 1, x: 0}}
            transition={{duration: 0.8, delay: 0.4}}
        >
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <span className="flex items-center bg-indigo-700 text-white px-4 py-1.5 rounded-full text-sm font-medium shadow-md">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24"
                     stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                        d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"/>
                </svg>
                Nouveau
              </span>
              <span
                  className="flex items-center bg-emerald-800 text-white px-4 py-1.5 rounded-full text-sm font-medium shadow-md">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24"
                     stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7"/>
                </svg>
                En stock
              </span>
            </div>
            <h1 className="text-4xl sm:text-5xl font-bold text-white">
              {product.title}
            </h1>
            <div className="flex items-center flex-wrap gap-3">
              <p className="text-3xl sm:text-4xl font-semibold text-yellow-500">
                ${product.price}
              </p>
              <span className="text-gray-400 line-through text-lg">
              ${(product.price * 1.2).toFixed(2)}
            </span>
                      <span className="bg-red-600 text-white px-4 py-1.5 rounded-full text-sm font-medium shadow-md">
              -20%
            </span>
            </div>
            <p className="text-[#CCCCCC] text-lg leading-relaxed mt-2">
              {product.description}
            </p>
          </div>

          <div className="flex items-center space-x-4 bg-[#1A1A1A] p-4 rounded-xl backdrop-blur-sm">
            <div className="flex">{renderStars(product.rating)}</div>
            <span className="text-[#CCCCCC]">({product.rating}/5)</span>
            <span className="text-[#666666]">|</span>
            <span className="text-white">12 avis</span>
          </div>

          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-4 sm:space-y-0 sm:space-x-6">
              <label htmlFor="quantity" className="text-[#CCCCCC] text-lg">
                Quantité :
              </label>
              <div
                  className="flex items-center bg-[#1A1A1A] rounded-xl overflow-hidden border border-[#2A2A2A] shadow-lg backdrop-blur-sm">
                <motion.button
                    whileHover={{backgroundColor: "#2A2A2A"}}
                    whileTap={{scale: 0.95}}
                    onClick={decreaseQuantity}
                    className="px-4 py-2 text-white transition-colors duration-200 focus:outline-none"
                    aria-label="Diminuer la quantité"
                >
                  -
                </motion.button>
                <input
                    id="quantity"
                    type="text"
                    min="1"
                    value={quantity}
                    onChange={handleQuantityChange}
                    className="w-16 text-center py-2 bg-transparent text-white border-none focus:outline-none appearance-none"
                    style={{
                      MozAppearance: "textfield",
                      WebkitAppearance: "none",
                    }}
                />
                <motion.button
                    whileHover={{backgroundColor: "#2A2A2A"}}
                    whileTap={{scale: 0.95}}
                    onClick={increaseQuantity}
                    className="px-4 py-2 text-white transition-colors duration-200 focus:outline-none"
                    aria-label="Augmenter la quantité"
                >
                  +
                </motion.button>
              </div>
            </div>

            <motion.button
                whileHover={{scale: 1.02}}
                whileTap={{scale: 0.98}}
                onClick={handleAddToCart}
                className="w-full sm:w-auto px-8 py-4 bg-[#FFB800] text-black rounded-3xl shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center space-x-2 group"
            >
              <FaShoppingCart className="text-xl group-hover:rotate-12 transition-transform duration-300"/>
              <span>Ajouter au panier</span>
            </motion.button>
          </div>

          <div className="grid grid-cols-3 gap-4 pt-6 border-t border-[#2A2A2A]">
            <motion.div
                whileHover={{y: -5}}
                className="flex flex-col items-center space-y-2 p-4 bg-[#1A1A1A] rounded-xl backdrop-blur-sm"
            >
              <FaTruck className="text-2xl text-blue-300"/>
              <span className="text-sm text-[#CCCCCC]">Livraison gratuite</span>
            </motion.div>
            <motion.div
                whileHover={{y: -5}}
                className="flex flex-col items-center space-y-2 p-4 bg-[#1A1A1A] rounded-xl backdrop-blur-sm"
            >
              <FaShieldAlt className="text-2xl text-green-500"/>
              <span className="text-sm text-[#CCCCCC]">Garantie 2 ans</span>
            </motion.div>
            <motion.div
                whileHover={{y: -5}}
                className="flex flex-col items-center space-y-2 p-4 bg-[#1A1A1A] rounded-xl backdrop-blur-sm"
            >
              <FaExchangeAlt className="text-2xl text-purple-600"/>
              <span className="text-sm text-[#CCCCCC]">Retour facile</span>
            </motion.div>
          </div>

          <div className="flex justify-center sm:justify-start space-x-6 pt-6">
            <motion.div
                whileHover={{scale: 1.1, y: -5}}
                whileTap={{scale: 0.9}}
            >
              <FaPaypal className="text-5xl text-blue-500"/>
            </motion.div>
            <motion.div
                whileHover={{scale: 1.1, y: -5}}
                whileTap={{scale: 0.9}}
            >
              <FaCcVisa className="text-5xl text-green-500"/>
            </motion.div>
            <motion.div
                whileHover={{scale: 1.1, y: -5}}
                whileTap={{scale: 0.9}}
            >
              <FaCcMastercard className="text-5xl text-red-600"/>
            </motion.div>
            <motion.div
                whileHover={{scale: 1.1, y: -5}}
                whileTap={{scale: 0.9}}
            >
              <FaApplePay className="text-5xl text-white"/>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default ProductDetaille;
