import React from 'react';
import './App.css';
import TableComponent from './components/table/TableComponent';

function App() {
	const data = [
		{
			firstName: 'Vieniel',
			lastName: 'Kumar',
			email: 'example@gmail.com',
			address: '6000 Student Union Blvd',
			city: 'Vancouver',
			province: 'BC',
			postalCode: 'V6T 1Z1',
			mailingList: '✓'
		},
		{
			firstName: 'Vieniel',
			lastName: 'Kumar',
			email: 'example@gmail.com',
			address: '6000 Student Union Blvd',
			city: 'Vancouver',
			province: 'BC',
			postalCode: 'V6T 1Z1',
			mailingList: '✓'
		},
		{
			firstName: 'Vieniel',
			lastName: 'Kumar',
			email: 'example@gmail.com',
			address: '6000 Student Union Blvd',
			city: 'Vancouver',
			province: 'BC',
			postalCode: 'V6T 1Z1',
			mailingList: '✓'
		},
		{
			firstName: 'Vieniel',
			lastName: 'Kumar',
			email: 'example@gmail.com',
			address: '6000 Student Union Blvd',
			city: 'Vancouver',
			province: 'BC',
			postalCode: 'V6T 1Z1',
			mailingList: '✓'
		},
		{
			firstName: 'Vieniel',
			lastName: 'Kumar',
			email: 'example@gmail.com',
			address: '6000 Student Union Blvd',
			city: 'Vancouver',
			province: 'BC',
			postalCode: 'V6T 1Z1',
			mailingList: '✓'
		}
	];
	return (
		<div className="App">
			<TableComponent data={data} />
		</div>
	);
}

export default App;
