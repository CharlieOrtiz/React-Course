import React from 'react';

const content = document.createElement('div');
document.body.appendChild(content);

module.exports = class extends React.Component {
  static displayName = "03-basic-input";

  state = {
    fields: {
      name: '',
      email: ''
    },
    people: []
  };

  onChangeType = (e) => {
    const fields = Object.assign({}, this.state.fields);
    fields[e.target.name] = e.target.value;
    this.setState({fields});
  }

  onFormSubmit = (evt) => {
    evt.preventDefault();
    const people = this.state.people.concat(this.state.fields);
    console.log(this.state.people)
    this.setState({fields:{name:'', email:''}, people: people});
  };

  render() {
    return (
      <div>
        <h1>Sign Up Sheet</h1>

        <form onSubmit={this.onFormSubmit}>
          <input
            placeholder='Name'
            value={this.state.fields.name}
            name='name'
            onChange={this.onChangeType}
          />
          <input
            placeholder='Email'
            value={this.state.fields.email}
            name='email'
            onChange={this.onChangeType}
          />

          <input type='submit' />
        </form>
        <div>
          <h3>Names</h3>
          <ul>
          {this.state.people.map((field, i) => <li key={i}>{field.name} ({field.email})</li>)}
          </ul>
        </div>
      </div>
    );
  }
};
