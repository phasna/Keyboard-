import express from 'express';
import jwt from 'jsonwebtoken';
import db from '../db.js';

const router = express.Router();
const JWT_SECRET = process.env.JWT_SECRET || "secret_key"; // Assure-toi d'utiliser une clé secrète sécurisée

// ✅ Route d'enregistrement d'un client
router.post('/', async (req, res) => {
    const { nom, prenom, email, telephone, adresse, identifiant, mot_de_passe } = req.body;

    // Vérification des données
    if (!nom || !prenom || !email || !telephone || !adresse || !identifiant || !mot_de_passe) {
        return res.status(400).json({ message: "Tous les champs sont requis." });
    }

    try {
        // Vérifier si l'utilisateur existe déjà par son identifiant ou email
        const [existingUser] = await db.promise().query('SELECT * FROM clients WHERE identifiant = ? OR email = ?', [identifiant, email]);

        if (existingUser.length > 0) {
            return res.status(400).json({ message: "L'identifiant ou l'email est déjà utilisé." });
        }

        // Insertion du client dans la base de données avec le mot de passe en clair
        const [result] = await db.promise().query(
            'INSERT INTO user (nom, prenom, email, telephone, adresse, identifiant, mot_de_passe, date_inscription) VALUES (?, ?, ?, ?, ?, ?, ?, NOW())',
            [nom, prenom, email, telephone, adresse, identifiant, mot_de_passe]
        );

        // Création d'un token JWT pour l'utilisateur nouvellement inscrit
        const token = jwt.sign({ id: result.insertId, identifiant, role: 'user' }, JWT_SECRET, { expiresIn: "2h" });

        // Réponse avec un message de succès et le token d'authentification
        res.status(201).json({
            message: "Enregistrement réussi.",
            token,
            user: { id: result.insertId, nom, prenom, email, telephone, adresse, identifiant }
        });

    } catch (err) {
        console.error("Erreur lors de l'enregistrement :", err);
        res.status(500).json({ message: "Erreur interne du serveur." });
    }
});

export default router;
