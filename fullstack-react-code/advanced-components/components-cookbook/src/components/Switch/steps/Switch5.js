import React, { PropTypes } from 'react';
import styles from '../Switch.css'; //With webpack we can import CSS files

const CREDITCARD = 'Creditcard';
const BTC = 'Bitcoin';

class Switch extends React.Component {
  state = {
    payMethod: BTC,
  };

  select = (choice) => {
    return (evt) => {
      this.setState({
        payMethod: choice,
      });
    };
  };

  renderChoice = (choice) => {
    // create a set of cssClasses to apply
    const cssClasses = [];

    if (this.state.payMethod === choice) {
      cssClasses.push(styles.active); // add .active class //Due to we have imported our Switch file we can access to its styles as if they were objects, e.g. styles.active give us reference to the active class in the Switch file
    }
    console.log(cssClasses);
    return (
      <div
        className='choice'
        onClick={this.select(choice)}
        className={cssClasses} //Here we apply the class name that make reference to the .active style in the Switch file, although it's not the active class name.
      >
        {choice}
      </div>
    );
  };

  render() {
    return (
      <div className='switch'>
        {this.renderChoice(CREDITCARD)}
        {this.renderChoice(BTC)}
        Pay with: {this.state.payMethod}
      </div>
    );
  }
}

module.exports = Switch;
