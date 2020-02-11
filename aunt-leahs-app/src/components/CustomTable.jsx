import React from 'react';
import '../styles.css';
import { Table, TableBody, TableCell, Paper, TableHead, TableRow } from '@material-ui/core';

// REQUIRES: data prop has to be array of objects where each object key represents the name of the field in camelcase.
//					 Refer to data in constants.jsx
//					 each field in data should be either string or boolean. boolean fields are displayed '✓' or '✗'

const formatHeaderTitle = (title) => {
	return title.replace(/([A-Z])/g, ' $1').replace(/^./, (str) => str.toUpperCase());
};

const CustomTable = (props) => {
	const { data } = props;
	let columnTitles = Object.keys(data[0]);
	return (
		<div className="table-component">
			<Paper className="table-style">
				<Table aria-label="simple table" className="table">
					<TableHead className="table-head">
						<TableRow key="head">
							{columnTitles.map((columnTitle) => (
								<TableCell className="header-cell" align="left">
									<b>{formatHeaderTitle(columnTitle)}</b>
								</TableCell>
							))}
						</TableRow>
					</TableHead>
					<TableBody>
						{data.map((row) => (
							<TableRow key={row.firstName}>
								{Object.keys(row).map((key) => (
									<TableCell className="tableCell" align="left">
										{typeof row[key] == 'boolean' ? row[key] ? '✓' : '✗' : row[key]}
									</TableCell>
								))}
							</TableRow>
						))}
					</TableBody>
				</Table>
			</Paper>
		</div>
	);
};

export default CustomTable;
