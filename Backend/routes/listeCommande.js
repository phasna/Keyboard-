import express from 'express';
import db from '../db.js'; // Assurez-vous que db.js est correctement configuré

const router = express.Router();

// Récupérer toutes les commandes
router.get('/', (req, res) => {
    const query = 'SELECT * FROM Cart';
    db.query(query, (err, results) => {
        if (err) {
            console.error('Erreur lors de la récupération des commandes:', err);
            return res.status(500).json({ error: 'Erreur de récupération des commandes' });
        }
        console.log(results); // Vérifier les données retournées
        res.json(results); // Retourne toutes les commandes au format JSON
    });
});


// Ajouter une commande
router.post('/', (req, res) => {
    const {
        cart, // Liste des produits commandés
        delivery: { nom, prenom, telephone, email, adresse, mode_livraison, pays, ville, code_postal },
        payment: { nameCard, cardNumber, expirationDate, cvv, paymentMethod }
    } = req.body;

    // Vérification des champs
    if (!nom || !prenom || !email || !telephone || !adresse || !mode_livraison ||
        !pays || !ville || !code_postal || !cardNumber || !nameCard ||
        !expirationDate || !cvv || !paymentMethod || cart.length === 0) {
        return res.status(400).json({ message: 'Tous les champs sont requis.' });
    }

    // Insérer la commande dans la base de données
    const insertOrderQuery = `
        INSERT INTO Cart (nom, prenom, email, telephone, adresse, mode_livraison, pays, ville, code_postal, 
                                cardNumber, nameCard, expirationDate, cvv, paymentMethod)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;

    db.query(insertOrderQuery, [
        nom, prenom, email, telephone, adresse, mode_livraison, pays, ville, code_postal,
        cardNumber, nameCard, expirationDate, cvv, paymentMethod
    ], (err, results) => {
        if (err) {
            console.error('Erreur lors de l\'ajout de la commande:', err);
            return res.status(500).json({ error: 'Erreur lors de l\'ajout de la commande' });
        }

        const orderId = results.insertId; // Récupérer l'ID de la commande ajoutée

        // Insérer les produits dans la commande
        const cartQuery = `
            INSERT INTO OrderItems (orderId, productId, quantity, price)
            VALUES ?
        `;

        const cartData = cart.map(item => [
            orderId,
            item.id,
            item.quantity,
            item.price
        ]);

        // Ajouter les articles au panier (order items)
        if (cartData.length > 0) {
            db.query(cartQuery, [cartData], (err) => {
                if (err) {
                    console.error('Erreur lors de l\'ajout des produits dans la commande:', err);
                    return res.status(500).json({ error: 'Erreur lors de l\'ajout des produits dans la commande' });
                }
                res.status(201).json({ message: 'Commande ajoutée avec succès' });
            });
        } else {
            return res.status(400).json({ message: 'Panier vide ou invalide' });
        }
    });
});

// Modifier le statut d'une commande
router.put('/status/:id', (req, res) => {
    const { id } = req.params;
    const { statut } = req.body;

    // Vérification que le statut est valide
    if (!statut || !['En cours', 'Terminé', 'Abandonné'].includes(statut)) {
        return res.status(400).json({ message: 'Statut invalide' });
    }

    const query = `UPDATE Cart SET statut = ? WHERE id = ?`;

    db.query(query, [statut, id], (err, results) => {
        if (err) {
            console.error('Erreur de mise à jour du statut de la commande:', err);
            return res.status(500).json({ error: 'Erreur lors de la mise à jour du statut' });
        }

        res.json({ message: 'Statut mis à jour avec succès' });
    });
});

// Supprimer une commande
router.delete('/:id', (req, res) => {
    const orderId = req.params.id;
    const query = 'DELETE FROM Cart WHERE id = ?';

    db.query(query, [orderId], (err, results) => {
        if (err) {
            console.error('Erreur lors de la suppression de la commande:', err);
            return res.status(500).json({ error: 'Erreur lors de la suppression de la commande' });
        }
        if (results.affectedRows === 0) {
            return res.status(404).json({ error: 'Commande non trouvée' });
        }
        res.status(200).json({ message: 'Commande supprimée avec succès' });
    });
});

export default router;
