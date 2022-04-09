CREATE DATABASE db_device;

USE db_device;

CREATE TABLE Categories(
	Id integer NOT NULL AUTO_INCREMENT,
	Name char(128) NOT NULL,
	PRIMARY KEY (id)
);

CREATE TABLE Devices(
	Id integer NOT NULL AUTO_INCREMENT,
	Category integer NOT NULL,
	Color char(16) NOT NULL,
	partNumber bigint NOT NULL CHECK(partNumber > 0),
	PRIMARY KEY (id),
	CONSTRAINT fk_category FOREIGN KEY (category) REFERENCES Categories(id)
);

#INSERT INTO Categories(name) VALUES ("Category 1");
#INSERT INTO Devices(category, color, partNumber) VALUES (1, "Blue", 10);

#SELECT * FROM Categories t;
#SELECT * FROM Devices d;