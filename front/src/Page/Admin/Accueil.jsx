import Graphique from "../../Compenent/Admin/Accueil/Graphique.jsx";

function App() {
    return (
        <div className="h-screen flex flex-col">
            {/* Accueil */}
            <div className={"overflow-auto"}>
                <Graphique />
            </div>

        </div>
    );
}

export default App;
