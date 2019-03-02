// var helloWorldReactElement = <h1>Hello world!</h1>
// ReactDOM.render(
//   helloWorldReactElement,
//   document.getElementById('content')
// )

const user = {
  session: true
};

class Session extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      user
    };
  }

  render() {
    return React.createElement(
      "div",
      null,
      (userSession => {
        if (userSession) return React.createElement(
          "a",
          { href: "/logout" },
          "Logout"
        );else return React.createElement(
          "a",
          { href: "/login" },
          "Login"
        );
      })(this.state.user.session)
    );
  }
}
/*Funtions IIFE and Ternary operator are two options to make an if/else statement inside JSX, as in the example above, we used a IIFE function, however it is possible to use an if/else statement that returns a variable but just if we make that process outside JSX and just pass the variable in curly braces notation in JSX. A similar way occurs with the expression functions, they can be declare outside JSX returning an element depending on the condition and just call the function inside curly braces.*/
ReactDOM.render(React.createElement(Session, null), document.getElementById('content'));
