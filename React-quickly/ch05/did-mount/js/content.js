class Content extends React.Component {
  constructor(props) {
    super(props);
    console.log('I log, therefore I am');
  }
  componentWillMount() {
    console.log(ReactDOM.findDOMNode(this)); //the function findDOMNode is going to obtained the DOM Node information, this function is is part of the methods of the ReactDOM library
  }
  componentDidMount() {
    console.dir(ReactDOM.findDOMNode(this)); //Here we obtained the DOM Node information or in other words the element that our component return (div).
  }
  render() {
    console.log('Render');
    return React.createElement('div', null);
  }
}