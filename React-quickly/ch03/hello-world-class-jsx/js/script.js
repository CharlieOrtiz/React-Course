let helloWorldReactElement = React.createElement(
  'h1',
  null,
  'Hello world!'
);
class HelloWorld extends React.Component {
  render() {
    return React.createElement(
      'div',
      null,
      helloWorldReactElement
    );
  }
}
ReactDOM.render(React.createElement(HelloWorld, null), document.getElementById('content'));
