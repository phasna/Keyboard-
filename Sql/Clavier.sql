-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: localhost:8889
-- Generation Time: Mar 28, 2025 at 01:20 PM
-- Server version: 8.0.35
-- PHP Version: 8.2.20

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `Clavier`
--

-- --------------------------------------------------------

--
-- Table structure for table `Cart`
--

CREATE TABLE `Cart` (
  `id` int NOT NULL,
  `clientId` int NOT NULL,
  `productId` int NOT NULL,
  `quantity` int NOT NULL,
  `price` decimal(10,2) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `Cart`
--

INSERT INTO `Cart` (`id`, `clientId`, `productId`, `quantity`, `price`) VALUES
(44, 26, 2, 1, 90.00),
(45, 26, 6, 1, 75.00),
(46, 26, 7, 1, 99.00);

--
-- Triggers `Cart`
--
DELIMITER $$
CREATE TRIGGER `update_id_produit_on_insert` AFTER INSERT ON `Cart` FOR EACH ROW BEGIN
    DECLARE nb_produits INT;
    
    -- Compter le nombre total de produits du client
    SELECT COUNT(*) INTO nb_produits FROM cart WHERE clientId = NEW.clientId;
    
    -- Mettre à jour la table clients
    UPDATE clients 
    SET id_produit = nb_produits
    WHERE id = NEW.clientId;
END
$$
DELIMITER ;

-- --------------------------------------------------------

--
-- Table structure for table `clients`
--

CREATE TABLE `clients` (
  `id` int NOT NULL,
  `nom` varchar(100) NOT NULL,
  `prenom` varchar(100) NOT NULL,
  `email` varchar(255) NOT NULL,
  `telephone` varchar(20) DEFAULT NULL,
  `adresse` text,
  `identifiant` varchar(255) NOT NULL,
  `date_inscription` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `mode_livraison` varchar(50) DEFAULT NULL,
  `pays` varchar(50) DEFAULT NULL,
  `ville` varchar(50) DEFAULT NULL,
  `code_postal` varchar(10) DEFAULT NULL,
  `cardNumber` varchar(16) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `nameCard` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `expirationDate` varchar(15) DEFAULT NULL,
  `cvv` varchar(4) DEFAULT NULL,
  `paymentMethod` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `id_produit` int DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `clients`
--

INSERT INTO `clients` (`id`, `nom`, `prenom`, `email`, `telephone`, `adresse`, `identifiant`, `date_inscription`, `mode_livraison`, `pays`, `ville`, `code_postal`, `cardNumber`, `nameCard`, `expirationDate`, `cvv`, `paymentMethod`, `id_produit`) VALUES
(26, 'Cruz-Aun', 'phasna', 'phasna.aun@afip-formations.com', '0652473681', '1 allée des peuplier', 'phasna.aun@afip-formations.com', '2025-03-28 13:19:51', 'standard', 'fr', 'Pierre bénite', '69320', '065646646447', 'aun', '11/12', '128', 'Visa', 3);

--
-- Triggers `clients`
--
DELIMITER $$
CREATE TRIGGER `before_insert_clients` BEFORE INSERT ON `clients` FOR EACH ROW BEGIN
    SET NEW.identifiant = NEW.email;
END
$$
DELIMITER ;

-- --------------------------------------------------------

--
-- Table structure for table `commandes`
--

CREATE TABLE `commandes` (
  `id` int NOT NULL,
  `id_client` int NOT NULL,
  `date_commande` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `total` decimal(10,2) DEFAULT NULL,
  `statut` varchar(50) DEFAULT 'En cours'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Table structure for table `Product`
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
-- Dumping data for table `Product`
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
(52, 'Clavier/mecanique.png', 'Clavier Alfa', 55.00, 4, 35);

-- --------------------------------------------------------

--
-- Stand-in structure for view `statistiques_ventes`
-- (See below for the actual view)
--
CREATE TABLE `statistiques_ventes` (
`chiffre_affaires_total` decimal(32,2)
,`nombre_produits_vendus` decimal(32,0)
,`nombre_utilisateurs` bigint
);

-- --------------------------------------------------------

--
-- Table structure for table `user`
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
  `image` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `role` varchar(255) NOT NULL DEFAULT 'user'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `user`
--

INSERT INTO `user` (`id`, `identifiant`, `mot_de_passe`, `date_creation`, `nom`, `prenom`, `email`, `telephone`, `adresse`, `image`, `role`) VALUES
(1, 'Davith', 'Davith123', '2025-02-19 16:23:09', 'Sara', 'lona', 'sara@example.com', '1234567890', '26 rue de gare oullins ', 'ImageUser/user.png\r\n', 'user'),
(2, 'Cruz', 'password456', '2025-02-19 16:23:09', 'thun', 'sophech', 'jane.doe@example.com', '0987654321', '456 Oak St', 'ImageUser/user_1.png', 'user'),
(3, 'Phannith', 'password789', '2025-02-19 16:23:09', 'phannith', 'cruz aun', 'michael.smith@example.com', '1112233445', '789 Pine St', 'ImageUser/user_2.png', 'user'),
(4, 'emilyjones', 'password101', '2025-02-19 16:23:09', 'steve', 'yoan', 'emily.jones@example.com', '2233445566', '101 Maple St', 'ImageUser/user_3.png', 'user'),
(5, 'danielbrown', 'password202', '2025-02-19 16:23:09', 'Brown', 'Daniel', 'daniel.brown@example.com', '3344556677', '202 Elm St', 'ImageUser/user_2.png', 'user'),
(6, 'laurawilson', 'password303', '2025-02-19 16:23:09', 'Wilson', 'Laura', 'laura.wilson@example.com', '4455667788', '303 Birch St', 'ImageUser/user_3.png', 'user'),
(7, 'alexmartin', 'password404', '2025-02-19 16:23:09', 'fafa', 'Alex', 'alex.martin@example.com', '5566778899', '404 Cedar St', 'ImageUser/user.png', 'user'),
(8, 'sarahlee', 'password505', '2025-02-19 16:23:09', 'Lee', 'Sarah', 'sarah.lee@example.com', '6677889900', '505 Willow St', '', 'user'),
(9, 'robertdavis', 'password606', '2025-02-19 16:23:09', 'Davis', 'Robert', 'robert.davis@example.com', '7788990011', '606 Pineapple St', '', 'user'),
(10, 'lindawalker', 'password707', '2025-02-19 16:23:09', 'Walker', 'Linda', 'linda.walker@example.com', '8899001122', '707 Cherry St', 'ImageUser/user_1.png', 'user'),
(11, 'Phasna', 'Phasna123', '2025-02-20 08:22:51', 'PHASNA', 'AUN', 'phasna@69gmail.com', '0678765324', '69310 PI', 'ImageUser/user_3.png', 'admin'),
(15, 'Sara', '$2b$10$at5o2alDZapSUdIvq8UzOeQel0gF1dwFiYp7EHlM8DedqczjxWt2m', '2025-03-26 10:00:43', 'Sara', 'Nana', 'Sara@gmail.com', '0652345678', '15 Rue de Flesselles', NULL, 'user');

-- --------------------------------------------------------

--
-- Table structure for table `ventes`
--

CREATE TABLE `ventes` (
  `id` int NOT NULL,
  `id_user` int NOT NULL,
  `product_id` int NOT NULL,
  `quantite_vendue` int NOT NULL,
  `prix_unitaire` decimal(10,2) NOT NULL,
  `prix_total` decimal(10,2) GENERATED ALWAYS AS ((`quantite_vendue` * `prix_unitaire`)) STORED,
  `date_vente` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `ventes`
--

INSERT INTO `ventes` (`id`, `id_user`, `product_id`, `quantite_vendue`, `prix_unitaire`, `date_vente`) VALUES
(1, 1, 3, 3, 85.00, '2025-02-18 15:46:10'),
(2, 2, 3, 2, 85.00, '2025-02-18 15:46:39'),
(7, 1, 1, 2, 50.00, '2024-03-26 00:00:00'),
(8, 2, 2, 1, 5000.00, '2024-03-25 00:00:00'),
(9, 3, 3, 3, 3000.00, '2024-03-24 00:00:00'),
(10, 1, 4, 1, 75.00, '2024-03-23 00:00:00');

-- --------------------------------------------------------

--
-- Structure for view `statistiques_ventes`
--
DROP TABLE IF EXISTS `statistiques_ventes`;

CREATE ALGORITHM=UNDEFINED DEFINER=`root`@`localhost` SQL SECURITY DEFINER VIEW `statistiques_ventes`  AS SELECT (select coalesce(sum(`ventes`.`prix_total`),0) from `ventes`) AS `chiffre_affaires_total`, (select coalesce(sum(`ventes`.`quantite_vendue`),0) from `ventes`) AS `nombre_produits_vendus`, (select count(0) from `user`) AS `nombre_utilisateurs` ;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `Cart`
--
ALTER TABLE `Cart`
  ADD PRIMARY KEY (`id`),
  ADD KEY `cart_ibfk_1` (`clientId`),
  ADD KEY `cart_ibfk_2` (`productId`);

--
-- Indexes for table `clients`
--
ALTER TABLE `clients`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `identifiant` (`identifiant`),
  ADD KEY `fk_clients_produit` (`id_produit`);

--
-- Indexes for table `commandes`
--
ALTER TABLE `commandes`
  ADD PRIMARY KEY (`id`),
  ADD KEY `id_client` (`id_client`);

--
-- Indexes for table `Product`
--
ALTER TABLE `Product`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `ventes`
--
ALTER TABLE `ventes`
  ADD PRIMARY KEY (`id`),
  ADD KEY `product_id` (`product_id`),
  ADD KEY `fk_ventes_user` (`id_user`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `Cart`
--
ALTER TABLE `Cart`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=47;

--
-- AUTO_INCREMENT for table `clients`
--
ALTER TABLE `clients`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=27;

--
-- AUTO_INCREMENT for table `commandes`
--
ALTER TABLE `commandes`
  MODIFY `id` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `Product`
--
ALTER TABLE `Product`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=57;

--
-- AUTO_INCREMENT for table `user`
--
ALTER TABLE `user`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=16;

--
-- AUTO_INCREMENT for table `ventes`
--
ALTER TABLE `ventes`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `Cart`
--
ALTER TABLE `Cart`
  ADD CONSTRAINT `cart_ibfk_1` FOREIGN KEY (`clientId`) REFERENCES `clients` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `cart_ibfk_2` FOREIGN KEY (`productId`) REFERENCES `Product` (`id`);

--
-- Constraints for table `clients`
--
ALTER TABLE `clients`
  ADD CONSTRAINT `fk_clients_produit` FOREIGN KEY (`id_produit`) REFERENCES `Product` (`id`) ON DELETE SET NULL,
  ADD CONSTRAINT `fk_id_produit` FOREIGN KEY (`id_produit`) REFERENCES `Product` (`id`) ON DELETE SET NULL;

--
-- Constraints for table `commandes`
--
ALTER TABLE `commandes`
  ADD CONSTRAINT `commandes_ibfk_1` FOREIGN KEY (`id_client`) REFERENCES `clients` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `ventes`
--
ALTER TABLE `ventes`
  ADD CONSTRAINT `fk_ventes_user` FOREIGN KEY (`id_user`) REFERENCES `user` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `ventes_ibfk_1` FOREIGN KEY (`product_id`) REFERENCES `product` (`id`) ON DELETE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
