-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Dec 08, 2022 at 05:03 AM
-- Server version: 10.4.25-MariaDB
-- PHP Version: 8.1.10

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `tunnels_vue3`
--

-- --------------------------------------------------------

--
-- Table structure for table `project`
--

CREATE TABLE `project` (
  `id` int(11) NOT NULL,
  `name` text NOT NULL,
  `series` text NOT NULL,
  `costs` double NOT NULL,
  `location` text NOT NULL,
  `duration` double NOT NULL,
  `startTime` text NOT NULL,
  `endTime` text NOT NULL,
  `quantity` int(11) NOT NULL,
  `status` int(11) NOT NULL,
  `remark` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `project`
--

INSERT INTO `project` (`id`, `name`, `series`, `costs`, `location`, `duration`, `startTime`, `endTime`, `quantity`, `status`, `remark`) VALUES
(49, 'Hobart Western Bypass Feasibility', 'GHD19', 3300000000, 'Tasmaina', 12, '1551358800000', '1598882400000', 80, 0, '<p>&ndash; Tunnel Bypass with CBD Connections</p>'),
(50, 'Germany Parattah', 'TBM08', 13200000, 'Grmany', 17.7, '1225458000000', '1622469600000', 41, 1, '<p>The 2.2 kilometre (in length) intake tunnel will draw seawater to the plant, where it will undergo Reverse Osmosis (RO)</p>'),
(51, 'Testing Update', 'TU01', 1234, 'PC_Home', 212, '1670158800000', '1670245200000', 10, 0, '<p>Update Editing implemented</p>');

-- --------------------------------------------------------

--
-- Table structure for table `tunnel`
--

CREATE TABLE `tunnel` (
  `id` int(11) NOT NULL,
  `name` text NOT NULL,
  `cid` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `tunnel`
--

INSERT INTO `tunnel` (`id`, `name`, `cid`) VALUES
(1, '晋阳(津冀界)至榆次高速公路', 'c01'),
(2, '晋京(津冀界)至北京高速公路', 'c02'),
(3, '京哈(京哈界)至承德高速公路', 'c03');

-- --------------------------------------------------------

--
-- Table structure for table `tunnelchild`
--

CREATE TABLE `tunnelchild` (
  `id` int(11) NOT NULL,
  `cid` text NOT NULL,
  `name` text NOT NULL,
  `content` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `tunnelchild`
--

INSERT INTO `tunnelchild` (`id`, `cid`, `name`, `content`) VALUES
(1, 'c01', '赵壁1号隧道出口', 'zb'),
(2, 'c01', '赵壁2号隧道出口', 'zb'),
(3, 'c01', '赵壁3号隧道出口', 'zb'),
(4, 'c01', '赵壁4号隧道出口', 'zb'),
(5, 'c02', '赤承01号隧道出口', 'cc'),
(6, 'c02', '赤承02号隧道出口', 'cc'),
(7, 'c02', '赤承03号隧道出口', 'cc');

-- --------------------------------------------------------

--
-- Table structure for table `tunnelcontent`
--

CREATE TABLE `tunnelcontent` (
  `id` int(11) NOT NULL,
  `tunnelname` text NOT NULL,
  `imagename` text NOT NULL,
  `num` text NOT NULL,
  `url` text NOT NULL,
  `content` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `tunnelcontent`
--

INSERT INTO `tunnelcontent` (`id`, `tunnelname`, `imagename`, `num`, `url`, `content`) VALUES
(1, '赵壁1号隧道出口', '赵壁1号纵断', 'zb0001', '', 'zb'),
(2, '赵壁1号隧道出口', '赵壁2号纵断', 'zb0002', '', 'zb');

-- --------------------------------------------------------

--
-- Table structure for table `user`
--

CREATE TABLE `user` (
  `id` int(11) NOT NULL,
  `username` text DEFAULT NULL,
  `password` text DEFAULT NULL,
  `permission` text NOT NULL,
  `phone` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `user`
--

INSERT INTO `user` (`id`, `username`, `password`, `permission`, `phone`) VALUES
(1, 'mingked', '123456', 'admin', '88888888'),
(2, 'utasDemo', '123456', 'worker', '1234567');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `project`
--
ALTER TABLE `project`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `tunnel`
--
ALTER TABLE `tunnel`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `tunnelchild`
--
ALTER TABLE `tunnelchild`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `tunnelcontent`
--
ALTER TABLE `tunnelcontent`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `project`
--
ALTER TABLE `project`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=52;

--
-- AUTO_INCREMENT for table `tunnel`
--
ALTER TABLE `tunnel`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `tunnelchild`
--
ALTER TABLE `tunnelchild`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT for table `tunnelcontent`
--
ALTER TABLE `tunnelcontent`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `user`
--
ALTER TABLE `user`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
