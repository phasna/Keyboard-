import WrapperGraphique from "../../Compenent/Admin/Accueil/WrapperGrapphique.jsx";

function App() {
    return (
        <div className="h-screen flex flex-col">
            {/* Accueil */}
            <div className={"overflow-auto"}>
                <WrapperGraphique />
            </div>

        </div>
    );
}

export default App;
