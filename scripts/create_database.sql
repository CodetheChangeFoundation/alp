CREATE DATABASE alp;
​
-- -- This should be taken care of by another system?
-- CREATE TABLE Administrator
-- (
--     username NVARCHAR(50) NOT NULL,
--     password NVARCHAR(50) NOT NULL,
--     email NVARCHAR(50) NOT NULL,
--     PRIMARY KEY (email)
-- );
​
CREATE TABLE EmergencyContact
(
    id INT IDENTITY(1,1),
    firstName NVARCHAR(50) NOT NULL,
    lastName NVARCHAR(50) NOT NULL,
    phoneNumber CHAR(10) NOT NULL,
    relationship NVARCHAR(50) NOT NULL,
    email NVARCHAR(50) NOT NULL,
    PRIMARY KEY (id)
);
​
CREATE TABLE Volunteer
(
    id INT IDENTITY(1,1),
    firstName NVARCHAR(50) NOT NULL,
    lastName NVARCHAR(50) NOT NULL,
    email NVARCHAR(50) NOT NULL,
    address NVARCHAR(50) NOT NULL,
    postalCode NVARCHAR(10) NOT NULL,
    mailingList BIT NOT NULL,
    emergencyContactId INT NOT NULL,
    isDeleted BIT NOT NULL,
    PRIMARY KEY (id),
    CONSTRAINT UC_Email UNIQUE (email),
    FOREIGN KEY (emergencyContactId) REFERENCES EmergencyContact
									ON DELETE NO ACTION
									ON UPDATE CASCADE
);
​
CREATE TABLE Location
(
    id INT IDENTITY(1,1),
    name NVARCHAR(50) NOT NULL,
    address NVARCHAR(50),
    isDeleted BIT NOT NULL,
    PRIMARY KEY (id)
);
​
CREATE TABLE Shift
(
    id INT IDENTITY(1,1),
    locationId INT NOT NULL,
    volunteerId INT NOT NULL,
    startTime DATETIME NOT NULL,
    duration DECIMAL(5,2)  NOT NULL,
    isDeleted BIT NOT NULL,
    PRIMARY KEY (id),
    FOREIGN KEY (locationId) REFERENCES Location,
    FOREIGN KEY (volunteerId) REFERENCES Volunteer,
    UNIQUE(volunteerId, startTime)
);