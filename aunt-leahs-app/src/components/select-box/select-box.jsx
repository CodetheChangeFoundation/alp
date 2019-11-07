import React from 'react';
import { InputLabel, MenuItem, FormControl,Select } from '@material-ui/core';

class SelectBox extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            items: this.props.items || [],
            selectedItem: this.props.items && this.props.items[0],
        }
    }

    render() {
        return <div>
            <FormControl fullWidth={true}>
                <InputLabel id="volunteer-select-label">{this.props.name || "Select"}</InputLabel>
                <Select
                    labelId="volunteer-select-label"
                    id="my-select"
                    value={this.selectedItem}
                    onChange={this.selectItem}
                >
                    <MenuItem value="">
                        <em>None</em>
                    </MenuItem>
                    {this.state.items.map(item =>
                        <MenuItem value={item.id} onClick={() => this.selectItem(item)}>{item.value}</MenuItem>
                    )}
                </Select>
            </FormControl>
        </div>
    }
}

export default SelectBox
