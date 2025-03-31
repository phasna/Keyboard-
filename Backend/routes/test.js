// Modifier une commande
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
        UPDATE Cart
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
            console.error('Erreur de mise à jour de la commande:', err);
            return res.status(500).json({ error: 'Erreur lors de la mise à jour de la commande' });
        }
        res.status(200).json({ message: 'Commande mise à jour avec succès' });
    });
});