import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Menu from "./Compenent/Menu.jsx";
import Accueil from "./Page/Accueil.jsx";
import ShopList from "./Page/ShopList.jsx";
import About from "./Page/about.jsx";
import ProductDetail from "../src/Compenent/ShopList/ProductDedail.jsx";
import Pagner from "../src/Compenent/Pagner/pagner.jsx";
import AddProduct from "../src/Compenent/AddProduct/addProduct.jsx";

// Page connexion

import Connexion from "./Page/Connexion.jsx";

//Admin
import Admin from "./Page/Admin/Admin.jsx";


import Fotter from "../src/Compenent/Fotter.jsx";



function App() {
    return (
        <div>
            <Router>
                <div className="h-screen flex flex-col bg-black">
                    {/* Menu */}
                    <div className="flex-shrink-0">
                        <Menu/>
                    </div>

                    {/* Contenu principal */}
                    <div className="flex-grow bg-black">
                        <Routes>
                            <Route path="/Connexion" element={<Connexion/>}/>
                            <Route path="/admin" element={<Admin/>}/>
                            <Route path="/" element={<Accueil/>}/>
                            <Route path="/shop" element={<ShopList/>}/>
                            <Route path="/about" element={<About/>}/>
                            <Route path="/addproduct" element={<AddProduct/>}/>
                            <Route path="/panier" element={<Pagner/>}/>
                            <Route path="/product/:productId" component={ProductDetail} />
                        </Routes>
                    </div>


                </div>
            </Router>
        </div>
    );
}

export default App;
