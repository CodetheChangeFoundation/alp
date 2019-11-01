import React, { Component } from 'react';
import '../../styles.css';
import { makeStyles } from '@material-ui/core/styles';
import { Table, TableBody, TableCell, Paper, TableHead, TableRow, Box } from '@material-ui/core';

const TableComponent = (props) => {
	// const classes = useStyles();
	const { data } = props;
	let categories = Object.keys(data[0]);
	return (
		<div>
			<Paper className="root">
				<Table aria-label="simple table">
					<TableHead>
						<TableRow key="head">
							{categories.map((category) => (
								<TableCell className="tableCell" align="right">
									{category}
								</TableCell>
							))}
						</TableRow>
					</TableHead>
					<TableBody>
						{data.map((row) => (
							<TableRow key={row['firstName']}>
								{Object.keys(row).map((key) => (
									<TableCell className="tableCell" align="right">
										{row[key]}
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

export default TableComponent;
