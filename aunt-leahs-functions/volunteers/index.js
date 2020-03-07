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

        var options = { keepNulls: true };
        const formInput = req.body;
        context.log("postVolunteers FI: " + JSON.stringify(formInput));
        context.log(formInput == req.body);

        var volunteersConnection = new Connection(config);

		var volunteerLoad = volunteersConnection.newBulkLoad('Volunteer', options, function(err) {
            if (err) {
                context.log(err);
                context.done();
            }
		});

		volunteerLoad.addColumn('firstName', TYPES.NVarChar, { length: 50, nullable: false });
        volunteerLoad.addColumn('lastName', TYPES.NVarChar, { length: 50, nullable: false });
        volunteerLoad.addColumn('email', TYPES.NVarChar, { length: 50, nullable: false });
        volunteerLoad.addColumn('address', TYPES.NVarChar, { length: 50, nullable: false });
        volunteerLoad.addColumn('postalCode', TYPES.NVarChar, { length: 10, nullable: false });
        volunteerLoad.addColumn('mailingList', TYPES.Bit, { length: 50, nullable: false });
		volunteerLoad.addColumn('emergencyContact', TYPES.NVarChar, { length: 50, nullable: false });

        try {
            volunteerLoad.addRow({ 
                firstName: formInput.firstName, 
                lastName: formInput.lastName, 
                email: formInput.email, 
                address: formInput.streetAddress, 
                postalCode: formInput.postalCode, 
                mailingList: formInput.mailingList, 
                emergencyContact: formInput.contactEmail, 
            });
        } catch (err) {
            context.log.error('Error: ', err);
            throw err;
        }

        volunteersConnection.execBulkLoad(volunteerLoad);
    }

    function postEmergencyContact(formInput) {

        console.log("formInput: " + formInput);

        var options = { keepNulls: true };

        var contactLoad = connection.newBulkLoad('EmergencyContact', options, function(err) {
            if (err) {
                context.log(err);
                context.done();
            }
		});

        contactLoad.addColumn('firstName', TYPES.NVarChar, { length: 50, nullable: false });
        contactLoad.addColumn('lastName', TYPES.NVarChar, { length: 50, nullable: false });
        contactLoad.addColumn('phoneNumber', TYPES.NVarChar, { length: 10, nullable: false });
        contactLoad.addColumn('relationship', TYPES.NVarChar, { length: 50, nullable: false });
        contactLoad.addColumn('email', TYPES.NVarChar, { length: 50, nullable: false });

        try {
            contactLoad.addRow({ 
                firstName: formInput.contactFirstName, 
                lastName: formInput.contactLastName, 
                phoneNumber: formInput.contactPhoneNumber, 
                relationship: formInput.contactRelationship, 
                email: formInput.contactEmail
            });
        } catch (err) {
            context.log.error('Error: ', err);
            throw err;
        }

        const tryContactLoad = new Promise(function(resolve, reject) {
            connection.execBulkLoad(contactLoad);
            resolve('Success!');
        });
        
        tryContactLoad.then(postVolunteers());
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
};