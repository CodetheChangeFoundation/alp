import React from 'react';
import { Table, TableBody, TableCell, Paper, TableHead, TableRow } from '@material-ui/core';

// REQUIRES: data prop has to be array of objects where each object key represents the name of the field in camelcase.
//					 Refer to data in constants.jsx
//					 each field in data should be either string or boolean. boolean fields are displayed '✓' or '✗'

const formatHeaderTitle = (title) => {
	return title.replace(/([A-Z])/g, ' $1').replace(/^./, (str) => str.toUpperCase());
};

const CustomTable = (props) => {
	const { data } = props;
	const columnTitles = data.length > 0 ? Object.keys(data[0]) : [];
	return (
		<div className="table-component">
			<Paper className="table-style">
				<Table aria-label="simple table" className="table">
					<TableHead className="table-head">
						<TableRow key="head">
							{columnTitles.map(columnTitle => {
								if (columnTitle !== 'id') {
									return (
										<TableCell className="header-cell" align="left" key={columnTitle}>
											<b>{formatHeaderTitle(columnTitle)}</b>
										</TableCell>
									);
								}
							})}
						</TableRow>
					</TableHead>
					<TableBody>
						{data.map(row => (
							<TableRow key={row.id}>
								{Object.keys(row).map(key => {
									if (key !== 'id') {
										const value = row[key];
										return (
											<TableCell className="tableCell" align="left" key={"" + row.id + value}>
												{typeof value == 'boolean' ? value ? 'Yes' : 'No' : value}
											</TableCell>
										);
									}
								})}
							</TableRow>
						))}
					</TableBody>
				</Table>
			</Paper>
		</div>
	);
};

export default CustomTable;
