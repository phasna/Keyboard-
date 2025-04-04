import ListeUser from "../../Compenent/Admin/ListeUser/ListeUser.jsx";
import ListeUserMobile from "../../Compenent/Admin/ListeUser/smallScreen/listeUser.jsx";

function App() {
  return (
    <div className="h-screen flex flex-col bg-black">
      {/* Accueil */}
      <div className={"bg-black lg:block hidden"}>
        <ListeUser />
      </div>

      {/* Version mobile */}
      <div className={" bg-black block lg:hidden"}>
        <ListeUserMobile />
      </div>
    </div>
  );
}

export default App;
