import AddProduct from "../../Compenent/AddProduct/addProduct.jsx";
import AddProductMobile from "../../Compenent/AddProduct/SmallScreen/addProductMobile.jsx";

function App() {
    return (
        <div className="h-screen flex flex-col bg-black">
            {/* Accueil */}
            <div className={"bg-black lg:block hidden"}>
                <AddProduct />
            </div>

            {/* Version mobile */}
            <div className={"bg-black block lg:hidden"}>
                <AddProductMobile />
            </div>

        </div>
    );
}

export default App;
