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
        fill={i < rating ? "yellow" : "gray"}
        viewBox="0 0 24 24"
        width="20"
        height="20"
        className="mr-1"
      >
        <path d="M12 17.27L18.18 21 16.54 13.97 22 9.24l-6.91-.59L12 2 8.91 8.65 2 9.24l5.46 4.73L5.82 21z" />
      </svg>
    ));
  };

  return (
    <motion.div
      className="bg-zinc-500 bg-opacity-60 shadow-md rounded-lg overflow-hidden transform transition-transform hover:scale-105 hover:shadow-lg p-5 sm:p-10"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <Link to={`/product/${product.id}`}>
        <img
          src={product.image}
          alt={product.title}
          className="w-full h-40 object-cover"
        />
      </Link>

      <div className="p-4">
        <h3 className="text-lg sm:text-xl font-semibold text-white mb-2">
          {product.title}
        </h3>
        <p className="text-md sm:text-lg font-medium text-white mb-2">
          ${product.price}
        </p>
        <div className="flex justify-start items-center mb-2">
          {renderStars(product.rating)}
        </div>
        <button
          onClick={() => onAddToCart(product)}
          className="w-full py-3 px-4 bg-[#FFB800] text-black rounded-3xl hover:bg-gray-800 mt-3 sm:mt-5"
        >
          Ajouter au panier
        </button>
      </div>
    </motion.div>
  );
};

const ProductGrid = () => {
  const [products, setProducts] = useState([]);

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

  const displayedProducts = products.slice(0, 4);

  return (
    <div className="px-5 sm:px-10 py-10 container mx-auto">
      <h1 className="text-3xl sm:text-5xl text-left font-light text-green-400 mb-6 sm:mb-10 bg-gradient-to-r from-white via-gray-400 to-gray-600 text-transparent bg-clip-text">
        PRODUITS RECOMMANDÉS
      </h1>

      <motion.div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
        {displayedProducts.length > 0 ? (
          displayedProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onAddToCart={handleAddToCart}
            />
          ))
        ) : (
          <p className="text-white text-center">Aucun produit disponible</p>
        )}
      </motion.div>
    </div>
  );
};

export default ProductGrid;
