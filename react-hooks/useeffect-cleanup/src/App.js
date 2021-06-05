import React from 'react';

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

class App extends React.Component {
  mobileMediaQuery = window.matchMedia('(max-width: 500px)');
  tabletMediaQuery = window.matchMedia('(min-width: 501px) and (max-width: 1024px)');
  desktopMediaQuery = window.matchMedia('(min-width: 1025px)');
  state = {
    device: (() => {
      if(matchMedia(this.mobileMediaQuery)) {
        return 'mobile';
      } else if(matchMedia(this.tabletMediaQuery)) {
        return 'tablet';
      } else {
        return 'desktop';
      }
    })(),
  }

  onChangeMobile = (e) => {
    if(matchMedia(e)) {
      this.setState({device: 'mobile'});
    }
  };

  onChangeTablet = (e) => {
    if(matchMedia(e)) {
      this.setState({device: 'tablet'});
    }
  };

  onChangeDesktop = (e) => {
    if(matchMedia(e)) {
      this.setState({device: 'desktop'});
    }
  };

  componentDidMount() {
    this.mobileMediaQuery.addEventListener('change', this.onChangeMobile);
    this.tabletMediaQuery.addEventListener('change', this.onChangeTablet);
    this.desktopMediaQuery.addEventListener('change', this.onChangeDesktop);
  }

  render() {
    return (
      <div style={mainContainer}>
        <h1>Use Effect Cleanup</h1>
        {
          this.state.device === 'mobile' 
            ? '' 
            : <Button
                device={this.state.device}
              />
        }
      </div>
    )
  }
}

class Button extends React.Component {
  button = React.createRef();
  state = {
    textButton: this.props.device === 'desktop' ? 'Click me!' : 'Hover me!',
  }

  static getDerivedStateFromProps(nextProps) {
    return {
      textButton: nextProps.device === 'tablet' ?  'Hover me!' : 'Click me!'
    }
  }

  onMouseLeave = () => {
    console.log('You hover me!')
  }

  onMouseClick = () => {
    console.log('You clicked me!')
  }

  addListenerEffect = (device) => {
    switch(device) {
      case 'tablet': {
        this.button.current.addEventListener('mouseenter', this.onMouseLeave);
        break;
      }
      case 'desktop': {
        this.button.current.addEventListener('click', this.onMouseClick);
        break;
      }
      default: {
        break;
      }
    }
  }

  cleanListenerEffect = (device) => {
    switch(device) {
      case 'tablet': {
        this.button.current.removeEventListener('mouseenter', this.onMouseLeave);
        break;
      }
      case 'desktop': {
        this.button.current.removeEventListener('click', this.onMouseClick);
        break;
      }
      default: {
        break;
      }
    }
  }

  componentDidUpdate(oldProps) {
    this.cleanListenerEffect(oldProps.device);
    this.addListenerEffect(this.props.device);
  }

  componentWillUnmount() {
    this.cleanListenerEffect(this.props.device);
  }

  componentDidMount() {
    this.addListenerEffect(this.props.device);
  }

  render() {
    return(
      <div>
        <button ref={this.button}>{this.state.textButton}</button>
      </div>
    )
  }
}

export default App;
