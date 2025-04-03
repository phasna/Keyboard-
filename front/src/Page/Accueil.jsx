import Accueil from '../Compenent/about/accueilAbout.jsx';
import Video from '../Compenent/about/video.jsx';
import Bloc from '../Compenent/about/bloc.jsx';
import TextScroll from '../Compenent/about/textScroll.jsx';
import BlocProduct from "../Compenent/Accueil/BlocProduct.jsx";

// Composant pour petite écran
import SmallAccueil from '../Compenent/Accueil/SmallScreen/Accueil.jsx';
import Fotter from "../Compenent/Fotter.jsx";


function App() {
    return (
        <div className="h-screen flex flex-col bg-black ">
            {/* Accueil */}
            <div className={"bg-black"}>
                {/*Page pour grande écran*/}
                <div className={"lg:block hidden"}>
                <div className="flex-grow ">
                    <Accueil/>
                </div>
                <div className={"lg:block hidden"}>
                <Video/>
                </div>
                <div className={"lg:container lg:mx-auto"}>
                    <Bloc/>
                </div>
                <div>
                <TextScroll/>
                    <BlocProduct/>
                    <Fotter/>
                </div>
                </div>
                {/*Page pour petite écran*/}
                <div className={"block lg:hidden"}>
                <SmallAccueil/>
                </div>

            </div>

        </div>
    );
}

export default App;
