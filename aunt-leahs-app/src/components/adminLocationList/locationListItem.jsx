import React from 'react';
import ListItem from '@material-ui/core/List';
import { TextField } from '@material-ui/core';
import Fab from '@material-ui/core/Fab';
import ClearIcon from '@material-ui/icons/Clear';
import '../../App.css';

export class LocationListItem extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            location: props.location,
            isEdit: false
        };


        this.inputRef = React.createRef();
        this.delete = this.delete.bind(this);
        this.save = this.save.bind(this);
        this.enableEdit = this.enableEdit.bind(this);
    }

    render() {
        return <ListItem>
            <TextField
                defaultValue={this.state.location.name}
                inputRef={this.inputRef}
                margin="normal"
                variant="outlined"
                onKeyDown={(e) => { if (e.key === 'Enter') this.save() }}
            />

            <Fab 
                edge="end" 
                color="primary" 
                size="small" 
                aria-label="delete" 
                onClick={this.delete}
                className="centered-floating-action-button">
                <ClearIcon />
            </Fab>
        </ListItem>
    }

    enableEdit() {
        this.setState({ isEdit: true });
        this.inputRef.current.focus();
    }

    save() {
        this.props.onEdit(this.state.location.id, this.inputRef.current.value);
    }

    delete() {
        this.props.onDelete(this.state.location.id);
    }
}
