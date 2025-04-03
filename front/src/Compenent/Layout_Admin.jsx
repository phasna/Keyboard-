import { Outlet } from "react-router-dom";
import Menu from "../Compenent/Admin/Menu.jsx";
import MenuMobile from "../Compenent/Admin/navBarreMobile/MenuMobile.jsx";

function LayoutAdmin() {
    return (
        <div className="flex h-screen bg-black">
            {/* Menu prend 25% de la largeur */}
            <div className="w-1/4 lg:block hidden">
                <Menu />
            </div>

            <div className={"lg:hidden block"}>
                <MenuMobile />
            </div>

            {/* Contenu principal prend le reste (75%) */}
            <div className="lg:w-3/4 lg:px-5">
                <Outlet />
            </div>
        </div>
    );
}

export default LayoutAdmin;
