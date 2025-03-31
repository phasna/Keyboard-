import ListeOrder from '../../Compenent/Admin/ListeOrder/listeOrder.jsx';

function App() {
    return (
        <div className="h-screen flex flex-col bg-black">
            {/* Panier */}
            <div className={"bg-black"}>
                <div className="flex-grow">
                    <ListeOrder />
                </div>
            </div>

        </div>
    );
}

export default App;
