import React from 'react';
import ListItem from '@material-ui/core/List';
import { TextField } from '@material-ui/core';
import Fab from '@material-ui/core/Fab';
import ClearIcon from '@material-ui/icons/Clear';

export class LocationListItem extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            location: props.location,
            isEdit: false
        };


        this.inputRef = React.createRef();
        this.delete = this.delete.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.enableEdit = this.enableEdit.bind(this);
    }

    render() {
        return <ListItem class='Custom-list-item'>
            <TextField
                defaultValue={this.state.location.name}
                inputRef={this.inputRef}
                placeholder='Untitled Location'
                margin='normal'
                variant='outlined'
                onChange={this.handleChange}
            />

            <Fab
                style={{ marginLeft: '1em' }}
                edge='end'
                color='secondary'
                size='small'
                aria-label='delete'
                onClick={this.delete}>
                <ClearIcon />
            </Fab>
        </ListItem>
    }

    enableEdit() {
        this.setState({ isEdit: true });
        this.inputRef.current.focus();
    }

    handleChange() {
        this.props.onEdit(this.state.location.id, this.inputRef.current.value);
    }

    delete() {
        this.props.onDelete(this.state.location.id);
    }
}
