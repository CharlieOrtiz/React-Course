class Content extends React.Component {
  constructor(props) {
    super(props);
    this.launchClock();
    this.state = {
      counter: 0,
      currentTime: 0
    };
  }
  launchClock() {
    setInterval(() => {
      this.setState({
        counter: ++this.state.counter,
        currentTime: ++this.state.currentTime
      });
    }, 5000);
  }
  render() {
    //Here we make the condition that says if the counter property of the state object is greater than 2 then we just render an empty div element if the condition is false we render the <Logger> component with the time attribute equal to the currentTime property of the state
    if (this.state.counter > 2) return React.createElement("div", null);
    //The time property is modify every time that the currentTime changes, so this property state changes every second in the LaunchClock method whose execute the setState to rerender the new element 
    return React.createElement(Logger, { time: this.state.currentTime });
  }
}