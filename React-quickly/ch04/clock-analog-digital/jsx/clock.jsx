//This is a stateful component
class Clock extends React.Component {
  constructor(props) {
    super(props)
    this.launchClock()
    this.state = {
      currentTime: (new Date()).toLocaleString()
    }
  }
  launchClock() {
    setInterval(()=> {
      console.log('Updating...')
      this.setState({currentTime: (new Date()).toLocaleString()})
    }, 1000)
  }
  render() {
    console.log('Rendering...')
    return <div>
      {/* Here we pass the state of Clock as a property to the stateless components */}
      <AnalogDisplay time={this.state.currentTime}/>
      <DigitalDisplay time={this.state.currentTime}/>
    </div>
  }
} 