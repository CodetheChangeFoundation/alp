var Connection = require('tedious').Connection;
var Request = require('tedious').Request;
var config = require('../config');
var TYPES = require('tedious').TYPES;

module.exports = function(context, req) {
	var connection = new Connection(config);
	connection.on('connect', (error) => {
		if (error) {
			context.log('Error: ', error);
			context.done();
		} else {
			if (req.method === 'GET') {
				getLocations();
			} else if (req.method === 'POST') {
				insertLocation(req.body.locations);
				context.done();
			} else if (req.method === 'PUT') {
			}
		}
	});

	function insertLocation(locations) {
		var options = { keepNulls: true };
		// instantiate - provide the table where you'll be inserting to, options and a callback
		var bulkLoad = connection.newBulkLoad('Location', options, function(error, rowCount) {
			console.log('inserted %d rows', rowCount);
		});
		// setup your columns - always indicate whether the column is nullable
		bulkLoad.addColumn('name', TYPES.NVarChar, { length: 50, nullable: false });
		bulkLoad.addColumn('address', TYPES.NVarChar, { length: 50, nullable: true });
		// add rows
		locations.map((loc) => {
			bulkLoad.addRow({ name: loc.name, address: loc.address });
		});
		// execute
		connection.execBulkLoad(bulkLoad);
	}

	function getLocations() {
		request = new Request('SELECT [name], [address] FROM [dbo].[Location];', function(err) {
			if (err) {
				context.log(err);
				context.done();
			}
		});

		let locations = [];
		request.on('row', function(columns) {
			let location = {};
			columns.forEach(function(column) {
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
