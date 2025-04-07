import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const AnimatedTitle = () => {
  const titles = ["Réactivité", "Puissance", "Performance"];
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prevIndex) => (prevIndex + 1) % titles.length);
    }, 3000); // Changement toutes les 3 secondes

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex flex-col items-center justify-center lg:h-[70vh] h-screen text-center">
      {/* Titre fixe */}
      <h1 className="lg:text-7xl text-5xl font-bold bg-gradient-to-r from-white via-gray-500 to-gray-100 bg-clip-text text-transparent">
        Claviers Gaming
      </h1>

      {/* Titre animé */}
      <motion.h2
        key={index}
        className="lg:text-7xl text-5xl font-bold text-white mt-4"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.6 }}
      >
        {titles[index]}
      </motion.h2>
      <p className={"text-white lg:w-1/3 mt-14 lg:px-0 px-5 font-light"}>
        Notre société conçoit des claviers gaming performants et innovants,
        alliant réactivité, confort et durabilité.
      </p>
      <Link to={"/shop"}>
        <button className="rounded-2xl bg-transparent border-2 text-white hover:text-black w-72 mt-14 px-3 py-5 relative overflow-hidden transition-all duration-300 before:absolute before:inset-0 before:bg-gradient-to-r before:from-zinc-100 before:to-white before:w-0 before:h-full before:transition-all before:duration-700 hover:before:w-full">
          <span className="relative z-10">Acheter</span>
        </button>
      </Link>
    </div>
  );
};

export default AnimatedTitle;
