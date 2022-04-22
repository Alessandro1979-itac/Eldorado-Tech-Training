CREATE DATABASE db_device;

USE db_device;

CREATE TABLE `Category` (
  `Id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `Name` varchar(128) NOT NULL DEFAULT '',
  PRIMARY KEY (`Id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

CREATE TABLE `Device` (
  `Id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `CategoryId` int(10) unsigned NOT NULL,
  `Color` varchar(16) NOT NULL,
  `PartNumber` bigint unsigned NOT NULL,
  PRIMARY KEY (`Id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

CREATE TABLE `Users` (
    `userId` int(10) unsigned NOT NULL AUTO_INCREMENT,
    `email` VARCHAR(100) UNIQUE NOT NULL,
    `password` VARCHAR(100) NOT NULL,
    PRIMARY KEY (`userId`)
)ENGINE=InnoDB DEFAULT CHARSET=latin1;
