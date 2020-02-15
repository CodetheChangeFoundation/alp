import React from 'react';
import { InputLabel, MenuItem, FormControl, Select } from '@material-ui/core';

class SelectBox extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            items: this.props.items || [],
            selectedItem: ''
        };
        this.handleSelect = this.handleSelect.bind(this);
    }
    handleSelect = (e) => {
        this.props.onSelectItem(e.target.value)
        this.setState({ selectedItem: e.target.value });
    }

    render() {
        return (
            <div>
                <FormControl fullWidth={true}>
                    <InputLabel id='volunteer-select-label'>{this.props.name || 'Select'}</InputLabel>
                    <Select
                        labelId='volunteer-select-label'
                        id='my-select'
                        value={this.state.selectedItem}
                        onChange={this.handleSelect}
                    >
                        <MenuItem value=''>
                            <em>None</em>
                        </MenuItem>
                        {this.state.items.map(item =>
                            <MenuItem key={item.id} value={item.value}>
                                {item.value.firstName + ' ' + item.value.lastName}
                            </MenuItem>
                        )}
                    </Select>
                </FormControl>
            </div>
        )
    }
}

export default SelectBox
