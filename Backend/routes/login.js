import express from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import db from '../db.js';

const router = express.Router();
const saltRounds = 10;
const JWT_SECRET = process.env.JWT_SECRET || "secret_key"; // Assure-toi d'utiliser une clé secrète sécurisée

// 🔑 Route de connexion (Login)
router.post('/', async (req, res) => {
    const { identifiant, mot_de_passe } = req.body;
    console.log("Identifiant reçu:", identifiant);

    if (!identifiant || !mot_de_passe) {
        return res.status(400).json({ message: "Identifiant et mot de passe requis." });
    }

    try {
        // Vérifier si l'utilisateur existe
        console.log("Requête SQL: Vérifier l'utilisateur");
        const [rows] = await db.promise().query('SELECT * FROM user WHERE identifiant = ?', [identifiant]);

        if (rows.length === 0) {
            return res.status(400).json({ message: "Utilisateur non trouvé." });
        }

        const user = rows[0];
        console.log("Utilisateur trouvé:", user);

        // Comparer le mot de passe
        if (user.mot_de_passe !== mot_de_passe) {
            return res.status(400).json({ message: "Mot de passe incorrect." });
        }

        // Vérification du rôle
        const role = user.role; // Récupération du rôle depuis la base de données (assurez-vous que le rôle existe dans la table)

        // Générer un token JWT
        const token = jwt.sign({ id: user.id, identifiant: user.identifiant, role: user.role }, JWT_SECRET, { expiresIn: "2h" });

        console.log("Token JWT généré:", token);

        // Redirection en fonction du rôle
        if (role === 'admin') {
            res.json({ message: "Connexion réussie", token, user, redirect: '/admin' });
        } else if (role === 'user') {
            res.json({ message: "Connexion réussie", token, user, redirect: '/' });
        } else {
            return res.status(400).json({ message: "Rôle non valide." });
        }
    } catch (err) {
        console.error("Erreur lors de la connexion :", err);
        res.status(500).json({ message: "Erreur interne du serveur." });
    }
});

// ✅ Middleware pour vérifier le token JWT
const authMiddleware = (req, res, next) => {
    const token = req.header("Authorization");

    if (!token) {
        return res.status(401).json({ message: "Accès refusé. Aucun token fourni." });
    }

    try {
        const decoded = jwt.verify(token, JWT_SECRET);
        req.user = decoded;
        next();
    } catch (err) {
        res.status(401).json({ message: "Token invalide." });
    }
};

// 📌 Route protégée pour récupérer les infos de l'utilisateur connecté
router.get('/', authMiddleware, async (req, res) => {
    try {
        const [rows] = await db.promise().query('SELECT id, identifiant, nom, prenom, email, telephone, adresse, image FROM user WHERE id = ?', [req.user.id]);

        if (rows.length === 0) {
            return res.status(404).json({ message: "Utilisateur non trouvé." });
        }

        res.json(rows[0]);

    } catch (err) {
        console.error("Erreur lors de la récupération de l'utilisateur :", err);
        res.status(500).json({ message: "Erreur interne du serveur." });
    }
});

export default router;
