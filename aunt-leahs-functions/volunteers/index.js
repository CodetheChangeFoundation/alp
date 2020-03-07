var Connection = require('tedious').Connection;
var ConnectionPool = require('tedious-connection-pool');
var Request = require('tedious').Request;
//const config = require('../config');
var TYPES = require('tedious').TYPES;

const config = {
  server: process.env["server"], // update me
  userName: process.env["user"],
  password: process.env["password"], // written twice b/c connection pool takes different config form
  database: process.env["db"],
  authentication: {
    options: {
      userName: process.env["user"], // update me
      password: process.env["password"] // update me
    },
    type: "default"
  },
  options: {
    database: process.env["db"], //update me
    encrypt: true,
  }
};

const poolConfig = {
    min: 0,
    max: 10,
    log: true
};

module.exports = function (context, req) {
    var volunteers = [];
    var connection = new Connection(config);

    connection.on('connect', (error) => {
        context.log(process.env["password"]);
        context.log(process.env["server"]);
        context.log(process.env["db"]);
        context.log(process.env["user"]);
        // 
        if (error) {
            context.log('Error: ', error);
            context.done();
        }
        else {
            context.log('Connected');
            if (req.method == 'GET') {
                context.log("GET /volunteers");
                getVolunteers();
            }
            else if (req.method == 'POST') {
                context.log("POST /volunteers");
                postEmergencyContact(req.body);
            }
            else if (req.method == 'PUT') { // soft delete
                context.log("PUT /volunteers");
                deleteVolunteers();
            }
        }
    });

    function getVolunteers() {
        var queryString = 'SELECT [firstName], [lastName], [email], [address], [postalCode], [mailingList] FROM [dbo].[Volunteer];';
        request = new Request(
            queryString,
            function(err) {
                if (err) {
                    context.log(err);
                    context.done();
                }
            });

            request.on('row', function (columns) {
                var volunteer = {};
                columns.forEach(function(column) {
                    volunteer[column.metadata.colName] = column.value;
                });
                volunteers.push(volunteer);
            });

            request.on('doneProc', function (rowCount, more, returnStatus, rows) {
                context.res = {
                    body: JSON.stringify(volunteers)
                };  

            context.done();
        });

        connection.execSql(request);
    }

    function postVolunteers() {
        const formInput = req.body;

        const firstName = formInput.firstName;
        const lastName = formInput.lastName;
        const email = formInput.email;
        const streetAddress = formInput.streetAddress;
        const postalCode = formInput.postalCode;
        const mailingList = formInput.mailingList;
        const contactEmail = formInput.contactEmail;

        var queryString = `INSERT INTO Volunteer (firstName, lastName, email, address, postalCode, mailingList, emergencyContact)
        VALUES (${firstName},${lastName},${email},${streetAddress},${postalCode},${mailingList},${contactEmail})`
        request = new Request(
            queryString,
            function(err) {
                if (err) {
                    context.log(err);
                    context.done();
                }
            });

        connection.execSql(request);
    }

    function postEmergencyContact() {
        const formInput = req.body;

        const firstName = formInput.contactFirstName;
        const lastName = formInput.contactLastName;
        const phoneNumber = formInput.contactPhoneNumber;
        const relationship = formInput.contactRelationship;
        const contactEmail = formInput.contactEmail;

        var queryString = `INSERT INTO EmergencyContact (firstName, lastName, phoneNumber, relationship, email)
                            VALUES (${firstName},${lastName},${phoneNumber},${relationship},${contactEmail});`
        request = new Request(
            queryString,
            function(err) {
                if (err) {
                    context.log(err);
                    context.done();
                }
            });

            request.on('requestCompleted', function () {
                postVolunteers();
            });

        connection.execSql(request);
    }

    function deleteVolunteers() {
        var queryString = 'UPDATE Volunteer SET isDeleted = 1;';
        request = new Request(
            queryString,
            function(err) {
            if (err) {
                context.log(err);
                context.done();
            }
        });

    connection.execSql(request);
    }
};