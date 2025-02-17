import Accueil from '../Compenent/about/accueilAbout.jsx';
import Video from '../Compenent/about/video.jsx';
import Bloc from '../Compenent/about/bloc.jsx';
import TextScroll from '../Compenent/about/textScroll.jsx';
import BlocProduct from "../Compenent/Accueil/BlocProduct.jsx";
import Fotter from "../Compenent/Fotter.jsx";


function App() {
    return (
        <div className="h-screen flex flex-col bg-black ">
            {/* Accueil */}
            <div className={"bg-black"}>
                <div className="flex-grow">
                    <Accueil/>
                </div>
                <div className={"lg:block hidden"}>
                <Video/>
                </div>
                <div className={"lg:container lg:mx-auto"}>
                    <Bloc/>
                </div>
                <TextScroll/>
                <div className={"lg:block hidden"}>
                    <BlocProduct/>

                </div>
                <Fotter/>

            </div>

        </div>
    );
}

export default App;
