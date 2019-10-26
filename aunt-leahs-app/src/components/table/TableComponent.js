import React, { Component } from 'react';
import '../../styles/TableComponent.css';
import { Table, TableBody, TableCell, Paper, TableHead, TableRow } from '@material-ui/core';

export default class TableComponent extends Component {
	constructor(props) {
		super(props);
		this.state = {};
		console.log(this.props);
	}

	render() {
		const { data } = this.props;
		console.log(data);
		// head is list of categories.
		let categories = Object.keys(data[0]);
		console.log(categories);
		return (
			<div>
				<Paper className="root">
					<Table className="table" aria-label="simple table">
						<TableHead>
							<TableRow key="head">
								{categories.map((category) => <TableCell align="right">{category}</TableCell>)}
							</TableRow>
						</TableHead>
						<TableBody>
							{data.map((row) => (
								<TableRow key={row['firstName']}>
									{Object.keys(row).map((key) => <TableCell align="right">{row[key]}</TableCell>)}
								</TableRow>
							))}
						</TableBody>
					</Table>
				</Paper>
			</div>
		);
	}
}
