import { useEffect, useState, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { motion, AnimatePresence } from "framer-motion";
import Swal from "sweetalert2";
import {
  FaPaypal,
  FaCcVisa,
  FaCcMastercard,
  FaApplePay,
  FaArrowLeft,
  FaShare,
  FaInfoCircle,
  FaShoppingCart,
  FaHeart,
  FaStar,
  FaRegStar,
  FaTruck,
  FaShieldAlt,
  FaExchangeAlt,
  FaChevronRight,
  FaChevronLeft,
  FaExpand,
  FaCompress,
} from "react-icons/fa";

const ProductDetaille = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [isWishlist, setIsWishlist] = useState(false);
  const [showInfo, setShowInfo] = useState(false);
  const [activeTab, setActiveTab] = useState("description");
  const [zoomImage, setZoomImage] = useState(false);
  const [showFullscreen, setShowFullscreen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [showAddToCartSuccess, setShowAddToCartSuccess] = useState(false);
  const quantityInputRef = useRef(null);

  const productImages = [
    product?.image || "/path/to/default-image.jpg",
    "/path/to/alternative-image-1.jpg",
    "/path/to/alternative-image-2.jpg",
  ];

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8000/api/products/${id}`
        );
        setProduct(response.data);
      } catch (error) {
        console.error("Erreur lors de la récupération du produit :", error);
      }
    };

    fetchProduct();
  }, [id]);

  const handleQuantityChange = (e) => {
    const value = parseInt(e.target.value) || 1;
    setQuantity(Math.max(1, Math.min(value, product?.stock || 10)));
  };

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
    setShowAddToCartSuccess(true);
    setTimeout(() => setShowAddToCartSuccess(false), 3000);
  };

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % productImages.length);
  };

  const prevImage = () => {
    setCurrentImageIndex(
      (prev) => (prev - 1 + productImages.length) % productImages.length
    );
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
    <div className="min-h-screen bg-black">
      <div className="container mx-auto px-6 py-16">
        {/* Back Button */}
        <motion.button
          onClick={() => navigate(-1)}
          className="mb-8 flex items-center gap-2 text-gray-400 hover:text-white transition-colors"
          whileHover={{ x: -5 }}
        >
          <FaArrowLeft />
          Retour
        </motion.button>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Image Section */}
          <motion.div
            className="relative"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="relative group">
              <motion.img
                src={productImages[currentImageIndex]}
                alt={product?.title}
                className={`w-full h-[600px] object-cover rounded-2xl shadow-2xl cursor-zoom-in transition-transform duration-300 ${
                  zoomImage ? "scale-150" : ""
                }`}
                whileHover={{ scale: 1.02 }}
                onClick={() => setZoomImage(!zoomImage)}
              />

              {/* Image Navigation */}
              <div className="absolute inset-0 flex items-center justify-between px-4 opacity-0 group-hover:opacity-100 transition-opacity">
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={prevImage}
                  className="p-3 bg-black/50 rounded-full backdrop-blur-sm"
                >
                  <FaChevronLeft className="text-2xl text-white" />
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={nextImage}
                  className="p-3 bg-black/50 rounded-full backdrop-blur-sm"
                >
                  <FaChevronRight className="text-2xl text-white" />
                </motion.button>
              </div>

              {/* Image Controls */}
              <div className="absolute top-4 right-4 flex gap-2">
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => setIsWishlist(!isWishlist)}
                  className="p-3 bg-black/50 rounded-full backdrop-blur-sm"
                >
                  <FaHeart
                    className={`text-2xl ${
                      isWishlist ? "text-red-500" : "text-white"
                    }`}
                  />
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => setShowInfo(!showInfo)}
                  className="p-3 bg-black/50 rounded-full backdrop-blur-sm"
                >
                  <FaInfoCircle className="text-2xl text-white" />
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => setShowFullscreen(!showFullscreen)}
                  className="p-3 bg-black/50 rounded-full backdrop-blur-sm"
                >
                  {showFullscreen ? (
                    <FaCompress className="text-2xl text-white" />
                  ) : (
                    <FaExpand className="text-2xl text-white" />
                  )}
                </motion.button>
              </div>
            </div>

            {/* Thumbnails */}
            <div className="flex gap-4 mt-4 overflow-x-auto pb-2">
              {productImages.map((img, index) => (
                <motion.img
                  key={index}
                  src={img}
                  alt={`Thumbnail ${index + 1}`}
                  className={`w-20 h-20 object-cover rounded-lg cursor-pointer transition-all ${
                    currentImageIndex === index
                      ? "ring-2 ring-blue-500 scale-105"
                      : "opacity-50 hover:opacity-100"
                  }`}
                  onClick={() => setCurrentImageIndex(index)}
                  whileHover={{ scale: 1.05 }}
                />
              ))}
            </div>
          </motion.div>

          {/* Product Info Section */}
          <motion.div
            className="text-white space-y-8"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <div>
              <h1 className="text-4xl font-bold mb-4">{product?.title}</h1>
              <div className="flex items-center gap-4 mb-6">
                <div className="flex">{renderStars(product?.rating)}</div>
                <span className="text-gray-400">({product?.rating}/5)</span>
              </div>
              <div className="flex items-center gap-4 mb-6">
                <p className="text-3xl font-bold text-yellow-500">
                  ${product?.price}
                </p>
                <span className="text-gray-400 line-through">
                  ${(product?.price * 1.2).toFixed(2)}
                </span>
                <span className="bg-red-500 text-white px-2 py-1 rounded">
                  -20%
                </span>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="flex gap-4">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleAddToCart}
                className="flex-1 py-4 bg-yellow-500 text-black rounded-xl font-medium text-lg flex items-center justify-center gap-3 hover:from-blue-700 hover:to-blue-900 transition-all duration-300"
              >
                <FaShoppingCart />
                Ajouter au panier
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="p-4 bg-gray-800 rounded-xl hover:bg-gray-700 transition-colors"
              >
                <FaShare className="text-xl" />
              </motion.button>
            </div>

            {/* Features */}
            <div className="grid grid-cols-3 gap-4">
              <motion.div
                whileHover={{ y: -5 }}
                className="bg-gray-800/50 p-4 rounded-xl text-center cursor-pointer"
              >
                <FaTruck className="text-2xl text-blue-400 mx-auto mb-2" />
                <p className="text-sm text-gray-300">Livraison gratuite</p>
              </motion.div>
              <motion.div
                whileHover={{ y: -5 }}
                className="bg-gray-800/50 p-4 rounded-xl text-center cursor-pointer"
              >
                <FaShieldAlt className="text-2xl text-green-400 mx-auto mb-2" />
                <p className="text-sm text-gray-300">Garantie 2 ans</p>
              </motion.div>
              <motion.div
                whileHover={{ y: -5 }}
                className="bg-gray-800/50 p-4 rounded-xl text-center cursor-pointer"
              >
                <FaExchangeAlt className="text-2xl text-purple-400 mx-auto mb-2" />
                <p className="text-sm text-gray-300">Retours gratuits</p>
              </motion.div>
            </div>

            {/* Quantity Selector */}
            <div className="bg-gray-800/50 p-6 rounded-xl border border-gray-700/50">
              <div className="flex items-center justify-between mb-4">
                <label className="text-gray-300 text-lg font-medium">
                  Quantité :
                </label>
                <span className="text-gray-400 text-sm bg-gray-800/50 px-3 py-1 rounded-full">
                  Stock : {product?.stock || 10}
                </span>
              </div>

              <div className="flex flex-col gap-4">
                <div className="flex items-center justify-center">
                  <div className="flex items-center bg-gray-800 rounded-xl overflow-hidden border border-gray-700 shadow-lg">
                    <motion.button
                      whileHover={{
                        scale: 1.05,
                        backgroundColor: "rgba(55, 65, 81, 0.5)",
                      }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="px-6 py-4 text-white hover:bg-gray-700 transition-all duration-200 flex items-center justify-center relative group"
                      disabled={quantity <= 1}
                    >
                      <span className="text-xl font-bold">-</span>
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-gray-700/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    </motion.button>

                    <div className="relative">
                      <input
                        ref={quantityInputRef}
                        type="number"
                        min="1"
                        max={product?.stock || 10}
                        value={quantity}
                        onChange={handleQuantityChange}
                        className="w-24 text-center py-4 bg-gray-800 text-white border-none focus:outline-none text-lg font-medium appearance-none"
                        style={{
                          WebkitAppearance: "none",
                          MozAppearance: "textfield",
                        }}
                      />
                      <div className="absolute inset-0 pointer-events-none border-l border-r border-gray-700" />
                    </div>

                    <motion.button
                      whileHover={{
                        scale: 1.05,
                        backgroundColor: "rgba(55, 65, 81, 0.5)",
                      }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() =>
                        setQuantity(
                          Math.min(product?.stock || 10, quantity + 1)
                        )
                      }
                      className="px-6 py-4 text-white hover:bg-gray-700 transition-all duration-200 flex items-center justify-center relative group"
                      disabled={quantity >= (product?.stock || 10)}
                    >
                      <span className="text-xl font-bold">+</span>
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-gray-700/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    </motion.button>
                  </div>
                </div>

                {/* Progress Bar with Animation */}
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-xs text-gray-400">
                      Quantité sélectionnée
                    </span>
                    <span className="text-xs font-medium text-blue-400">
                      {quantity}
                    </span>
                  </div>
                  <div className="h-2 bg-gray-700 rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{
                        width: `${(quantity / (product?.stock || 10)) * 100}%`,
                      }}
                      transition={{ duration: 0.5, ease: "easeOut" }}
                      className="h-full bg-gradient-to-r from-blue-500 to-blue-600 relative"
                    >
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-shimmer" />
                    </motion.div>
                  </div>
                  <div className="flex justify-between text-xs">
                    <span className="text-gray-400">Min: 1</span>
                    <span className="text-gray-400">
                      Max: {product?.stock || 10}
                    </span>
                  </div>
                </div>

                {/* Quick Add Buttons */}
                <div className="grid grid-cols-3 gap-2">
                  {[1, 2, 5].map((value) => (
                    <motion.button
                      key={value}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() =>
                        setQuantity(Math.min(product?.stock || 10, value))
                      }
                      className="py-2 px-4 bg-gray-800/50 text-gray-300 rounded-lg text-sm font-medium hover:bg-gray-700 transition-colors"
                    >
                      {value}
                    </motion.button>
                  ))}
                </div>
              </div>
            </div>

            {/* Tabs */}
            <div className="bg-gray-800/50 rounded-xl overflow-hidden">
              <div className="flex border-b border-gray-700">
                {["description", "specifications", "reviews"].map((tab) => (
                  <motion.button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`flex-1 py-4 px-6 text-center transition-colors ${
                      activeTab === tab
                        ? "text-white border-b-2 border-blue-500"
                        : "text-gray-400 hover:text-white"
                    }`}
                    whileHover={{ y: -2 }}
                  >
                    {tab.charAt(0).toUpperCase() + tab.slice(1)}
                  </motion.button>
                ))}
              </div>
              <div className="p-6">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeTab}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.3 }}
                  >
                    {activeTab === "description" && (
                      <p className="text-gray-300">{product?.description}</p>
                    )}
                    {activeTab === "specifications" && (
                      <div className="grid grid-cols-2 gap-4 text-gray-300">
                        <div>
                          <p className="text-gray-400">Marque</p>
                          <p>{product?.brand || "Générique"}</p>
                        </div>
                        <div>
                          <p className="text-gray-400">Catégorie</p>
                          <p>{product?.category || "Non spécifié"}</p>
                        </div>
                        <div>
                          <p className="text-gray-400">Garantie</p>
                          <p>2 ans</p>
                        </div>
                        <div>
                          <p className="text-gray-400">Livraison</p>
                          <p>Gratuite</p>
                        </div>
                      </div>
                    )}
                    {activeTab === "reviews" && (
                      <div className="space-y-4">
                        {[1, 2, 3].map((review) => (
                          <motion.div
                            key={review}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: review * 0.1 }}
                            className="bg-gray-800 p-4 rounded-lg"
                          >
                            <div className="flex items-center gap-2 mb-2">
                              <div className="flex">{renderStars(4)}</div>
                              <span className="text-gray-400">
                                par Utilisateur {review}
                              </span>
                            </div>
                            <p className="text-gray-300">
                              Excellent produit, je recommande !
                            </p>
                          </motion.div>
                        ))}
                      </div>
                    )}
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>

            {/* Payment Methods */}
            <div className="pt-8 border-t border-gray-800">
              <h3 className="text-gray-400 mb-4">
                Méthodes de paiement acceptées :
              </h3>
              <div className="flex gap-6">
                <motion.div whileHover={{ scale: 1.1, y: -5 }}>
                  <FaPaypal className="text-4xl text-blue-600" />
                </motion.div>
                <motion.div whileHover={{ scale: 1.1, y: -5 }}>
                  <FaCcVisa className="text-4xl text-blue-500" />
                </motion.div>
                <motion.div whileHover={{ scale: 1.1, y: -5 }}>
                  <FaCcMastercard className="text-4xl text-red-600" />
                </motion.div>
                <motion.div whileHover={{ scale: 1.1, y: -5 }}>
                  <FaApplePay className="text-4xl text-white" />
                </motion.div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Success Notification */}
      <AnimatePresence>
        {showAddToCartSuccess && (
          <motion.div
            initial={{ opacity: 0, y: 100 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 100 }}
            className="fixed bottom-8 right-8 bg-green-500 text-white px-6 py-3 rounded-xl shadow-lg"
          >
            Produit ajouté au panier avec succès !
          </motion.div>
        )}
      </AnimatePresence>

      {/* Fullscreen Image Modal */}
      <AnimatePresence>
        {showFullscreen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/90 backdrop-blur-sm flex items-center justify-center z-50"
            onClick={() => setShowFullscreen(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="relative max-w-4xl w-full mx-4"
              onClick={(e) => e.stopPropagation()}
            >
              <img
                src={productImages[currentImageIndex]}
                alt={product?.title}
                className="w-full h-auto max-h-[90vh] object-contain rounded-lg"
              />
              <div className="absolute inset-0 flex items-center justify-between px-4">
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={prevImage}
                  className="p-3 bg-black/50 rounded-full backdrop-blur-sm"
                >
                  <FaChevronLeft className="text-2xl text-white" />
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={nextImage}
                  className="p-3 bg-black/50 rounded-full backdrop-blur-sm"
                >
                  <FaChevronRight className="text-2xl text-white" />
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Info Modal */}
      <AnimatePresence>
        {showInfo && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50"
            onClick={() => setShowInfo(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-gray-800 p-8 rounded-2xl max-w-2xl w-full mx-4"
              onClick={(e) => e.stopPropagation()}
            >
              <h2 className="text-2xl font-bold mb-4">
                Informations sur le produit
              </h2>
              <div className="space-y-4 text-gray-300">
                <p>{product?.description}</p>
                <p>Garantie : 2 ans</p>
                <p>Livraison gratuite sous 2-3 jours ouvrés</p>
                <p>Retours acceptés sous 30 jours</p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ProductDetaille;
