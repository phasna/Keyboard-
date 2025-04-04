import { useEffect, useState, useCallback } from "react";
import { FaEdit, FaTrash, FaSearch, FaTimes } from "react-icons/fa";
import { CgProfile } from "react-icons/cg";
import Swal from "sweetalert2";
import { motion, AnimatePresence } from "framer-motion";

const UserList = () => {
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [expandedUser, setExpandedUser] = useState(null);
  const [isSearchFocused, setIsSearchFocused] = useState(false);

  useEffect(() => {
    fetch("http://localhost:8000/api/utilisateurs")
      .then((response) => response.json())
      .then((data) => {
        setUsers(data);
        setFilteredUsers(data);
      })
      .catch((error) => console.error("Erreur de récupération :", error));
  }, []);

  useEffect(() => {
    const filtered = users.filter(
      (user) =>
        user.nom?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.prenom?.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredUsers(filtered);
  }, [searchTerm, users]);

  const handleDelete = useCallback(
    (id) => {
      Swal.fire({
        title: "Êtes-vous sûr ?",
        text: "Cette action est irréversible !",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#d33",
        cancelButtonColor: "#3085d6",
        confirmButtonText: "Oui, supprimer !",
        cancelButtonText: "Annuler",
      }).then((result) => {
        if (result.isConfirmed) {
          fetch(`http://localhost:8000/api/utilisateurs/${id}`, {
            method: "DELETE",
          }).then(() => {
            setUsers(users.filter((user) => user.id !== id));
            if (expandedUser === id) setExpandedUser(null);
            Swal.fire("Supprimé !", "L'utilisateur a été supprimé.", "success");
          });
        }
      });
    },
    [users, expandedUser]
  );

  const handleEdit = useCallback((user) => {
    setSelectedUser(user);
    setShowEditModal(true);
  }, []);

  const handleModalClose = useCallback(() => {
    setShowEditModal(false);
    setSelectedUser(null);
  }, []);

  const handleFormChange = useCallback((e) => {
    const { name, value } = e.target;
    setSelectedUser((prev) => ({ ...prev, [name]: value }));
  }, []);

  const toggleUserExpand = useCallback((id) => {
    setExpandedUser((current) => (current === id ? null : id));
  }, []);

  const handleFormSubmit = useCallback(() => {
    fetch(`http://localhost:8000/api/utilisateurs/${selectedUser.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(selectedUser),
    }).then(() => {
      const updatedUsers = users.map((user) =>
        user.id === selectedUser.id ? selectedUser : user
      );
      setUsers(updatedUsers);
      setShowEditModal(false);
      Swal.fire({
        title: "Succès",
        text: "Les informations de l'utilisateur ont été modifiées.",
        icon: "success",
        confirmButtonColor: "#3085d6",
        confirmButtonText: "OK",
      });
    });
  }, [selectedUser, users]);

  const containerBlur = showEditModal ? "filter blur-sm" : "";

  return (
    <div className="w-screen mx-auto text-white p-4 md:p-5 relative pb-20">
      <motion.h2
        className={`text-3xl md:text-5xl font-light mb-6 md:mb-10 md:text-left ${containerBlur}`}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        UTILISATEURS
      </motion.h2>

      <div className={`mb-4 relative ${containerBlur}`}>
        <div
          className={`relative flex items-center w-full ${
            isSearchFocused ? "ring-2 ring-blue-500" : ""
          }`}
        >
          <FaSearch className="absolute left-3 text-gray-400" />
          <input
            type="text"
            placeholder="Rechercher un utilisateur..."
            className="p-3 pl-10 w-full rounded-lg text-white bg-black bg-opacity-60 border border-gray-700 focus:outline-none"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onFocus={() => setIsSearchFocused(true)}
            onBlur={() => setIsSearchFocused(false)}
          />
          {searchTerm && (
            <FaTimes
              className="absolute right-3 text-gray-400 cursor-pointer"
              onClick={() => setSearchTerm("")}
            />
          )}
        </div>
      </div>

      {/* Affichage bureau */}
      <div
        className={`hidden md:block overflow-x-auto shadow-2xl rounded-xl ${containerBlur}`}
      >
        <table className="w-full border-collapse bg-zinc-900 bg-opacity-40 rounded-xl text-white">
          <thead>
            <tr className="bg-zinc-900 text-white text-lg">
              <th className="p-4">Photo</th>
              <th className="p-4">Nom</th>
              <th className="p-4">Prénom</th>
              <th className="p-4">Email</th>
              <th className="p-4">Téléphone</th>
              <th className="p-4">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredUsers.map((user) => (
              <motion.tr
                key={user.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className="border-b border-gray-800 hover:bg-opacity-30 hover:bg-zinc-700 transition-all"
              >
                <td className="p-4 text-center">
                  {user.image ? (
                    <motion.img
                      src={user.image.trim()}
                      alt={user.nom}
                      className="w-14 h-14 rounded-full object-cover mx-auto shadow-lg"
                      whileHover={{ scale: 1.1 }}
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = "";
                      }}
                    />
                  ) : (
                    <motion.div
                      whileHover={{ scale: 1.1 }}
                      className="w-14 h-14 rounded-full bg-gray-700 flex items-center justify-center mx-auto"
                    >
                      <CgProfile className="w-8 h-8 text-white" />
                    </motion.div>
                  )}
                </td>
                <td className="p-4 text-center">{user.nom || "N/A"}</td>
                <td className="p-4 text-center">{user.prenom || "N/A"}</td>
                <td className="p-4 text-center">
                  {user.email || "Non renseigné"}
                </td>
                <td className="p-4 text-center">
                  {user.telephone || "Non renseigné"}
                </td>
                <td className="p-4 flex justify-center gap-3">
                  <motion.button
                    onClick={() => handleEdit(user)}
                    className="p-2 bg-blue-600 text-white rounded-full shadow-lg hover:bg-blue-700"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <FaEdit size={18} />
                  </motion.button>
                  <motion.button
                    onClick={() => handleDelete(user.id)}
                    className="p-2 bg-red-600 text-white rounded-full shadow-lg hover:bg-red-700"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <FaTrash size={18} />
                  </motion.button>
                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Affichage mobile - Cards */}
      <div className={`md:hidden ${containerBlur}`}>
        <AnimatePresence>
          {filteredUsers.length === 0 ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-8 text-gray-400"
            >
              Aucun utilisateur trouvé
            </motion.div>
          ) : (
            filteredUsers.map((user) => (
              <motion.div
                key={user.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
                className="p-4 bg-gray-600 bg-opacity-40 rounded-xl overflow-hidden shadow-lg my-4"
              >
                <div
                  className="p-4 flex items-center justify-between cursor-pointer"
                  onClick={() => toggleUserExpand(user.id)}
                >
                  <div className="flex items-center space-x-4">
                    {user.image ? (
                      <img
                        src={user.image.trim()}
                        alt={user.nom}
                        className="w-12 h-12 rounded-full object-cover shadow-md"
                        onError={(e) => {
                          e.target.onerror = null;
                          e.target.src = "";
                        }}
                      />
                    ) : (
                      <div className="w-12 h-12 rounded-full bg-gray-700 flex items-center justify-center">
                        <CgProfile className="w-6 h-6 text-white" />
                      </div>
                    )}
                    <div>
                      <h3 className="font-medium text-lg">
                        {user.nom} {user.prenom}
                      </h3>
                      <p className="text-gray-400 text-sm">{user.email}</p>
                    </div>
                  </div>
                  <motion.div
                    animate={{ rotate: expandedUser === user.id ? 180 : 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 9l-7 7-7-7"
                      />
                    </svg>
                  </motion.div>
                </div>

                <AnimatePresence>
                  {expandedUser === user.id && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="border-t border-gray-700"
                    >
                      <div className="p-4 space-y-2">
                        <div>
                          <span className="text-gray-400">Téléphone:</span>
                          <p>{user.telephone || "Non renseigné"}</p>
                        </div>
                        <div>
                          <span className="text-gray-400">Adresse:</span>
                          <p>{user.adresse || "Non renseignée"}</p>
                        </div>
                        <div className="flex justify-end space-x-3 pt-3">
                          <motion.button
                            onClick={() => handleEdit(user)}
                            className="p-2 px-6 bg-[#FFB800] text-black rounded-lg shadow-lg"
                            whileTap={{ scale: 0.95 }}
                          >
                            <FaEdit size={16} className="mr-1 inline" />{" "}
                            Modifier
                          </motion.button>
                          <motion.button
                            onClick={() => handleDelete(user.id)}
                            className="p-2 bg-red-600 text-white rounded-lg shadow-lg"
                            whileTap={{ scale: 0.95 }}
                          >
                            <FaTrash size={16} className="mr-1 inline" />{" "}
                            Supprimer
                          </motion.button>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))
          )}
        </AnimatePresence>
      </div>

      {/* Modal d'édition */}
      <AnimatePresence>
        {showEditModal && (
          <motion.div
            className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-70 z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="bg-zinc-900 rounded-xl w-11/12 sm:w-4/5 md:w-2/3 lg:w-1/2 p-4 max-h-[90vh] overflow-y-auto"
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
            >
              <div className="flex justify-between items-center mb-4 bg-zinc-900 py-2 border-b border-gray-700">
                <h2 className="text-2xl font-light">
                  Modifier l&apos;utilisateur
                </h2>
                <button
                  onClick={handleModalClose}
                  className="text-gray-400 hover:text-white p-2 rounded-full hover:bg-gray-700"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>

              <div className="space-y-4">
                {selectedUser && (
                  <>
                    <div className="flex justify-center mb-6">
                      {selectedUser.image ? (
                        <img
                          src={selectedUser.image.trim()}
                          alt={selectedUser.nom}
                          className="w-24 h-24 rounded-full object-cover shadow-lg border-2 border-blue-500"
                          onError={(e) => {
                            e.target.onerror = null;
                            e.target.src = "";
                          }}
                        />
                      ) : (
                        <div className="w-24 h-24 rounded-full bg-gray-700 flex items-center justify-center border-2 border-blue-500">
                          <CgProfile className="w-12 h-12 text-white" />
                        </div>
                      )}
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {["nom", "prenom", "email", "telephone", "adresse"].map(
                        (field) => (
                          <div key={field} className="mb-1">
                            <label className="block mb-1 text-gray-300 text-sm">
                              {field.charAt(0).toUpperCase() +
                                field.slice(1).replace("_", " ")}
                            </label>
                            <input
                              type="text"
                              name={field}
                              value={selectedUser[field] || ""}
                              onChange={handleFormChange}
                              className="py-2 px-3 rounded-lg w-full bg-black bg-opacity-50 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                          </div>
                        )
                      )}

                      <div className="mb-1">
                        <label className="block mb-1 text-gray-300 text-sm">
                          Mot de passe
                        </label>
                        <input
                          type="password"
                          name="mot_de_passe"
                          value={selectedUser.mot_de_passe || ""}
                          onChange={handleFormChange}
                          className="py-2 px-3 rounded-lg w-full bg-black bg-opacity-50 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                          placeholder="Laisser vide pour conserver le mot de passe actuel"
                        />
                      </div>

                      <div className="mb-1">
                        <label className="block mb-1 text-gray-300 text-sm">
                          URL de l&apos;image
                        </label>
                        <input
                          type="text"
                          name="image"
                          value={selectedUser.image || ""}
                          onChange={handleFormChange}
                          className="py-2 px-3 rounded-lg w-full bg-black bg-opacity-50 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                      </div>
                    </div>

                    <div className="flex flex-col sm:flex-row justify-end gap-3 mt-6">
                      <button
                        onClick={handleModalClose}
                        className="px-4 py-3 bg-gray-700 rounded-3xl text-white order-2 sm:order-1"
                      >
                        Annuler
                      </button>
                      <button
                        onClick={handleFormSubmit}
                        className="px-4 py-3 bg-[#FFB800] text-black rounded-3xl order-1 sm:order-2"
                      >
                        Enregistrer
                      </button>
                    </div>
                  </>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default UserList;
