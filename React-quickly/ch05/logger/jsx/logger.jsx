class Logger extends React.Component {
  constructor(props) {
    super(props)
    console.log('constructor') //Executed at the beggining, in the instance 
  }
  /*  Mount Listener Events  */ 
  //Event executed before mounting the component to the DOM
  componentWillMount() {
    console.log('componentWillMount is triggered')
  }
  //Event executed after the component has been mounted to the DOM, here we have access to the element in the real DOM
  componentDidMount(e) {
    console.log('componentDidMount is triggered')
    console.log('DOM node: ', ReactDOM.findDOMNode(this)) //This function print the component element itself, as it supposed to be in DOM
  }

  /*  Update Listener Events  */ 
  //Every time that a property is modify this function is executed before to add this kind of facts
  componentWillReceiveProps(newProps) {
    console.log('componentWillReceiveProps is triggered')
    console.log('new props: ', newProps)
  }
  //This event is attached according with the update of the component, this means, a modification in its state or properties, and help us to decide if the updated shuld be executed or not
  shouldComponentUpdate(newProps, newState) {
    console.log('shouldComponentUpdate is triggered')
    console.log('new props: ', newProps)
    console.log('new state: ', newState)
    return true //Here we return true to execute or aprove the update
  }
  //If the update is aproved we can execute an event before starting the update
  componentWillUpdate(newProps, newState) {
    console.log('componentWillUpdate is triggered')
    console.log('new props: ', newProps)
    console.log('new state: ', newState)
  }
  //And when the update is done we can execute this event
  componentDidUpdate(oldProps, oldState) {
    console.log('componentDidUpdate is triggered')
    console.log('old props: ', oldProps) //Here we get not the actual new prop or state but the old one, this means the property or state that is being replaced by the new property or state
    console.log('old state: ', oldState)
    //It is important to know that the last four events are executed when the component is updated (modifying the state or properties), but just the componentWillReceiveoProps is executed if a property is modify or added
  }

  /*  Unmount Listener Events  */ 
  //This event is executed before the component is removed, in this program this event is executed when the counter property in the state from the Content component is greater that 2
  componentWillUnmount() {
    console.log('componentWillUnmount')
  }
  render() {
    console.log('rendering... Display')
    return (
      <div>{this.props.time}</div>
    )
  }
}
