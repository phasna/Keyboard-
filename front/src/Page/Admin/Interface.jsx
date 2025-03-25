import { Outlet } from "react-router-dom";
import Bloc from "../../Compenent/Admin/Bloc.jsx";

const Layout_Admin = () => {
    return (
        <div className="flex">
            {/* Bloc latéral fixe */}
            <Bloc/>

            {/* Contenu qui change */}
            <div className="flex-grow p-4 bg-black text-white">
                <Outlet />
            </div>
        </div>
    );
};

export default Layout_Admin;
