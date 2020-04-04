var Connection = require('tedious').Connection;
var Request = require('tedious').Request;
const config = require('../config');
var TYPES = require('tedious').TYPES;

module.exports = function (context, req) {
    var volunteers = [];
    var connection = new Connection(config);

    connection.on('connect', (err) => {
        if (err) {
            context.log('Error: ', err);
            context.done();
        }
        else {
            if (req.method == 'GET') {
                getVolunteers();
            }
            else if (req.method == 'POST') {
                postEmergencyContact();
            }
            else if (req.method == 'PUT') { // soft delete
                deleteVolunteers();
            }
        }
    });

    function getVolunteers() {
        var queryString = 'SELECT volunteer.id, volunteer.firstName, volunteer.lastName, volunteer.email, volunteer.address, volunteer.postalCode, volunteer.mailingList \
                            FROM Volunteer volunteer \
                            WHERE volunteer.isDeleted = 0;';


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
                    body: volunteers
                };  

            context.done();
        });

        connection.execSql(request);
    }

    function postVolunteers(emergencyContactId) {
        const formInput = req.body;

        const { firstName, lastName, email, phone, streetAddress, postalCode, mailingList } = formInput;

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
            if (returnStatus != 0) {
                context.done("Error occurred: " + returnStatus);
            }
            context.done();
        });

        connection.execSql(request);
    }

    function postEmergencyContact() {
        const formInput = req.body;

        const { firstName, lastName, contactPhoneNumber, contactRelationship, contactEmail } = formInput;

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
        request.addParameter('phoneNumber', TYPES.NVarChar, contactPhoneNumber);
        request.addParameter('relationship', TYPES.NVarChar, contactRelationship);
        request.addParameter('contactEmail', TYPES.NVarChar, contactEmail);

        var emergencyContactId = null;

        request.on('row', function (columns) {
            emergencyContactId = columns[0].value;
        });

        request.on('requestCompleted', function () {
            postVolunteers(emergencyContactId);
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
                context.done(err);
            }
        });

        connection.execSql(request);
    }
};
