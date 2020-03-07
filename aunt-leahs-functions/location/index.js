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
				updateLocation(req.body.updatedLocation);
				context.done();
			}
		}
	});

	function updateLocation(newLocation) {
		console.log(newLocation);
		const { id, name, isDeleted } = newLocation;
		request = new Request(`UPDATE dbo.Location SET name=@name, isDeleted=@isDeleted WHERE id = @id;`, function(
			err,
			rowCount,
			rows
		) {
			if (err) {
				console.error(err);
			} else {
				console.log(rowCount + ' row(s) updated');
			}
		});
		request.addParameter('name', TYPES.NVarChar, name);
		request.addParameter('id', TYPES.Int, id);
		request.addParameter('isDeleted', TYPES.Bit, isDeleted);
		connection.execSql(request);
	}

	function insertLocation(locations) {
		var options = { keepNulls: true };
		var bulkLoad = connection.newBulkLoad('Location', options, function(error, rowCount) {
			console.log('inserted %d rows', rowCount);
		});
		bulkLoad.addColumn('name', TYPES.NVarChar, { length: 50, nullable: false });
		bulkLoad.addColumn('isDeleted', TYPES.Bit, { nullable: false });
		locations.map((loc) => {
			bulkLoad.addRow({ name: loc.name, isDeleted: 0 });
		});
		connection.execBulkLoad(bulkLoad);
	}

	function getLocations() {
		request = new Request('SELECT [name],[id],[isDeleted] FROM [dbo].[Location] WHERE isDeleted = 0;', function(err) {
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
