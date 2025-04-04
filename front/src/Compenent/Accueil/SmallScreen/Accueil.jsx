import React, { useCallback } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import Image from "../../../assets/Clavier/gaming.png";

const KeyboardCustomizer = () => {
  const navigate = useNavigate();

  // Utilisation de useCallback pour éviter les recréations inutiles de la fonction
  const handleDragEnd = useCallback(
    (_, info) => {
      if (info.point.x >= 190) {
        navigate("/shop");
      }
    },
    [navigate]
  );

  // Création des éléments animés une seule fois en dehors du rendu
  const backgroundBubbles = Array(8)
    .fill(null)
    .map((_, i) => (
      <motion.div
        key={`bubble-${i}`}
        className="absolute w-20 h-20 bg-gradient-to-br from-green-500 via-indigo-600 to-pink-600 rounded-full opacity-15 blur-xl"
        animate={{
          x: [Math.random() * 80 - 40, Math.random() * 80 - 40],
          y: [Math.random() * 200 - 100, Math.random() * 200 - 100],
          scale: [0.6, 1.2, 0.6],
        }}
        transition={{
          repeat: Infinity,
          duration: 5 + i * 0.5,
          ease: "easeInOut",
        }}
      />
    ));

  const floatingParticles = Array(4)
    .fill(null)
    .map((_, i) => (
      <motion.div
        key={`particle-${i}`}
        className="w-1.5 h-1.5 bg-white rounded-full"
        initial={{ opacity: 0, y: 0 }}
        animate={{ opacity: [0, 1, 0], y: -40 }}
        transition={{
          repeat: Infinity,
          duration: 1.8,
          delay: i * 0.3,
          ease: "easeOut",
        }}
      />
    ));

  return (
    <div className="relative flex items-center justify-center min-h-screen bg-gradient-to-t from-black via-gray-900 to-black overflow-hidden">
      {/* Fond animé subtil */}
      <div className="absolute inset-0 pointer-events-none">
        {backgroundBubbles}
      </div>

      {/* Conteneur principal parfaitement centré */}
      <motion.div
        className="relative z-10 flex flex-col items-center justify-center w-full max-w-sm px-6 py-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        {/* Image du clavier avec effet moderne */}
        <motion.div
          className="relative w-full h-auto mb-10"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <img
            src={Image}
            alt="Mechanical Keyboard"
            className="w-full h-full object-contain drop-shadow-[0_15px_30px_rgba(168,85,247,0.6)]"
          />
          <motion.div
            className="absolute inset-0 bg-white opacity-10 rounded-full blur-3xl"
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
          />
        </motion.div>

        {/* Texte centré et percutant */}
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.8 }}
        >
          <h1 className="text-3xl font-extrabold text-white leading-tight">
            VOTRE <span className="text-gray-100">CLAVIER</span>, VOTRE{" "}
            <span className="text-[#FFB800]">STYLE</span>
          </h1>
          <p className="mt-2 text-gray-200 text-sm font-light">
            Créez un chef-d'œuvre personnalisé en quelques clics.
          </p>
        </motion.div>

        {/* Bouton coulissant modernisé */}
        <motion.div
          className="relative w-64 h-14 bg-white rounded-full overflow-hidden shadow-[0_5px_15px_rgba(168,85,247,0.4)]"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.6 }}
        >
          <motion.div
            className="absolute left-1 top-1 bg-black w-12 h-12 rounded-full flex items-center justify-center text-2xl text-white cursor-pointer shadow-md"
            drag="x"
            dragConstraints={{ left: 0, right: 190 }}
            dragElastic={0.1}
            onDragEnd={handleDragEnd}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            →
          </motion.div>
          <span className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 text-black text-sm font-medium">
            VISITE LE SITE
          </span>
        </motion.div>
      </motion.div>

      {/* Particules flottantes */}
      <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-4 pointer-events-none">
        {floatingParticles}
      </div>
    </div>
  );
};

export default KeyboardCustomizer;
