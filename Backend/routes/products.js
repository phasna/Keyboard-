import express from 'express';
import db from '../db.js';

const router = express.Router();

// Récupérer tous les produits
router.get('/', (req, res) => {
    const query = 'SELECT * FROM Product';
    db.query(query, (err, results) => {
        if (err) {
            console.error('Erreur lors de la récupération des produits:', err);
            return res.status(500).json({ error: 'Erreur de récupération des produits' });
        }
        res.json(results);
    });
});

// Ajouter un produit
router.post('/', (req, res) => {
    const { title, price, rating, image, stock } = req.body;
    if (!title || !price || !rating || !image || !stock) {
        return res.status(400).json({ message: 'Tous les champs sont requis.' });
    }

    const query = 'INSERT INTO Product (title, price, rating, image, stock) VALUES (?, ?, ?, ?, ?)';
    db.query(query, [title, price, rating, image, stock], (err, results) => {
        if (err) {
            console.error('Erreur lors de l\'ajout du produit:', err);
            return res.status(500).json({ error: 'Erreur lors de l\'ajout du produit' });
        }
        res.status(201).json({ message: 'Produit ajouté avec succès', productId: results.insertId });
    });
});

// Modifier un produit
router.put('/:id', async (req, res) => {
    const { id } = req.params;
    const { title, price, rating, image, stock } = req.body;
    if (!title || !price || !rating || !image || !stock) {
        return res.status(400).json({ message: 'Tous les champs sont requis.' });
    }

    try {
        await db.promise().query(
            'UPDATE Product SET title = ?, price = ?, rating = ?, image = ?, stock = ? WHERE id = ?',
            [title, price, rating, image, stock, id]
        );
        res.status(200).json({ message: 'Produit mis à jour avec succès !' });
    } catch (error) {
        console.error('Erreur de mise à jour:', error);
        res.status(500).json({ message: 'Erreur serveur', error });
    }
});

// Supprimer un produit
router.delete('/:id', (req, res) => {
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

export default router;
