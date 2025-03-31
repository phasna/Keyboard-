import { useState, useEffect } from 'react';
import { DollarSign, ShoppingCart, Users } from 'lucide-react';

const StatisticsDashboard = () => {
    const [stats, setStats] = useState({
        chiffre_affaires_total: 0,
        nombre_produits_vendus: 0,
        nombre_utilisateurs: 0,
    });

    useEffect(() => {
        fetch('/api/statistiques_ventes')
            .then(response => response.json())
            .then(data => setStats(data))
            .catch(error => console.error('Erreur de récupération des statistiques:', error));
    }, []);

    return (
        <div className="px-10 py-5 overflow-y-auto">
            <h1 className="text-5xl font-light text-white mb-10">STATISTIQUE DES VENTES.</h1>

            <div className="grid grid-cols-3 gap-6 bg-white bg-opacity-25 p-10 rounded-xl">
                <div className="p-6 border-2 text-white rounded-2xl shadow-xl text-center flex flex-col items-start">
                    <DollarSign className="w-10 h-10 mb-4" />
                    <h2 className="text-2xl font-bold">Chiffre d'affaires</h2>
                    <p className="text-3xl mt-4 font-bold">{stats.chiffre_affaires_total.toLocaleString()}€</p>
                </div>

                <div className="p-6 border-2 text-white rounded-2xl shadow-xl text-center flex flex-col items-start">
                    <ShoppingCart className="w-10 h-10 mb-4" />
                    <h2 className="text-2xl font-bold">Produits vendus</h2>
                    <p className="text-3xl mt-4 font-bold">{stats.nombre_produits_vendus.toLocaleString()}</p>
                </div>

                <div className="p-6 border-2 text-white rounded-2xl shadow-xl text-center flex flex-col items-start">
                    <Users className="w-10 h-10 mb-4" />
                    <h2 className="text-2xl font-bold">Utilisateurs inscrits</h2>
                    <p className="text-3xl mt-4 font-bold">{stats.nombre_utilisateurs.toLocaleString()}</p>
                </div>
            </div>
        </div>
    );
};

export default StatisticsDashboard;
