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
        StringBuilder sb = new StringBuilder();
        sb.append('SELECT volunteer.firstName, volunteer.lastName, shift.startTime, shift.duration ');
        sb.append('FROM Shift shift ');
        sb.append('JOIN Volunteer volunteer ON shift.volunteerId = volunteer.id ');
        sb.append('JOIN Location location ON shift.locationId = location.id ');
        sb.append('WHERE shift.isDeleted = 0 ')
        sb.append(';');

        String queryString = sb.toString();

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

