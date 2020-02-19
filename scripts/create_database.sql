CREATE DATABASE alp;

CREATE TABLE Volunteer
( 
    id INT IDENTITY(1,1) PRIMARY KEY,
    firstName NVARCHAR(50) NOT NULL,
    lastName NVARCHAR(50) NOT NULL, 
    email NVARCHAR(50) NOT NULL,
    address NVARCHAR(50) NOT NULL,
    city NVARCHAR(50) NOT NULL,
    province NVARCHAR(50) NOT NULL,
    postalCode NVARCHAR(10) NOT NULL,
    mailingList BIT NOT NULL,
    contactFirstName NVARCHAR(50) NOT NULL,
    contactLastName NVARCHAR(50) NOT NULL,
    contactRelationship NVARCHAR(50) NOT NULL,
    contactPhoneNumber NVARCHAR(50) NOT NULL,
    contactEmail NVARCHAR(50) NOT NULL
);