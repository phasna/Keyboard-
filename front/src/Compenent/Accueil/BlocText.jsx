import { motion } from "framer-motion";
import Image1 from "../../../public/BlocText/Bloc5.png";
import Image2 from "../../../public/BlocText/Bloc6.png";
import Image3 from "../../../public/BlocText/Bloc7.png";
import Image4 from "../../../public/BlocText/Bloc8.png";

const InfoBlock = ({ image, title, description }) => {
    return (
        <motion.div
            className="relative rounded-lg shadow-lg p-6 flex items-center justify-center text-center h-[50vh]"
            style={{
                backgroundImage: `url(${image})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
            }}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            viewport={{ once: true }}
        >
            <div className="text-white p-4">
                <h3 className="text-2xl font-bold mb-2">{title}</h3>
                <p className="text-sm">{description}</p>

            </div>
        </motion.div>
    );
};

const InfoGrid = () => {
    const blocks = [
        {
            id: 1,
            image: Image1,
            title: "Clavier Mécanique Gamer",
            description: "Libérez votre potentiel avec une précision ultime. Dominez chaque jeu avec chaque frappe.",
        },
        {
            id: 2,
            image: Image2,
            title: "Performance de Bureau Réinventée",
            description: "Confort et productivité au quotidien. Un clavier qui vous suit dans toutes vos tâches.",
        },
        {
            id: 3,
            image: Image3,
            title: "Confort et Style",
            description: "Un clavier qui allie design moderne et ergonomie pour des heures de frappe sans fatigue.",
        },
        {
            id: 4,
            image: Image4,
            title: "Clavier Gaming Ultra-Réactif",
            description: "Chaque pression compte. Découvrez la réactivité optimale pour des performances de haut niveau.",
        },
    ];

    return (
        <div className="container mx-auto px-4 py-10">
            <h1 className="text-5xl font-bold text-center text-white mb-10">
                NOTRE QUALITÉ
            </h1>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {blocks.map((block, index) => (
                    <InfoBlock
                        key={block.id}
                        image={block.image}
                        title={block.title}
                        description={block.description}
                    />
                ))}
            </div>
        </div>
    );
};

export default InfoGrid;
