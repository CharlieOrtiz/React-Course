import React from 'react';

import {
  BrowserRouter as Router,
  Route,
  Link,
  Redirect,
  Switch,
} from 'react-router-dom';

//When we are using the react router library we can use our imported components with some special functions, you can notice that having at the top our Router component we provide the HTML 5 Broweser API to keep our components in sync, other features are properties like to, path, render and exact used by the Router components

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
            <li>
              <Link to='/black-sea'> 
                <code>/black-sea</code>
              </Link>
            </li>
          </ul>

          <hr />
        
          <Switch>
            <Route path='/atlantic/ocean' render={() => ( //Render property let us make an in-line render component, instead of using the component property
              <div>
                <h3>Atlantic Ocean - Again!</h3>
                <p>
                  Also known as "The Pond."
                </p>
              </div>
            )}/>

            {/* We'll insert the Route components here */} 
            <Route path='/atlantic' component={Atlantic} /> {/* When we pass a component as a property, we don't instantiate it we just pass the function variable */}
            <Route path='/pacific' component={Pacific} />
            <Route path='/black-sea' component={BlackSea} />

            <Route exact path='/' render={() => { //exact property let us make an extact matched with the browser path, with this we avoid errors like having two different component rendering in the same browser location 
              return <h3>
                Welcome! Select a body of saline water above.
              </h3>
            }}/>

            <Route render={({location}) => (
              <div className='ui inverted red segment'>
                <h3>
                  Error! No matches for <code>{location.pathname}</code>
                </h3>
              </div>
            )} />
          </Switch>


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

class BlackSea extends React.Component {
  state = {
    counter: 3
  }

  componentDidMount() {
    this.interval = setInterval(() => {
      this.setState((prevState) => {
        return {
          counter: prevState.counter - 1
        }
      });
    }, 1000)
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  render () {
    return (
      <div>
        <h3>Black Sea</h3>
        <p>Nothing to sea [sic] here ...</p>
        <p>Redirecting in {this.state.counter}</p>
        {
          (this.state.counter < 1) ? <Redirect to='/'/> : null 
        }
      </div>
    )
  }
}

export default App;
