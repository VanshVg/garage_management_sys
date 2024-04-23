CREATE DATABASE  IF NOT EXISTS `garage_management_db` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `garage_management_db`;
-- MySQL dump 10.13  Distrib 8.0.36, for Linux (x86_64)
--
-- Host: localhost    Database: garage_management_db
-- ------------------------------------------------------
-- Server version	8.0.36-0ubuntu0.20.04.1

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `address_master`
--

DROP TABLE IF EXISTS `address_master`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `address_master` (
  `id` int NOT NULL AUTO_INCREMENT,
  `city_id` int NOT NULL,
  `area` varchar(255) NOT NULL,
  `pincode` varchar(255) NOT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP,
  `is_deleted` tinyint(1) DEFAULT '0',
  PRIMARY KEY (`id`),
  UNIQUE KEY `id` (`id`),
  KEY `city_id` (`city_id`),
  CONSTRAINT `address_master_ibfk_1` FOREIGN KEY (`city_id`) REFERENCES `city_master` (`id`),
  CONSTRAINT `address_master_chk_1` CHECK ((length(`pincode`) = 6))
) ENGINE=InnoDB AUTO_INCREMENT=24 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `address_master`
--

LOCK TABLES `address_master` WRITE;
/*!40000 ALTER TABLE `address_master` DISABLE KEYS */;
INSERT INTO `address_master` VALUES (1,70,'fdfjdjf','544221','2024-04-15 12:54:35',NULL,0),(2,70,'hjhjkjkh','544221','2024-04-15 12:57:16',NULL,0),(3,70,'hjhjkjkh','544221','2024-04-15 12:58:43',NULL,0),(4,70,'jtflgdfkf','544221','2024-04-15 13:01:03',NULL,0),(5,70,'jtflgdfkf','544221','2024-04-15 13:13:27',NULL,0),(6,70,'jtflgdfkf','544221','2024-04-15 13:19:00',NULL,0),(7,70,'alkjdjlksjlkdsj','544221','2024-04-15 13:22:11',NULL,0),(8,70,'abcd','544221','2024-04-15 13:27:39',NULL,0),(9,87,'jtflgdfkf','544221','2024-04-15 13:28:32',NULL,0),(10,70,'cfdli','544221','2024-04-15 13:36:56',NULL,0),(11,70,'djsjsdhds','544221','2024-04-15 13:41:37',NULL,0),(12,70,'abcd','544221','2024-04-15 13:53:37',NULL,0),(13,70,'hjhjkjkh','544221','2024-04-15 13:54:38',NULL,0),(14,70,'jtflgdfkf','544221','2024-04-15 13:56:55',NULL,0),(15,70,'jtflgdfkf','544221','2024-04-15 13:58:20',NULL,0),(16,70,'jtflgdfkf','544221','2024-04-16 12:00:49',NULL,0),(17,70,'hjkjkh','544221','2024-04-16 12:14:22',NULL,0),(18,70,'jtflgdfkf','544221','2024-04-16 12:19:35',NULL,0),(19,70,'jtflgdfkf','544221','2024-04-16 12:22:15',NULL,0),(20,70,'abcd','544221','2024-04-16 12:23:58',NULL,0),(21,70,'abcd','544221','2024-04-16 12:27:56',NULL,0),(22,70,'djsjsdhds','544221','2024-04-16 12:30:49',NULL,0),(23,70,'hjhjkjkh','544221','2024-04-16 12:51:57',NULL,0);
/*!40000 ALTER TABLE `address_master` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `appointment_payments`
--

DROP TABLE IF EXISTS `appointment_payments`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `appointment_payments` (
  `id` int NOT NULL AUTO_INCREMENT,
  `appointment_id` int DEFAULT NULL,
  `sub_total` decimal(10,2) DEFAULT NULL,
  `gst_amount` decimal(10,2) DEFAULT NULL,
  `discount_per` decimal(10,2) DEFAULT NULL,
  `discount` decimal(10,2) DEFAULT NULL,
  `status` tinyint(1) DEFAULT '0',
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `appointment_id` (`appointment_id`),
  CONSTRAINT `appointment_payments_ibfk_1` FOREIGN KEY (`appointment_id`) REFERENCES `appointments` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `appointment_payments`
--

LOCK TABLES `appointment_payments` WRITE;
/*!40000 ALTER TABLE `appointment_payments` DISABLE KEYS */;
/*!40000 ALTER TABLE `appointment_payments` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `appointment_services`
--

DROP TABLE IF EXISTS `appointment_services`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `appointment_services` (
  `id` int NOT NULL AUTO_INCREMENT,
  `service_id` int DEFAULT NULL,
  `appointment_id` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `service_id` (`service_id`),
  KEY `appointment_id` (`appointment_id`),
  CONSTRAINT `appointment_services_ibfk_1` FOREIGN KEY (`service_id`) REFERENCES `service_master` (`id`),
  CONSTRAINT `appointment_services_ibfk_2` FOREIGN KEY (`appointment_id`) REFERENCES `appointments` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `appointment_services`
--

LOCK TABLES `appointment_services` WRITE;
/*!40000 ALTER TABLE `appointment_services` DISABLE KEYS */;
/*!40000 ALTER TABLE `appointment_services` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `appointments`
--

DROP TABLE IF EXISTS `appointments`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `appointments` (
  `id` int NOT NULL AUTO_INCREMENT,
  `slot_id` int DEFAULT NULL,
  `customer_id` int DEFAULT NULL,
  `status` tinyint(1) DEFAULT '0',
  `invoice_url` varchar(255) DEFAULT NULL,
  `comment` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `appointments`
--

LOCK TABLES `appointments` WRITE;
/*!40000 ALTER TABLE `appointments` DISABLE KEYS */;
/*!40000 ALTER TABLE `appointments` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `city_master`
--

DROP TABLE IF EXISTS `city_master`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `city_master` (
  `id` int NOT NULL AUTO_INCREMENT,
  `sid` int DEFAULT NULL,
  `city_name` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id` (`id`),
  KEY `sid` (`sid`),
  CONSTRAINT `city_master_ibfk_1` FOREIGN KEY (`sid`) REFERENCES `state_master` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=525 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `city_master`
--

LOCK TABLES `city_master` WRITE;
/*!40000 ALTER TABLE `city_master` DISABLE KEYS */;
INSERT INTO `city_master` VALUES (1,1,'Adoni'),(2,1,'Amaravati'),(3,1,'Anantapur'),(4,1,'Chandragiri'),(5,1,'Chittoor'),(6,1,'Dowlaiswaram'),(7,1,'Eluru'),(8,1,'Guntur'),(9,1,'Kadapa'),(10,1,'Kakinada'),(11,1,'Kurnool'),(12,1,'Machilipatnam'),(13,1,'Nagarjunakoṇḍa'),(14,1,'Rajahmundry'),(15,1,'Srikakulam'),(16,1,'Tirupati'),(17,1,'Vijayawada'),(18,1,'Visakhapatnam'),(19,1,'Vizianagaram'),(20,1,'Yemmiganur'),(21,2,'Itanagar'),(22,3,'Dhuburi'),(23,3,'Dibrugarh'),(24,3,'Dispur'),(25,3,'Guwahati'),(26,3,'Jorhat'),(27,3,'Nagaon'),(28,3,'Sivasagar'),(29,3,'Silchar'),(30,3,'Tezpur'),(31,3,'Tinsukia'),(32,4,'Ara'),(33,4,'Barauni'),(34,4,'Begusarai'),(35,4,'Bettiah'),(36,4,'Bhagalpur'),(37,4,'Bihar Sharif'),(38,4,'Bodh Gaya'),(39,4,'Buxar'),(40,4,'Chapra'),(41,4,'Darbhanga'),(42,4,'Dehri'),(43,4,'Dinapur Nizamat'),(44,4,'Gaya'),(45,4,'Hajipur'),(46,4,'Jamalpur'),(47,4,'Katihar'),(48,4,'Madhubani'),(49,4,'Motihari'),(50,4,'Munger'),(51,4,'Muzaffarpur'),(52,4,'Patna'),(53,4,'Purnia'),(54,4,'Pusa'),(55,4,'Saharsa'),(56,4,'Samastipur'),(57,4,'Sasaram'),(58,4,'Sitamarhi'),(59,4,'Siwan'),(60,5,'Ambikapur'),(61,5,'Bhilai'),(62,5,'Bilaspur'),(63,5,'Dhamtari'),(64,5,'Durg'),(65,5,'Jagdalpur'),(66,5,'Raipur'),(67,5,'Rajnandgaon'),(68,6,'Madgaon'),(69,6,'Panaji'),(70,7,'Ahmadabad'),(71,7,'Amreli'),(72,7,'Bharuch'),(73,7,'Bhavnagar'),(74,7,'Bhuj'),(75,7,'Dwarka'),(76,7,'Gandhinagar'),(77,7,'Godhra'),(78,7,'Jamnagar'),(79,7,'Junagadh'),(80,7,'Kandla'),(81,7,'Khambhat'),(82,7,'Kheda'),(83,7,'Mahesana'),(84,7,'Morbi'),(85,7,'Nadiad'),(86,7,'Navsari'),(87,7,'Okha'),(88,7,'Palanpur'),(89,7,'Patan'),(90,7,'Porbandar'),(91,7,'Rajkot'),(92,7,'Surat'),(93,7,'Surendranagar'),(94,7,'Valsad'),(95,7,'Veraval'),(96,8,'Ambala'),(97,8,'Bhiwani'),(98,8,'Chandigarh'),(99,8,'Faridabad'),(100,8,'Firozpur Jhirka'),(101,8,'Gurugram'),(102,8,'Hansi'),(103,8,'Hisar'),(104,8,'Jind'),(105,8,'Kaithal'),(106,8,'Karnal'),(107,8,'Kurukshetra'),(108,8,'Panipat'),(109,8,'Pehowa'),(110,8,'Rewari'),(111,8,'Rohtak'),(112,8,'Sirsa'),(113,8,'Sonipat'),(114,9,'Bilaspur'),(115,9,'Chamba'),(116,9,'Dalhousie'),(117,9,'Dharmshala'),(118,9,'Hamirpur'),(119,9,'Kangra'),(120,9,'Kullu'),(121,9,'Mandi'),(122,9,'Nahan'),(123,9,'Shimla'),(124,9,'Una'),(125,10,'Bokaro'),(126,10,'Chaibasa'),(127,10,'Deoghar'),(128,10,'Dhanbad'),(129,10,'Dumka'),(130,10,'Giridih'),(131,10,'Hazaribag'),(132,10,'Jamshedpur'),(133,10,'Jharia'),(134,10,'Rajmahal'),(135,10,'Ranchi'),(136,10,'Saraikela'),(137,11,'Badami'),(138,11,'Ballari'),(139,11,'Bengaluru'),(140,11,'Belagavi'),(141,11,'Bhadravati'),(142,11,'Bidar'),(143,11,'Chikkamagaluru'),(144,11,'Chitradurga'),(145,11,'Davangere'),(146,11,'Halebid'),(147,11,'Hassan'),(148,11,'Hubballi-Dharwad'),(149,11,'Kalaburagi'),(150,11,'Kolar'),(151,11,'Madikeri'),(152,11,'Mandya'),(153,11,'Mangaluru'),(154,11,'Mysuru'),(155,11,'Raichur'),(156,11,'Shivamogga'),(157,11,'Shravanabelagola'),(158,11,'Shrirangapattana'),(159,11,'Tumakuru'),(160,11,'Vijayapura'),(161,12,'Alappuzha'),(162,12,'Vatakara'),(163,12,'Idukki'),(164,12,'Kannur'),(165,12,'Kochi'),(166,12,'Kollam'),(167,12,'Kottayam'),(168,12,'Kozhikode'),(169,12,'Mattancheri'),(170,12,'Palakkad'),(171,12,'Thalassery'),(172,12,'Thiruvananthapuram'),(173,12,'Thrissur'),(174,13,'Ahmadnagar'),(175,13,'Akola'),(176,13,'Amravati'),(177,13,'Aurangabad'),(178,13,'Bhandara'),(179,13,'Bhusawal'),(180,13,'Bid'),(181,13,'Buldhana'),(182,13,'Chandrapur'),(183,13,'Daulatabad'),(184,13,'Dhule'),(185,13,'Jalgaon'),(186,13,'Kalyan'),(187,13,'Karli'),(188,13,'Kolhapur'),(189,13,'Mahabaleshwar'),(190,13,'Malegaon'),(191,13,'Matheran'),(192,13,'Mumbai'),(193,13,'Nagpur'),(194,13,'Nanded'),(195,13,'Nashik'),(196,13,'Osmanabad'),(197,13,'Pandharpur'),(198,13,'Parbhani'),(199,13,'Pune'),(200,13,'Ratnagiri'),(201,13,'Sangli'),(202,13,'Satara'),(203,13,'Sevagram'),(204,13,'Solapur'),(205,13,'Thane'),(206,13,'Ulhasnagar'),(207,13,'Vasai-Virar'),(208,13,'Wardha'),(209,13,'Yavatmal'),(210,14,'Balaghat'),(211,14,'Barwani'),(212,14,'Betul'),(213,14,'Bharhut'),(214,14,'Bhind'),(215,14,'Bhojpur'),(216,14,'Bhopal'),(217,14,'Burhanpur'),(218,14,'Chhatarpur'),(219,14,'Chhindwara'),(220,14,'Damoh'),(221,14,'Datia'),(222,14,'Dewas'),(223,14,'Dhar'),(224,14,'Dr. Ambedkar Nagar (Mhow)'),(225,14,'Guna'),(226,14,'Gwalior'),(227,14,'Hoshangabad'),(228,14,'Indore'),(229,14,'Itarsi'),(230,14,'Jabalpur'),(231,14,'Jhabua'),(232,14,'Khajuraho'),(233,14,'Khandwa'),(234,14,'Khargone'),(235,14,'Maheshwar'),(236,14,'Mandla'),(237,14,'Mandsaur'),(238,14,'Morena'),(239,14,'Murwara'),(240,14,'Narsimhapur'),(241,14,'Narsinghgarh'),(242,14,'Narwar'),(243,14,'Neemuch'),(244,14,'Nowgong'),(245,14,'Orchha'),(246,14,'Panna'),(247,14,'Raisen'),(248,14,'Rajgarh'),(249,14,'Ratlam'),(250,14,'Rewa'),(251,14,'Sagar'),(252,14,'Sarangpur'),(253,14,'Satna'),(254,14,'Sehore'),(255,14,'Seoni'),(256,14,'Shahdol'),(257,14,'Shajapur'),(258,14,'Sheopur'),(259,14,'Shivpuri'),(260,14,'Ujjain'),(261,14,'Vidisha'),(262,15,'Imphal'),(263,16,'Cherrapunji'),(264,16,'Shillong'),(265,17,'Aizawl'),(266,17,'Lunglei'),(267,18,'Kohima'),(268,18,'Mon'),(269,18,'Phek'),(270,18,'Wokha'),(271,18,'Zunheboto'),(272,19,'Balangir'),(273,19,'Baleshwar'),(274,19,'Baripada'),(275,19,'Bhubaneshwar'),(276,19,'Brahmapur'),(277,19,'Cuttack'),(278,19,'Dhenkanal'),(279,19,'Kendujhar'),(280,19,'Konark'),(281,19,'Koraput'),(282,19,'Paradip'),(283,19,'Phulabani'),(284,19,'Puri'),(285,19,'Sambalpur'),(286,19,'Udayagiri'),(287,20,'Amritsar'),(288,20,'Batala'),(289,20,'Chandigarh'),(290,20,'Faridkot'),(291,20,'Firozpur'),(292,20,'Gurdaspur'),(293,20,'Hoshiarpur'),(294,20,'Jalandhar'),(295,20,'Kapurthala'),(296,20,'Ludhiana'),(297,20,'Nabha'),(298,20,'Patiala'),(299,20,'Rupnagar'),(300,20,'Sangrur'),(301,21,'Abu'),(302,21,'Ajmer'),(303,21,'Alwar'),(304,21,'Amer'),(305,21,'Barmer'),(306,21,'Beawar'),(307,21,'Bharatpur'),(308,21,'Bhilwara'),(309,21,'Bikaner'),(310,21,'Bundi'),(311,21,'Chittaurgarh'),(312,21,'Churu'),(313,21,'Dhaulpur'),(314,21,'Dungarpur'),(315,21,'Ganganagar'),(316,21,'Hanumangarh'),(317,21,'Jaipur'),(318,21,'Jaisalmer'),(319,21,'Jalor'),(320,21,'Jhalawar'),(321,21,'Jhunjhunu'),(322,21,'Jodhpur'),(323,21,'Kishangarh'),(324,21,'Kota'),(325,21,'Merta'),(326,21,'Nagaur'),(327,21,'Nathdwara'),(328,21,'Pali'),(329,21,'Phalodi'),(330,21,'Pushkar'),(331,21,'Sawai Madhopur'),(332,21,'Shahpura'),(333,21,'Sikar'),(334,21,'Sirohi'),(335,21,'Tonk'),(336,21,'Udaipur'),(337,22,'Gangtok'),(338,22,'Gyalshing'),(339,22,'Lachung'),(340,22,'Mangan'),(341,23,'Arcot'),(342,23,'Chengalpattu'),(343,23,'Chennai'),(344,23,'Chidambaram'),(345,23,'Coimbatore'),(346,23,'Cuddalore'),(347,23,'Dharmapuri'),(348,23,'Dindigul'),(349,23,'Erode'),(350,23,'Kanchipuram'),(351,23,'Kanniyakumari'),(352,23,'Kodaikanal'),(353,23,'Kumbakonam'),(354,23,'Madurai'),(355,23,'Mamallapuram'),(356,23,'Nagappattinam'),(357,23,'Nagercoil'),(358,23,'Palayamkottai'),(359,23,'Pudukkottai'),(360,23,'Rajapalayam'),(361,23,'Ramanathapuram'),(362,23,'Salem'),(363,23,'Thanjavur'),(364,23,'Tiruchchirappalli'),(365,23,'Tirunelveli'),(366,23,'Tiruppur'),(367,23,'Thoothukudi'),(368,23,'Udhagamandalam'),(369,23,'Vellore'),(370,24,'Agartala'),(371,25,'Hyderabad'),(372,25,'Karimnagar'),(373,25,'Khammam'),(374,25,'Mahbubnagar'),(375,25,'Nizamabad'),(376,25,'Sangareddi'),(377,25,'Warangal'),(378,26,'Agra'),(379,26,'Aligarh'),(380,26,'Amroha'),(381,26,'Ayodhya'),(382,26,'Azamgarh'),(383,26,'Bahraich'),(384,26,'Ballia'),(385,26,'Banda'),(386,26,'Bara Banki'),(387,26,'Bareilly'),(388,26,'Basti'),(389,26,'Bijnor'),(390,26,'Bithur'),(391,26,'Budaun'),(392,26,'Bulandshahr'),(393,26,'Deoria'),(394,26,'Etah'),(395,26,'Etawah'),(396,26,'Faizabad'),(397,26,'Farrukhabad-cum-Fatehgarh'),(398,26,'Fatehpur'),(399,26,'Fatehpur Sikri'),(400,26,'Ghaziabad'),(401,26,'Ghazipur'),(402,26,'Gonda'),(403,26,'Gorakhpur'),(404,26,'Hamirpur'),(405,26,'Hardoi'),(406,26,'Hathras'),(407,26,'Jalaun'),(408,26,'Jaunpur'),(409,26,'Jhansi'),(410,26,'Kannauj'),(411,26,'Kanpur'),(412,26,'Lakhimpur'),(413,26,'Lalitpur'),(414,26,'Lucknow'),(415,26,'Mainpuri'),(416,26,'Mathura'),(417,26,'Meerut'),(418,26,'Mirzapur-Vindhyachal'),(419,26,'Moradabad'),(420,26,'Muzaffarnagar'),(421,26,'Partapgarh'),(422,26,'Pilibhit'),(423,26,'Prayagraj'),(424,26,'Rae Bareli'),(425,26,'Rampur'),(426,26,'Saharanpur'),(427,26,'Sambhal'),(428,26,'Shahjahanpur'),(429,26,'Sitapur'),(430,26,'Sultanpur'),(431,26,'Tehri'),(432,26,'Varanasi'),(433,27,'Almora'),(434,27,'Dehra Dun'),(435,27,'Haridwar'),(436,27,'Mussoorie'),(437,27,'Nainital'),(438,27,'Pithoragarh'),(439,28,'Alipore'),(440,28,'Alipur Duar'),(441,28,'Asansol'),(442,28,'Baharampur'),(443,28,'Bally'),(444,28,'Balurghat'),(445,28,'Bankura'),(446,28,'Baranagar'),(447,28,'Barasat'),(448,28,'Barrackpore'),(449,28,'Basirhat'),(450,28,'Bhatpara'),(451,28,'Bishnupur'),(452,28,'Budge Budge'),(453,28,'Burdwan'),(454,28,'Chandernagore'),(455,28,'Darjeeling'),(456,28,'Diamond Harbour'),(457,28,'Dum Dum'),(458,28,'Durgapur'),(459,28,'Halisahar'),(460,28,'Haora'),(461,28,'Hugli'),(462,28,'Ingraj Bazar'),(463,28,'Jalpaiguri'),(464,28,'Kalimpong'),(465,28,'Kamarhati'),(466,28,'Kanchrapara'),(467,28,'Kharagpur'),(468,28,'Cooch Behar'),(469,28,'Kolkata'),(470,28,'Krishnanagar'),(471,28,'Malda'),(472,28,'Midnapore'),(473,28,'Murshidabad'),(474,28,'Nabadwip'),(475,28,'Palashi'),(476,28,'Panihati'),(477,28,'Purulia'),(478,28,'Raiganj'),(479,28,'Santipur'),(480,28,'Shantiniketan'),(481,28,'Shrirampur'),(482,28,'Siliguri'),(483,28,'Siuri'),(484,28,'Tamluk'),(485,28,'Titagarh'),(486,29,'Port Blair'),(487,30,'Chandigarh'),(488,31,'Daman'),(489,31,'Diu'),(490,31,'Silvassa'),(491,32,'Delhi'),(492,32,'New Delhi'),(493,33,'Anantnag'),(494,33,'Baramula'),(495,33,'Doda'),(496,33,'Gulmarg'),(497,33,'Jammu'),(498,33,'Kathua'),(499,33,'Punch'),(500,33,'Rajouri'),(501,33,'Srinagar'),(502,33,'Udhampur'),(503,34,'Kargil'),(504,34,'Leh'),(505,35,'Kavaratti'),(506,35,'Agatti'),(507,35,'Amini'),(508,35,'Kadmat'),(509,35,'Kiltan'),(510,35,'Chetlat'),(511,35,'Bitra'),(512,35,'Andrott'),(513,35,'Kalpeni'),(514,35,'Minicoy'),(515,36,'Ariankuppam'),(516,36,'Karaikal'),(517,36,'Mahé'),(518,36,'Kurumbapet'),(519,36,'Manavely'),(520,36,'Ozhukarai'),(521,36,'Thirumalairayanpattinam'),(522,36,'Puducherry (Pondicherry)'),(523,36,'Villianur'),(524,36,'Yanam');
/*!40000 ALTER TABLE `city_master` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `email_change_logs`
--

DROP TABLE IF EXISTS `email_change_logs`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `email_change_logs` (
  `user_id` int DEFAULT NULL,
  `email` varchar(255) NOT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `email_change_logs`
--

LOCK TABLES `email_change_logs` WRITE;
/*!40000 ALTER TABLE `email_change_logs` DISABLE KEYS */;
/*!40000 ALTER TABLE `email_change_logs` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `feedbacks`
--

DROP TABLE IF EXISTS `feedbacks`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `feedbacks` (
  `id` int NOT NULL AUTO_INCREMENT,
  `garage_id` int NOT NULL,
  `customer_id` int NOT NULL,
  `feedback` varchar(255) NOT NULL,
  `ratings` decimal(10,2) DEFAULT '3.00',
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `garage_id` (`garage_id`),
  KEY `customer_id` (`customer_id`),
  CONSTRAINT `feedbacks_ibfk_1` FOREIGN KEY (`garage_id`) REFERENCES `garage_master` (`id`),
  CONSTRAINT `feedbacks_ibfk_2` FOREIGN KEY (`customer_id`) REFERENCES `users` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `feedbacks`
--

LOCK TABLES `feedbacks` WRITE;
/*!40000 ALTER TABLE `feedbacks` DISABLE KEYS */;
/*!40000 ALTER TABLE `feedbacks` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `garage_address`
--

DROP TABLE IF EXISTS `garage_address`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `garage_address` (
  `id` int NOT NULL AUTO_INCREMENT,
  `address_id` int NOT NULL,
  `garage_id` int NOT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP,
  `is_deleted` tinyint(1) DEFAULT '0',
  `latitude` varchar(25) DEFAULT NULL,
  `longitude` varchar(25) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `address_id` (`address_id`),
  KEY `garage_id` (`garage_id`),
  CONSTRAINT `garage_address_ibfk_1` FOREIGN KEY (`address_id`) REFERENCES `address_master` (`id`),
  CONSTRAINT `garage_address_ibfk_2` FOREIGN KEY (`garage_id`) REFERENCES `garage_master` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `garage_address`
--

LOCK TABLES `garage_address` WRITE;
/*!40000 ALTER TABLE `garage_address` DISABLE KEYS */;
INSERT INTO `garage_address` VALUES (11,22,12,'2024-04-16 12:30:49',NULL,0,'22.684282675883896','72.88051636361853'),(12,23,13,'2024-04-16 12:51:57',NULL,0,'22.684282675883896','72.88051636361853');
/*!40000 ALTER TABLE `garage_address` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `garage_master`
--

DROP TABLE IF EXISTS `garage_master`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `garage_master` (
  `id` int NOT NULL AUTO_INCREMENT,
  `garage_name` varchar(255) NOT NULL,
  `contact_number` varchar(10) NOT NULL,
  `email` varchar(255) NOT NULL,
  `thumbnail` varchar(255) DEFAULT NULL,
  `open_time` timestamp NOT NULL,
  `close_time` timestamp NOT NULL,
  `status` tinyint(1) DEFAULT '1',
  `description` varchar(255) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP,
  `is_deleted` bool DEFAULT 0,
  PRIMARY KEY (`id`),
  CONSTRAINT `garage_master_chk_1` CHECK ((length(`contact_number`) = 10))
) ENGINE=InnoDB AUTO_INCREMENT=14 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `garage_master`
--

LOCK TABLES `garage_master` WRITE;
/*!40000 ALTER TABLE `garage_master` DISABLE KEYS */;
INSERT INTO `garage_master` VALUES (1,'sasta garage','7894561230','temp@gmail.com',NULL,'2024-04-15 04:30:00','2024-04-15 12:30:00',1,NULL,'2024-04-15 12:56:17',NULL,0), (12,'Sahayak Garage','8234567890','sahayak.garage@gmail.com','/assets/garage.png','2024-03-16 15:30:00','2024-03-16 12:32:00',1,'sahayak garage is available for 24 X 7 in your service. we provide multiple services that will increase your vehicle’s health','2024-04-16 12:30:49','2024-04-16 12:47:30', 0),(13,'Jayraj','8234567890','dsd@sdd.dsd','https://pics:art/demo.png','2024-03-16 12:57:00','2024-03-16 12:56:00',1,'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry`s standard\ndummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen\nbook.','2024-04-16 12:51:57','2024-04-16 13:34:05', 0);
/*!40000 ALTER TABLE `garage_master` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `garage_events`
--

DROP TABLE IF EXISTS `garage_events`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `garage_events` (
  `id` int NOT NULL AUTO_INCREMENT,
  `date` date NOT NULL,
  `name` varchar(50) NOT NULL,
  `description` varchar(150) DEFAULT NULL,
  `is_deleted` tinyint(1) DEFAULT '0',
  `garage_id` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `garage_id` (`garage_id`),
  CONSTRAINT `garage_events_ibfk_1` FOREIGN KEY (`garage_id`) REFERENCES `garage_master` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `garage_events`
--

LOCK TABLES `garage_events` WRITE;
/*!40000 ALTER TABLE `garage_events` DISABLE KEYS */;
/*!40000 ALTER TABLE `garage_events` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `login_logs`
--

DROP TABLE IF EXISTS `login_logs`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `login_logs` (
  `id` int NOT NULL AUTO_INCREMENT,
  `user_id` int DEFAULT NULL,
  `attempt_count` int NOT NULL DEFAULT '1',
  `attempt_sys_ip` varchar(16) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `login_logs`
--

LOCK TABLES `login_logs` WRITE;
/*!40000 ALTER TABLE `login_logs` DISABLE KEYS */;
/*!40000 ALTER TABLE `login_logs` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `owner_has_garages`
--

DROP TABLE IF EXISTS `owner_has_garages`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `owner_has_garages` (
  `id` int NOT NULL AUTO_INCREMENT,
  `owner_id` int DEFAULT NULL,
  `garage_id` int DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=14 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `owner_has_garages`
--

LOCK TABLES `owner_has_garages` WRITE;
/*!40000 ALTER TABLE `owner_has_garages` DISABLE KEYS */;
INSERT INTO `owner_has_garages` VALUES (14,3,1,'2024-04-16 08:22:11',NULL), (1,2,1,'2024-04-15 13:41:37',NULL),(2,2,2,'2024-04-15 13:53:37',NULL),(3,2,3,'2024-04-15 13:54:38',NULL),(4,2,4,'2024-04-15 13:56:55',NULL),(5,2,5,'2024-04-15 13:58:20',NULL),(6,2,6,'2024-04-16 12:00:49',NULL),(7,2,7,'2024-04-16 12:14:22',NULL),(8,2,8,'2024-04-16 12:19:35',NULL),(9,2,9,'2024-04-16 12:22:15',NULL),(10,2,10,'2024-04-16 12:23:58',NULL),(11,2,11,'2024-04-16 12:27:56',NULL),(12,2,12,'2024-04-16 12:30:49',NULL),(13,2,13,'2024-04-16 12:51:57',NULL);
/*!40000 ALTER TABLE `owner_has_garages` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `password_change_logs`
--

DROP TABLE IF EXISTS `password_change_logs`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `password_change_logs` (
  `user_id` int DEFAULT NULL,
  `password` varchar(256) NOT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `password_change_logs`
--

LOCK TABLES `password_change_logs` WRITE;
/*!40000 ALTER TABLE `password_change_logs` DISABLE KEYS */;
/*!40000 ALTER TABLE `password_change_logs` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `payment_master`
--

DROP TABLE IF EXISTS `payment_master`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `payment_master` (
  `id` int NOT NULL AUTO_INCREMENT,
  `appointment_id` int NOT NULL,
  `payment_type` varchar(50) NOT NULL,
  `bank_name` varchar(255) DEFAULT NULL,
  `card_number` varchar(255) DEFAULT NULL,
  `account_holder` varchar(50) DEFAULT NULL,
  `cvv` varchar(255) DEFAULT NULL,
  `expiry_date` varchar(50) DEFAULT NULL,
  `upi` varchar(50) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `payment_master`
--

LOCK TABLES `payment_master` WRITE;
/*!40000 ALTER TABLE `payment_master` DISABLE KEYS */;
/*!40000 ALTER TABLE `payment_master` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `permissions`
--

DROP TABLE IF EXISTS `permissions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `permissions` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(20) NOT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `name` (`name`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `permissions`
--

LOCK TABLES `permissions` WRITE;
/*!40000 ALTER TABLE `permissions` DISABLE KEYS */;
/*!40000 ALTER TABLE `permissions` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `role_has_permissions`
--

DROP TABLE IF EXISTS `role_has_permissions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `role_has_permissions` (
  `role_id` int NOT NULL,
  `permission_id` int NOT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`role_id`,`permission_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `role_has_permissions`
--

LOCK TABLES `role_has_permissions` WRITE;
/*!40000 ALTER TABLE `role_has_permissions` DISABLE KEYS */;
/*!40000 ALTER TABLE `role_has_permissions` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `roles`
--

DROP TABLE IF EXISTS `roles`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `roles` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(20) NOT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `name` (`name`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `roles`
--

LOCK TABLES `roles` WRITE;
/*!40000 ALTER TABLE `roles` DISABLE KEYS */;
/*!40000 ALTER TABLE `roles` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `service_master`
--

DROP TABLE IF EXISTS `service_master`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `service_master` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(50) NOT NULL,
  `description` varchar(150) NOT NULL,
  `is_deleted` bool DEFAULT 0,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `service_master`
--

LOCK TABLES `service_master` WRITE;
/*!40000 ALTER TABLE `service_master` DISABLE KEYS */;
INSERT INTO `service_master` VALUES (1,'washing','washing your vehicle with clean water and soap',0),(2,'washing','washing your vehicle with clean water and soap',0),(3,'washing','washing your vehicle with clean water and soap',0),(4,'something','something',0),(5,'testing','just testing',0),(6,'my test','my test success',0),(7,'car destroy','completely destory your car',0),(8,'s ss ss ss ss ss ','nathi available',0),(9,'dasf','dasfsd',0),(10,'sdafsdf','dsafdsfasdf',0),(11,'qwerw','wefsadasdfas',0),(12,'testing delete','testing delete',0),(13,'testing delete','testing delete',0),(14,'123432','3414213',0),(15,'123432','3414213',0),(16,'dasfsdfsadfasd','asdfasdfasdfsadfasd',0),(17,'dasfsdfsadfasd','asdfasdfasdfsadfasd',0),(19,'service','description',0);
/*!40000 ALTER TABLE `service_master` ENABLE KEYS */;
UNLOCK TABLES;

