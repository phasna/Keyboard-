import React from 'react';
import { LineChart, Line, BarChart, Bar, PieChart, Pie, Tooltip, XAxis, YAxis, CartesianGrid, Legend, ResponsiveContainer, Cell } from 'recharts';
import { DollarSign, ShoppingCart, Users } from 'lucide-react'; // Import des icônes

const data = [
    { name: 'Janvier', ventes: 4000, utilisateurs: 2400 },
    { name: 'Février', ventes: 3000, utilisateurs: 1398 },
    { name: 'Mars', ventes: 5000, utilisateurs: 2800 },
    { name: 'Avril', ventes: 4780, utilisateurs: 3908 },
    { name: 'Mai', ventes: 5890, utilisateurs: 4800 },
    { name: 'Juin', ventes: 4390, utilisateurs: 3800 },
    { name: 'Juillet', ventes: 6490, utilisateurs: 4300 },
];

const pieData = [
    { name: 'Gamme A', value: 400 },
    { name: 'Gamme B', value: 300 },
    { name: 'Gamme C', value: 300 },
    { name: 'Gamme D', value: 200 },
];

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

const StatisticsDashboard = () => {
    return (
        <div className="p-10 overflow-y-auto">
            {/* Graphiques */}
            <div className={"bg-white bg-opacity-25 p-10 rounded-xl"}>
            <div className="flex gap-10">
                <div className="border-2 p-6 rounded-2xl shadow-lg flex-grow">
                    <h2 className="text-xl font-light mb-4 text-white">Statistiques des ventes mensuelles</h2>
                    <ResponsiveContainer width="100%" height={300}>
                        <LineChart data={data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                            <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
                            <XAxis dataKey="name" tick={{ fill: '#FFFFFF' }} />
                            <YAxis tick={{ fill: '#FFFFFF' }} />
                            <Tooltip contentStyle={{ backgroundColor: '#f5f5f5', borderColor: '#ccc' }} />
                            <Legend verticalAlign="top" height={36} />
                            <Line type="monotone" dataKey="ventes" stroke="#8884d8" strokeWidth={2} activeDot={{ r: 8 }} />
                            <Line type="monotone" dataKey="utilisateurs" stroke="#82ca9d" strokeWidth={2} />
                        </LineChart>
                    </ResponsiveContainer>
                </div>

                <div className="border-2 p-6 rounded-2xl shadow-lg flex-grow">
                    <h2 className="text-xl font-light mb-4 text-white">Répartition des gammes de produits</h2>
                    <ResponsiveContainer width="100%" height={300}>
                        <PieChart>
                            <Pie
                                data={pieData}
                                dataKey="value"
                                nameKey="name"
                                cx="50%"
                                cy="50%"
                                outerRadius={100}
                                fill="#8884d8"
                                label={(entry) => `${entry.name}: ${entry.value}`}
                            >
                                {pieData.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                ))}
                            </Pie>
                            <Tooltip contentStyle={{ backgroundColor: '#f5f5f5', borderColor: '#ccc' }} />
                        </PieChart>
                    </ResponsiveContainer>
                </div>
            </div>

            <div className="border-2 p-6 rounded-2xl shadow-lg mt-10 flex-grow">
                <h2 className="text-xl font-light mb-4 text-white">Statistiques des ventes (Barre)</h2>
                <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
                        <XAxis dataKey="name" tick={{ fill: '#FFFFFF' }} />
                        <YAxis tick={{ fill: '#FFFFFF' }} />
                        <Tooltip contentStyle={{ backgroundColor: '#f5f5f5', borderColor: '#ccc' }} />
                        <Legend verticalAlign="top" height={36} />
                        <Bar dataKey="ventes" fill="#8884d8" barSize={40} radius={[10, 10, 0, 0]} />
                        <Bar dataKey="utilisateurs" fill="#82ca9d" barSize={40} radius={[10, 10, 0, 0]} />
                    </BarChart>
                </ResponsiveContainer>
            </div>
        </div>
        </div>
    );
};

export default StatisticsDashboard;
