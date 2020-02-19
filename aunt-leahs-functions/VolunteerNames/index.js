var Connection = require('tedious').Connection;
var Request = require('tedious').Request;
var config = require('../config');

module.exports = function (context, req) {
    var volunteerNames = [];

    var connection = new Connection(config);

    connection.on('connect', (error) => {
        if (error) {
            context.log('Error: ', error);
            context.done();
        }
        else {
            context.log('Connected');
            getVolunteerNames();
        }
    });

    function getVolunteerNames() {
        request = new Request(
            'SELECT [id], [firstName], [lastName] FROM [dbo].[Volunteer];',
            function(err) {
                if (err) {
                    context.log(err);
                    context.done();
                }
            });
        
        request.on('row', function (columns) {
            var volunteerName = {};
            columns.forEach(function(column) {
                volunteerName[column.metadata.colName] = column.value;
            });
            volunteerNames.push(volunteerName);

            context.log(volunteerNames);

            context.res = {
                body: JSON.stringify(volunteerNames)
            };

            context.done();
        });

        connection.execSql(request);
    }
};

