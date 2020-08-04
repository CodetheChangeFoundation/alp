var Connection = require('tedious').Connection;
var Request = require('tedious').Request;
var config = require('../config');
var TYPES = require('tedious').TYPES;

module.exports = function (context, req) {
	var connection = new Connection(config);
	connection.on('connect', (err) => {
		if (err) {
			context.log('Error: ', err);
			context.done(err);
		} else {
			if (req.method === 'GET') {
				getLocations();
			}
		}
	});

	function getLocations() {
		request = new Request('SELECT [name],[id],[isDeleted] FROM [dbo].[Location] WHERE isDeleted = 0;', function (err) {
			if (err) {
				context.log(err);
				context.done(err);
			}
		});

		let locations = [];
		request.on('row', function (columns) {
			let location = {};
			columns.forEach(function (column) {
				location[column.metadata.colName] = column.value;
			});
			locations.push(location);
		});

		request.on('doneProc', (rowCount, more, returnStatus, rows) => {
			context.res = {
				body: JSON.stringify(locations)
			};
			context.done();
		});
		connection.execSql(request);
	}
};
