class Clock extends React.Component {
  constructor(props) {
    super(props);
    this.launchClock(); //The launch method is colled when the instanciation occurs, here we didn't need to bound to the class due to the arrow function used inside this method

    //Initialize state: This should be an object and can have other objects or arrays as properties
    this.state = { currentTime: new Date().toLocaleString() };
  }
  launchClock() {
    //We can see the arrow function iside the setInterval, this arrow function allows us to acces to the lexcal value in the call of the function, in this case the call is in the constructor and the lexical value is the class (Clock)
    setInterval(() => {
      console.log('Updating time...');
      this.setState({
        currentTime: new Date().toLocaleString()
      }); //Every time we call the setState function, this just updates the specific states inside it, it means the specific properties, as in this example the currentTime property.
    }, 1000);
  }
  render() {
    console.log('Rendering Clock...');
    return React.createElement(
      'div',
      null,
      this.state.currentTime
    );
  }
}