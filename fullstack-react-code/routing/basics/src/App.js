import React from 'react';

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

class App extends React.Component {
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
            <a href='/atlantic'> {/* Every time user clicks on atlantic anchor, Pathname is equal to /atlantic */}
              <code>/atlantic</code>
            </a>
          </li>
          <li>
            <a href='/pacific'> {/* Every time user clicks on pacific, Pathname is equal to /pacific */}
              <code>/pacific</code>
            </a>
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
