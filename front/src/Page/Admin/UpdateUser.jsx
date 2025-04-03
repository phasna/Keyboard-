import UpdateUser from "../../Compenent/Admin/UpdateUser/UpdateUser.jsx";

import UpdateUserMobile from "../../Compenent/Admin/UpdateUser/MobileVersion/UpdateUser";

function App() {
  return (
    <div className="h-screen flex flex-col bg-black">
      {/* Accueil */}
      <div className={"bg-black lg:block hidden"}>
        <UpdateUser />
      </div>

      {/* Version Mobiel */}
      <div className={"bg-black lg:hidden block"}>
        <UpdateUserMobile />
      </div>
    </div>
  );
}

export default App;
