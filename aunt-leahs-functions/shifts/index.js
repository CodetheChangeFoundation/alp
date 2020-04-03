var Connection = require('tedious').Connection;
var Request = require('tedious').Request;
var config = require('../config');
var TYPES = require('tedious').TYPES;

module.exports = function (context, req) {
	var shifts = [];

	var connection = new Connection(config);

	connection.on('connect', (err) => {
		if (err) {
			context.log('Error: ', err);
			context.done();
		} else {
			if (req.method === 'GET') {
				getShifts();
			} else if (req.method == 'PUT') {
				deleteShifts();
			} else if (req.method == 'POST') {
				postShifts(req.body.shiftData);
			}
		}
	});

	function getShifts() {
		var queryString =
			'SELECT shift.id, volunteer.firstName, volunteer.lastName, shift.startTime, shift.duration \
                            FROM Shift shift \
                            JOIN Volunteer volunteer ON shift.volunteerId = volunteer.id \
                            JOIN Location location ON shift.locationId = location.id \
                            WHERE shift.isDeleted = 0;';

		request = new Request(queryString, function (err) {
			if (err) {
				context.log(err);
				context.done();
			}
		});

		request.on('row', function (columns) {
			var shift = {};
			columns.forEach(function (column) {
				shift[column.metadata.colName] = column.value;
			});
			shifts.push(shift);
		});

		request.on('doneProc', function (rowCount, more, returnStatus, rows) {
			context.res = {
				body: shifts,
			};

			context.done();
		});

		connection.execSql(request);
	}

	function deleteShifts() {
		var queryString = 'UPDATE Shift SET isDeleted = 1;';

		request = new Request(queryString, function (err) {
			if (err) {
				context.log(err);

				context.res = {
					body: 'Error occurred deleting shifts from the database:\n' + err,
				};

				context.done();
			}
		});

		request.on('doneProc', function (rowCount, more, rows) {
			context.res = {
				body: { message: 'Successfully deleted shifts from the database' },
			};
			context.done();
		});
		connection.execSql(request);
	}

	function postShifts(shiftData) {
		context.log('in post');
		var queryString =
			'INSERT INTO Shift (locationId, volunteerId, startTime, duration, isDeleted) \
                            VALUES (@locationId, @volunteerId, @startTime, @duration, @isDeleted)';
		request = new Request(queryString, function (err) {
			if (err) {
				context.log(err);

				context.res = {
					body: 'Error occurred inserting shift into the database:\n' + err,
				};

				context.done();
			}
		});

		request.addParameter('locationId', TYPES.Int, shiftData.locationId);
		request.addParameter('volunteerId', TYPES.Int, shiftData.volunteerId);
		request.addParameter(
			'startTime',
			TYPES.DateTime,
			new Date(shiftData.startTime)
		);
		request.addParameter('duration', TYPES.Decimal, shiftData.duration);
		request.addParameter('isDeleted', TYPES.Bit, 0);

		request.on('doneProc', function (rowCount, more, rows) {
			context.res = {
				body: { message: 'Successfully inserted 1 row into the database' },
			};
			context.done();
		});

		connection.execSql(request);
	}
};
