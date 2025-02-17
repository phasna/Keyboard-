import { FaFacebook, FaInstagram, FaTwitter, FaLinkedin } from "react-icons/fa";
import Logo from "../assets/Logo/Logo_01.png";

const Footer = () => {
    return (
        <footer className="bg-white bg-opacity-15 text-white py-10">
            <div className="container mx-auto px-10">
                <div className={"flex justify-center items-center mb-10"}>
                <img src={Logo} className={"w-32"}/>
                </div>
                <div className={"text-left"}>
                <div className=" gap-8 text-center">

                    {/* Liens rapides */}
                    <div>
                        <h3 className="text-xl font-semibold mb-4 text-white">Liens rapides</h3>
                        <ul className="space-x-2 flex flex-row justify-center items-center">
                            <li><a href="#" className="hover:text-green-300">Accueil</a></li>
                            <li><a href="#" className="hover:text-green-300">Produits</a></li>
                            <li><a href="#" className="hover:text-green-300">Contact</a></li>
                            <li><a href="#" className="hover:text-green-300">À propos</a></li>
                        </ul>
                    </div>

                </div>
                </div>
                {/* Réseaux sociaux */}
                <div>
                    <div className="absolute right-44 flex space-x-4 mb-10">
                        <a href="#" className="hover:text-green-300"><FaFacebook size={24}/></a>
                        <a href="#" className="hover:text-green-300"><FaInstagram size={24}/></a>
                        <a href="#" className="hover:text-green-300"><FaTwitter size={24}/></a>
                        <a href="#" className="hover:text-green-300"><FaLinkedin size={24}/></a>
                    </div>
                </div>

                {/* Copyright */}
                <div className="text-center text-gray-500 mt-8 border-t border-gray-700 pt-4">
                    &copy; {new Date().getFullYear()} PA N°1 KEYBOARD - Tous droits réservés.
                </div>
            </div>
        </footer>
    );
};

export default Footer;
