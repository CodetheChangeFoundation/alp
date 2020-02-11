import React from 'react';
import ListItem from '@material-ui/core/List';
import Fab from '@material-ui/core/Fab';
import ClearIcon from '@material-ui/icons/Clear';
import TextInput from '../TextInput';

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
        return <ListItem className='custom-list-item'>
            <TextInput
                value={this.state.location.name}
                size='long'
                placeholder='Untitled Location'
                onChange={this.handleChange}
                inputRef={this.inputRef}
                margin='normal'
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
