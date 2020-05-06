import React from 'react';
//Import the createBrowserHistory mtehod to get the history object, in this case this history object has some special methods not included in the browser API provided by HTML5 and prevent us to any incompatibility in the different browsers 
import { createBrowserHistory } from 'history'
//Variable use to define our context and define our Router state
const contextObject = {
  history: createBrowserHistory(),
  location: window.location
};
const RouterContext = React.createContext(contextObject); //The defaul value. In case that one of our components is not inside a provider then its consumer (if it's using) will take this value)

//Component that determines what to render according with the location (URL) of our app.
const Route = ({path, component: Component}) => {
  return <RouterContext.Consumer>
    { ({location: {pathname}}) => {
      if(pathname.match(path)) {
        return <Component/>
      } else {
        return null;
      }
    }}
  </RouterContext.Consumer>
}

//Component that change the location of our App without any browser request to the server.
const Link = ({to, children}) => {
  return <RouterContext.Consumer>
    { ({history}) => {
      return (
        <a onClick={(e) => {
          e.preventDefault(); //PreventDefault deletes any page freshing
          history.push(to); //Change the actual history stack and also updates the URL
        }}
          href={to}
        >
          {children}
        </a>
      )
    }}
  </RouterContext.Consumer>
}

class Router extends React.Component {
  //State equal to the defaul context value
  state = {
    apis: contextObject
  }
  //Use componentDidMount to declare the listen method from history, this will change our state and invokes a re-render
  componentDidMount() {
    //When the listen method will be invoked it's going to change our state value equal to the actual history stack and then makes a re-render to mount the provider with the updated value
    this.state.apis.history.listen(() => {
      this.setState({
        apis: {
          history: createBrowserHistory(),
          location: window.location
        }
      });
    });
  }
  //Because componentDidMount just is attached one time during the lifecycle we need to declare the listen method again after the first update made by the componentDidMount
  componentDidUpdate() {
    this.state.apis.history.listen(() => {
      this.setState({
        apis: {
          history: createBrowserHistory(),
          location: window.location
        }
      });
    });
  }
 
  render() {
    return (
      //Use context provider with a value equal to state to pass it to the rest of the child components, in this case Route and Link
      <RouterContext.Provider value={this.state.apis}>
        {this.props.children}
      </RouterContext.Provider>
    );
  }
}

class App extends React.Component {
  render() {
    return (
      <Router>
        
        <div
          className='ui text container'
        >
          <h2 className='ui dividing header'>
            Which body of water?
          </h2>

          <ul>
            <li>
              <Link to='/atlantic'> 
                <code>/atlantic</code>
              </Link>
            </li>
            <li>
              <Link to='/pacific'> 
                <code>/pacific</code>
              </Link>
            </li>
          </ul>

          <hr />

          {/* We'll insert the Route components here */} 
          <Route path='/atlantic' component={Atlantic} /> {/* When we pass a component as a property, we don't instantiate it we just pass the function variable */}
          <Route path='/pacific' component={Pacific} />

        </div>
      </Router>
    );
  }
}

const Atlantic = () => (
  <div>
    <h3>Atlantic Ocean</h3>
    <p>
      The Atlantic Ocean covers approximately 1/5th of the
      surface of the earth.
    </p>
  </div>
);

const Pacific = () => (
  <div>
    <h3>Pacific Ocean</h3>
    <p>
      Ferdinand Magellan, a Portuguese explorer, named the ocean
      'mar pacifico' in 1521, which means peaceful sea.
    </p>
  </div>
);

export default App;
