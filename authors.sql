-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Mar 31, 2024 at 06:29 PM
-- Server version: 10.4.27-MariaDB
-- PHP Version: 8.2.0

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `employees_db`
--

-- --------------------------------------------------------

--
-- Table structure for table `authors`
--

CREATE TABLE `authors` (
  `author_id` int(11) NOT NULL,
  `author_name` varchar(30) NOT NULL,
  `biography` varchar(500) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `authors`
--

INSERT INTO `authors` (`author_id`, `author_name`, `biography`) VALUES
(1, 'Arundhati Roy', 'Aravind Adiga is an Indian-Australian author born on October 23, 1974, in Chennai, India. He gained '),
(2, 'R K Narayan', 'R.K. Narayan (Rasipuram Krishnaswami Iyer Narayanaswami) was an Indian author born on October 10, 19'),
(3, 'Vikram Seth', 'Vikram Seth is an acclaimed Indian author and poet, born on June 20, 1952, in Kolkata, India. He is '),
(4, 'Salman Rushdie', 'Salman Rushdie is a British-Indian novelist born on June 19, 1947, in Mumbai, India. He gained inter'),
(5, 'Jhumpa Lahiri', 'Jhumpa Lahiri is an Indian-American author born on July 11, 1967, in London, England, to Indian Beng'),
(6, 'Chetan Bhagat', 'Chetan Bhagat is a bestselling Indian author, columnist, and screenwriter, born on April 22, 1974, i'),
(7, 'Ruskin Bond', 'Ruskin Bond is an Indian author of British descent, born on May 19, 1934, in Kasauli, India. He is k'),
(8, 'Aravind Adiga', 'Aravind Adiga is an Indian-Australian author born on October 23, 1974, in Chennai, India. He gained '),
(9, 'Amitav Ghosh', 'Amitav Ghosh is an Indian author born on July 11, 1956, in Kolkata, India. He is known for his expansive novels that often blend historical events with fiction, exploring themes such as colonialism, migration, and environmentalism. Ghoshs writing is characterized by its meticulous research, lyrical prose, and deep engagement with the past. He has received numerous awards for his work, including the Sahitya Akademi Award and the Jnanpith Award.');
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
