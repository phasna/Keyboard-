import express from 'express';
import bcrypt from 'bcrypt';
import db from '../db.js';

const router = express.Router();
const saltRounds = 10;

// Récupérer tous les utilisateurs
router.get('/', async (req, res) => {
    try {
        const [rows] = await db.promise().query('SELECT * FROM user');
        res.json(rows);
    } catch (err) {
        console.error('Erreur lors de la récupération des utilisateurs:', err);
        return res.status(500).json({ error: 'Erreur de récupération des utilisateurs' });
    }
});

// Ajouter un utilisateur
router.post('/', (req, res) => {
    const { identifiant, mot_de_passe, nom, prenom, email, telephone, adresse, image } = req.body;
    if (!identifiant || !mot_de_passe || !nom || !prenom) {
        return res.status(400).json({ message: "Les champs identifiant, mot_de_passe, nom et prenom sont obligatoires." });
    }

    if (email && !/\S+@\S+\.\S+/.test(email)) {
        return res.status(400).json({ message: "L'email fourni est invalide." });
    }

    bcrypt.hash(mot_de_passe, saltRounds, (err, hashedPassword) => {
        if (err) {
            console.error("Erreur de hashage du mot de passe :", err);
            return res.status(500).json({ message: "Erreur interne lors du hashage du mot de passe." });
        }

        const query = `INSERT INTO user (identifiant, mot_de_passe, nom, prenom, email, telephone, adresse, image) 
                       VALUES (?, ?, ?, ?, ?, ?, ?, ?)`;

        db.query(query, [identifiant, hashedPassword, nom, prenom, email || null, telephone || null, adresse || null, image || null], (err, results) => {
            if (err) {
                console.error("Erreur MySQL :", err);
                return res.status(500).json({ message: "Erreur interne du serveur." });
            }
            res.status(201).json({ message: "Utilisateur ajouté avec succès.", utilisateurId: results.insertId });
        });
    });
});

//Update user
router.put('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const { identifiant, nom, prenom, email, telephone, adresse, mot_de_passe,image } = req.body;

        // La méthode query renvoie un tableau [rows, fields]
        db.query(
            "UPDATE user SET identifiant = ?, nom = ?, prenom = ?, email = ?, telephone = ?, adresse = ?, mot_de_passe = ?,image = ? WHERE id = ?",
            [identifiant,nom, prenom, email, telephone, adresse, mot_de_passe,image, id],
            (error, results) => {
                if (error) {
                    console.error("Erreur lors de la mise à jour:", error);
                    return res.status(500).json({ error: "Erreur serveur" });
                }
                if (results.affectedRows > 0) {
                    res.status(200).json({ message: "Utilisateur mis à jour avec succès" });
                } else {
                    res.status(404).json({ error: "Utilisateur non trouvé" });
                }
            }
        );
    } catch (error) {
        console.error("Erreur lors de la mise à jour:", error);
        res.status(500).json({ error: "Erreur serveur" });
    }
});


// 🔹 Supprimer un utilisateur
router.delete('/:id', async (req, res) => {
    try {
        const { id } = req.params;

        // Vérifier si l'utilisateur existe avant de le supprimer
        const [rows] = await db.promise().query("SELECT * FROM user WHERE id = ?", [id]);

        if (rows.length === 0) {
            return res.status(404).json({ error: "Utilisateur non trouvé" });
        }

        // Supprimer l'utilisateur
        await db.promise().query("DELETE FROM user WHERE id = ?", [id]);

        res.status(200).json({ message: "Utilisateur supprimé avec succès" });
    } catch (error) {
        console.error("Erreur lors de la suppression de l'utilisateur:", error);
        res.status(500).json({ error: "Erreur serveur" });
    }
});




export default router;
