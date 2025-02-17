import { useEffect, useRef, useState } from "react";

const TextReveal = ({ text = "", className = "" }) => {
    const targetRef = useRef(null);
    const [scrollProgress, setScrollProgress] = useState(0);

    useEffect(() => {
        const handleScroll = () => {
            if (targetRef.current) {
                const rect = targetRef.current.getBoundingClientRect();
                const windowHeight = window.innerHeight;
                const progress = Math.min(1, Math.max(0, 1 - rect.top / windowHeight));
                setScrollProgress(progress);
            }
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    if (!text) {
        return <p className="text-red-500">Erreur : Aucun texte fourni</p>;
    }

    const words = text.split(" ");

    return (
        <div ref={targetRef} className={`relative z-0 h-screen ${className}`}>
            <div className="sticky top-0 flex h-[70vh] mx-auto container items-center bg-transparent px-4 py-10">
                <p className="flex flex-wrap p-5 text-xl text-transparent bg-clip-text bg-gradient-to-r from-white to-zinc-500 md:text-3xl lg:text-4xl">
                    {words.map((word, i) => {
                        const start = i / words.length;
                        const end = start + 1 / words.length;
                        const opacity = Math.min(1, Math.max(0, (scrollProgress - start) / (end - start)));

                        return (
                            <span key={i} className="relative mx-1 lg:mx-2.5">
                                <span className="absolute opacity-30">{word}</span>
                                <span
                                    style={{ opacity }}
                                    className="white dark:text-white transition-all duration-500 transform hover:scale-105 hover:text-white"
                                >
                                    {word}
                                </span>
                            </span>
                        );
                    })}
                </p>
            </div>
            {/* Ajouter un fond animé pour renforcer l'aspect cool */}
            <div className="absolute inset-0 bg-gradient-to-br from-black to-black opacity-30 blur-md"></div>
        </div>
    );
};

// Exemple d'utilisation
const App = () => {
    return <TextReveal text="Les claviers mécaniques se distinguent par leur qualité supérieure, offrant une durabilité, un confort et une précision inégalés. Contrairement aux claviers à membrane, ils utilisent des interrupteurs mécaniques sous chaque touche, garantissant une réactivité instantanée et une sensation tactile agréable. Leur robustesse permet une longévité accrue, pouvant dépasser plusieurs millions de frappes sans perte de performance. De plus, leur conception favorise une frappe plus fluide et réduisant la fatigue des doigts, ce qui les rend idéaux pour les gamers et les professionnels. Enfin, avec une large gamme de switchs (linéaires, tactiles ou clicky), ils s’adaptent aux préférences de chacun, offrant une expérience personnalisée et un confort optimal." />;
};

export default App;
