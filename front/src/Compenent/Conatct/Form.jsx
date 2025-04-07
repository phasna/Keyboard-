import { FaUser, FaEnvelope, FaPaperPlane } from "react-icons/fa";
import { motion } from "framer-motion";
import Bg from "../../assets/Contact/bg_01.png";
import Image_01 from "../../assets/Contact/Accueil.jpg";

export default function ContactForm() {
  const inputVariants = {
    focus: { scale: 1.02, transition: { duration: 0.3 } }
  };

  return (
      <div className="bg-black min-h-screen">
        <motion.h1
            className="text-5xl text-center font-light text-white pt-20 tracking-wider"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
        >
          CONTACTEZ-NOUS
        </motion.h1>

        <div className="flex justify-center items-center">
          <motion.div
              className="border-b-2 border-yellow-500 mt-5 w-24"
              initial={{ width: 0 }}
              animate={{ width: "6rem" }}
              transition={{ duration: 0.8, delay: 0.3 }}
          ></motion.div>
        </div>

        <div className="relative w-full min-h-screen flex items-center justify-center py-16">
          {/* Background gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-b from-black via-gray-900 to-black opacity-80"></div>

          {/* Form Container */}
          <motion.div
              className="flex w-4/5 lg:w-3/4 xl:max-w-6xl h-auto bg-gray-900 bg-opacity-50 backdrop-blur-lg shadow-2xl rounded-3xl overflow-hidden border border-gray-800 relative z-10"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
          >
            {/* Left Section: Image with overlay */}
            <div className="hidden md:block w-1/2 relative">
              <div className="absolute inset-0 bg-gradient-to-r from-black to-transparent opacity-40 z-10"></div>
              <img
                  src={Image_01}
                  alt="Contact"
                  className="w-full h-full object-cover"
              />
              <div className="absolute bottom-0 left-0 p-8 z-20">
                <h3 className="text-3xl font-bold text-white mb-4">Restons connectés</h3>
                <p className="text-gray-300 mb-6 max-w-xs">Notre équipe est toujours prête à vous répondre dans les plus brefs délais.</p>
              </div>
            </div>

            {/* Right Section: Contact Form */}
            <motion.div
                className="w-full md:w-1/2 p-8 md:p-12 flex flex-col justify-center text-white"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1, delay: 0.5 }}
            >
              <h2 className="text-4xl font-bold mb-3 text-white">
                Écrivez-nous !
              </h2>
              <p className="text-gray-400 mb-8">
                Des questions sur nos produits ? Laissez-nous vos coordonnées et nous vous recontacterons rapidement.
              </p>

              <form className="space-y-6">
                {/* Nom field */}
                <motion.div
                    whileFocus="focus"
                    variants={inputVariants}
                >
                  <label
                      className="block text-gray-300 font-medium mb-2"
                      htmlFor="name"
                  >
                    Nom
                  </label>
                  <div className="flex items-center bg-gray-800 bg-opacity-50 p-4 rounded-xl border border-gray-700 focus-within:border-yellow-500 transition-all duration-300">
                    <FaUser className="text-yellow-500 mr-3" />
                    <input
                        type="text"
                        id="name"
                        className="w-full bg-transparent text-white outline-none"
                        placeholder="Votre nom"
                    />
                  </div>
                </motion.div>

                {/* Email field */}
                <motion.div
                    whileFocus="focus"
                    variants={inputVariants}
                >
                  <label
                      className="block text-gray-300 font-medium mb-2"
                      htmlFor="email"
                  >
                    Email
                  </label>
                  <div className="flex items-center bg-gray-800 bg-opacity-50 p-4 rounded-xl border border-gray-700 focus-within:border-yellow-500 transition-all duration-300">
                    <FaEnvelope className="text-yellow-500 mr-3" />
                    <input
                        type="email"
                        id="email"
                        className="w-full bg-transparent text-white outline-none"
                        placeholder="Votre email"
                    />
                  </div>
                </motion.div>

                {/* Message field */}
                <motion.div
                    whileFocus="focus"
                    variants={inputVariants}
                >
                  <label
                      className="block text-gray-300 font-medium mb-2"
                      htmlFor="message"
                  >
                    Message
                  </label>
                  <div className="bg-gray-800 bg-opacity-50 p-4 rounded-xl border border-gray-700 focus-within:border-yellow-500 transition-all duration-300">
                  <textarea
                      id="message"
                      className="w-full bg-transparent text-white outline-none"
                      placeholder="Votre message"
                      rows="5"
                  />
                  </div>
                </motion.div>

                {/* Submit button */}
                <div className="flex justify-end mt-8">
                  <motion.button
                      type="submit"
                      className="flex items-center justify-center bg-yellow-500 text-black font-bold py-3 px-20 rounded-xl hover:bg-yellow-400 transition-all duration-300 shadow-lg group"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                  >
                    <span>Envoyer</span>
                    <FaPaperPlane className="ml-2 transform group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-300" />
                  </motion.button>
                </div>
              </form>

            </motion.div>
          </motion.div>

          {/* Decorative elements */}
          <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-yellow-500 rounded-full filter blur-3xl opacity-10 animate-pulse"></div>
          <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-blue-500 rounded-full filter blur-3xl opacity-10 animate-pulse"></div>
        </div>

        {/* Custom CSS for subtle animations */}
        <style jsx>{`
        @keyframes pulse-glow {
          0% {
            box-shadow: 0 0 15px 0 rgba(245, 158, 11, 0.3);
          }
          50% {
            box-shadow: 0 0 30px 10px rgba(245, 158, 11, 0.5);
          }
          100% {
            box-shadow: 0 0 15px 0 rgba(245, 158, 11, 0.3);
          }
        }

        input:focus, textarea:focus {
          animation: pulse-glow 2s infinite ease-in-out;
        }
      `}</style>
      </div>
  );
}