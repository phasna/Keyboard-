import ListeOrder from '../../Compenent/Admin/ListeOrder/listeOrder.jsx';
import ListeOrderMobile from '../../Compenent/Admin/ListeOrder/SmallScreen/listeOrder.jsx';

function App() {
    return (
        <div className="h-screen flex flex-col bg-black">
            {/* Panier */}
            <div className={"bg-black"}>
                <div className="flex-grow lg:block hidden">
                    <ListeOrder/>
                </div>

                {/*Version mobile*/}
                <div className="flex-grow block lg:hidden">
                    <ListeOrderMobile/>
                </div>
            </div>

        </div>
    );
}

export default App;
