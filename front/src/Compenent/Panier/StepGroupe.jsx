import { useState } from 'react';
import CartPage from './panier.jsx';
import DeliveryPage from './DeliveryPage';
import PaymentPage from './paiement.jsx';

const Checkout = () => {
    const [step, setStep] = useState(1);

    const goToNextStep = (nextStep) => {
        setStep(nextStep);
    };

    return (
        <div>
            {step === 1 && <CartPage goToNextStep={goToNextStep} />}
            {step === 2 && <DeliveryPage goToNextStep={goToNextStep} />}
            {step === 3 && <PaymentPage />}
        </div>
    );
};

export default Checkout;
