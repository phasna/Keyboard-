import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import VideoColor from "../../assets/About/Video/ClavierColor.mp4";
import VideoClavier from "../../assets/About/Video/ClavierVideo.mp4";
import Switch from "../../assets/About/Video/Switch.mp4";
import Gaming from "../../assets/About/Video/Gaming.mp4";

// Les icons
import { SiYoutubegaming } from "react-icons/si";
import { AiFillFire, AiFillGold, AiFillRocket } from "react-icons/ai";

const gridItems = [
    { id: 1, Icons: SiYoutubegaming, video: Switch, title: "Switch", paragraphe: "Nous utilisons des switch de qualité et pratique à votre besoin.", size: "col-span-2 row-span-2" },
    { id: 2, Icons: AiFillFire, video: VideoClavier, title: "Buttons", paragraphe: "Nous utilisons des switch de qualité et pratique à votre besoin.", size: "col-span-1 row-span-3" },
    { id: 3, Icons: AiFillGold, video: VideoColor, title: "RGB couleur", paragraphe: "Nous utilisons des switch de qualité et pratique à votre besoin.", size: "col-span-2 row-span-3" },
    { id: 4, Icons: AiFillRocket, video: Gaming, title: "Au gaming", paragraphe: "Nous utilisons des switch de qualité et pratique à votre besoin.", size: "col-span-1 row-span-2" },
];

const BentoGrid = () => {
    const ref = useRef(null);
    const isInView = useInView(ref, { triggerOnce: true, threshold: 0.2 });

    return (
        <motion.div
            ref={ref}
            initial={{ opacity: 0, y: 50 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, ease: "easeOut" }}
        >
            <h1 className="lg:block hidden text-7xl font-bold text-center text-green-400 my-20 bg-gradient-to-r from-white via-gray-400 to-gray-600 text-transparent bg-clip-text">
                Nos qualités
            </h1>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 p-6 container mx-auto md:mb-40">
                {gridItems.map((item) => (
                    <motion.div
                        key={item.id}
                        className={`relative overflow-hidden rounded-2xl shadow-zinc-500 shadow-md ${item.size}`}
                        whileHover={{ scale: 1.01 }}
                        whileTap={{ scale: 0.95 }}
                        initial={{ opacity: 0, y: 30 }}
                        animate={isInView ? { opacity: 1, y: 0 } : {}}
                        transition={{ duration: 0.5, delay: item.id * 0.5 }}
                    >
                        <video autoPlay loop muted className="inset-0 w-full h-full object-cover">
                            <source src={item.video} type="video/mp4" />
                        </video>
                        <div className="absolute inset-0 bg-black bg-opacity-25 flex items-end justify-start p-5 z-10">
                            <div>
                                <item.Icons className="inline-block text-4xl text-yellow-400 mb-5" />
                                <h2 className="text-white text-xl font-semibold">{item.title}</h2>
                                <p className="text-zinc-400 font-light">{item.paragraphe}</p>
                            </div>
                        </div>
                    </motion.div>
                ))}
            </div>
        </motion.div>
    );
};

export default BentoGrid;
