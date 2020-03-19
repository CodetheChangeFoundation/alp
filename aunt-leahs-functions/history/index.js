var Connection = require('tedious').Connection;
var Request = require('tedious').Request;
var config = require('../config');
var TYPES = require('tedious').TYPES;

module.exports = function (context, req) {

    var connection = new Connection(config);

    connection.on('connect', (error) => {
        if (error) {
            context.log('Error: ', error);
            context.done();
        }
        else {
            if (req.method == 'GET') {
                getAdminHistory(req.query.tableName);
            }
            else if (req.method == 'PUT') {
                updateAdminHistory(req.body);
            }
            else {
                context.done();
            }
        }
    });

    function getAdminHistory(tableName) {
        queryString = 'SELECT lastClearedTime, lastExportedTime FROM AdminHistory WHERE name = @tableName';

        request = new Request(queryString,
            function (err) {
                if (err) {
                    context.log(err);
                    context.done();
                }
            });

        request.addParameter('tableName', TYPES.VarChar, tableName);

        var adminHistory = {};
        request.on('row', function (columns) {
            columns.forEach(function (column) {
                adminHistory[column.metadata.colName] = column.value;
            });
        });

        request.on('doneProc', function (rowCount, more, returnStatus, rows) {
            context.res = {
                body: JSON.stringify(adminHistory)
            };

            context.done();
        });

        connection.execSql(request);
    }


    function updateAdminHistory(reqBody) {
        isExportAction = Boolean(reqBody.isExportAction);

        var queryString;

        if (isExportAction) {
            queryString = 'UPDATE AdminHistory SET lastExportedTime = @editTime WHERE name = @tableName';
        }
        else {
            queryString = 'UPDATE AdminHistory SET lastClearedTime = @editTime WHERE name = @tableName'
        }

        request = new Request(
            queryString,
            function (err) {
                if (err) {
                    context.log(err);
                    context.done();
                }
            });

        request.addParameter('editTime', TYPES.DateTime, reqBody.editTime);
        request.addParameter('tableName', TYPES.VarChar, reqBody.tableName);

        request.on('doneProc', function (rowCount, more, returnStatus, rows) {
            context.res = {
                body: { message: 'Successfully update AdminHistory' }
            };

            context.done();
        })

        connection.execSql(request);
    }
};

