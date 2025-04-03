import Accueil from '../Compenent/Accueil/Accueil.jsx';
import BlocProduct from "../Compenent/Accueil/BlocProduct.jsx";
import Info from "../Compenent/Accueil/info.jsx";
import Fotter from "../Compenent/Fotter.jsx";

/*Importation pout smalScreen*/
import AccueilMobile from '../Compenent/about/SamlScreen/Accueil.jsx';



function App() {
    return (
        <div className="h-screen flex flex-col bg-black ">
            {/* Page pour grand écran */}
            <div className={"bg-black "}>
                <div className={"lg:block hidden"}>
                <div className="flex-grow">
                    <Accueil />
                </div>
                <Info />
                {/*<BlocImage />*/}
                <BlocProduct />Ò
                <Fotter/>
                </div>

                {/* Page pour petite écran */}
                <div className={"block lg:hidden"}>
                    <AccueilMobile />

                </div>


            </div>

        </div>
    );
}

export default App;
