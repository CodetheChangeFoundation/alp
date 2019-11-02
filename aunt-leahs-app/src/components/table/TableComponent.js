import React from 'react';
import '../../styles.css';
import { Table, TableBody, TableCell, Paper, TableHead, TableRow } from '@material-ui/core';

// REQUIRES: data prop has to be array of objects where each object key repreents the name of the field in camelcase.
// Example:
// const data = [
// 	{
// 		firstName: 'Vieniel',
// 		lastName: 'Kumar',
// 		email: 'example@gmail.com',
// 		address: '6000 Student Union Blvd',
// 		city: 'Vancouver',
// 		province: 'BC',
// 		postalCode: 'V6T 1Z1',
// 		mailingList: '✓'
// 	},
// 	{
// 		firstName: 'Vieniel',
// 		lastName: 'Kumar',
// 		email: 'example@gmail.com',
// 		address: '6000 Student Union Blvd',
// 		city: 'Vancouver',
// 		province: 'BC',
// 		postalCode: 'V6T 1Z1',
// 		mailingList: '✓'
// 	}
// ]
function header(title) {
	return title.replace(/([A-Z])/g, ' $1').replace(/^./, function(str) {
		return str.toUpperCase();
	});
}

const TableComponent = (props) => {
	const { data } = props;
	let categories = Object.keys(data[0]);
	return (
		<div className="TableComponent">
			<Paper className="TableStyle">
				<Table aria-label="simple table" className="Table">
					<TableHead className="TableHead">
						<TableRow key="head">
							{categories.map((category) => (
								<TableCell className="headerCell" align="right">
									<b>{header(category)}</b>
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
