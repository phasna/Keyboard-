import { motion } from "framer-motion";
import { useEffect, useRef } from "react";
import { useInView } from "framer-motion";
import { WiDirectionRight } from "react-icons/wi";
import { FiChevronRight } from "react-icons/fi";
import { FiBell } from "react-icons/fi";
import Clavier from "../../assets/About/bloc/switch.png";
import Metau from "../../assets/About/bloc/metaux.png";
import Frequance from "../../assets/About/bloc/frequance.png";
import Metaux from "../../assets/About/bloc/metau.png";
import Metaux_01 from "../../assets/About/bloc/metau_01.png";

const blocks = [
    { id: 1, title: "The Future is 3D", description: "Womp makes learning 3D accessible for designers of all backgrounds.", img: Clavier, colSpan: "col-span-2", height: "lg:h-[40vh] h-[20vh]", animation: { y: -50 }, className: "items-center justify-end" },
    { id: 2, title: "Join Thousands of Wompers", description: "Discover why thousands choose Womp to share their 3D creations.", img: Metaux, colSpan: "col-span-1", height: "h-[30vh]", animation: { x: -50 }, className: "items-end justify-end" },
    { id: 3, title: "Thousands of Assets", description: "Enhance your scenes with ready-to-use assets or remix shared builds.", img: Frequance, colSpan: "col-span-1", height: "h-[30vh]", animation: { x: 50 }, className: "items-end justify-end" },
    { id: 4, title: "Get your Ideas 3D Printed and delivered to your Door", description: "Order industry-quality resin 3D prints delivered to your doorstep.", img: Metaux_01, colSpan: "lg:col-span-1 col-span-2 ", height: "lg:h-[30vh] h-[20vh]", animation: { y: 50 }, className: "items-end justify-end" },
    { id: 5, title: "Get your Ideas 3D Printed and delivered to your Door", description: "Order industry-quality resin 3D prints delivered to your doorstep.", img: Metau, colSpan: "lg:col-span-1 col-span-2", height: "lg:h-[30vh] h-[20vh]", animation: { y: 50 }, className: "items-end justify-end" }
];

export default function AnimatedGrid() {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true });

    return (
        <div className="bg-black min-h-screen flex flex-col ">
            <motion.h1
                className="lg:text-7xl text-5xl font-light text-center text-white mb-20"
                initial={{ opacity: 0, y: -50 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5 }}
            >
                Elevate Your <br /> Designs With 3D
            </motion.h1>

            <div ref={ref} className="grid grid-cols-2 gap-6 p-6">
                {blocks.map((block, index) => (
                    <motion.div
                        key={block.id}
                        className={`${block.colSpan} ${block.height} ${block.className} border-white border-2 bg-gray-900 bg-opacity-50 rounded-xl flex flex-col relative`}
                        initial={{ opacity: 0, ...block.animation }}
                        animate={isInView ? { opacity: 1, ...block.animation, y: 0, x: 0 } : {}}
                        transition={{ duration: 0.5, delay: index * 0.5 }}
                    >
                        <h2 className="absolute top-4 left-4 lg:text-2xl text-white">{block.title}</h2>
                        <p className="absolute lg:top-12 top-16 left-4 text-sm text-white font-thin">{block.description}</p>
                        <button className="text-white absolute bottom-6 left-5 flex items-center gap-2 border-2 hover:bg-white hover:text-black px-4 py-2 rounded-lg">
                            En savoir plus <FiChevronRight className="text-lg" />
                        </button>
                        <img src={block.img} className="w-1/3 lg:block hidden" />
                    </motion.div>
                ))}
            </div>
        </div>
    );
}
