var Connection = require('tedious').Connection;
var Request = require('tedious').Request;
var config = require('../config');

module.exports = async function(context, req) {
	var connection = new Connection(config);

	connection.on('connect', (error) => {
		if (error) {
			context.log('Error: ', error);
			context.done();
		} else {
			context.log('Connected');
			getVolunteerNames();
		}
	});

	let locations = [];

	function getLocations() {
		request = new Request('SELECT [name], [address] FROM [dbo].[Location];', function(err) {
			if (err) {
				context.log(err);
				context.done();
			}
		});

		request.on('row', function(columns) {
			let location = {};
			columns.forEach(function(column) {
				location[column.metadata.colName] = column.value;
			});
			locations.push(location);

			context.log(locations);

			context.res = {
				body: JSON.stringify(locations)
			};

			context.done();
		});

		connection.execSql(request);
	}
};
