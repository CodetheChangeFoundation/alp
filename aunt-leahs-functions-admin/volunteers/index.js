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
            context.done(err);
        }
        else {
            if (req.method == 'GET') {
                getVolunteers();
            }
            else if (req.method == 'PUT') { // soft delete
                putVolunteers();
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

	function putVolunteers() {
		var queryString = `UPDATE Volunteer SET isDeleted = 1 \
                           WHERE volunteer.isDeleted = 0;`;

		request = new Request(queryString, function (err) {
			if (err) {
				context.log(err);

				context.res = {
					body:
						'Error occurred deleting volunteers from the database: \n' + err,
				};

				context.done();
			}
		});

		request.on('doneProc', function (rowCount, more, rows) {
			context.res = {
				body: { message: 'Successfully deleted volunteers from the database' },
			};

			context.done();
		});

		connection.execSql(request);
	}
};
