import { motion } from "framer-motion";
import ImageBackground from '../../assets/ImageAccueil/img.png'; // Assurez-vous que le chemin est correct

const FullScreenPage = () => {
    return (
        <div className="relative w-full h-screen bg-black">

            {/* Contenu Texte Centré avec animation d'apparition */}
            <motion.div
                className="absolute top-40 left-0 right-0 text-center"
                initial={{ opacity: 0, scale: 0.8 }}  // Initialisation : invisible et plus petit
                animate={{ opacity: 1, scale: 1 }}   // Animation : devient visible et taille normale
                transition={{ duration: 1.5, ease: "easeOut" }}  // Transition de 1.5 secondes avec easing
            >
                <h1 className="text-4xl sm:text-6xl md:text-7xl font-bold text-white">
                    <span className="bg-gradient-to-r from-white via-gray-400 to-gray-600 text-transparent bg-clip-text">
                        Bienvenue sur <br />
                    </span>
                    <span className="bg-gradient-to-r from-gray-500 via-gray-300 to-white text-transparent bg-clip-text">
                        notre produit
                    </span>
                </h1>
            </motion.div>

            {/* Image en bas de l'écran sans modifier la position */}
            <motion.img
                src={ImageBackground}
                alt="Background"
                className="absolute left-52 top-40 transform -translate-x-1/2 w-full lg:w-3/4 md:w-1/2 h-auto object-cover"
                initial={{ opacity: 0, scale: 0.8}}  // Initialisation : invisible
                animate={{ opacity: 1, scale: 1 }}   // Animation : devient visible
                transition={{ duration: 1.5, ease: "easeOut", delay: 0.5 }}  // Transition avec léger retard
            />
        </div>
    );
};

export default FullScreenPage;
