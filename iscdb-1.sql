-- phpMyAdmin SQL Dump
-- version 4.6.5.2
-- https://www.phpmyadmin.net/
--
-- Máy chủ: 127.0.0.1
-- Thời gian đã tạo: Th2 22, 2017 lúc 07:16 SA
-- Phiên bản máy phục vụ: 10.1.21-MariaDB
-- Phiên bản PHP: 5.6.30

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Cơ sở dữ liệu: `iscdb`
--

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `access`
--

CREATE TABLE `access` (
  `access_id` int(11) NOT NULL,
  `access_name` varchar(100) COLLATE utf8_unicode_ci DEFAULT NULL,
  `access_status` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Đang đổ dữ liệu cho bảng `access`
--

INSERT INTO `access` (`access_id`, `access_name`, `access_status`) VALUES
(1, 'Admin', 1),
(2, 'Giáo Vụ', 1),
(3, 'Giảng Viên', 1),
(4, 'Học Viên', 1);

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `company`
--

CREATE TABLE `company` (
  `com_id` int(11) NOT NULL,
  `com_code` varchar(200) COLLATE utf8_unicode_ci DEFAULT NULL,
  `com_name` text COLLATE utf8_unicode_ci,
  `com_address` text COLLATE utf8_unicode_ci,
  `com_contact` text COLLATE utf8_unicode_ci,
  `com_status` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `decentralization`
--

CREATE TABLE `decentralization` (
  `decen_id` int(11) NOT NULL,
  `user_code` varchar(200) COLLATE utf8_unicode_ci NOT NULL,
  `access_id` varchar(200) COLLATE utf8_unicode_ci NOT NULL,
  `status` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `discipline`
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

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `intake`
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

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `log`
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
-- Cấu trúc bảng cho bảng `study_program`
--

CREATE TABLE `study_program` (
  `pro_id` int(11) NOT NULL,
  `pro_code` varchar(200) COLLATE utf8_unicode_ci NOT NULL,
  `pro_name` varchar(200) COLLATE utf8_unicode_ci NOT NULL,
  `pro_description` text COLLATE utf8_unicode_ci,
  `pro_status` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `university`
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
-- Đang đổ dữ liệu cho bảng `university`
--

INSERT INTO `university` (`univer_id`, `univer_code`, `univer_name`, `univer_address`, `contact`, `status`) VALUES
(1, 'BKU', 'Bách Khoa TP HCM', 'TP Hồ Chí Minh', '1234567890', 1),
(4, 'TDM', 'Thu Dau Mot', 'Binh Duong', '12312321', 1),
(6, 'sdasd', 'asda', 'asd', 'asd', 0),
(10, 'asdasd', 'asd', 'asdas', 'dasd', 1);

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `users`
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
-- Chỉ mục cho các bảng đã đổ
--

--
-- Chỉ mục cho bảng `access`
--
ALTER TABLE `access`
  ADD PRIMARY KEY (`access_id`);

--
-- Chỉ mục cho bảng `company`
--
ALTER TABLE `company`
  ADD PRIMARY KEY (`com_id`),
  ADD UNIQUE KEY `com_code` (`com_code`);

--
-- Chỉ mục cho bảng `decentralization`
--
ALTER TABLE `decentralization`
  ADD PRIMARY KEY (`decen_id`),
  ADD KEY `decen_id` (`user_code`) USING BTREE,
  ADD KEY `access_id` (`access_id`);

--
-- Chỉ mục cho bảng `discipline`
--
ALTER TABLE `discipline`
  ADD PRIMARY KEY (`dis_id`),
  ADD UNIQUE KEY `dis_code` (`dis_code`);

--
-- Chỉ mục cho bảng `intake`
--
ALTER TABLE `intake`
  ADD PRIMARY KEY (`int_id`),
  ADD UNIQUE KEY `int_code` (`int_code`);

--
-- Chỉ mục cho bảng `log`
--
ALTER TABLE `log`
  ADD PRIMARY KEY (`log_id`);

--
-- Chỉ mục cho bảng `study_program`
--
ALTER TABLE `study_program`
  ADD PRIMARY KEY (`pro_id`),
  ADD UNIQUE KEY `pro_code` (`pro_code`);

--
-- Chỉ mục cho bảng `university`
--
ALTER TABLE `university`
  ADD PRIMARY KEY (`univer_id`),
  ADD UNIQUE KEY `univer_code` (`univer_code`);

--
-- Chỉ mục cho bảng `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`user_id`),
  ADD UNIQUE KEY `user_code` (`user_code`),
  ADD KEY `univer_code` (`univer_code`);

--
-- AUTO_INCREMENT cho các bảng đã đổ
--

--
-- AUTO_INCREMENT cho bảng `access`
--
ALTER TABLE `access`
  MODIFY `access_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;
--
-- AUTO_INCREMENT cho bảng `company`
--
ALTER TABLE `company`
  MODIFY `com_id` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT cho bảng `decentralization`
--
ALTER TABLE `decentralization`
  MODIFY `decen_id` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT cho bảng `discipline`
--
ALTER TABLE `discipline`
  MODIFY `dis_id` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT cho bảng `intake`
--
ALTER TABLE `intake`
  MODIFY `int_id` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT cho bảng `log`
--
ALTER TABLE `log`
  MODIFY `log_id` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT cho bảng `study_program`
--
ALTER TABLE `study_program`
  MODIFY `pro_id` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT cho bảng `university`
--
ALTER TABLE `university`
  MODIFY `univer_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;
--
-- AUTO_INCREMENT cho bảng `users`
--
ALTER TABLE `users`
  MODIFY `user_id` int(11) NOT NULL AUTO_INCREMENT;
--
-- Các ràng buộc cho các bảng đã đổ
--

--
-- Các ràng buộc cho bảng `users`
--
ALTER TABLE `users`
  ADD CONSTRAINT `users_ibfk_1` FOREIGN KEY (`univer_code`) REFERENCES `university` (`univer_code`);

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
