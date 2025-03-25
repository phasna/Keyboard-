import Accueil from '../Compenent/Accueil/Accueil.jsx';
import BlocProduct from "../Compenent/Accueil/BlocProduct.jsx";
import BlocText from "../Compenent/Accueil/BlocText.jsx";
import Info from "../Compenent/Accueil/info.jsx";
import Text from "../Compenent/Accueil/Text.jsx";
import Fotter from "../Compenent/Fotter.jsx";
import BlocImage from '../Compenent/Conatct/BlocImage.jsx';


function App() {
    return (
        <div className="h-screen flex flex-col bg-black ">
            {/* Accueil */}
            <div className={"bg-black"}>
                <div className="flex-grow">
                    <Accueil />
                </div>
                <Info />
                {/*<BlocImage />*/}
                <BlocProduct />Ò
                <Fotter/>

            </div>

        </div>
    );
}

export default App;
