import Statistique from "../../../Compenent/Admin/Accueil/Statistique.jsx";
import Graphique from "../../../Compenent/Admin/Accueil/Graphique.jsx";

function App() {
    return (
        <div className="flex flex-col">
            {/* Accueil */}
            <div className={"overflow-auto"}>
                <Statistique />
                <Graphique />
            </div>

        </div>
    );
}

export default App;
