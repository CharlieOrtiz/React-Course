import React, { useState, useEffect, useRef, useLayoutEffect } from 'react';

const mainContainer = {
    width: '900px',
    margin: '0 auto',
    textAlign: 'center'
  };
  
  function matchMedia(mediaQuery) {
    if(mediaQuery.matches) {
        return true;
    } else {
        return false;
    }
  }

const App = () => {
    /*Queries*/ 
    const mobileMediaQuery = window.matchMedia('(max-width: 500px)');
    const tabletMediaQuery = window.matchMedia('(min-width: 501px) and (max-width: 1024px)');
    const desktopMediaQuery = window.matchMedia('(min-width: 1025px)');
    const initialDevice = () => {
        if(matchMedia(mobileMediaQuery)) {
            return 'mobile';
          } else if(matchMedia(tabletMediaQuery)) {
            return 'tablet';
          } else {
            return 'desktop';
          }
    }
    /* State */
    const [device, setDevice] = useState(initialDevice());

    function onChangeMobile(e) {
      if(matchMedia(e)) {
        setDevice('mobile')
      }
    }

    function onChangeTablet(e) {
      if(matchMedia(e)) {
        setDevice('tablet')
      }
    }

    function onChangeDesktop(e) {
      if(matchMedia(e)) {
        setDevice('desktop')
      }
    }

    useEffect(() => {
      mobileMediaQuery.addEventListener('change', onChangeMobile);
      tabletMediaQuery.addEventListener('change', onChangeTablet);
      desktopMediaQuery.addEventListener('change', onChangeDesktop);
    }, [mobileMediaQuery, tabletMediaQuery, desktopMediaQuery]);

    return (
      <div style={mainContainer}>
        <h1>Use Effect Cleanup</h1>
        {
          device === 'mobile' 
            ? '' 
            : <Button
                device={device}
              />
        }
      </div>
    )
}

const Button = (props) => {
  let button = useRef();

  const onMouseLeave = () => {
    console.log('You hover me!')
  }

  const onMouseClick = () => {
    console.log('You clicked me!')
  }

  useEffect(() => {
    function addListenerEffect() {
      switch(props.device) {
        case 'tablet': {
          button.current.addEventListener('mouseenter', onMouseLeave);
          break;
        }
        case 'desktop': {
          button.current.addEventListener('click', onMouseClick);
          break;
        }
        default: {
          break;
        }
      }
    }

    addListenerEffect();
  }, [props.device]);

  useLayoutEffect(() => {
    function cleanListenerEffect() {
      switch(props.device) {
        case 'tablet': {
          button.current.removeEventListener('mouseenter', onMouseLeave);
          break;
        }
        case 'desktop': {
          button.current.removeEventListener('click', onMouseClick);
          break;
        }
        default: {
          break;
        }
      }
    }
    return () => {
      cleanListenerEffect();
    }
  }, [props.device]);

  return(
    <div>
      <button ref={button}>Hi there!</button>
    </div>
  )
}

export default App;