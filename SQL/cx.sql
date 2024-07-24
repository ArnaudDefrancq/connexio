-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Hôte : 127.0.0.1:3306
-- Généré le : jeu. 20 juin 2024 à 08:06
-- Version du serveur : 8.0.31
-- Version de PHP : 8.0.26

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de données : `cx`
--

-- --------------------------------------------------------

--
-- Structure de la table `cx__amitier`
--

DROP TABLE IF EXISTS `cx__amitier`;
CREATE TABLE IF NOT EXISTS `cx__amitier` (
  `id_amiter` int NOT NULL AUTO_INCREMENT,
  `id_profil` int DEFAULT NULL,
  `id_profil_1` int DEFAULT NULL,
  `status` enum('pending','accepted','rejected') DEFAULT 'pending',
  PRIMARY KEY (`id_amiter`),
  KEY `id_profil` (`id_profil`),
  KEY `id_profil_1` (`id_profil_1`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Structure de la table `cx__commentaire`
--

DROP TABLE IF EXISTS `cx__commentaire`;
CREATE TABLE IF NOT EXISTS `cx__commentaire` (
  `id_commentaire` int NOT NULL AUTO_INCREMENT,
  `content` text NOT NULL,
  `created_at` int NOT NULL,
  `id_post` int NOT NULL,
  `id_profil` int NOT NULL,
  PRIMARY KEY (`id_commentaire`),
  KEY `id_post` (`id_post`),
  KEY `id_profil` (`id_profil`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Structure de la table `cx__commentaire_like`
--

DROP TABLE IF EXISTS `cx__commentaire_like`;
CREATE TABLE IF NOT EXISTS `cx__commentaire_like` (
  `id_commentaire_like` int NOT NULL AUTO_INCREMENT,
  `id_profil` int DEFAULT NULL,
  `id_commentaire` int DEFAULT NULL,
  PRIMARY KEY (`id_commentaire_like`),
  KEY `id_profil` (`id_profil`),
  KEY `id_commentaire` (`id_commentaire`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Structure de la table `cx__post`
--

DROP TABLE IF EXISTS `cx__post`;
CREATE TABLE IF NOT EXISTS `cx__post` (
  `id_post` int NOT NULL AUTO_INCREMENT,
  `content` text NOT NULL,
  `media` varchar(255) DEFAULT NULL,
  `created_at` int NOT NULL,
  `updated_at` int NOT NULL,
  `id_profil` int NOT NULL,
  PRIMARY KEY (`id_post`),
  KEY `id_profil` (`id_profil`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Structure de la table `cx__post_like`
--

DROP TABLE IF EXISTS `cx__post_like`;
CREATE TABLE IF NOT EXISTS `cx__post_like` (
  `id_post_like` int NOT NULL AUTO_INCREMENT,
  `id_profil` int DEFAULT NULL,
  `id_post` int DEFAULT NULL,
  PRIMARY KEY (`id_post_like`),
  KEY `id_profil` (`id_profil`),
  KEY `id_post` (`id_post`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Structure de la table `cx__profil`
--

DROP TABLE IF EXISTS `cx__profil`;
CREATE TABLE IF NOT EXISTS `cx__profil` (
  `id_profil` int NOT NULL AUTO_INCREMENT,
  `nom` varchar(50) NOT NULL,
  `prenom` varchar(50) NOT NULL,
  `date_naissance` int NOT NULL,
  `img_profil` varchar(255) NOT NULL,
  `img_bg` varchar(255) NOT NULL,
  `ville` varchar(255) DEFAULT NULL,
  `description` varchar(255) DEFAULT NULL,
  `created_at` int NOT NULL,
  `updated_at` int NOT NULL,
  `id_user` int NOT NULL,
  PRIMARY KEY (`id_profil`),
  KEY `id_user` (`id_user`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Structure de la table `cx__role`
--

DROP TABLE IF EXISTS `cx__role`;
CREATE TABLE IF NOT EXISTS `cx__role` (
  `id_role` int NOT NULL AUTO_INCREMENT,
  `role` varchar(50) NOT NULL,
  PRIMARY KEY (`id_role`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Structure de la table `cx__user`
--

DROP TABLE IF EXISTS `cx__user`;
CREATE TABLE IF NOT EXISTS `cx__user` (
  `id_user` int NOT NULL AUTO_INCREMENT,
  `email` varchar(50) NOT NULL,
  `password` varchar(255) NOT NULL,
  `created_at` int NOT NULL,
  `id_role` int NOT NULL,
  PRIMARY KEY (`id_user`),
  UNIQUE KEY `email` (`email`),
  KEY `id_role` (`id_role`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Contraintes pour les tables déchargées
--

--
-- Contraintes pour la table `cx__amitier`
--
ALTER TABLE `cx__amitier`
  ADD CONSTRAINT `cx__amitier_ibfk_1` FOREIGN KEY (`id_profil`) REFERENCES `cx__profil` (`id_profil`),
  ADD CONSTRAINT `cx__amitier_ibfk_2` FOREIGN KEY (`id_profil_1`) REFERENCES `cx__profil` (`id_profil`);

--
-- Contraintes pour la table `cx__commentaire`
--
ALTER TABLE `cx__commentaire`
  ADD CONSTRAINT `cx__commentaire_ibfk_1` FOREIGN KEY (`id_post`) REFERENCES `cx__post` (`id_post`),
  ADD CONSTRAINT `cx__commentaire_ibfk_2` FOREIGN KEY (`id_profil`) REFERENCES `cx__profil` (`id_profil`);

--
-- Contraintes pour la table `cx__commentaire_like`
--
ALTER TABLE `cx__commentaire_like`
  ADD CONSTRAINT `cx__commentaire_like_ibfk_1` FOREIGN KEY (`id_profil`) REFERENCES `cx__profil` (`id_profil`),
  ADD CONSTRAINT `cx__commentaire_like_ibfk_2` FOREIGN KEY (`id_commentaire`) REFERENCES `cx__commentaire` (`id_commentaire`);

--
-- Contraintes pour la table `cx__post`
--
ALTER TABLE `cx__post`
  ADD CONSTRAINT `cx__post_ibfk_1` FOREIGN KEY (`id_profil`) REFERENCES `cx__profil` (`id_profil`);

--
-- Contraintes pour la table `cx__post_like`
--
ALTER TABLE `cx__post_like`
  ADD CONSTRAINT `cx__post_like_ibfk_1` FOREIGN KEY (`id_profil`) REFERENCES `cx__profil` (`id_profil`),
  ADD CONSTRAINT `cx__post_like_ibfk_2` FOREIGN KEY (`id_post`) REFERENCES `cx__post` (`id_post`);

--
-- Contraintes pour la table `cx__profil`
--
ALTER TABLE `cx__profil`
  ADD CONSTRAINT `cx__profil_ibfk_1` FOREIGN KEY (`id_user`) REFERENCES `cx__user` (`id_user`);

--
-- Contraintes pour la table `cx__user`
--
ALTER TABLE `cx__user`
  ADD CONSTRAINT `cx__user_ibfk_1` FOREIGN KEY (`id_role`) REFERENCES `cx__role` (`id_role`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
