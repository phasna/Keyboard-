import { useState, useEffect } from "react";
import CartPage from "./panier.jsx";
import DeliveryPage from "./DeliveryPage.jsx";
import PaymentPage from "./paiement.jsx";
import Summary from "./Summary.jsx";

const Checkout = () => {
    const [step, setStep] = useState(1);
    const [cartData, setCartData] = useState({});
    const [deliveryData, setDeliveryData] = useState({});
    const [paymentData, setPaymentData] = useState({});
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(false);

    const goToNextStep = (nextStep, data) => {
        console.log(`Étape actuelle : ${step}, Passage à l'étape : ${nextStep}`);

        if (data) {
            switch (nextStep) {
                case 2:
                    setCartData(data);
                    break;
                case 3:
                    setDeliveryData(data);
                    break;
                case 4:
                    setPaymentData(data);
                    handleFinalSubmission(data);
                    break;
                default:
                    break;
            }
        }
        setStep(nextStep);
    };

    useEffect(() => {
        console.log("Données du panier mises à jour :", cartData);
    }, [cartData]);

    useEffect(() => {
        console.log("Données de livraison mises à jour :", deliveryData);
    }, [deliveryData]);

    useEffect(() => {
        console.log("Données de paiement mises à jour :", paymentData);
    }, [paymentData]);

    const handleFinalSubmission = async (paymentData) => {
        setLoading(true);
        setError(null);
        setSuccess(false);

        const allData = {
            cart: cartData,
            delivery: deliveryData,
            payment: paymentData,
        };

        console.log("🚀 Envoi des données finales :", allData);

        try {
            const response = await fetch("http://localhost:8000/api/commande", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(allData),
            });

            const result = await response.json();
            if (response.ok) {
                console.log("✅ Commande enregistrée avec succès :", result);
                setSuccess(true);
            } else {
                console.error("❌ Erreur lors de l'enregistrement :", result);
                setError(result.error);
            }
        } catch (error) {
            console.error("⚠️ Erreur de connexion à l'API :", error);
            setError("Erreur de connexion au serveur.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            <h1>Processus de paiement</h1>
            {step === 1 && <CartPage goToNextStep={goToNextStep} cartData={cartData} />}
            {step === 2 && <DeliveryPage goToNextStep={goToNextStep} deliveryData={deliveryData} />}
            {step === 3 && <PaymentPage goToNextStep={goToNextStep} paymentData={paymentData} />}
            {step === 4 && (
                <Summary cartData={cartData} deliveryData={deliveryData} paymentData={paymentData} />
            )}

            {loading && <p>Enregistrement en cours...</p>}
            {error && <p style={{ color: "red" }}>❌ {error}</p>}
            {success && <p style={{ color: "green" }}>✅ Commande enregistrée avec succès !</p>}
        </div>
    );
};

export default Checkout;
