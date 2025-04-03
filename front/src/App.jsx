import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Accueil from "./Page/Accueil.jsx";
import Contact from "./Page/Contact.jsx";
import ShopList from "./Page/ShopList.jsx";
import ProductDetaille from "./Page/productDetailles.jsx";
import About from "./Page/about.jsx";
import Pagner from "../src/Compenent/Panier/StepGroupe.jsx";
import Summay from "../src/Compenent/Panier/Summary.jsx";
import AddProduct from "../src/Page/Admin/addProduct.jsx";
import UpdateProduct from "../src/Compenent/AddProduct/updateProduct.jsx";

//Layout
import Layout_Admin from "../src/Compenent/Layout_Admin.jsx";
import Layout_User from "../src/Compenent/Layout_User.jsx";

//Admin
import Menu_Admin from "./Page/Admin/Interface.jsx"

// Page connexion

import Connexion from "./Page/Connexion.jsx";
import CreatAcc from "./Page/creatAcc.jsx";

//Admin
import Admin from "./Page/Admin/Admin.jsx";
import ListeUser from "./Page/Admin/ListeUser.jsx";
import AddUser from "./Page/Admin/AddUser.jsx";
import UpdateUser from "./Page/Admin/UpdateUser.jsx";
import AccueilAdmin from "./Page/Admin/Accueil.jsx";
import ListeOrder from "./Page/Admin/listeOrder.jsx";




function App() {
    return (
        <div>
            <Router>
                <div className="h-screen flex flex-col">
                    {/* Bloc */}

                    {/* Contenu principal */}
                    <div className="flex-grow">
                        <Routes>
                            <Route element={<Layout_Admin />}>
                                <Route path="/accueilAdmin" element={<AccueilAdmin/>}/>
                                <Route path="/Admin_interface" element={<Menu_Admin/>}/>
                                <Route path="/addproduct" element={<AddProduct/>}/>
                                <Route path="/updateproduct" element={<UpdateProduct/>}/>
                                <Route path="/Liste_des_commande" element={<ListeOrder/>}/>
                                <Route path="/adduser" element={<AddUser/>}/>
                                <Route path="/updateuser/:id" element={<UpdateUser/>}/>
                                <Route path="/listeutilisateurs" element={<ListeUser/>}/>
                            </Route>

                            <Route element={<Layout_User/>}>
                                <Route path="/" element={<Accueil/>}/>
                                <Route path="/shop" element={<ShopList/>}/>
                                <Route path="/about" element={<About/>}/>
                                <Route path="/contact" element={<Contact/>}/>
                                <Route path="/panier" element={<Pagner/>}/>
                                <Route path="/Summay" element={<Summay/>}/>
                                <Route path="/product/:id" element={<ProductDetaille />} />
                            </Route>

                            <Route path="/Connexion" element={<Connexion/>}/>
                            <Route path="/Cree_un_compte" element={<CreatAcc/>}/>
                            <Route path="/admin" element={<Admin/>}/>
                        </Routes>
                    </div>


                </div>
            </Router>
        </div>
    );
}

export default App;
