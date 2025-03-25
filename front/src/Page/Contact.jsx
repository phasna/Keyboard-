import Accueil from '../Compenent/Conatct/Accueil.jsx';
import Form from '../Compenent/Conatct/Form.jsx';
import Footer from '../Compenent/Fotter.jsx';



function App() {
    return (
            <div className={"bg-black"}>
                <div className="flex-grow bg-blacl">
                    <Accueil />
                </div>
                <Form />
                <Footer />


            </div>

    );
}

export default App;
