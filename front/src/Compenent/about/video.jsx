import { useEffect, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Video from "../../assets/About/Video/Clavier.mp4"

export default function BackgroundVideo() {
    const { scrollY } = useScroll();
    const [isScrolling, setIsScrolling] = useState(false);

    // Rétrécit la vidéo au fur et à mesure du scroll
    const scale = useTransform(scrollY, [0, 500], [1, 0.8]); // 1 → Taille normale, 0.6 → Rétréci
    const borderRadius = useTransform(scrollY, [0, 500], ["0%", "20px"]); // Ajoute un border-radius progressif

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolling(window.scrollY > 50);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <motion.div
            className="w-screen h-screen overflow-hidden flex justify-center items-center z-[-1]"
            style={{ scale, borderRadius }}
        >
            <video
                autoPlay
                loop
                muted
                className="w-full h-full object-cover"
            >
                <source src={Video} type="video/mp4" />
            </video>
        </motion.div>
    );
}
