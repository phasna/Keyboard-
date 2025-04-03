import ShopList from "../Compenent/ShopList/ShopList.jsx";
import ProductSmallScreen from "../Compenent/ShopList/SmallScreen/ProductListe.jsx";

function App() {
    return (
        <div className="h-screen flex flex-col bg-black">
            {/* Accueil */}
            <div className={"bg-black"}>
                <div className="lg:block hidden">
                    <ShopList />
                </div>

                {/*Composant pour petite écran*/}
                <div className={"lg:hidden block"}>
                    <ProductSmallScreen />
                </div>
            </div>

        </div>
    );
}

export default App;
