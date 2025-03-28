import express from 'express';
import db from '../db.js';

const router = express.Router();

// Récupérer tous les clients
router.get('/', (req, res) => {
    const query = 'SELECT * FROM Clients';
    db.query(query, (err, results) => {
        if (err) {
            console.error('Erreur lors de la récupération des clients:', err);
            return res.status(500).json({ error: 'Erreur de récupération des clients' });
        }
        res.json(results);
    });
});

// Ajouter un client (lors d'une commande)
router.post('/', (req, res) => {
    const {
        cart,
        delivery: {
            nom, prenom, telephone, email, adresse, mode_livraison, pays, ville, code_postal
        },
        payment: {
            nameCard, cardNumber, expirationDate, cvv, paymentMethod
        }
    } = req.body;

    // Vérification des champs
    if (!nom || !prenom || !email || !telephone || !adresse || !mode_livraison ||
        !pays || !ville || !code_postal || !cardNumber || !nameCard ||
        !expirationDate || !cvv || !paymentMethod || cart.length === 0) {
        return res.status(400).json({ message: 'Tous les champs sont requis.' });
    }

    // Vérifier si le client existe déjà dans la base de données par email
    const checkEmailQuery = 'SELECT * FROM Clients WHERE email = ?';
    db.query(checkEmailQuery, [email], (err, results) => {
        if (err) {
            console.error('Erreur lors de la vérification de l\'email:', err);
            return res.status(500).json({ error: 'Erreur lors de la vérification de l\'email' });
        }

        if (results.length > 0) {
            // Si le client existe déjà, on récupère son ID
            const clientId = results[0].id;

            // Vérification des produits dans le panier
            const checkProductsExist = `SELECT id FROM Product WHERE id IN (?)`;
            const productIds = cart.map(item => item.id);

            db.query(checkProductsExist, [productIds], (err, results) => {
                if (err) {
                    console.error('Erreur lors de la vérification des produits:', err);
                    return res.status(500).json({ error: 'Erreur de vérification des produits' });
                }

                const existingProductIds = results.map(result => result.id);
                const invalidProducts = cart.filter(item => !existingProductIds.includes(item.id));

                if (invalidProducts.length > 0) {
                    return res.status(400).json({ message: 'Certains produits n\'existent pas.' });
                }

                // Ajout des produits dans le panier pour ce client
                const cartQuery = `
                    INSERT INTO Cart (clientId, productId, quantity, price)
                    VALUES ?
                `;

                // Vérification du contenu du panier
                const cartData = cart.map(item => {
                    return [
                        clientId,
                        item.id,  // ID du produit sélectionné
                        item.quantity,
                        item.price
                    ];
                });

                // Si des produits ont bien été ajoutés
                if (cartData.length > 0) {
                    db.query(cartQuery, [cartData], (err) => {
                        if (err) {
                            console.error('Erreur lors de l\'ajout du panier:', err);
                            return res.status(500).json({ error: 'Erreur lors de l\'ajout du panier' });
                        }
                        res.status(201).json({ message: 'Produits ajoutés avec succès au panier du client existant.' });
                    });
                } else {
                    return res.status(400).json({ message: 'Panier vide ou invalide' });
                }
            });
        } else {
            // Si le client n'existe pas, on l'ajoute dans la table Clients
            const insertClientQuery = `
                INSERT INTO Clients (nom, prenom, email, telephone, adresse, mode_livraison, pays, ville, code_postal, 
                                     cardNumber, nameCard, expirationDate, cvv, paymentMethod)
                VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
            `;

            db.query(insertClientQuery, [
                nom, prenom, email, telephone, adresse, mode_livraison, pays, ville, code_postal,
                cardNumber, nameCard, expirationDate, cvv, paymentMethod
            ], (err, results) => {
                if (err) {
                    console.error('Erreur lors de l\'ajout du client:', err);
                    return res.status(500).json({ error: 'Erreur lors de l\'ajout du client' });
                }

                const clientId = results.insertId; // ID du client inséré

                // Vérification des produits dans le panier
                const checkProductsExist = `SELECT id FROM Product WHERE id IN (?)`;
                const productIds = cart.map(item => item.id);

                db.query(checkProductsExist, [productIds], (err, results) => {
                    if (err) {
                        console.error('Erreur lors de la vérification des produits:', err);
                        return res.status(500).json({ error: 'Erreur de vérification des produits' });
                    }

                    const existingProductIds = results.map(result => result.id);
                    const invalidProducts = cart.filter(item => !existingProductIds.includes(item.id));

                    if (invalidProducts.length > 0) {
                        return res.status(400).json({ message: 'Certains produits n\'existent pas.' });
                    }

                    // Ajout des produits dans le panier
                    const cartQuery = `
                        INSERT INTO Cart (clientId, productId, quantity, price)
                        VALUES ?
                    `;

                    const cartData = cart.map(item => [
                        clientId,
                        item.id,
                        item.quantity,
                        item.price
                    ]);

                    // Si des produits ont bien été ajoutés
                    if (cartData.length > 0) {
                        db.query(cartQuery, [cartData], (err) => {
                            if (err) {
                                console.error('Erreur lors de l\'ajout du panier:', err);
                                return res.status(500).json({ error: 'Erreur lors de l\'ajout du panier' });
                            }
                            res.status(201).json({ message: 'Client et panier ajoutés avec succès' });
                        });
                    } else {
                        return res.status(400).json({ message: 'Panier vide ou invalide' });
                    }
                });
            });
        }
    });
});

// Modifier un client
router.put('/:id', (req, res) => {
    const { id } = req.params;
    const {
        nom, prenom, email, telephone, adresse, identifiant,
        mode_livraison, pays, ville, code_postal,
        cardNumber, nameCard, expirationDate, cvv, paymentMethod
    } = req.body;

    if (!nom || !prenom || !email || !telephone || !adresse || !identifiant || !mode_livraison ||
        !pays || !ville || !code_postal || !cardNumber || !nameCard ||
        !expirationDate || !cvv || !paymentMethod) {
        return res.status(400).json({ message: 'Tous les champs sont requis.' });
    }

    const query = `
        UPDATE Clients 
        SET nom = ?, prenom = ?, email = ?, telephone = ?, adresse = ?, identifiant = ?, 
        mode_livraison = ?, pays = ?, ville = ?, code_postal = ?, 
        cardNumber = ?, nameCard = ?, expirationDate = ?, cvv = ?, paymentMethod = ? 
        WHERE id = ?`;

    db.query(query, [
        nom, prenom, email, telephone, adresse, identifiant,
        mode_livraison, pays, ville, code_postal, cardNumber,
        nameCard, expirationDate, cvv, paymentMethod, id
    ], (err, results) => {
        if (err) {
            console.error('Erreur de mise à jour du client:', err);
            return res.status(500).json({ error: 'Erreur lors de la mise à jour du client' });
        }
        res.status(200).json({ message: 'Client mis à jour avec succès !' });
    });
});

// Supprimer un client
router.delete('/:id', (req, res) => {
    const clientId = req.params.id;
    const query = 'DELETE FROM Clients WHERE id = ?';

    db.query(query, [clientId], (err, results) => {
        if (err) {
            console.error('Erreur lors de la suppression du client:', err);
            return res.status(500).json({ error: 'Erreur lors de la suppression' });
        }
        if (results.affectedRows === 0) {
            return res.status(404).json({ error: 'Client non trouvé' });
        }
        res.status(200).json({ message: 'Client supprimé avec succès' });
    });
});

export default router;
