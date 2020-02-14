CREATE TABLE volunteers
( 
    volunteer_id INT IDENTITY(1,1) PRIMARY KEY,
    first_name NVARCHAR(50) NOT NULL,
    last_name NVARCHAR(50) NOT NULL, 
    email NVARCHAR(50) NOT NULL,
    address NVARCHAR(50) NOT NULL,
    city NVARCHAR(50) NOT NULL,
    province NVARCHAR(50) NOT NULL,
    postal_code NVARCHAR(10) NOT NULL,
    mailing_list BIT NOT NULL,
    ec_first_name NVARCHAR(50) NOT NULL,
    ec_last_name NVARCHAR(50) NOT NULL,
    ec_relationship NVARCHAR(50) NOT NULL,
    ec_phone_number NVARCHAR(50) NOT NULL,
    ec_email NVARCHAR(50) NOT NULL
);