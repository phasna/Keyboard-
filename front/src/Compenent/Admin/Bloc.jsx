import { useNavigate } from "react-router-dom";
import { useState } from "react";  // Importation de useState
import adminImg from "../../assets/Admin/interface/Admin.png";
import userImg from "../../assets/Admin/interface/User.png";

// Composant pour chaque bloc
const Block = ({ title, image, onClick, altText, active }) => {
    return (
        <div
            className={`bg-white bg-opacity-25 text-white text-center p-10 rounded-2xl cursor-pointer shadow-lg hover:bg-opacity-30 transition flex flex-col items-center ${active ? "bg-opacity-50" : ""}`}
            onClick={onClick}
        >
            <img src={image} alt={altText} className="w-full h-auto mb-4" />
            <h2 className="text-xl font-bold">{title}</h2>
        </div>
    );
};

const Home = () => {
    const navigate = useNavigate();

    // État pour suivre quel bloc est sélectionné
    const [activeBlock, setActiveBlock] = useState(null);  // null signifie aucun bloc sélectionné

    const handleBlockClick = (block) => {
        setActiveBlock(block);  // Met à jour l'état avec le bloc sélectionné
    };

    return (
        <div className="relative flex justify-center items-center h-screen w-screen bg-black overflow-hidden">
            {/* Fond animé */}
            <div className="absolute inset-0">
                {[...Array(10)].map((_, index) => (
                    <div
                        key={index}
                        className="absolute w-56 h-56 bg-blue-800 opacity-50 rounded-full blur-lg animate-bounce"
                        style={{
                            top: `${Math.random() * 100}vh`,
                            left: `${Math.random() * 100}vw`,
                            animationDuration: `${Math.random() * 3 + 5}s`,
                            animationDelay: `${Math.random()}s`,
                        }}
                    ></div>
                ))}
            </div>

            {/* Contenu principal avec stack pour disposition verticale */}
            <div className="relative flex flex-col sm:flex-row sm:space-x-6 space-y-6 sm:space-y-0 max-w-4xl w-full">
                <Block
                    title="Modifier un produit"
                    image={adminImg}
                    onClick={() => {
                        handleBlockClick("Admin");
                        navigate('/updateproduct');
                    }}
                    altText="Admin"
                    active={activeBlock === "Admin"}
                />
                <Block
                    title="Ajouter un produit"
                    image={userImg}
                    onClick={() => {
                        handleBlockClick("Utilisateur");
                        navigate('/addproduct');
                    }}
                    altText="Utilisateur"
                    active={activeBlock === "Utilisateur"}
                />
                <Block
                    title="Ajoute un produit"
                    image={userImg}
                    onClick={() => {
                        handleBlockClick("Utilisateur");
                        navigate('/');
                    }}
                    altText="Utilisateur"
                    active={activeBlock === "Utilisateur"}
                />
            </div>
        </div>
    );
};

export default Home;
