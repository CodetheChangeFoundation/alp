import React from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';

class LocationSelection extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            locations: [
                {
                    name: "Tree Lot",
                    id: 1,
                    address: "1234 East Mall"
                },
                {
                    name: "Thrift Store",
                    id: 2,
                    address: "1234 Robson St"
                },
                {
                    name: "Fundraising Event",
                    id: 3,
                    address: "1234 Wesbrook Mall"
                }]
        };

        this.selectLocation = this.selectLocation.bind(this);

    }

    selectLocation(id){
        var updatedLocations = this.state.locations.slice(0);
        updatedLocations.forEach(l => {
            if(l.id === id) {
                l.selected = true;
                this.props.onLocationSelect(l);
            } 
            else {
                l.selected = false;
            }
        });

        this.setState({locations: updatedLocations});
    }

    render() {
        return <Table aria-label="simple table">
            <TableBody>
            {this.state.locations.map(location => (
                <TableRow key={location.id} 
                    onClick={(e) => this.selectLocation(location.id)}
                    hover={true}
                    selected={location.selected}>
                    <TableCell align="center">
                        {location.name}
                    </TableCell>
                </TableRow>
            ))}
            </TableBody>
        </Table>
    }

}

export default LocationSelection;
