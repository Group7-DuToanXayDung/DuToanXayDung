-- phpMyAdmin SQL Dump
-- version 4.5.1
-- http://www.phpmyadmin.net
--
-- Client :  127.0.0.1
-- Généré le :  Mer 22 Mars 2017 à 07:11
-- Version du serveur :  10.1.19-MariaDB
-- Version de PHP :  5.6.28

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de données :  `iscdb`
--

-- --------------------------------------------------------

--
-- Structure de la table `access`
--

CREATE TABLE `access` (
  `access_id` int(11) NOT NULL,
  `access_name` varchar(100) COLLATE utf8_unicode_ci DEFAULT NULL,
  `access_status` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Contenu de la table `access`
--

INSERT INTO `access` (`access_id`, `access_name`, `access_status`) VALUES
(1, 'Admin', 1),
(2, 'Giáo Vụ', 1),
(3, 'Giảng Viên', 1),
(4, 'Học Viên', 1);

-- --------------------------------------------------------

--
-- Structure de la table `class`
--

CREATE TABLE `class` (
  `id_class` int(11) NOT NULL,
  `name_class` varchar(200) COLLATE utf8_unicode_ci DEFAULT NULL,
  `dis_code` varchar(200) COLLATE utf8_unicode_ci DEFAULT NULL,
  `startday` date DEFAULT NULL,
  `endday` date DEFAULT NULL,
  `study_time` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- --------------------------------------------------------

--
-- Structure de la table `classroom`
--

CREATE TABLE `classroom` (
  `id_room` int(11) NOT NULL,
  `code_room` varchar(200) COLLATE utf8_unicode_ci DEFAULT NULL,
  `type_room` varchar(50) COLLATE utf8_unicode_ci DEFAULT NULL,
  `number_seats` int(11) DEFAULT NULL,
  `status_room` int(11) DEFAULT NULL,
  `description` text COLLATE utf8_unicode_ci
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- --------------------------------------------------------

--
-- Structure de la table `company`
--

CREATE TABLE `company` (
  `com_id` int(11) NOT NULL,
  `com_code` varchar(200) COLLATE utf8_unicode_ci DEFAULT NULL,
  `com_name` text COLLATE utf8_unicode_ci,
  `com_address` text COLLATE utf8_unicode_ci,
  `com_contact` text COLLATE utf8_unicode_ci,
  `com_status` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Contenu de la table `company`
--

INSERT INTO `company` (`com_id`, `com_code`, `com_name`, `com_address`, `com_contact`, `com_status`) VALUES
(94, 'TMA', 'TMA Solution', 'TP Hồ Chí Minh', 'undefined', 1),
(95, 'SGT5555', 'Sai Gon Tech', 'TP Hồ Chí Minh', 'ddd', 1);

-- --------------------------------------------------------

--
-- Structure de la table `decentralization`
--

CREATE TABLE `decentralization` (
  `decen_id` int(11) NOT NULL,
  `user_code` varchar(200) COLLATE utf8_unicode_ci NOT NULL,
  `access_id` varchar(200) COLLATE utf8_unicode_ci NOT NULL,
  `status` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Contenu de la table `decentralization`
--

INSERT INTO `decentralization` (`decen_id`, `user_code`, `access_id`, `status`) VALUES
(49, 'ISC1-001', '4', 1),
(50, 'ISC2-001', '4', 1),
(51, 'tu123', '1', 1),
(52, 'tu123', '1', 1),
(53, 'ISC1-002', '1', 1),
(54, 'ISC1-002', '2', 1),
(55, 'ISC1-002', '4', 1);

-- --------------------------------------------------------

--
-- Structure de la table `discipline`
--

CREATE TABLE `discipline` (
  `dis_id` int(11) NOT NULL,
  `dis_code` varchar(200) COLLATE utf8_unicode_ci DEFAULT NULL,
  `dis_name` text COLLATE utf8_unicode_ci,
  `dis_description` text COLLATE utf8_unicode_ci,
  `dis_hours` int(11) DEFAULT NULL,
  `credits` int(11) DEFAULT NULL,
  `status` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Contenu de la table `discipline`
--

INSERT INTO `discipline` (`dis_id`, `dis_code`, `dis_name`, `dis_description`, `dis_hours`, `credits`, `status`) VALUES
(15, 'G01', 'Working Process', '', 12, 2, 1),
(16, 'G02', 'Critical Thinking', '', 24, 5, 1),
(17, 'G03', 'Professional Speaking', '', 24, 4, 1),
(18, 'G04', 'Technical Writing', '', 24, 4, 0),
(19, 'G05', 'Software Testing Process', '', 127, 2, 1),
(20, 'G06', 'Database Management Systems', 'undefined', 24, 4, 1),
(21, 'G07', 'Front-End (Bootstrap + Angular.js + jQuery)', 'undefined', 24, 4, 1),
(22, 'G08', '.NET Back-End', 'undefined', 36, 6, 1),
(23, 'G057', 'Web development using PHP language', 'undefined', 235, -3, 1);

-- --------------------------------------------------------

--
-- Structure de la table `discipline_of_study_program`
--

CREATE TABLE `discipline_of_study_program` (
  `id_dosp` int(11) NOT NULL,
  `pro_code` varchar(200) COLLATE utf8_unicode_ci DEFAULT NULL,
  `dis_code` varchar(200) COLLATE utf8_unicode_ci DEFAULT NULL,
  `description` text COLLATE utf8_unicode_ci,
  `status_dosp` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- --------------------------------------------------------

--
-- Structure de la table `intake`
--

CREATE TABLE `intake` (
  `int_id` int(11) NOT NULL,
  `int_code` varchar(200) COLLATE utf8_unicode_ci DEFAULT NULL,
  `int_name` text COLLATE utf8_unicode_ci NOT NULL,
  `int_description` text COLLATE utf8_unicode_ci,
  `status` int(11) DEFAULT NULL,
  `startdate` date DEFAULT NULL,
  `enddate` date DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Contenu de la table `intake`
--

INSERT INTO `intake` (`int_id`, `int_code`, `int_name`, `int_description`, `status`, `startdate`, `enddate`) VALUES
(97, 'ISC01', 'ISC', 'Just for test', 1, '2016-12-05', '2017-04-01'),
(98, 'ISC02444', 'asdasd', '', 0, '2016-12-01', '2017-04-01'),
(99, 'ISC03', 'ISC', 'undefined', 1, '2016-12-01', '2017-03-01'),
(100, 'ISC01000', 'ISC', '4444', 1, '2017-03-03', '2017-03-10');

-- --------------------------------------------------------

--
-- Structure de la table `lecturers`
--

CREATE TABLE `lecturers` (
  `id_lec` int(11) NOT NULL,
  `code_lec` varchar(200) COLLATE utf8_unicode_ci DEFAULT NULL,
  `degree` varchar(200) COLLATE utf8_unicode_ci DEFAULT NULL,
  `major` varchar(200) COLLATE utf8_unicode_ci DEFAULT NULL,
  `image` text COLLATE utf8_unicode_ci,
  `description` text COLLATE utf8_unicode_ci,
  `status_lec` int(11) DEFAULT NULL,
  `user_code` varchar(200) COLLATE utf8_unicode_ci DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- --------------------------------------------------------

--
-- Structure de la table `log`
--

CREATE TABLE `log` (
  `log_id` int(11) NOT NULL,
  `user_code` varchar(200) COLLATE utf8_unicode_ci DEFAULT NULL,
  `table_name` varchar(200) COLLATE utf8_unicode_ci DEFAULT NULL,
  `row` int(11) DEFAULT NULL,
  `create_date` date DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- --------------------------------------------------------

--
-- Structure de la table `students`
--

CREATE TABLE `students` (
  `id_stu` int(11) NOT NULL,
  `code_stu` varchar(200) COLLATE utf8_unicode_ci DEFAULT NULL,
  `birthday` date DEFAULT NULL,
  `major` varchar(200) COLLATE utf8_unicode_ci DEFAULT NULL,
  `image` text COLLATE utf8_unicode_ci,
  `univer_code` varchar(200) COLLATE utf8_unicode_ci DEFAULT NULL,
  `id_ss` int(11) DEFAULT NULL,
  `user_code` varchar(200) COLLATE utf8_unicode_ci DEFAULT NULL,
  `int_code` varchar(200) COLLATE utf8_unicode_ci DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- --------------------------------------------------------

--
-- Structure de la table `student_profile`
--

CREATE TABLE `student_profile` (
  `id_profile` int(11) NOT NULL,
  `name_profile` varchar(200) COLLATE utf8_unicode_ci DEFAULT NULL,
  `status_profile` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- --------------------------------------------------------

--
-- Structure de la table `student_status`
--

CREATE TABLE `student_status` (
  `id_ss` int(11) NOT NULL,
  `name_ss` varchar(200) COLLATE utf8_unicode_ci DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- --------------------------------------------------------

--
-- Structure de la table `study_program`
--

CREATE TABLE `study_program` (
  `pro_id` int(11) NOT NULL,
  `pro_code` varchar(200) COLLATE utf8_unicode_ci NOT NULL,
  `pro_name` varchar(200) COLLATE utf8_unicode_ci NOT NULL,
  `pro_description` text COLLATE utf8_unicode_ci,
  `pro_status` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Contenu de la table `study_program`
--

INSERT INTO `study_program` (`pro_id`, `pro_code`, `pro_name`, `pro_description`, `pro_status`) VALUES
(102, 'NET', '.NET(C#)', '', 1),
(103, 'AND', 'Android', '', 1),
(104, 'IOS', 'IOS(Swift)', '', 1),
(105, 'PHP', 'Web development using PHP language', '', 1);

-- --------------------------------------------------------

--
-- Structure de la table `university`
--

CREATE TABLE `university` (
  `univer_id` int(11) NOT NULL,
  `univer_code` varchar(200) COLLATE utf8_unicode_ci DEFAULT NULL,
  `univer_name` text COLLATE utf8_unicode_ci,
  `univer_address` text COLLATE utf8_unicode_ci,
  `contact` text COLLATE utf8_unicode_ci,
  `status` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Contenu de la table `university`
--

INSERT INTO `university` (`univer_id`, `univer_code`, `univer_name`, `univer_address`, `contact`, `status`) VALUES
(116, 'BUH', 'Ngân Hàng', 'TP Hồ Chí Minh', '', 1),
(117, 'DHCN4', 'Trường Đại Học Công Nghiệp 4 thành phố Hồ Chí Minh', '123 Gò Vấp', '- Nguyễn Văn An\n- Trần Văn Long', 0);

-- --------------------------------------------------------

--
-- Structure de la table `users`
--

CREATE TABLE `users` (
  `user_id` int(11) NOT NULL,
  `user_code` varchar(200) COLLATE utf8_unicode_ci DEFAULT NULL,
  `firstname` varchar(100) COLLATE utf8_unicode_ci NOT NULL,
  `lastname` varchar(200) COLLATE utf8_unicode_ci NOT NULL,
  `phone` int(11) DEFAULT NULL,
  `email` varchar(200) COLLATE utf8_unicode_ci DEFAULT NULL,
  `gender` int(11) DEFAULT NULL,
  `useraddress` text COLLATE utf8_unicode_ci,
  `username` varchar(200) COLLATE utf8_unicode_ci NOT NULL,
  `password` varchar(200) COLLATE utf8_unicode_ci NOT NULL,
  `status` int(11) DEFAULT NULL,
  `univer_code` varchar(200) COLLATE utf8_unicode_ci DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Contenu de la table `users`
--

INSERT INTO `users` (`user_id`, `user_code`, `firstname`, `lastname`, `phone`, `email`, `gender`, `useraddress`, `username`, `password`, `status`, `univer_code`) VALUES
(7, 'ISC1-002', 'Quốc Tú', 'Lê', 123123213, 'tu.it@gmail.com', 0, 'Vĩnh Long', 'tu123', '123123', 0, NULL),
(8, 'ISC1-001', 'Ngọc Vũ', 'Phạm', 123123121, 'vupn199955@gmail.com', 0, 'Bình Dương', 'vupn199955', 'ngocvu12', 1, NULL),
(9, 'ISC2-001', 'Văn Dũng', 'Nguyễn', 123123123, 'dung@gmail.com', 0, 'adasdasd', 'dung123', '123123', 1, NULL),
(10, 'tu123', 'Tú', 'Nguyễn Văn', 2147483647, 'tu@gmail.com', 0, '1325', 'tu1238', '123abc', 1, NULL);

--
-- Index pour les tables exportées
--

--
-- Index pour la table `access`
--
ALTER TABLE `access`
  ADD PRIMARY KEY (`access_id`);

--
-- Index pour la table `class`
--
ALTER TABLE `class`
  ADD PRIMARY KEY (`id_class`),
  ADD KEY `dis_code` (`dis_code`);

--
-- Index pour la table `classroom`
--
ALTER TABLE `classroom`
  ADD PRIMARY KEY (`id_room`),
  ADD UNIQUE KEY `code_room` (`code_room`);

--
-- Index pour la table `company`
--
ALTER TABLE `company`
  ADD PRIMARY KEY (`com_id`),
  ADD UNIQUE KEY `com_code` (`com_code`);

--
-- Index pour la table `decentralization`
--
ALTER TABLE `decentralization`
  ADD PRIMARY KEY (`decen_id`),
  ADD KEY `decen_id` (`user_code`) USING BTREE,
  ADD KEY `access_id` (`access_id`);

--
-- Index pour la table `discipline`
--
ALTER TABLE `discipline`
  ADD PRIMARY KEY (`dis_id`),
  ADD UNIQUE KEY `dis_code` (`dis_code`);

--
-- Index pour la table `discipline_of_study_program`
--
ALTER TABLE `discipline_of_study_program`
  ADD PRIMARY KEY (`id_dosp`),
  ADD KEY `pro_code` (`pro_code`),
  ADD KEY `dis_code` (`dis_code`);

--
-- Index pour la table `intake`
--
ALTER TABLE `intake`
  ADD PRIMARY KEY (`int_id`),
  ADD UNIQUE KEY `int_code` (`int_code`);

--
-- Index pour la table `lecturers`
--
ALTER TABLE `lecturers`
  ADD PRIMARY KEY (`id_lec`),
  ADD UNIQUE KEY `code_lec` (`code_lec`),
  ADD KEY `user_code` (`user_code`);

--
-- Index pour la table `log`
--
ALTER TABLE `log`
  ADD PRIMARY KEY (`log_id`);

--
-- Index pour la table `students`
--
ALTER TABLE `students`
  ADD PRIMARY KEY (`id_stu`),
  ADD UNIQUE KEY `code_stu` (`code_stu`),
  ADD KEY `univer_code` (`univer_code`),
  ADD KEY `id_ss` (`id_ss`),
  ADD KEY `user_code` (`user_code`),
  ADD KEY `int_code` (`int_code`);

--
-- Index pour la table `student_profile`
--
ALTER TABLE `student_profile`
  ADD PRIMARY KEY (`id_profile`),
  ADD UNIQUE KEY `name_profile` (`name_profile`);

--
-- Index pour la table `student_status`
--
ALTER TABLE `student_status`
  ADD PRIMARY KEY (`id_ss`),
  ADD UNIQUE KEY `name_ss` (`name_ss`);

--
-- Index pour la table `study_program`
--
ALTER TABLE `study_program`
  ADD PRIMARY KEY (`pro_id`),
  ADD UNIQUE KEY `pro_code` (`pro_code`);

--
-- Index pour la table `university`
--
ALTER TABLE `university`
  ADD PRIMARY KEY (`univer_id`),
  ADD UNIQUE KEY `univer_code` (`univer_code`);

--
-- Index pour la table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`user_id`),
  ADD UNIQUE KEY `user_code` (`user_code`),
  ADD KEY `univer_code` (`univer_code`);

--
-- AUTO_INCREMENT pour les tables exportées
--

--
-- AUTO_INCREMENT pour la table `access`
--
ALTER TABLE `access`
  MODIFY `access_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;
--
-- AUTO_INCREMENT pour la table `class`
--
ALTER TABLE `class`
  MODIFY `id_class` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT pour la table `classroom`
--
ALTER TABLE `classroom`
  MODIFY `id_room` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT pour la table `company`
--
ALTER TABLE `company`
  MODIFY `com_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=96;
--
-- AUTO_INCREMENT pour la table `decentralization`
--
ALTER TABLE `decentralization`
  MODIFY `decen_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=56;
--
-- AUTO_INCREMENT pour la table `discipline`
--
ALTER TABLE `discipline`
  MODIFY `dis_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=24;
--
-- AUTO_INCREMENT pour la table `discipline_of_study_program`
--
ALTER TABLE `discipline_of_study_program`
  MODIFY `id_dosp` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT pour la table `intake`
--
ALTER TABLE `intake`
  MODIFY `int_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=101;
--
-- AUTO_INCREMENT pour la table `lecturers`
--
ALTER TABLE `lecturers`
  MODIFY `id_lec` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT pour la table `log`
--
ALTER TABLE `log`
  MODIFY `log_id` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT pour la table `students`
--
ALTER TABLE `students`
  MODIFY `id_stu` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT pour la table `student_profile`
--
ALTER TABLE `student_profile`
  MODIFY `id_profile` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT pour la table `student_status`
--
ALTER TABLE `student_status`
  MODIFY `id_ss` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT pour la table `study_program`
--
ALTER TABLE `study_program`
  MODIFY `pro_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=106;
--
-- AUTO_INCREMENT pour la table `university`
--
ALTER TABLE `university`
  MODIFY `univer_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=118;
--
-- AUTO_INCREMENT pour la table `users`
--
ALTER TABLE `users`
  MODIFY `user_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;
--
-- Contraintes pour les tables exportées
--

--
-- Contraintes pour la table `class`
--
ALTER TABLE `class`
  ADD CONSTRAINT `class_ibfk_1` FOREIGN KEY (`dis_code`) REFERENCES `discipline` (`dis_code`);

--
-- Contraintes pour la table `discipline_of_study_program`
--
ALTER TABLE `discipline_of_study_program`
  ADD CONSTRAINT `discipline_of_study_program_ibfk_1` FOREIGN KEY (`pro_code`) REFERENCES `study_program` (`pro_code`),
  ADD CONSTRAINT `discipline_of_study_program_ibfk_2` FOREIGN KEY (`dis_code`) REFERENCES `discipline` (`dis_code`);

--
-- Contraintes pour la table `lecturers`
--
ALTER TABLE `lecturers`
  ADD CONSTRAINT `lecturers_ibfk_1` FOREIGN KEY (`user_code`) REFERENCES `users` (`user_code`);

--
-- Contraintes pour la table `students`
--
ALTER TABLE `students`
  ADD CONSTRAINT `students_ibfk_1` FOREIGN KEY (`univer_code`) REFERENCES `university` (`univer_code`),
  ADD CONSTRAINT `students_ibfk_2` FOREIGN KEY (`id_ss`) REFERENCES `student_status` (`id_ss`),
  ADD CONSTRAINT `students_ibfk_3` FOREIGN KEY (`user_code`) REFERENCES `users` (`user_code`),
  ADD CONSTRAINT `students_ibfk_4` FOREIGN KEY (`int_code`) REFERENCES `intake` (`int_code`);

--
-- Contraintes pour la table `users`
--
ALTER TABLE `users`
  ADD CONSTRAINT `users_ibfk_1` FOREIGN KEY (`univer_code`) REFERENCES `university` (`univer_code`);

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
