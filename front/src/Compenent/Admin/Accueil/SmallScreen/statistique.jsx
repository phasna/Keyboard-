import { useState, useEffect } from 'react';
import { DollarSign, ShoppingCart, Users } from 'lucide-react';
import { PieChart, Pie, BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Cell } from 'recharts';

const StatisticsDashboard = () => {
    // Structure de données originale, récupérée depuis l'API
    const [stats, setStats] = useState({
        chiffre_affaires_total: 0,
        nombre_produits_vendus: 0,
        nombre_utilisateurs: 0,
    });

    // Données supplémentaires pour les graphiques
    const [ventesMensuelles, setVentesMensuelles] = useState([]);
    const [categoriesVentes, setCategoriesVentes] = useState([]);

    useEffect(() => {
        // Récupération des données principales depuis l'API originale
        fetch('/api/statistiques_ventes')
            .then(response => response.json())
            .then(data => setStats(data))
            .catch(error => console.error('Erreur de récupération des statistiques:', error));

        // Exemple d'appels API supplémentaires pour les données des graphiques
        // En production, vous devrez remplacer cela par vos véritables endpoints API
        fetch('/api/ventes_mensuelles')
            .then(response => response.json())
            .then(data => setVentesMensuelles(data))
            .catch(() => {
                // Données de démonstration en cas d'échec
                setVentesMensuelles([
                    { mois: 'Jan', ventes: 1200, revenu: 15000, utilisateurs: 120 },
                    { mois: 'Fév', ventes: 1800, revenu: 22000, utilisateurs: 150 },
                    { mois: 'Mar', ventes: 1500, revenu: 19000, utilisateurs: 180 },
                    { mois: 'Avr', ventes: 2200, revenu: 28000, utilisateurs: 220 },
                    { mois: 'Mai', ventes: 1900, revenu: 24000, utilisateurs: 260 },
                    { mois: 'Juin', ventes: 2400, revenu: 30000, utilisateurs: 300 }
                ]);
            });

        fetch('/api/categories_ventes')
            .then(response => response.json())
            .then(data => setCategoriesVentes(data))
            .catch(() => {
                // Données de démonstration en cas d'échec
                setCategoriesVentes([
                    { name: 'Électronique', value: 35 },
                    { name: 'Vêtements', value: 25 },
                    { name: 'Maison', value: 20 },
                    { name: 'Sport', value: 15 },
                    { name: 'Autres', value: 5 }
                ]);
            });
    }, []);

    // Couleurs pour les graphiques
    const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8'];

    return (
        <div className="w-screen bg-gray-900 min-h-screen px-6 pb-20 pt-10">
            <div className="max-w-full mx-auto">
                <h1 className="text-2xl md:text-3xl font-light text-white mb-6 ">
                    STATISTIQUES DES VENTES
                </h1>

                {/* Cartes de statistiques - Utilisant exactement votre structure de données d'API */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
                    <div className="bg-gray-800 rounded-lg p-4 border-l-4 border-yellow-500 shadow-lg">
                        <div className="flex items-center">
                            <div className="rounded-full bg-gray-700 p-3 mr-4">
                                <DollarSign className="w-6 h-6 text-yellow-400" />
                            </div>
                            <div>
                                <p className="text-gray-400 text-sm">Chiffre d'affaires</p>
                                <p className="text-white text-xl font-bold">{stats.chiffre_affaires_total.toLocaleString()}€</p>
                            </div>
                        </div>
                    </div>

                    <div className="bg-gray-800 rounded-lg p-4 border-l-4 border-green-500 shadow-lg">
                        <div className="flex items-center">
                            <div className="rounded-full bg-gray-700 p-3 mr-4">
                                <ShoppingCart className="w-6 h-6 text-green-400" />
                            </div>
                            <div>
                                <p className="text-gray-400 text-sm">Produits vendus</p>
                                <p className="text-white text-xl font-bold">{stats.nombre_produits_vendus.toLocaleString()}</p>
                            </div>
                        </div>
                    </div>

                    <div className="bg-gray-800 rounded-lg p-4 border-l-4 border-blue-500 shadow-lg">
                        <div className="flex items-center">
                            <div className="rounded-full bg-gray-700 p-3 mr-4">
                                <Users className="w-6 h-6 text-blue-400" />
                            </div>
                            <div>
                                <p className="text-gray-400 text-sm">Utilisateurs inscrits</p>
                                <p className="text-white text-xl font-bold">{stats.nombre_utilisateurs.toLocaleString()}</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Afficher les graphiques seulement si les données sont disponibles */}
                {ventesMensuelles.length > 0 && (
                    <>
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
                            {/* Graphique d'évolution des ventes */}
                            <div className="bg-gray-800 rounded-lg p-4 shadow-lg">
                                <h2 className="text-lg font-semibold text-white mb-4">Évolution des ventes</h2>
                                <div className="h-64">
                                    <ResponsiveContainer width="100%" height="100%">
                                        <LineChart data={ventesMensuelles}>
                                            <CartesianGrid strokeDasharray="3 3" stroke="#444" />
                                            <XAxis dataKey="mois" stroke="#888" />
                                            <YAxis stroke="#888" />
                                            <Tooltip
                                                contentStyle={{ backgroundColor: '#222', border: 'none' }}
                                                itemStyle={{ color: '#fff' }}
                                                labelStyle={{ color: '#fff' }}
                                            />
                                            <Legend />
                                            <Line type="monotone" dataKey="revenu" stroke="#FFBB28" name="Revenu (€)" strokeWidth={2} />
                                            <Line type="monotone" dataKey="ventes" stroke="#00C49F" name="Produits vendus" strokeWidth={2} />
                                        </LineChart>
                                    </ResponsiveContainer>
                                </div>
                            </div>

                            {/* Graphique circulaire des catégories */}
                            {categoriesVentes.length > 0 && (
                                <div className="bg-gray-800 rounded-lg p-4 shadow-lg">
                                    <h2 className="text-lg font-semibold text-white mb-4">Répartition des ventes par catégorie</h2>
                                    <div className="h-64">
                                        <ResponsiveContainer width="100%" height="100%">
                                            <PieChart>
                                                <Pie
                                                    data={categoriesVentes}
                                                    cx="50%"
                                                    cy="50%"
                                                    labelLine={false}
                                                    outerRadius={80}
                                                    fill="#8884d8"
                                                    dataKey="value"
                                                    nameKey="name"
                                                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                                                >
                                                    {categoriesVentes.map((entry, index) => (
                                                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                                    ))}
                                                </Pie>
                                                <Tooltip
                                                    contentStyle={{ backgroundColor: '#222', border: 'none' }}
                                                    itemStyle={{ color: '#fff' }}
                                                    formatter={(value, name) => [`${value}%`, name]}
                                                />
                                            </PieChart>
                                        </ResponsiveContainer>
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Graphique à barres pour les nouveaux utilisateurs */}
                        <div className="bg-gray-800 rounded-lg p-4 shadow-lg">
                            <h2 className="text-lg font-semibold text-white mb-4">Nouveaux utilisateurs par mois</h2>
                            <div className="h-64">
                                <ResponsiveContainer width="100%" height="100%">
                                    <BarChart
                                        data={ventesMensuelles}
                                        margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                                    >
                                        <CartesianGrid strokeDasharray="3 3" stroke="#444" />
                                        <XAxis dataKey="mois" stroke="#888" />
                                        <YAxis stroke="#888" />
                                        <Tooltip
                                            contentStyle={{ backgroundColor: '#222', border: 'none' }}
                                            itemStyle={{ color: '#fff' }}
                                            labelStyle={{ color: '#fff' }}
                                        />
                                        <Legend />
                                        <Bar dataKey="utilisateurs" name="Nouveaux utilisateurs" fill="#8884d8" />
                                    </BarChart>
                                </ResponsiveContainer>
                            </div>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
};

export default StatisticsDashboard;