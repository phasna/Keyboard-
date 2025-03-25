import ListeUser from "../../Compenent/Admin/ListeUser/ListeUser.jsx";

function App() {
    return (
        <div className="h-screen flex flex-col bg-black">
            {/* Accueil */}
            <div className={"bg-black"}>
                <ListeUser />
            </div>

        </div>
    );
}

export default App;
