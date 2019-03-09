//This is a state component, they return an element without any render method
//They don't use states and methods inside
const DigitalDisplay = function(props) {
  //In few words we just display the state from the parent but as a property
  return <div>{props.time}</div>
}