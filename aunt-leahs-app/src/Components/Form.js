import React from 'react';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import constants from './FormConstants';

class Form extends React.Component {
  constructor(props) {
    super(props);

    this.state = constants; // Imported dummy data from test file, includes example form elements

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);

  }

  handleChange(event) {
    this.setState({ value: event.target.value });
  }

  handleSubmit(event) {
    event.preventDefault();
  }

  render() {
    const form = this.state.form

    return (
      <div>
        { form.map((component, index) => {
          switch (component.type) {
            case "header":
              return (
                <h3
                  key={index}
                  name={component.name}>
                  {component.title.toString()}
                </h3>
              )

            case "textfield":
              return (
                <TextField
                  value={this.state.component}
                  name={component.name}
                  onChange={this.handleChange}
                  variant="outlined"
                  key={index}
                  label={component.title}
                ></TextField>
              );

            case "select":
              return (
                <Select
                  value={this.state.component}
                  onChange={this.handleChange}
                  variant="outlined"
                  key={index}
                  label={component.title}>
                  {this.state.volunteers.map((volunteer,index) => {
                    return (<MenuItem key={volunteer.id} 
                                      value={volunteer}>
                                      {volunteer.name}
                            </MenuItem>)
                  })}
                </Select>
              );

            default:
              return "Nothing rendered";
            } 
          })}
        </div>
    );
  }
}

export default Form