import { useState, useEffect } from 'react';
import Image from "../../../assets/Clavier/gaming.png"

const KeyboardCompanyShowcase = () => {
    const [isVisible, setIsVisible] = useState(false);
    const [scrollPos, setScrollPos] = useState(0);
    const [activeKeyboard, setActiveKeyboard] = useState(0);

    useEffect(() => {
        setIsVisible(true);

        // Rotation automatique des produits mis en avant
        const keyboardInterval = setInterval(() => {
            setActiveKeyboard(prev => (prev + 1) % 3);
        }, 3000);

        // Effet de parallaxe au scroll
        const handleScroll = () => {
            setScrollPos(window.scrollY);
        };

        window.addEventListener('scroll', handleScroll);

        return () => {
            clearInterval(keyboardInterval);
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    // Données des produits pour la présentation
    const keyboardSeries = [
        { name: "Série Pro", description: "Performance et précision" },
        { name: "Série Gaming", description: "Vitesse et réactivité" },
        { name: "Série Studio", description: "Élégance et confort" }
    ];

    return (
        <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black text-white flex flex-col px-4 py-8">
            {/* Éléments décoratifs en arrière-plan */}
            <div className="fixed top-0 left-0 w-full h-full overflow-hidden pointer-events-none z-0">
                <div
                    className="absolute top-1/4 -left-20 w-40 h-40 rounded-full bg-gray-800 mix-blend-overlay blur-3xl opacity-40"
                    style={{ transform: `translateY(${scrollPos * 0.1}px)` }}
                ></div>
                <div
                    className="absolute bottom-1/3 -right-20 w-60 h-60 rounded-full bg-gray-800 mix-blend-overlay blur-3xl opacity-30"
                    style={{ transform: `translateY(${-scrollPos * 0.15}px)` }}
                ></div>
            </div>

            {/* Contenu principal */}
            <div className="relative z-10 flex flex-col min-h-screen">
                {/* En-tête avec logo */}
                <header className="mb-6 mt-10 flex justify-between items-center">
                    <div className="flex items-center space-x-2">
                        <div className="w-8 h-8 bg-white rounded-md flex items-center justify-center">
                            <div className="w-4 h-4 bg-black rounded-sm"></div>
                        </div>
                        <h1 className="text-2xl font-bold">ClaveX</h1>
                    </div>
                    <div className="flex space-x-4">
                        <div className="w-5 h-1 bg-white/50 rounded-full"></div>
                    </div>
                </header>

                {/* Section principale */}
                <main className="flex-1 flex flex-col">
                    {/* Titre et introduction de l'entreprise */}
                    <div
                        className={`mb-8 transition-all duration-1000 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}
                        style={{ transitionDelay: '100ms' }}
                    >
                        <h2 className="text-3xl font-bold mb-3 tracking-tight">
                            L'excellence tactile
                        </h2>
                        <p className="text-gray-300 leading-relaxed">
                            Depuis 2018, ClaveX conçoit et fabrique des claviers mécaniques d'exception,
                            combinant technologie de pointe et design intemporel.
                        </p>
                    </div>

                    {/* Image du produit phare */}
                    <div
                        className={`relative w-full rounded-2xl overflow-hidden shadow-2xl mb-10 transition-all duration-1000 ${isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}
                        style={{
                            boxShadow: '0 20px 40px -15px rgba(0, 0, 0, 0.8), 0 0 30px 0 rgba(255, 255, 255, 0.07)',
                            transform: `perspective(1000px) rotateX(${scrollPos * 0.02}deg) rotateY(${scrollPos * 0.01}deg)`
                        }}
                    >
                        <div className="relative aspect-square">
                            {/* Effet de lueur */}
                            <div className="absolute inset-0 overflow-hidden">
                                <div
                                    className="absolute -inset-10 opacity-30 bg-gradient-to-tr from-white/5 to-transparent rounded-full blur-2xl"
                                    style={{ animation: 'moveGlow 8s infinite alternate ease-in-out' }}
                                ></div>
                            </div>

                            {/* Image 3D */}
                            <div className="absolute inset-0 perspective-1000">
                                <div className="absolute inset-0 transform rotate-x-12 rotate-y-6">
                                    <img
                                        src={Image}
                                        alt="Clavier mécanique premium"
                                        className="w-full h-full object-cover rounded-2xl"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-tr from-black/40 to-transparent rounded-2xl"></div>
                                </div>
                            </div>

                            {/* Signature de la marque */}
                            <div className="absolute top-4 right-4 bg-orange-500 backdrop-blur-sm px-3 py-1 rounded-lg">
                                <p className="text-xs text-white font-medium">ClaveX Pro Series</p>
                            </div>
                        </div>
                    </div>

                    {/* Titre de section */}
                    <div
                        className={`mb-6 transition-all duration-1000 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}
                        style={{
                            transitionDelay: '400ms',
                            transform: `translateY(${-scrollPos * 0.05}px)`
                        }}
                    >
                        <h3 className="text-xl font-medium mb-2 tracking-tight flex items-center">
                            <span className="w-6 h-0.5 bg-white/50 rounded mr-2"></span>
                            Notre philosophie
                        </h3>
                        <p className="text-gray-300 text-sm leading-relaxed">
                            Chaque clavier est conçu pour répondre aux besoins les plus exigeants des professionnels et
                            passionnés à la recherche de performances et de sensations tactiles inégalées.
                        </p>
                    </div>

                    {/* Caractéristiques */}
                    <div
                        className={`grid grid-cols-2 gap-4 mb-8 transition-all duration-1000 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}
                        style={{ transitionDelay: '600ms' }}
                    >
                        {[
                            "Switches certifiés",
                            "Matériaux premium",
                            "Personnalisation",
                            "Innovation"
                        ].map((feature, index) => (
                            <div
                                key={index}
                                className="bg-white/5 p-3 rounded-lg"
                                style={{
                                    transform: `translateY(${isVisible ? '0' : '10px'})`,
                                    opacity: isVisible ? 1 : 0,
                                    transition: 'all 0.5s ease-out',
                                    transitionDelay: `${600 + (index * 100)}ms`
                                }}
                            >
                                <p className="text-sm font-medium">{feature}</p>
                            </div>
                        ))}
                    </div>

                    {/* Titre de la section gammes */}
                    <h3
                        className={`text-xl font-medium mb-4 flex items-center transition-all duration-1000 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}
                        style={{ transitionDelay: '800ms' }}
                    >
                        <span className="w-6 h-0.5 bg-white/50 rounded mr-2"></span>
                        Nos gammes
                    </h3>

                    {/* Gammes de produits */}
                    <div className="mb-8">
                        {keyboardSeries.map((series, index) => (
                            <div
                                key={index}
                                className={`py-3 border-b border-white/10 flex justify-between items-center transition-all duration-500 ${activeKeyboard === index ? 'opacity-100' : 'opacity-60'}`}
                                style={{
                                    transform: `translateX(${isVisible ? '0' : '-10px'})`,
                                    opacity: isVisible ? (activeKeyboard === index ? 1 : 0.6) : 0,
                                    transition: 'all 0.5s ease-out',
                                    transitionDelay: `${900 + (index * 100)}ms`
                                }}
                            >
                                <div>
                                    <h4 className="font-medium">{series.name}</h4>
                                    <p className="text-sm text-gray-400">{series.description}</p>
                                </div>
                                <div className={`w-2 h-2 rounded-full ${activeKeyboard === index ? 'bg-white' : 'bg-white/30'}`}></div>
                            </div>
                        ))}
                    </div>

                    {/* Section à propos */}
                    <div
                        className={`bg-gradient-to-br from-gray-900 to-black rounded-xl p-5 mb-8 transition-all duration-1000 border border-white/10 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}
                        style={{
                            transitionDelay: '1000ms',
                            boxShadow: '0 10px 30px -5px rgba(0, 0, 0, 0.3)',
                            transform: `translateY(${-scrollPos * 0.02}px)`
                        }}
                    >
                        <h3 className="text-lg font-medium mb-3 text-white">À propos de ClaveX</h3>
                        <p className="text-sm text-gray-300 mb-4">
                            Fondée par des passionnés, notre entreprise s'engage à repousser les limites
                            de la technologie des claviers mécaniques. Notre équipe d'ingénieurs et designers
                            travaille sans relâche pour créer des périphériques d'exception.
                        </p>
                        <div className="flex space-x-4">
                            <div className="text-center">
                                <p className="text-xl font-bold">7</p>
                                <p className="text-xs text-gray-400">Années d'expérience</p>
                            </div>
                            <div className="text-center">
                                <p className="text-xl font-bold">12</p>
                                <p className="text-xs text-gray-400">Modèles exclusifs</p>
                            </div>
                            <div className="text-center">
                                <p className="text-xl font-bold">+50k</p>
                                <p className="text-xs text-gray-400">Clients satisfaits</p>
                            </div>
                        </div>
                    </div>

                    {/* Appel à l'action */}
                    <button
                        className="px-6 py-4 rounded-xl bg-white/10 backdrop-blur-sm text-white font-medium text-center transform transition-all duration-300 active:scale-95 mt-auto border border-white/20"
                        style={{
                            transform: `translateY(${isVisible ? '0' : '10px'})`,
                            opacity: isVisible ? 1 : 0,
                            transition: 'all 0.5s ease-out',
                            transitionDelay: '1100ms'
                        }}
                    >
                        Découvrir nos produits
                    </button>
                </main>

                {/* Pied de page */}
                <footer className="mt-8 pt-4 border-t border-white/10 text-center text-xs text-gray-400 flex justify-between">
                    <span>© 2025 ClaveX</span>
                    <div className="flex space-x-4">
                        <span>À propos</span>
                        <span>Contact</span>
                    </div>
                </footer>
            </div>

            {/* Animations CSS */}
            <style jsx>{`
                @keyframes moveGlow {
                    0% { transform: translateX(-10%) translateY(10%); }
                    100% { transform: translateX(10%) translateY(-10%); }
                }
            `}</style>
        </div>
    );
};

export default KeyboardCompanyShowcase;