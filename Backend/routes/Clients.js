import express from 'express';
import db from '../db.js'; // Assurez-vous que db.js est correctement configuré

const router = express.Router();

// Récupérer tous les clients
router.get('/', (req, res) => {
    const query = 'SELECT * FROM Clients';
    db.query(query, (err, results) => {
        if (err) {
            console.error('Erreur lors de la récupération des clients:', err);
            return res.status(500).json({ error: 'Erreur de récupération des clients' });
        }
        res.json(results); // Retourne toutes les données des clients au format JSON
    });
});

// Ajouter un nouveau client
router.post('/', (req, res) => {
    const {
        nom, prenom, email, telephone, adresse, identifiant, mode_livraison, pays, ville, code_postal,
        cardNumber, nameCard, expirationDate, cvv, paymentMethod
    } = req.body;

    // Vérification des champs obligatoires
    if (!nom || !prenom || !email || !telephone || !adresse || !identifiant ||
        !mode_livraison || !pays || !ville || !code_postal || !cardNumber || !nameCard ||
        !expirationDate || !cvv || !paymentMethod) {
        return res.status(400).json({ message: 'Tous les champs sont requis.' });
    }

    // Insérer le client dans la base de données
    const insertClientQuery = `
        INSERT INTO Clients (nom, prenom, email, telephone, adresse, identifiant, mode_livraison, pays, ville, code_postal,
                             cardNumber, nameCard, expirationDate, cvv, paymentMethod)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;

    db.query(insertClientQuery, [
        nom, prenom, email, telephone, adresse, identifiant, mode_livraison, pays, ville, code_postal,
        cardNumber, nameCard, expirationDate, cvv, paymentMethod
    ], (err, results) => {
        if (err) {
            console.error('Erreur lors de l\'ajout du client:', err);
            return res.status(500).json({ error: 'Erreur lors de l\'ajout du client' });
        }
        res.status(201).json({ message: 'Client ajouté avec succès' });
    });
});

// Modifier un client
router.put('/:id', (req, res) => {
    const { id } = req.params;
    const {
        nom, prenom, email, telephone, adresse, mode_livraison, pays, ville, code_postal,
        cardNumber, nameCard, expirationDate, cvv, paymentMethod
    } = req.body;

    if (!nom || !prenom || !email || !telephone || !adresse || !mode_livraison ||
        !pays || !ville || !code_postal || !cardNumber || !nameCard ||
        !expirationDate || !cvv || !paymentMethod) {
        return res.status(400).json({ message: 'Tous les champs sont requis.' });
    }

    const query = `
        UPDATE Clients
        SET nom = ?, prenom = ?, email = ?, telephone = ?, adresse = ?, mode_livraison = ?, 
        pays = ?, ville = ?, code_postal = ?, cardNumber = ?, nameCard = ?, expirationDate = ?, 
        cvv = ?, paymentMethod = ?
        WHERE id = ?
    `;

    db.query(query, [
        nom, prenom, email, telephone, adresse, mode_livraison, pays, ville, code_postal,
        cardNumber, nameCard, expirationDate, cvv, paymentMethod, id
    ], (err, results) => {
        if (err) {
            console.error('Erreur de mise à jour du client:', err);
            return res.status(500).json({ error: 'Erreur lors de la mise à jour du client' });
        }
        res.status(200).json({ message: 'Client mis à jour avec succès' });
    });
});

// Supprimer un client
router.delete('/:id', (req, res) => {
    const clientId = req.params.id;
    const query = 'DELETE FROM Clients WHERE id = ?';

    db.query(query, [clientId], (err, results) => {
        if (err) {
            console.error('Erreur lors de la suppression du client:', err);
            return res.status(500).json({ error: 'Erreur lors de la suppression du client' });
        }
        if (results.affectedRows === 0) {
            return res.status(404).json({ error: 'Client non trouvé' });
        }
        res.status(200).json({ message: 'Client supprimé avec succès' });
    });
});

export default router;
