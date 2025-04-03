import WrapperGraphique from "../../Compenent/Admin/Accueil/WrapperGrapphique.jsx";

function App() {
    return (
        <div className="lg:h-screen lg:flex lg:flex-col">
            {/* Accueil */}
            <div className={"lg:overflow-auto"}>
                <WrapperGraphique />
            </div>

        </div>
    );
}

export default App;
