import express from 'express';
import db from '../db.js';

const router = express.Router();

// Récupérer les statistiques de ventes
router.get('/', async (req, res) => {
    try {
        const [rows] = await db.promise().query('SELECT * FROM statistiques_ventes LIMIT 1');
        res.json(rows[0]);
    } catch (err) {
        console.error('Erreur lors de la récupération des statistiques:', err);
        return res.status(500).json({ error: 'Erreur de récupération des statistiques' });
    }
});

// Mettre à jour les statistiques de ventes
router.put('/update', async (req, res) => {
    try {
        const updateQuery = `
            UPDATE statistiques_ventes
            SET 
                chiffre_affaires_total = (SELECT COALESCE(SUM(prix_total), 0) FROM ventes),
                nombre_produits_vendus = (SELECT COALESCE(SUM(quantite_vendue), 0) FROM ventes),
                nombre_utilisateurs = (SELECT COUNT(*) FROM user)
            WHERE id = 1;
        `;
        await db.promise().query(updateQuery);
        res.status(200).json({ message: 'Statistiques mises à jour avec succès' });
    } catch (err) {
        console.error('Erreur lors de la mise à jour des statistiques:', err);
        return res.status(500).json({ error: 'Erreur de mise à jour des statistiques' });
    }
});

export default router;
