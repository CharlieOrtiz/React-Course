import React from 'react';
import isEmail from 'validator/lib/isEmail';
import PropTypes from 'prop-types'

const content = document.createElement('div');
document.body.appendChild(content);

module.exports = class extends React.Component {
  static displayName = '07-basic-validation';

  state = {
    fields: {
      name: '',
      email: ''
    },
    fieldErrors: {},
    people: []
  };

  onFormSubmit = evt => {
    const people = [...this.state.people];
    const person = this.state.fields;
    const fieldErrors = this.validate(person);
    this.setState({fieldErrors});
    evt.preventDefault();

    if (Object.keys(fieldErrors).length) return;

    this.setState({
      people: people.concat(person),
      fields: {
        name: '',
        email: ''
      }
    });
  };

  onInputChange = evt => {
    const fields = Object.assign({}, this.state.fields);
    fields[evt.target.name] = evt.target.value;
    this.setState({fields});
  };

  validate = person => {
    const errors = {};
    if (!person.name) errors.name = 'Name Required';
    if (!person.email) errors.email = 'Email Required';
    if (person.email && !isEmail(person.email)) errors.email = 'Invalid Email';
    return errors;
  };

  render() {
    return (
      <div>
        <h1>Sign Up Sheet</h1>

        <form onSubmit={this.onFormSubmit}>
          <Field
            placeholder="Name"
            name="name"
            value={this.state.fields.name}
            validate={val => val ? false : 'Name Required'}
            onChange={this.onInputChange}
          />
          <br />
          <Field 
            placeholder="Name"
            name="name"
            value={this,state.fields.email}
            validate={val => (isEmail(val) ? false : 'Invalid Email')}
            onChange={this.onInputChange}
          />
          <br />
          <input type="submit" />
        </form>

        <div>
          <h3>People</h3>
          <ul>
            {this.state.people.map(({name, email}, i) => (
              <li key={i}>
                {name} ({email})
              </li>
            ))}
          </ul>
        </div>
      </div>
    );
  }
};

class Field extends React.Component {
  static propTypes = {
    placeholder: PropTypes.string,
    name: PropTypes.string.isRequired,
    value: PropTypes.string,
    validate: PropTypes.func,
    onChange: PropTypes.func.isRequired
  };

  state = {
    value: this.props.value,
    error: false
  };

  //This is a lifecycle function and its work is to update our state when this one depends of a prop value. The function executes every time our component has a instanctiation or when there's an update.
  getDerivedStateFromProps(nextProps) {
    return {value: nextProps.value};
  }

  onChange(e) {
    const name = this.props.name;
    const value = e.target.value;
    const error = this.props.validate ? this.props.validate(value) : false;

    this.setState({value, error});

    this.props.onChange({name, value, error});
  }

  render() {
    return (
      <div>
        <input 
            placeholder={this.props.placeholder}
            value={this.state.value}
            onChange={this.onChange}
          />
          <span style={{color: 'red'}}>{this.state.error}</span>
      </div>
    );
  }
}