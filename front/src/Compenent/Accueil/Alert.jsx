import { motion } from "framer-motion";
import { useState } from "react";

const CustomAlert = ({ message, type, onClose }) => {
  return (
    <motion.div
      className={`fixed top-5 right-5 p-4 rounded-lg shadow-lg ${
        type === "success" ? "bg-green-500" : "bg-red-500"
      } text-white`}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="flex items-center">
        <span className="mr-2 font-bold">
          {type === "success" ? "Succès!" : "Erreur!"}
        </span>
        <p>{message}</p>
      </div>
      <button className="absolute top-0 right-0 p-2" onClick={onClose}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          className="w-5 h-5 text-white"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M6 18L18 6M6 6l12 12"
          />
        </svg>
      </button>
    </motion.div>
  );
};

export default CustomAlert;
