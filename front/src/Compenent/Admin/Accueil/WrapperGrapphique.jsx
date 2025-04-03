import Statistique from "../../../Compenent/Admin/Accueil/Statistique.jsx";
import Graphique from "../../../Compenent/Admin/Accueil/Graphique.jsx";

/*Version mobile*/
import StatistiqueMobile from "../../../Compenent/Admin/Accueil/SmallScreen/statistique.jsx";

function App() {
    return (
        <div className="flex flex-col">
            {/* Accueil */}
            <div className={"overflow-auto lg:block hidden"}>
                <Statistique />
                <Graphique />
            </div>

            <div className={"lg:hidden block overflow-auto"}>
                <StatistiqueMobile />
            </div>

        </div>
    );
}

export default App;
