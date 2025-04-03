import {Outlet} from "react-router-dom";
import Menu from "../Compenent/Menu.jsx";
import MenuMobile from "../Compenent/navBarre/Menu.jsx";


function LayoutUser() {
    return (
        <>
            <div className="flex">
                <div className={"lg:block hidden"}>
                    <Menu/>
                </div>

                {/*Menu pour version mobile*/}
                <div className={"block lg:hidden"}>
                    <MenuMobile/>
                </div>
                <div className="w-full">
                    <Outlet/>
                </div>

            </div>
        </>
    );
}

export default LayoutUser;