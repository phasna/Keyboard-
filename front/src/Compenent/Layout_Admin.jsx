import { Outlet } from "react-router-dom";
import Menu from "../Compenent/Admin/Menu.jsx";

function LayoutAdmin() {
    return (
        <div className="flex h-screen bg-black">
            {/* Menu prend 25% de la largeur */}
            <div className="w-1/4">
                <Menu />
            </div>

            {/* Contenu principal prend le reste (75%) */}
            <div className="w-3/4 px-5">
                <Outlet />
            </div>
        </div>
    );
}

export default LayoutAdmin;
