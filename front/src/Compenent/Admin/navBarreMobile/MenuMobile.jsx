import React, { useEffect, useRef } from "react"; // Import React and hooks
import { Link, useLocation } from "react-router-dom"; // Import React Router dependencies
import Logo from "../../../assets/Logo/Logo_01.png"; // Import the logo image
import {
  FaPlus,
  FaEdit,
  FaUserPlus,
  FaUserCircle,
  FaHome,
  FaUsers,
  FaMoon,
} from "react-icons/fa"; // Import icons

const FooterMenu = () => {
  const location = useLocation(); // Get the current route
  const highlightRef = useRef(null); // Ref for the highlight circle

  // Define navigation items directly in the component
  const navItems = [
    { path: "/addproduct", icon: <FaPlus />, title: "Ajouter un produit" },
    {
      path: "/Liste_des_commande",
      icon: <FaUsers />,
      title: "Liste des commandes",
    },
    { path: "/accueiladmin", icon: <FaHome />, title: "Accueil" },
    {
      path: "/listeutilisateurs",
      icon: <FaUserCircle />,
      title: "Liste des utilisateurs",
    },
    { path: "/adduser", icon: <FaUserPlus />, title: "Ajouter un utilisateur" },
    {
      path: "/updateuser/:id",
      icon: <FaEdit />,
      title: "Modifier un utilisateur",
    },
  ];

  // Determine the active tab index based on the current route
  const activeIndex = navItems.findIndex((item) =>
    item.path.includes(":id")
      ? location.pathname.startsWith(item.path.split(":")[0])
      : location.pathname === item.path
  );

  // Animate the highlight circle to the active tab
  useEffect(() => {
    if (highlightRef.current) {
      const itemWidth = 100 / navItems.length; // Calculate the width of each item as a percentage
      const leftPosition = itemWidth * activeIndex + itemWidth / 2; // Center the highlight on the active item
      highlightRef.current.style.left = `${leftPosition}%`;
    }
  }, [activeIndex, navItems.length]);

  return (
    <div className="fixed bottom-0 left-0 w-full bg-white text-white p-4 flex justify-center items-center shadow-2xl rounded-t-3xl z-10">
      {/* Logo (centered above the navigation bar on mobile) */}
      <Link
        to="/"
        className="absolute top-[-60px] left-1/2 transform -translate-x-1/2 hidden sm:block"
      >
        <img className="w-12 h-auto" src={Logo} alt="Logo" />
      </Link>

      {/* Navigation Container */}
      <div className="relative flex justify-around items-center w-full max-w-md">
        {/* Highlight Circle */}
        <div
          ref={highlightRef}
          className="absolute w-14 h-14 bg-gray-800 rounded-full transition-all duration-500 ease-in-out transform -translate-x-1/2 top-1/2 -translate-y-1/2"
        ></div>

        {/* Navigation Items */}
        {navItems.map((item, index) => (
          <Link
            key={index}
            to={item.path}
            className={`relative z-10 p-2 transition-all duration-300 ${
              activeIndex === index
                ? "text-white scale-125"
                : "text-black hover:text-gray-200"
            }`}
            title={item.title}
          >
            {React.cloneElement(item.icon, {
              className: `text-xl sm:text-2xl ${
                activeIndex === index ? "text-3xl" : ""
              }`,
            })}
          </Link>
        ))}
      </div>
    </div>
  );
};

export default FooterMenu;
