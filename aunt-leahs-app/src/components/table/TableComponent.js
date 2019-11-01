import React from 'react';
import '../../styles.css';
import { Table, TableBody, TableCell, Paper, TableHead, TableRow } from '@material-ui/core';

function header(title) {
	return title.replace(/([A-Z])/g, ' $1').replace(/^./, function(str) {
		return str.toUpperCase();
	});
}

const TableComponent = (props) => {
	// const classes = useStyles();
	const { data } = props;
	let categories = Object.keys(data[0]);
	return (
		<div>
			<Paper className="TableStyle">
				<Table aria-label="simple table" className="Table">
					<TableHead>
						<TableRow key="head">
							{categories.map((category) => (
								<TableCell className="headerCell" align="right">
									{header(category)}
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
