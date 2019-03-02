let helloWorldReactElement = <h1>Hello world!</h1>
class HelloWorld extends React.Component {
  render() {
    return (
      <div>
        {helloWorldReactElement}
        {helloWorldReactElement}
        <a href={this.props.url} title={this.props.title}>My GitHub</a>
        <p data-id={this.props.dataReactApp}>01-03-19</p>
      </div>
    ) //Notice the parentheses after the return statement, this one is necessary to tell JavaScript that althoung there are too many lines in the return, the value rendered is just one (the element), another way is to write the first line(<div>) next to the return and the other lines in a new line to avoid ().
  }
}
ReactDOM.render(
  <HelloWorld url="https://github.com/Carlos3dg" title="GitHub" dataReactApp="1"/>, //Here we have created two properties, that can be inherited by any element inside the component, in this case we used these properties to provide a url to the href attribute inside the anchor element <a> and a title to the same element. Properties are created at the instance component, however we could add these values directly in the render method, but in the instance we make the process dynamically
  document.getElementById('content')
)

/*As we know, custom properties are taken as attributes if they match with the HTML standard, however when we want to pass a property as a custom attribute, an attribute that doesn't exist in the standar, we add the data-NAME prefix
For example, inside a component:
  <p data-id = "1"></p> 
  //Here we read the data-id attribute because we are adding the data prefix, but in some cases the attribute can be gotten from the entire object property created in the instantiation, for example somthing like this:
  <p {...this.props} ></p> 
  When we do this, it is neccesary to declare the property with the data prefix in the instantiation:
  <NameComponent title="First React App" dataId="1" />
  So, with this, the element isinde the component can add the dataId attribute.
  Note. Although it is possible to write data-Name as a property inside an element in the component, it is recommended to write the property in camelCase or with underscores inside the instantiation as we did in the example
*/ 