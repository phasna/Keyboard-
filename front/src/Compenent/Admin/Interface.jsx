import { Link } from "react-router-dom";
import { motion } from "framer-motion"; // Import Framer Motion
import { Shield, User } from "lucide-react"; // Icons for Admin and User

const Home = () => {
  return (
    <div className="relative flex justify-center items-center flex-col h-screen bg-black overflow-hidden">
      <h1 className={"text-5xl text-center text-white z-50 mb-10"}>
        VOTRE INTERFACE
      </h1>
      {/* Background animation */}
      <div className="absolute inset-0">
        {[...Array(10)].map((_, index) => (
          <motion.div
            key={index}
            className="absolute w-56 h-56 bg-blue-800 opacity-50 rounded-full blur-lg"
            initial={{
              top: `${Math.random() * 100}vh`,
              left: `${Math.random() * 100}vw`,
            }}
            animate={{
              top: `${Math.random() * 100}vh`,
              left: `${Math.random() * 100}vw`,
              opacity: [0.5, 0.8, 0.5],
            }}
            transition={{
              duration: Math.random() * 3 + 5,
              repeat: Infinity,
              repeatType: "loop",
              ease: "easeInOut",
            }}
          />
        ))}
      </div>

      {/* Main content */}
      <div className="relative grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-4xl w-full px-4 py-6">
        {/* Admin Section */}
        <Link to="/addproduct">
          <motion.div
            className="bg-white bg-opacity-25 text-white text-center p-10 rounded-2xl cursor-pointer shadow-lg hover:bg-opacity-30 transition-all transform hover:scale-105 flex flex-col items-center"
            whileHover={{ scale: 1.05 }} // Zoom effect on hover
            whileTap={{ scale: 0.95 }} // Tap effect
          >
            <div className="relative w-32 h-32 mb-4">
              <motion.div
                className="absolute inset-0 bg-blue-600 rounded-full border-4 border-t-transparent border-b-transparent"
                animate={{ rotate: 360 }}
                transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
              />
              <div className="absolute inset-2 bg-blue-500 rounded-full flex items-center justify-center">
                <Shield className="text-white w-12 h-12" />
              </div>
            </div>
            <h2 className="text-xl font-bold">Admin</h2>
          </motion.div>
        </Link>

        {/* User Section */}
        <Link to="/userpage">
          <motion.div
            className="bg-white bg-opacity-25 text-white text-center p-10 rounded-2xl cursor-pointer shadow-lg hover:bg-opacity-30 transition-all transform hover:scale-105 flex flex-col items-center"
            whileHover={{ scale: 1.05 }} // Zoom effect on hover
            whileTap={{ scale: 0.95 }} // Tap effect
          >
            <div className="relative w-32 h-32 mb-4">
              <motion.div
                className="absolute inset-0 bg-green-600 rounded-full border-4 border-t-transparent border-b-transparent"
                animate={{ rotate: 360 }}
                transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
              />
              <div className="absolute inset-2 bg-green-500 rounded-full flex items-center justify-center">
                <User className="text-white w-12 h-12" />
              </div>
            </div>
            <h2 className="text-xl font-bold">Utilisateur</h2>
          </motion.div>
        </Link>
      </div>
    </div>
  );
};

export default Home;
