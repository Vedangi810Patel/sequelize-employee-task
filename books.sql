-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Mar 31, 2024 at 06:30 PM
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
-- Table structure for table `books`
--

CREATE TABLE `books` (
  `book_id` int(11) NOT NULL,
  `title` varchar(50) NOT NULL,
  `book_description` varchar(500) NOT NULL,
  `publish_year` year(4) NOT NULL,
  `quantity_available` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `books`
--

INSERT INTO `books` (`book_id`, `title`, `book_description`, `publish_year`, `quantity_available`) VALUES
(2, 'A Suitable Boy', 'A sweeping saga set in post-independence India, A Suitable Boy follows the lives of four families as they navigate love, politics, and societal expectations, offering a panoramic view of Indian society in the 1950s.', 1993, 9),
(3, 'Midnights Children', 'Midnights Children follows the life of Saleem Sinai, who is born at the stroke of midnight on August 15, 1947, the exact moment of Indias independence from British rule. Through Saleems story, Rushdie weaves a tapestry of Indias post-colonial history and identity', 1981, 9),
(4, 'The Namesake', 'The Namesake traces the life of Gogol Ganguli, a first-generation Indian-American, as he grapples with his cultural heritage, identity, and the expectations of his immigrant parents in the United States.', 2003, 3),
(5, 'Five Point Someone', 'Set in the Indian Institute of Technology (IIT), Five Point Someone follows the misadventures of three engineering students as they navigate the pressures of academic life, friendship, and love, offering a humorous yet insightful commentary on the Indian education system.', 2004, 7),
(6, 'A Fine Balance', 'Set in 1970s India, A Fine Balance chronicles the lives of four characters from different backgrounds whose paths intersect against the backdrop of political turmoil and social upheaval, offering a poignant portrayal of resilience, friendship, and the human spirit.', 1995, 2),
(7, 'The White Tiger', 'The White Tiger follows the journey of Balram Halwai, a young man from a rural village in India, as he rises from poverty to become a successful entrepreneur in the bustling metropolis of Delhi, offering a sharp critique of Indias class divide and the complexities of power and corruption.', 2008, 3),
(8, 'Malgudi Days', 'Malgudi Days is a collection of short stories set in the fictional town of Malgudi, capturing the essence of everyday life in India with humor, warmth, and vivid storytelling, showcasing Narayan\'s keen observation of human nature and Indian society.', 1943, 1);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `books`
--
ALTER TABLE `books`
  ADD PRIMARY KEY (`book_id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
