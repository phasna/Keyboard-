import { motion } from "framer-motion";
import Tel from "../../assets/Contact/tel.png";

export default function TextOverlay() {
    return (
        <div
            className="relative w-full h-screen flex items-center justify-start bg-gradient-to-r from-zinc-900 via-gray-900 to-black overflow-hidden">
            <div className="absolute top-40 right-0 w-1/5 h-64 bg-blue-600  opacity-30 rounded-full blur-3xl"></div>
            <div className="absolute left-0 top-40 w-40 h-40 bg-purple-600 opacity-30 rounded-full blur-3xl"></div>
            <div className="absolute bottom-0 right-0 w-40 h-40 bg-purple-600  opacity-30 rounded-full blur-3xl"></div>
            <div className={"container mx-auto "}>
                <div>
                    <motion.div
                        initial={{opacity: 0, y: 50}}
                        animate={{opacity: 1, y: 0}}
                        transition={{duration: 0.8, ease: "easeOut"}}
                        className="absolute right-10 bottom-20"
                    >
                        <motion.img
                            src={Tel}
                            alt="Sample Image"
                            className="w-full"
                            animate={{y: [0, -10, 0]}}
                            transition={{repeat: Infinity, duration: 2, ease: "easeInOut"}}
                        />
                    </motion.div>
                    <motion.div
                        initial={{opacity: 0, y: 50}}
                        animate={{opacity: 1, y: 0}}
                        transition={{duration: 1, ease: "easeOut"}}
                        className="relative text-left text-white p-4 mt-20 ml-5 space-y-8"
                    >
                        <h1 className="text-7xl font-light drop-shadow-lg">Des questions à nous poser ?</h1>
                        <p className="text-lg mt-2 drop-shadow-md">
                            Nous traitons votre message très rapidement !
                        </p>
                        <button
                            className="w-1/5 mt-5 py-3 text-lg font-semibold rounded-xl transition-all duration-500 bg-transparent border-2 border-white hover:bg-white hover:text-black">
                            Retour Accueil
                        </button>
                    </motion.div>
                </div>
            </div>
        </div>
    );
}
