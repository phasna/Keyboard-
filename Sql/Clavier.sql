-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Hôte : localhost:8889
-- Généré le : mar. 25 mars 2025 à 10:13
-- Version du serveur : 8.0.35
-- Version de PHP : 8.2.20

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de données : `Clavier`
--

-- --------------------------------------------------------

--
-- Structure de la table `Product`
--

CREATE TABLE `Product` (
  `id` int NOT NULL,
  `image` varchar(255) NOT NULL,
  `title` varchar(255) NOT NULL,
  `price` decimal(10,2) NOT NULL,
  `rating` double NOT NULL,
  `stock` int NOT NULL DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Déchargement des données de la table `Product`
--

INSERT INTO `Product` (`id`, `image`, `title`, `price`, `rating`, `stock`) VALUES
(1, 'BlocText/keyboad.png', 'Clavier 62%', 85.00, 5, 100),
(2, 'Clavier/mecanique62.png', 'Clavier 62%', 90.00, 3, 50),
(3, 'BlocText/keyboad.png', 'Clavier gaming', 85.00, 5, 59),
(4, 'Clavier/gaming.png', 'Clavier bureau 62%', 80.00, 5, 88),
(5, 'Clavier/bureau.png', 'Clavier gaming', 55.00, 5, 23),
(6, 'Clavier/Clavier72.png', 'Clavier 72%', 75.00, 1, 77),
(7, 'Clavier/bureau.png', 'Clavier 100%', 99.00, 1, 98),
(10, 'BlocText/keyboad.png', 'Claver 76%', 125.00, 1, 5),
(44, 'Clavier/bureau.png', 'Clavier mondial', 89.00, 5, 25),
(45, 'Clavier/mecanique62.png', 'Clavier Monster', 55.00, 3, 10),
(52, 'Clavier/mecanique.png', 'test clavier', 55.00, 4, 35);

-- --------------------------------------------------------

--
-- Structure de la table `user`
--

CREATE TABLE `user` (
  `id` int NOT NULL,
  `identifiant` varchar(255) NOT NULL,
  `mot_de_passe` varchar(255) NOT NULL,
  `date_creation` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `nom` varchar(100) NOT NULL,
  `prenom` varchar(100) NOT NULL,
  `email` varchar(255) DEFAULT NULL,
  `telephone` varchar(20) DEFAULT NULL,
  `adresse` text,
  `image` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Déchargement des données de la table `user`
--

INSERT INTO `user` (`id`, `identifiant`, `mot_de_passe`, `date_creation`, `nom`, `prenom`, `email`, `telephone`, `adresse`, `image`) VALUES
(1, 'Davith', 'password123', '2025-02-19 16:23:09', 'Sara', 'lona', 'sara@example.com', '1234567890', '123 Main St', 'ImageUser/user.png\r\n'),
(2, 'Cruz', 'password456', '2025-02-19 16:23:09', 'thun', 'sophech', 'jane.doe@example.com', '0987654321', '456 Oak St', 'ImageUser/user_1.png'),
(3, 'Phannith', 'password789', '2025-02-19 16:23:09', 'phannith', 'cruz aun', 'michael.smith@example.com', '1112233445', '789 Pine St', 'ImageUser/user_2.png'),
(4, 'emilyjones', 'password101', '2025-02-19 16:23:09', 'steve', 'yoan', 'emily.jones@example.com', '2233445566', '101 Maple St', 'ImageUser/user_3.png'),
(5, 'danielbrown', 'password202', '2025-02-19 16:23:09', 'Brown', 'Daniel', 'daniel.brown@example.com', '3344556677', '202 Elm St', 'ImageUser/user_2.png'),
(6, 'laurawilson', 'password303', '2025-02-19 16:23:09', 'Wilson', 'Laura', 'laura.wilson@example.com', '4455667788', '303 Birch St', 'ImageUser/user_3.png'),
(7, 'alexmartin', 'password404', '2025-02-19 16:23:09', 'fafa', 'Alex', 'alex.martin@example.com', '5566778899', '404 Cedar St', 'ImageUser/user.png'),
(8, 'sarahlee', 'password505', '2025-02-19 16:23:09', 'Lee', 'Sarah', 'sarah.lee@example.com', '6677889900', '505 Willow St', ''),
(9, 'robertdavis', 'password606', '2025-02-19 16:23:09', 'Davis', 'Robert', 'robert.davis@example.com', '7788990011', '606 Pineapple St', ''),
(10, 'lindawalker', 'password707', '2025-02-19 16:23:09', 'Walker', 'Linda', 'linda.walker@example.com', '8899001122', '707 Cherry St', 'ImageUser/user_1.png'),
(11, 'Phasna', '123AZERT', '2025-02-20 08:22:51', 'PHASNA', 'AUN', 'phasna@69gmail.com', '0678765324', '69310 PI', 'ImageUser/user_3.png'),
(12, 'P_aun', '$2b$10$30sTuZLzk8V.EhK4v5X2eu3FPhexSzVSX0CSGR3JkiGOigMcTnzUu', '2025-02-20 14:22:05', 'Phasna', 'GG', NULL, NULL, NULL, NULL),
(13, 'Tiago', '$2b$10$EO4EGDAAOd3QONkdj7QLW.HnIegEdsKAd5tJ4fLNnTCQlzNqAvkGS', '2025-02-20 14:25:10', 'benja', 'Tiago', NULL, NULL, NULL, NULL);

-- --------------------------------------------------------

--
-- Structure de la table `ventes`
--

CREATE TABLE `ventes` (
  `id` int NOT NULL,
  `product_id` int NOT NULL,
  `quantite_vendue` int NOT NULL,
  `prix_unitaire` decimal(10,2) NOT NULL,
  `prix_total` decimal(10,2) GENERATED ALWAYS AS ((`quantite_vendue` * `prix_unitaire`)) STORED,
  `date_vente` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Déchargement des données de la table `ventes`
--

INSERT INTO `ventes` (`id`, `product_id`, `quantite_vendue`, `prix_unitaire`, `date_vente`) VALUES
(1, 3, 3, 85.00, '2025-02-18 15:46:10'),
(2, 3, 2, 85.00, '2025-02-18 15:46:39');

--
-- Index pour les tables déchargées
--

--
-- Index pour la table `Product`
--
ALTER TABLE `Product`
  ADD PRIMARY KEY (`id`);

--
-- Index pour la table `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`id`);

--
-- Index pour la table `ventes`
--
ALTER TABLE `ventes`
  ADD PRIMARY KEY (`id`),
  ADD KEY `product_id` (`product_id`);

--
-- AUTO_INCREMENT pour les tables déchargées
--

--
-- AUTO_INCREMENT pour la table `Product`
--
ALTER TABLE `Product`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=56;

--
-- AUTO_INCREMENT pour la table `user`
--
ALTER TABLE `user`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;

--
-- AUTO_INCREMENT pour la table `ventes`
--
ALTER TABLE `ventes`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- Contraintes pour les tables déchargées
--

--
-- Contraintes pour la table `ventes`
--
ALTER TABLE `ventes`
  ADD CONSTRAINT `ventes_ibfk_1` FOREIGN KEY (`product_id`) REFERENCES `product` (`id`) ON DELETE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
