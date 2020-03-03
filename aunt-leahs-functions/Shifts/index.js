var Connection = require('tedious').Connection;
var Request = require('tedious').Request;
var config = require('../config');

module.exports = function (context, req) {
    var shifts = [];

    var connection = new Connection(config);

    connection.on('connect', (error) => {
        if (error) {
            context.log('Error: ', error);
            context.done();
        }
        else {
            getShifts();
        }
    });

    function getShifts() {
        var queryString = 'SELECT shift.id, volunteer.firstName, volunteer.lastName, shift.startTime, shift.duration \
                            FROM Shift shift \
                            JOIN Volunteer volunteer ON shift.volunteerId = volunteer.id \
                            JOIN Location location ON shift.locationId = location.id \
                            WHERE shift.isDeleted = 0;';

        request = new Request(queryString,
            function(err) {
                if (err) {
                    context.log(err);
                    context.done();
                }
            });
        
        request.on('row', function (columns) {
            var shift = {};
            columns.forEach(function(column) {
                shift[column.metadata.colName] = column.value;
            });
            shifts.push(shift);
        });

        request.on('doneProc', function (rowCount, more, returnStatus, rows) {
            context.res = {
                body: JSON.stringify(shifts)
            };

            context.done();
        })

        connection.execSql(request);
    }
};

