var Connection = require('tedious').Connection;
var Request = require('tedious').Request;
const config = require('../config');
var TYPES = require('tedious').TYPES;

module.exports = function (context, req) {
    var volunteers = [];
    var connection = new Connection(config);

    connection.on('connect', (error) => {
        if (error) {
            context.log('Error: ', error);
            context.done(err);
        }
        else {
            context.log('Connected');
            if (req.method == 'GET') {
                context.log("GET /volunteers");
                getVolunteers();
            }
            else if (req.method == 'POST') {
                context.log("POST /volunteers");
                postEmergencyContact();
            }
            else if (req.method == 'PUT') { // soft delete
                context.log("PUT /volunteers");
                deleteVolunteers();
            }
        }
    });

    function getVolunteers() {
        var queryString = 'SELECT [firstName], [lastName], [phoneNumber], [email], [address], [postalCode], [mailingList] FROM [dbo].[Volunteer];';
        request = new Request(
            queryString,
            function (err) {
                if (err) {
                    context.log(err);
                    context.done(err);
                }
            });

        request.on('row', function (columns) {
            var volunteer = {};
            columns.forEach(function (column) {
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

    function postVolunteers(emergencyContactId) {
        const formInput = req.body;

        // Should be refactored to use JSON destructing, I think
        const firstName = formInput.firstName;
        const lastName = formInput.lastName;
        const email = formInput.email;
        const phone = formInput.phone;
        const streetAddress = formInput.streetAddress;
        const postalCode = formInput.postalCode;
        const mailingList = formInput.mailingList;

        var queryString = 'INSERT INTO Volunteer (firstName, lastName, phoneNumber, email, address, postalCode, mailingList, emergencyContactId, isDeleted) \
        VALUES (@firstName, @lastName, @phoneNumber, @email, @streetAddress, @postalCode, @mailingList, @emergencyContactId, @isDeleted)';

        request = new Request(
            queryString,
            function (err) {
                if (err) {
                    context.log(err);
                    context.done(err);
                }
            });

        request.addParameter('firstName', TYPES.NVarChar, firstName);
        request.addParameter('lastName', TYPES.NVarChar, lastName);
        request.addParameter('phoneNumber', TYPES.NVarChar, phone);
        request.addParameter('email', TYPES.NVarChar, email);
        request.addParameter('streetAddress', TYPES.NVarChar, streetAddress);
        request.addParameter('postalCode', TYPES.NVarChar, postalCode);
        request.addParameter('mailingList', TYPES.Bit, mailingList);
        request.addParameter('emergencyContactId', TYPES.Int, emergencyContactId);
        request.addParameter('isDeleted', TYPES.Bit, 0);

        request.on('doneProc', function (rowCount, more, returnStatus, rows) {
            context.done();
        });

        connection.execSql(request);
    }

    function postEmergencyContact() {
        const formInput = req.body;

        // Same comment as above, refactor to use restructuring
        const firstName = formInput.contactFirstName;
        const lastName = formInput.contactLastName;
        const phoneNumber = formInput.contactPhoneNumber;
        const relationship = formInput.contactRelationship;
        const contactEmail = formInput.contactEmail;

        var queryString = 'INSERT INTO EmergencyContact (firstName, lastName, phoneNumber, relationship, email) \
                            VALUES (@firstName, @lastName, @phoneNumber, @relationship, @contactEmail); \
                            SELECT @@identity';

        request = new Request(
            queryString,
            function (err) {
                if (err) {
                    context.log(err);
                    context.done(err);
                }
            });

        request.addParameter('firstName', TYPES.NVarChar, firstName);
        request.addParameter('lastName', TYPES.NVarChar, lastName);
        request.addParameter('phoneNumber', TYPES.NVarChar, phoneNumber);
        request.addParameter('relationship', TYPES.NVarChar, relationship);
        request.addParameter('contactEmail', TYPES.NVarChar, contactEmail);

        var emergencyContactId = null;

        request.on('row', function (columns) {
            context.log('New id: %d', columns[0].value);
            emergencyContactId = columns[0].value;
        });

        request.on('requestCompleted', function () {
            postVolunteers(emergencyContactId);
        });

        connection.execSql(request);
    }

    // Not working, but roughly how I expect the end product to look
    function deleteVolunteers() {
        var queryString = 'UPDATE Volunteer SET isDeleted = 1;';
        request = new Request(
            queryString,
            function (err) {
                if (err) {
                    context.log(err);
                    context.done(err);
                }
            });

        connection.execSql(request);
    }
};