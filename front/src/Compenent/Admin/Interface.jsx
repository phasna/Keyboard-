import { useNavigate } from "react-router-dom";
import adminImg from "../../assets/Admin/interface/Admin.png";
import userImg from "../../assets/Admin/interface/User.png";

const Home = () => {
    const navigate = useNavigate();

    return (
        <div className="relative flex justify-center items-center h-screen bg-black overflow-hidden">
            <div className="absolute inset-0">
                {[...Array(10)].map((_, index) => (
                    <div
                        key={index}
                        className="absolute w-56 h-56 bg-blue-800 opacity-50 rounded-full blur-lg animate-bounce"
                        style={{
                            top: `${Math.random() * 100}vh`,
                            left: `${Math.random() * 100}vw`,
                            animationDuration: `${Math.random() * 3 + 5}s`,
                            animationDelay: `${Math.random()}s`,
                        }}
                    ></div>
                ))}
            </div>
            <div className="relative grid grid-cols-2 gap-6 max-w-4xl w-full">
                <div
                    className="bg-white bg-opacity-25 text-white text-center p-10 rounded-2xl cursor-pointer shadow-lg hover:bg-opacity-30 transition flex flex-col items-center"
                    onClick={() => navigate('/Connexion')}
                >
                    <img src={adminImg} alt="Admin" className="w-full h-auto mb-4" />
                    <h2 className="text-xl font-bold">Admin</h2>
                </div>
                <div
                    className="bg-white bg-opacity-25 text-white text-center p-10 rounded-2xl cursor-pointer shadow-lg hover:bg-opacity-30 transition flex flex-col items-center"
                    onClick={() => navigate('/')}
                >
                    <img src={userImg} alt="User" className="w-full h-auto mb-4" />
                    <h2 className="text-xl font-bold">Utilisateur</h2>
                </div>
            </div>
        </div>
    );
};

export default Home;
