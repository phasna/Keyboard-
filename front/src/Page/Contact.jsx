import Accueil from "../Compenent/Conatct/Accueil.jsx";
import Form from "../Compenent/Conatct/Form.jsx";
import Footer from "../Compenent/Fotter.jsx";

/*Version mobile*/
import AccueilMobile from "../Compenent/Conatct/SmalScreen/AccueilMobile.jsx";

function App() {
  return (
    <div className={"bg-black"}>
      <div className={"lg:block hidden"}>
        <div className="flex-grow bg-black">
          <Accueil />
        </div>
        <Form />
        <Footer />
      </div>

      {/*Version mobile*/}
      <div className={"block lg:hidden"}>
        <AccueilMobile />
      </div>
    </div>
  );
}

export default App;
