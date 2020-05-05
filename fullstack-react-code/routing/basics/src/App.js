import React from 'react';
//Import the createBrowserHistory mtehod to get the history object, in this case this history object has some special methods not included in the browser API provided by HTML5 and prevent us to any incompatibility in the different browsers 
import { createBrowserHistory } from 'history'

const history = createBrowserHistory() //Get the history object

//Component that determines what to render according with the location (URL) of our app.
const Route = ({path, component: Component}) => {
  const pathname = window.location.pathname; //The window object; here we're accesing to the pathname (the directions after the hostname)
  if(pathname.match(path)) {
    return (
      <Component/>
      );
  } else {
    return null;
  }
}

//Component that change the location of our App without any browser request to the server.
const Link = ({to, children}) => {
  return (
    <a onClick={(e) => {
      e.preventDefault(); //PreventDefault deletes any page freshing
      history.push(to); //Change the actual history stack and also updates the URL
    }}
      href={to}
    >
      {children}
    </a>
  );
}

class App extends React.Component {
  componentDidMount() {
    //Now that our app is not refreshing we need a way to attach a re-render, in order to do that we use history.listen() to invoke it any time the history stack is changed, this method accepts a function as an argument in this time we define the react method forceUpdate().
    history.listen(() => this.forceUpdate());
  }

  render() {
    return (
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
