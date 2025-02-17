import express from 'express';
import mysql from 'mysql2';
import cors from 'cors';

const app = express();

// Middleware pour parser le JSON
app.use(express.json());

// Configuration CORS pour accepter les requêtes du frontend sur localhost:3000
app.use(cors({
    origin: "*",  // Origine de ton frontend
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));

// Connexion à la base de données MySQL
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    port: 8889,  // Vérifie bien le bon port (par défaut MySQL sur macOS avec MAMP utilise 8889)
    password: 'root',
    database: 'Clavier',  // Change si ton nom de base de données est différent
});

db.connect((err) => {
    if (err) {
        console.error('Erreur de connexion à la base de données:', err);
        process.exit(1);
    } else {
        console.log('✅ Connecté à la base de données MySQL');
    }
});

// Route pour la connexion utilisateur
app.post('/api/login', (req, res) => {
    const { identifiant, mot_de_passe } = req.body;
    if (!identifiant || !mot_de_passe) {
        return res.status(400).json({ error: 'Tous les champs sont requis.' });
    }
    const query = 'SELECT * FROM utilisateurs WHERE identifiant = ? AND mot_de_passe = ?';
    db.query(query, [identifiant, mot_de_passe], (err, results) => {
        if (err) {
            console.error('Erreur lors de la connexion:', err);
            return res.status(500).json({ error: 'Erreur serveur' });
        }
        if (results.length === 0) {
            return res.status(401).json({ error: 'Identifiant ou mot de passe incorrect' });
        }
        res.status(200).json({ message: 'Connexion réussie', user: results[0] });
    });
});

// Route pour récupérer les produits
app.get('/api/products', (req, res) => {
    const query = 'SELECT * FROM Product';  // Assure-toi que la table s'appelle 'Product'
    db.query(query, (err, results) => {
        if (err) {
            console.error('Erreur lors de la récupération des produits:', err);
            return res.status(500).json({ error: 'Erreur de récupération des produits' });
        }
        res.json(results);
    });
});

// Route pour supprimer un produit
app.delete('/api/products/:id', (req, res) => {
    const productId = req.params.id;
    const query = 'DELETE FROM Product WHERE id = ?';

    db.query(query, [productId], (err, results) => {
        if (err) {
            console.error('Erreur lors de la suppression du produit:', err);
            return res.status(500).json({ error: 'Erreur lors de la suppression' });
        }
        if (results.affectedRows === 0) {
            return res.status(404).json({ error: 'Produit non trouvé' });
        }
        res.status(200).json({ message: 'Produit supprimé avec succès' });
    });
});

// Route pour ajouter un produit
app.post('/api/products', async (req, res) => {
    const { title, price, rating, image } = req.body;

    if (!title || !price || !rating || !image) {
        return res.status(400).json({ message: 'Tous les champs sont requis.' });
    }

    try {
        await db.promise().query(
            'INSERT INTO Product (title, price, rating, image) VALUES (?, ?, ?, ?)',
            [title, price, rating, image]
        );
        res.status(201).json({ message: 'Produit ajouté avec succès !' });
    } catch (error) {
        console.error('Erreur d’insertion:', error);
        res.status(500).json({ message: 'Erreur serveur', error });
    }
});

// Démarrer le serveur sur le port 8000
const PORT = 8000;
app.listen(PORT, () => {
    console.log(`🚀 Serveur backend démarré sur http://localhost:${PORT}`);
});
