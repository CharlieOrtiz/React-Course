class Clock extends React.Component {
  constructor(props) {
    super(props);
    //this.launchClock()
    //Initialize state: This should be an object and can have other objects or arrays as properties
    this.state = { currentTime: new Date().toLocaleString() };
  }
  /*launchClock() {
    setInterval(()=> {
      console.log('Updating time...')
      this.setState({
        currentTime: (new Date()).toLocaleString()
      })
    }, 1000)
  }*/
  render() {
    console.log('Rendering Clock...');
    return React.createElement(
      'div',
      null,
      this.state.currentTime
    );
  }
}