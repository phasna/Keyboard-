import { FaUser, FaEnvelope} from 'react-icons/fa';
import { motion } from 'framer-motion';
import Bg from "../../assets/Contact/bg_01.png";
import Image_01 from "../../assets/Contact/Accueil.jpg";

export default function ContactForm() {
    return (
        <div>
            <h1 className={"text-5xl text-center font-light text-white z-50 mt-20 "}>
                CONTACT NOUS
            </h1>
            <div className={"flex justify-center items-center"}>
            <p className={"border-b-2 mt-5 w-1/4 "}></p>
            </div>
    <div className="relative w-full h-screen bg-black flex items-center justify-center overflow-hidden">
    {/* Background Animation */}
            {/*<div className="absolute inset-0 bg-cover bg-fixed animate-slideBg" style={{ backgroundImage: `url(${Bg})` }}></div>*/}

            {/* Form Section */}
            <div className="flex w-3/4 h-4/5 bg-black bg-opacity-40 backdrop-blur-lg shadow-2xl rounded-3xl overflow-hidden  border-transparent hover:border-rgb-animated relative">

                {/* Left Section: Image */}
                <div className="w-1/2 relative">
                    <img
                        src={Image_01}
                        alt="Contact"
                        className="w-full h-full object-cover rounded-l-xl"
                    />
                </div>

                {/* Right Section: Contact Form */}
                <motion.div
                    className="w-1/2 p-12 flex flex-col justify-center text-white"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 1 }}
                >
                    <h2 className="text-4xl font-extrabold mb-6 text-gray-200">Écrivez-nous !</h2>
                    <p className="text-gray-400 mb-6">Avez vous des questions a nous poser sur notre produits, écrivez nous et rentrer des vos coordonnées pour qu'on puisse vous recontacter. </p>
                    <form>
                        <div className="mb-4">
                            <label className="block text-gray-300 font-semibold mb-2" htmlFor="name">Nom</label>
                            <div className="flex items-center bg-gray-800 p-3 rounded-lg">
                                <FaUser className="text-gray-500 mr-3" />
                                <input
                                    type="text"
                                    id="name"
                                    className="w-full bg-transparent text-white outline-none"
                                    placeholder="Nom"
                                />
                            </div>
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-300 font-semibold mb-2" htmlFor="email">Email</label>
                            <div className="flex items-center bg-gray-800 p-3 rounded-lg">
                                <FaEnvelope className="text-gray-500 mr-3" />
                                <input
                                    type="email"
                                    id="email"
                                    className="w-full bg-transparent text-white outline-none"
                                    placeholder="Email"
                                />
                            </div>
                        </div>
                        <div className="mb-6">
                            <label className="block text-gray-300 font-semibold mb-2" htmlFor="message">Message</label>
                            <textarea
                                id="message"
                                className="w-full bg-gray-800 text-white p-3 rounded-lg outline-none"
                                placeholder="Your Message"
                                rows="4"
                            />
                        </div>
                        <div className={"flex justify-end"}>
                        <motion.button
                            type="submit"
                            className="w-1/3 bg-blue-500 text-white font-bold py-3 px-4 rounded-lg hover:bg-blue-600 transition-transform duration-300 transform hover:scale-105 shadow-lg">
                            Envoyer
                        </motion.button>
                        </div>
                    </form>
                </motion.div>
            </div>

            {/* Custom CSS for RGB and Circular Light Border Animation */}
            <style jsx>{`
                /* Circular animation and glowing effect */
                @keyframes circular-glow {
                    0% {
                        box-shadow: 0 0 5px 0 rgba(169, 169, 169, 0.9), 0 0 25px 5px rgba(169, 169, 169, 0.9); /* Grayish color */
                    }
                    50% {
                        box-shadow: 0 0 25px 10px rgba(169, 169, 169, 1), 0 0 50px 15px rgba(169, 169, 169, 0.8); /* Grayish color */
                    }
                    100% {
                        box-shadow: 0 0 5px 0 rgba(169, 169, 169, 0.8), 0 0 25px 5px rgba(169, 169, 169, 0.6); /* Grayish color */
                    }
                }

                /* Glowing effect applied to the form container */
                .hover\\:border-rgb-animated:hover {
                    animation: rgb-animation 1.5s infinite linear, circular-glow 400s infinite alternate;
                    border-radius: 15px; /* Add some rounding to make the glow look smoother */
                }

                .animate-slideBg {
                    animation: slideBg 20s linear infinite;
                }
            `}</style>
        </div>
        </div>

    );
}
