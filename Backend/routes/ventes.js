import express from 'express';
import db from '../db.js';

const router = express.Router();

// Récupérer toutes les ventes
router.get('/', async (req, res) => {
    try {
        const [rows] = await db.promise().query('SELECT * FROM ventes');
        res.json(rows);
    } catch (err) {
        console.error('Erreur lors de la récupération des ventes:', err);
        return res.status(500).json({ error: 'Erreur de récupération des ventes' });
    }
});

// Ajouter une vente
router.post('/', (req, res) => {
    const { product_id, quantite_vendue, prix_unitaire } = req.body;
    if (!product_id || !quantite_vendue || !prix_unitaire) {
        return res.status(400).json({ message: "Les champs product_id, quantite_vendue et prix_unitaire sont obligatoires." });
    }

    const query = `INSERT INTO ventes (product_id, quantite_vendue, prix_unitaire, date_vente) 
                   VALUES (?, ?, ?, NOW())`;

    db.query(query, [product_id, quantite_vendue, prix_unitaire], (err, results) => {
        if (err) {
            console.error("Erreur MySQL :", err);
            return res.status(500).json({ message: "Erreur interne du serveur." });
        }
        res.status(201).json({ message: "Vente ajoutée avec succès.", venteId: results.insertId });
    });
});

// Mettre à jour une vente
router.put('/:id', async (req, res) => {
    const { id } = req.params;
    const { product_id, quantite_vendue, prix_unitaire } = req.body;

    db.query(
        "UPDATE ventes SET product_id = ?, quantite_vendue = ?, prix_unitaire = ? WHERE id = ?",
        [product_id, quantite_vendue, prix_unitaire, id],
        (error, results) => {
            if (error) {
                console.error("Erreur lors de la mise à jour:", error);
                return res.status(500).json({ error: "Erreur serveur" });
            }
            if (results.affectedRows > 0) {
                res.status(200).json({ message: "Vente mise à jour avec succès" });
            } else {
                res.status(404).json({ error: "Vente non trouvée" });
            }
        }
    );
});

export default router;