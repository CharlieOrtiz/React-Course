//This is a stateless component, they return an element without any render method.
//They can be defined as functions or classes but most of the times are defined as functions, in this way you avoid to add any state in the future
//They don't use states and methods inside
function AnalogDisplay(props) {
  //We convert the property as a Date Object, due to this one it taken as a string
  let date = new Date(props.time); //We acces to the property, provided as a parameter in the function, as props.time

  //Start CSS properties, as we know, these are defined as Objects in React and written as camelCase
  //General Styles
  let dialStyle = {
    position: 'relative',
    top: 0,
    left: 0,
    width: 200,
    height: 200,
    borderRadius: 20000,
    borderStyle: 'solid',
    borderColor: 'black'
    //Second hand style
  };let secondHandStyle = {
    position: 'relative',
    top: 100,
    left: 100,
    border: '1px solid red',
    width: '40%',
    height: 1,
    transform: 'rotate(' + (date.getSeconds() / 60 * 360 - 90).toString() + 'deg)', //Due to date variable is a Date Object we can have acces to getSeconds method and any other similar method, after getting the seconds we convert them into a string value to just concatenate the value with the property value in CSS, ending up being a degree value
    transformOrigin: '0% 0%', //Colocates the central point to the center of the element
    backgroundColor: 'red'
  };
  let minuteHandStyle = {
    position: 'relative',
    top: 100,
    left: 100,
    border: '1px solid grey',
    width: '40%',
    height: 3,
    transform: 'rotate(' + (date.getMinutes() / 60 * 360 - 90).toString() + 'deg)',
    transformOrigin: '0% 0%',
    backgroundColor: 'grey'
  };
  let hourHandStyle = {
    position: 'relative',
    top: 92,
    left: 106,
    border: '1px solid grey',
    width: '20%',
    height: 7,
    transform: 'rotate(' + (date.getHours() / 12 * 360 - 90).toString() + 'deg)',
    transformOrigin: '0% 0%',
    backgroundColor: 'grey'
  };
  return React.createElement(
    'div',
    null,
    React.createElement(
      'div',
      { style: dialStyle },
      React.createElement('div', { style: secondHandStyle }),
      React.createElement('div', { style: minuteHandStyle }),
      React.createElement('div', { style: hourHandStyle })
    )
  );
}