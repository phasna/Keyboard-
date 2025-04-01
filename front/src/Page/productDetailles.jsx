import ProductDetail from "../Compenent/ShopList/ProductDedail.jsx";
import BlocProduct from "../Compenent/Accueil/BlocProduct.jsx";

function App() {
    return (
        <div className="h-screen flex flex-col bg-black">
            {/* Accueil */}
            <div className={"bg-black p-20"}>
                <ProductDetail />
                <BlocProduct />
            </div>

        </div>
    );
}

export default App;
