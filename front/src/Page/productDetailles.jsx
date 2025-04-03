import ProductDetail from "../Compenent/ShopList/ProductDedail.jsx";
import BlocProduct from "../Compenent/Accueil/BlocProduct.jsx";

import ProductDetailSmallScreen from "../Compenent/ShopList/SmallScreen/ProductDedail.jsx";


function App() {
    return (
        <div className="h-screen flex flex-col bg-black">
            {/* Accueil */}
            <div className={"bg-black lg:p-20 lg:block hidden"}>
                <ProductDetail/>
                <BlocProduct/>
            </div>

            {/*Composant petite écran*/}

            <div className={"bg-black lg:p-20 block lg:hidden"}>
                <ProductDetailSmallScreen/>
                <BlocProduct/>
            </div>

        </div>
    );
}

export default App;
