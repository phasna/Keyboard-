import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import axios from "axios";
import { motion } from "framer-motion";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";

const ProductCard = ({ product, onAddToCart }) => {
  const renderStars = (rating) => {
    return [...Array(5)].map((_, i) => (
      <svg
        key={i}
        xmlns="http://www.w3.org/2000/svg"
        fill={i < rating ? "#FFB800" : "#D1D5DB"}
        viewBox="0 0 24 24"
        width="14"
        height="14"
        className="mr-0.5"
      >
        <path d="M12 17.27L18.18 21 16.54 13.97 22 9.24l-6.91-.59L12 2 8.91 8.65 2 9.24l5.46 4.73L5.82 21z" />
      </svg>
    ));
  };

  return (
    <motion.div
      className="bg-[#1E1E1E] rounded-2xl overflow-hidden shadow-lg border border-gray-800"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      whileTap={{ scale: 0.98 }}
    >
      <div className="relative">
        <Link to={`/product/${product.id}`} className="block">
          <div className="relative h-48">
            <img
              src={product.image}
              alt={product.title}
              className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-300"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />
          </div>
        </Link>
        <div className="absolute bottom-0 left-0 right-0 p-3">
          <h3 className="text-white text-base font-semibold mb-1 line-clamp-2 leading-tight">
            {product.title}
          </h3>
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-1">
              {renderStars(product.rating)}
              <span className="text-gray-400 text-xs ml-1">
                ({product.rating})
              </span>
            </div>
            <p className="text-white text-lg font-bold">${product.price}</p>
          </div>
        </div>
      </div>
      <div className="p-3">
        <button
          onClick={() => onAddToCart(product)}
          className="w-full bg-[#FFB800] text-black font-medium py-2.5 rounded-xl hover:bg-[#FFA500] transition-all duration-300 active:scale-[0.98] shadow-md hover:shadow-lg"
        >
          Ajouter au panier
        </button>
      </div>
    </motion.div>
  );
};

const ProductGrid = () => {
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOption, setSortOption] = useState("other");

  useEffect(() => {
    const getProducts = async () => {
      try {
        const response = await axios.get("http://localhost:8000/api/products");
        setProducts(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    getProducts();
  }, []);

  const handleAddToCart = (product) => {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    const existingProduct = cart.find((item) => item.id === product.id);
    if (existingProduct) {
      existingProduct.quantity += 1;
    } else {
      product.quantity = 1;
      cart.push(product);
    }
    localStorage.setItem("cart", JSON.stringify(cart));

    Swal.fire({
      position: "top-end",
      icon: "success",
      title: `${product.title} a été ajouté au panier`,
      showConfirmButton: false,
      timer: 2000,
      toast: true,
      background: "#1a1a1a",
      color: "#fff",
    });
  };

  const filteredProducts = products
    .filter((product) =>
      product.title.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .sort((a, b) => {
      if (sortOption === "ascending") {
        return a.price - b.price;
      } else if (sortOption === "descending") {
        return b.price - a.price;
      } else {
        return 0;
      }
    });

  return (
    <div className="min-h-screen bg-[#121212] pt-14">
      <div className="sticky top-0 z-10 bg-[#121212] border-b border-gray-800">
        <div className="px-3 py-3">
          <div className="flex flex-col space-y-2">
            <div className="relative">
              <input
                type="text"
                placeholder="Rechercher un produit..."
                className="w-full pl-10 pr-4 py-2.5 bg-[#1E1E1E] border border-gray-800 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#FFB800] focus:border-transparent text-sm"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <svg
                className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-500"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </div>
            <select
              value={sortOption}
              onChange={(e) => setSortOption(e.target.value)}
              className="w-full px-3 py-2.5 bg-[#1E1E1E] border border-gray-800 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-[#FFB800] focus:border-transparent text-sm"
            >
              <option value="other">Trier par prix</option>
              <option value="ascending">Prix Croissant</option>
              <option value="descending">Prix Décroissant</option>
            </select>
          </div>
        </div>
      </div>

      <div className="px-3 py-4">
        <motion.div
          className="grid grid-cols-1 gap-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
        >
          {filteredProducts.length > 0 ? (
            filteredProducts.map((product, index) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.5,
                  delay: index * 0.1,
                  ease: "easeOut",
                }}
              >
                <ProductCard product={product} onAddToCart={handleAddToCart} />
              </motion.div>
            ))
          ) : (
            <div className="text-center py-8">
              <p className="text-gray-400 text-base">
                Aucun produit disponible
              </p>
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
};

ProductCard.propTypes = {
  product: PropTypes.shape({
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    rating: PropTypes.number.isRequired,
  }).isRequired,
  onAddToCart: PropTypes.func.isRequired,
};

export default ProductGrid;
