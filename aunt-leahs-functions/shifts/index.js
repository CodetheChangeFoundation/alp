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
			context.done(err);
		} else {
			if (req.method == 'POST') {
				postShifts(req.body.shiftData);
			}
		}
	});

	function postShifts(shiftData) {
		var queryString =
			'INSERT INTO Shift (locationId, volunteerId, startTime, duration, isDeleted) \
                            VALUES (@locationId, @volunteerId, @startTime, @duration, @isDeleted)';
		request = new Request(queryString, function (err) {
			if (err) {
				context.log(err);

				context.res = {
					body: 'Error occurred inserting shift into the database ' + err,
				};

				context.done(err);
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
