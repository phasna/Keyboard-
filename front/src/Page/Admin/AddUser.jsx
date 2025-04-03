import AddUser from "../../Compenent/Admin/AddUser/AddUser.jsx";

import AddUserMobile from "../../Compenent/Admin/AddUser/VersionMobile/AddUser";

function App() {
  return (
    <div className="h-screen flex flex-col bg-black">
      {/* Accueil */}
      <div className={"bg-black lg:block hidden"}>
        <AddUser />
      </div>
      {/* Version Mobile */}
      <div className={"bg-black lg:hidden block"}>
        <AddUserMobile />
      </div>
    </div>
  );
}

export default App;
