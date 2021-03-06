var Connection = require('tedious').Connection;
var Request = require('tedious').Request;
var config = require('../config');
var TYPES = require('tedious').TYPES;

module.exports = function(context, req) {
	var connection = new Connection(config);
	connection.on('connect', (err) => {
		if (err) {
			context.log('Error: ', err);
			context.done(err);
		} else {
			if (req.method === 'GET') {
				getLocations();
			} else if (req.method === 'POST') {
				insertLocation(req.body.locations);
				context.done();
			} else if (req.method === 'PUT') {
				updateLocation(req.body.updatedLocation);
				context.done();
			}
		}
	});

	function updateLocation(newLocation) {
		// Update the employee record requested
		const { id, name, isDeleted } = newLocation;
		request = new Request(`UPDATE dbo.Location SET name=@name, isDeleted=@isDeleted WHERE id = @id;`, function(
			err,
			rowCount,
			rows
		) {
			if (err) {
				console.error(err);
				context.done(err);
			} else {
				console.log(rowCount + ' row(s) updated');
			}
		});
		request.addParameter('name', TYPES.NVarChar, name);
		request.addParameter('id', TYPES.Int, id);
		request.addParameter('isDeleted', TYPES.Bit, isDeleted);
		// Execute SQL statement
		connection.execSql(request);
	}

	function insertLocation(locations) {
		var options = { keepNulls: true };
		// instantiate - provide the table where you'll be inserting to, options and a callback
		var bulkLoad = connection.newBulkLoad('Location', options, function(error, rowCount) {
			console.log('inserted %d rows', rowCount);
		});
		// setup your columns - always indicate whether the column is nullable
		bulkLoad.addColumn('name', TYPES.NVarChar, { length: 50, nullable: false });
		bulkLoad.addColumn('isDeleted', TYPES.Bit, { nullable: false });

		// add rows
		locations.map((loc) => {
			bulkLoad.addRow({ name: loc.name, isDeleted: 0 });
		});
		// execute
		connection.execBulkLoad(bulkLoad);
	}

	function getLocations() {
		request = new Request('SELECT [name],[id],[isDeleted] FROM [dbo].[Location] WHERE isDeleted = 0;', function(err) {
			if (err) {
				context.log(err);
				context.done(err);
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
