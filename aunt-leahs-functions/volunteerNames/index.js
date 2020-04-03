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
		} else {
			getVolunteerNames();
		}
	});

	function getVolunteerNames() {
		var queryString = `SELECT volunteer.id, volunteer.firstName, volunteer.lastName \
                            FROM Volunteer volunteer \
                            WHERE volunteer.isDeleted = 0;`;

		request = new Request(queryString, function (err) {
			if (err) {
				context.log(err);
				context.done();
			}
		});

		request.on('row', function (columns) {
			var volunteerName = {};
			columns.forEach(function (column) {
				volunteerName[column.metadata.colName] = column.value;
			});
			volunteerNames.push(volunteerName);
		});

		request.on('doneProc', function (rowCount, more, returnStatus, rows) {
			context.res = {
				body: volunteerNames,
			};

			context.done();
		});

		connection.execSql(request);
	}
};
