import { motion } from "framer-motion";
import ImageBackground from '../../assets/ImageAccueil/img.png'; // Assurez-vous que le chemin est correct

const FloatingBubbles = () => {
    const bubbles = Array.from({ length: 10 }); // Nombre de bulles

    return (
        <div className="absolute w-full h-full top-0 left-0 overflow-hidden">
            {bubbles.map((_, i) => {
                const size = Math.random() * 50 + 20;
                return (
                    <motion.div
                        key={i}
                        className="absolute bg-white bg-opacity-60 blur-lg rounded-full"
                        style={{
                            width: size,
                            height: size,
                            top: `${Math.random() * 100}%`,
                            left: `${Math.random() * 100}%`,
                        }}
                        animate={{
                            y: [0, -100, 0],
                            x: [0, 50, -50, 0],
                            opacity: [0.3, 0.6, 0.3],
                        }}
                        transition={{
                            duration: Math.random() * 5 + 3,
                            repeat: Infinity,
                            ease: "easeInOut",
                        }}
                    />
                );
            })}
        </div>
    );
};

const FullScreenPage = () => {
    return (
        <div className="relative w-full h-screen bg-gradient-to-r from-zinc-900 via-gray-900 to-black overflow-hidden">
            {/* Effet de bulles animées */}
            <FloatingBubbles />

            {/* Contenu Texte Centré avec animation d'apparition */}
            <motion.div
                className="absolute top-40 left-0 right-0 text-center"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 1.5, ease: "easeOut" }}
            >
                <h1 className="text-4xl sm:text-6xl md:text-7xl text-white mt-10">
                    <span className="font-medium bg-gradient-to-r from-white via-gray-400 to-gray-600 text-transparent bg-clip-text">
                        PA.Keyboard Mondial <br />
                    </span>
                </h1>
                <div className={"flex justify-center items-center w-full"}>
                <p className={"text-gray-500 text-2xl font-light w-1/3 mt-5"}>
                    Notre produit les plus vendu sur le site internet , ici on vous parle de notre qualiter notre commencement !
                </p>
                </div>
            </motion.div>

            {/* Dégradé noir en bas */}
            <div className="absolute bottom-0 w-full h-32 bg-gradient-to-t from-black to-transparent"></div>

            {/* Image en bas de l'écran sans modifier la position */}
            <motion.img
                src={ImageBackground}
                alt="Background"
                className="absolute left-52 top-52 transform -translate-x-1/2 w-full lg:w-3/4 md:w-1/2 h-auto object-cover"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 1.5, ease: "easeOut", delay: 0.5 }}
            />
        </div>
    );
};

export default FullScreenPage;
