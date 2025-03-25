import PaymentPage from '../Compenent/Panier/PaymentPage.jsx';

function App() {
    return (
        <div className="h-screen flex flex-col bg-black">
            {/* Panier */}
            <div className={"bg-black"}>
                <div className="flex-grow">
                    <PaymentPage />
                </div>
            </div>

        </div>
    );
}

export default App;
