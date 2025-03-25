import {Outlet} from "react-router-dom";
import Menu from "../Compenent/Menu.jsx";


function LayoutUser() {
    return (
        <>
            <div className="flex">
                <Menu/>
                <div className="w-full">
                    <Outlet/>
                </div>

            </div>
        </>
    );
}

export default LayoutUser;