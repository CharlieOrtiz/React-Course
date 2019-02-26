class HelloWorld extends React.Component {
  render() {
    return React.createElement(
      'h1',
      this.props, //Here we render the properties as attributes if they match to the standard
      'Hello ' + this.props.frameworkName + ' world!' //Here we use the frameworkName property as the text inside the element, these property doesn't match with any attribute so if we wouldn't have specified it hadn't been rendere to the DOM
    ) 
  }
}

ReactDOM.render(
  React.createElement(
    'div',
    null,
    //Here we are making the instansation, Normally the second value in createElement method represents an attribute of the element that is going to be created, in this case we provided an object with a list of properties. Generally these properties are available in the component class as this.props, this.props represents the object that is being provided here. Now, what the render method do, is to see if one of these properties make match with one of the standar html attributes, if this happens React automatically render the properties as attributes, if they don't then we can use it to other porpuse in out class component code as we did with the frameworkName property
    React.createElement(HelloWorld, {
      id: 'ember',
      frameworkName: 'Ember.js',
      title: 'A framework for creating ambitious web applications.'}),
    React.createElement(HelloWorld, {
      id: 'backbone',
      frameworkName: 'Backbone.js',
      title: 'Backbone.js gives structure to web applications...'}),
    React.createElement(HelloWorld, {
      id: 'angular',
      frameworkName: 'Angular.js',
      title: 'Superheroic JavaScript MVW Framework'})
  ),
  document.getElementById('content')
)

//One characteristic from the createElement method is that after the second argument, all parameters are taken as childs of the element that is going to be created, for example, we could create an element as the following code:
    /*
      let h1 = React.createElement('h1', null, 'Hello World!!!');

      ReactDOM.render(
        React.createElement('div', null, h1, h1),  //Here the two h1 are at the same level and are children of the div element
        document.getElementById('content')
      )
    
    */

//Another characteristic is that the first argument can take two types of value, a string representating an element, as 'h1' or 'div' or a class component:
/*
      let h1 = React.createElement('h1', null, 'Hello World!!!');  
      //Class Component
      class HelloWorld extends React.component {
        render() {
          React.createElement('div', null, h1, h1);
        }
      }

      //Render class component
      ReactDOM.render(
        React.createElement(HelloWorld, null), //Here we pass the class component as a firt argument
        document.getElementById('content')
      )

  In this way we can reuse the elements nested inside the element created in the HelloWorld component as many times as we want, if we want to render the HelloWorld component two times this could be like the follow:
      ReactDOM.render(
        React.createElement('div', null, 
          React.createElement(HelloWorld),
          React.createElement(HelloWorld)
        ), 
        document.getElementById('content')
      )
*/