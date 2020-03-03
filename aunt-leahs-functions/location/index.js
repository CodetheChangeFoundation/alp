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
				// save
				console.log(req.body.locations);
				insertLocation(req.body.locations);
				context.res = {
					status: 200,
					header: 'SUCCESS',
					body: 'Inserted some rows'
				};
				// context.res = {
				// 	headers: {
				// 			'Content-Type': 'application/json'
				// 	},
				// 	status: 400,
				// 	body: {
				// 			err
				// 	},
				// 	isRaw: true,
				// 	};
				context.done();
			}
		}
	});

	function insertLocation(locations) {
		Insert(locations[0].name, locations[0].address);
	}
	// OUTPUT INSERTED.Id
	function Insert(name, address) {
		console.log("Inserting '" + name + "' into Table...");
		request = new Request('INSERT INTO dbo.Location ([name], [address])  VALUES (@name, @address);', function(
			err,
			rowCount,
			rows
		) {
			if (err) {
			} else {
				console.log(rowCount + ' row(s) inserted');
			}
		});
		request.addParameter('name', TYPES.NVarChar, name);
		request.addParameter('address', TYPES.NVarChar, address);
		// Execute SQL statement
		connection.execSql(request);
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