DROP TABLE IF EXISTS `garage_has_services`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `garage_has_services` (
  `id` int NOT NULL AUTO_INCREMENT,
  `garage_id` int NOT NULL,
  `services_id` int NOT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP,
  `is_deleted` tinyint(1) DEFAULT '0',
  `price` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `services_id` (`services_id`),
  KEY `garage_id` (`garage_id`),
  CONSTRAINT `garage_has_services_ibfk_1` FOREIGN KEY (`services_id`) REFERENCES `service_master` (`id`),
  CONSTRAINT `garage_has_services_ibfk_2` FOREIGN KEY (`garage_id`) REFERENCES `garage_master` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `garage_has_services`
--

LOCK TABLES `garage_has_services` WRITE;
/*!40000 ALTER TABLE `garage_has_services` DISABLE KEYS */;
INSERT INTO `garage_has_services` VALUES (1,1,1,'2024-04-15 13:01:09',NULL,0,45),(2,1,2,'2024-04-15 13:03:45',NULL,0,45),(3,1,3,'2024-04-15 13:04:01',NULL,0,20),(4,1,6,'2024-04-15 13:28:10',NULL,0,100),(5,1,4,'2024-04-15 13:45:17',NULL,0,45),(6,1,5,'2024-04-16 04:38:50',NULL,0,20),(7,1,7,'2024-04-16 08:40:34',NULL,0,100),(8,1,8,'2024-04-16 09:14:52',NULL,0,12),(9,1,12,'2024-04-16 09:26:46',NULL,0,453134242),(10,1,15,'2024-04-16 09:33:09',NULL,0,45),(11,1,19,'2024-04-16 09:36:31',NULL,0,10);
/*!40000 ALTER TABLE `garage_has_services` ENABLE KEYS */;
UNLOCK TABLES;
--
-- Table structure for table `slot_master`
--

DROP TABLE IF EXISTS `slot_master`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `slot_master` (
  `id` int NOT NULL AUTO_INCREMENT,
  `garage_id` int DEFAULT NULL,
  `start_time` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `end_time` timestamp NOT NULL,
  `availability_status` tinyint(1) DEFAULT '0',
  `create_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `slot_master`
--

LOCK TABLES `slot_master` WRITE;
/*!40000 ALTER TABLE `slot_master` DISABLE KEYS */;
INSERT INTO `slot_master` VALUES (1,1,'2001-01-01 10:55:23','2001-01-01 11:55:23',1,'2024-04-10 09:08:40','2024-04-10 09:48:17'),(2,1,'2020-01-01 03:30:00','2020-01-01 11:30:00',0,'2024-04-16 09:42:20',NULL);
/*!40000 ALTER TABLE `slot_master` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `state_master`
--

DROP TABLE IF EXISTS `state_master`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `state_master` (
  `id` int NOT NULL AUTO_INCREMENT,
  `state_name` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=73 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `state_master`
--

LOCK TABLES `state_master` WRITE;
/*!40000 ALTER TABLE `state_master` DISABLE KEYS */;
INSERT INTO `state_master` VALUES (1,'Andhra Pradesh'),(2,'Arunachal Pradesh'),(3,'Assam'),(4,'Bihar'),(5,'Chhattisgarh'),(6,'Goa'),(7,'Gujarat'),(8,'Haryana'),(9,'Himachal Pradesh'),(10,'Jharkhand'),(11,'Karnataka'),(12,'Kerala'),(13,'Maharashtra'),(14,'Madhya Pradesh'),(15,'Manipur'),(16,'Meghalaya'),(17,'Mizoram'),(18,'Nagaland'),(19,'Odisha'),(20,'Punjab'),(21,'Rajasthan'),(22,'Sikkim'),(23,'Tamil Nadu'),(24,'Tripura'),(25,'Telangana'),(26,'Uttar Pradesh'),(27,'Uttarakhand'),(28,'West Bengal'),(29,'Andaman & Nicobar (UT)'),(30,'Chandigarh (UT)'),(31,'Dadra & Nagar Haveli and Daman & Diu (UT)'),(32,'Delhi'),(33,'Jammu & Kashmir (UT)'),(34,'Ladakh (UT)'),(35,'Lakshadweep (UT)'),(36,'Puducherry (UT)');
/*!40000 ALTER TABLE `state_master` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user_address`
--

DROP TABLE IF EXISTS `user_address`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user_address` (
  `id` int NOT NULL AUTO_INCREMENT,
  `address_id` int NOT NULL,
  `user_id` int NOT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP,
  `is_deleted` tinyint(1) DEFAULT '0',
  PRIMARY KEY (`id`),
  KEY `address_id` (`address_id`),
  KEY `user_id` (`user_id`),
  CONSTRAINT `user_address_ibfk_1` FOREIGN KEY (`address_id`) REFERENCES `address_master` (`id`),
  CONSTRAINT `user_address_ibfk_2` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user_address`
--

LOCK TABLES `user_address` WRITE;
/*!40000 ALTER TABLE `user_address` DISABLE KEYS */;
INSERT INTO `user_address` VALUES (1,1,3,'2024-04-17 10:59:56', NULL, 0);
/*!40000 ALTER TABLE `user_address` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user_has_vehicles`
--

DROP TABLE IF EXISTS `user_has_vehicles`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user_has_vehicles` (
  `id` int NOT NULL AUTO_INCREMENT,
  `owner_id` int NOT NULL,
  `vehicle_id` int NOT NULL,
  `register_plate_number` varchar(250) NOT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `owner_id` (`owner_id`),
  CONSTRAINT `user_has_vehicles_ibfk_1` FOREIGN KEY (`owner_id`) REFERENCES `users` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user_has_vehicles`
--

LOCK TABLES `user_has_vehicles` WRITE;
/*!40000 ALTER TABLE `user_has_vehicles` DISABLE KEYS */;
/*!40000 ALTER TABLE `user_has_vehicles` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `id` int NOT NULL AUTO_INCREMENT,
  `role_id` int DEFAULT NULL,
  `name` varchar(50) DEFAULT NULL,
  `profile_pic` varchar(255) DEFAULT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(256) NOT NULL,
  `activate_link` varchar(1000) NOT NULL,
  `password_exp` timestamp NOT NULL,
  `link_exp` timestamp NOT NULL,
  `is_active` tinyint(1) DEFAULT '1',
  `is_verified` tinyint(1) DEFAULT '0',
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP,
  `bio` varchar(1000) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `email` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (3,1,'Shailesh Chaudhari',NULL,'shailesh@gmail.com','$2b$10$lmPYTCW2.HUayZSFQS333.CmvUlhZS0YfLC6GRSDIuYfMV/hUxQae','e4fzgh2tcyo','2024-04-22 05:00:01','2024-04-12 07:00:01',1,1,'2024-04-12 05:00:01','2024-04-16 13:38:44','Software Engineer @eSparkBiz Technologies Private Limited'), (2,1,'mohan',NULL,'bharat@gmail.com','$2b$10$.JNj1yD3LdwUJeq97li.wO/2NTRolwxbjtpaie7TIcqQtxoWl1692','weu6q880k2','2024-04-20 07:03:37','2024-04-10 09:03:37',1,1,'2024-04-10 07:03:37','2024-04-16 09:50:26',NULL);
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
/*!50003 CREATE*/ /*!50017 DEFINER=`root`@`localhost`*/ /*!50003 TRIGGER `user_trigger` BEFORE INSERT ON `users` FOR EACH ROW SET
    NEW.password_exp = TIMESTAMPADD(DAY, 10, CURRENT_TIMESTAMP),
    NEW.link_exp = TIMESTAMPADD(HOUR, 2, CURRENT_TIMESTAMP) */;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;

--
-- Table structure for table `vehicle_condition`
--

DROP TABLE IF EXISTS `vehicle_condition`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `vehicle_condition` (
  `id` int NOT NULL AUTO_INCREMENT,
  `condition_image` varchar(255) NOT NULL,
  `description` varchar(250) DEFAULT NULL,
  `vehicle_id` int NOT NULL,
  PRIMARY KEY (`id`),
  KEY `vehicle_id` (`vehicle_id`),
  CONSTRAINT `vehicle_condition_ibfk_1` FOREIGN KEY (`vehicle_id`) REFERENCES `user_has_vehicles` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `vehicle_condition`
--

LOCK TABLES `vehicle_condition` WRITE;
/*!40000 ALTER TABLE `vehicle_condition` DISABLE KEYS */;
/*!40000 ALTER TABLE `vehicle_condition` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `vehicle_master`
--

DROP TABLE IF EXISTS `vehicle_master`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `vehicle_master` (
  `id` int NOT NULL AUTO_INCREMENT,
  `type_id` int NOT NULL,
  `brand` varchar(250) DEFAULT NULL,
  `model` varchar(250) NOT NULL,
  `year` year DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `type_id` (`type_id`),
  CONSTRAINT `vehicle_master_ibfk_1` FOREIGN KEY (`type_id`) REFERENCES `vehicle_types` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `vehicle_master`
--

LOCK TABLES `vehicle_master` WRITE;
/*!40000 ALTER TABLE `vehicle_master` DISABLE KEYS */;
/*!40000 ALTER TABLE `vehicle_master` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `vehicle_types`
--

DROP TABLE IF EXISTS `vehicle_types`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `vehicle_types` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(250) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `vehicle_types`
--

LOCK TABLES `vehicle_types` WRITE;
/*!40000 ALTER TABLE `vehicle_types` DISABLE KEYS */;
/*!40000 ALTER TABLE `vehicle_types` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping events for database 'garage_management_db'
--

--
-- Dumping routines for database 'garage_management_db'
--
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-04-16 19:16:04


CREATE TABLE service_categories (
  id INT PRIMARY KEY AUTO_INCREMENT,
  name VARCHAR(255) NOT NULL
);

INSERT INTO service_categories (name) VALUES ('Vehicle Maintenance');
INSERT INTO service_categories (name) VALUES ('Diagnostic Services');
INSERT INTO service_categories (name) VALUES ('Repair Services');
INSERT INTO service_categories (name) VALUES ('Preventive Maintenance');
INSERT INTO service_categories (name) VALUES ('Vehicle Upgrades and Modifications');
INSERT INTO service_categories (name) VALUES ('Bodywork and Painting');
INSERT INTO service_categories (name) VALUES ('Tire Services');
INSERT INTO service_categories (name) VALUES ('Vehicle Detailing');
INSERT INTO service_categories (name) VALUES ('Roadside Assistance');
INSERT INTO service_categories (name) VALUES ('Fleet Maintenance');
INSERT INTO service_categories (name) VALUES ('Specialty Services');

CREATE TABLE services (
  id INT PRIMARY KEY AUTO_INCREMENT,
  name VARCHAR(255) NOT NULL,
  description TEXT,
  service_category_id INT NOT NULL,
  FOREIGN KEY (service_category_id) REFERENCES service_categories(id)
);

