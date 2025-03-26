import express from 'express';
import cors from 'cors';
import db from './db.js';
import productRoutes from './routes/products.js';
import userRoutes from './routes/users.js';
import ventesRoutes from './routes/ventes.js';
import loginRoutes from './routes/login.js';
import enregistreRoutes from './routes/enregistre.js';
import statistiqueRoutes from './routes/statistique_ventes.js';

const app = express();

// Middleware pour parser le JSON
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Configuration CORS
app.use(cors({
    origin: "*",
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));

// Routes
app.use('/api/products', productRoutes);
app.use('/api/utilisateurs', userRoutes);
app.use('/api/ventes', ventesRoutes);
app.use('/api/login', loginRoutes);
app.use('/api/enregistre', enregistreRoutes);
app.use('/api/statistiques_ventes', statistiqueRoutes);

// Démarrer le serveur
const PORT = 8000;
app.listen(PORT, () => {
    console.log(`🚀 Serveur backend démarré sur http://localhost:${PORT}`);
});
