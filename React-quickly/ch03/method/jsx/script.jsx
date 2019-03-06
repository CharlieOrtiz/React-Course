class Content extends React.Component {
  getUrl() {
    return 'http://webapplog.com'
  }
  render() {
    let specialChars = <span key="speacilChars">&copy;</span>;
    let specialChars2 = '©';
    let speacilChars3 = {__html: '&copy;'};
    let stylingP = {fontSize: '25px', color: 'red'};
    return (
      <div>
        <h1>Hellow world</h1> {/*Every element in JSX is has to have a closing slash (/) to close the tag*/}
        <p>Your REST API URL is: <a href={this.getUrl()}>{this.getUrl()}</a></p>
        <div>
          {/* To put special characters in JSX, it is possible to wirtem directly in the code as shown below */}
          <span>&copy;</span>
          <p>&mdash;</p>
          {/* However if we want to put the character code dinamically, for example from a variable (specialChars) we need to put them inside an element, and then provide that value to the variable, so we can just write the variable name where the specia sharacter is going to be */}
          <span>{specialChars}</span> {/*we can pass the same value from the variable as an array instead */}

          {/* Another way to put characters dinamically is passing the direct value to the variable (speacialChars2) depending with the UTF-8 character code */}
          <p>{specialChars2}</p>
          {/* One more way is to declare a variable with the value as speacilChars3 and put in the element inside the attribute dangerouslySetInnerHTML. This method is not recommended */}
          <p dangerouslySetInnerHTML={speacilChars3} />
        </div>

        {/* Style attribute */}
        {/* The value of this attribute is passed as an object, either a variable object or directly in JSX inside curly braces {} */}
        {/* Directly */}
        <p style={{fontSize: '25px', color: 'red'}}>Applying style attribute directly</p>
        {/* Variable object */}
        <p style={stylingP}>Applying style attribute directly</p>

        {/*Attributes like clas and for are defined in JSX as className and htmlFor*/}
        <div>
          <input type="radio" name='Opcion 1' id='radio1'>
          </input>
          <label htmlFor='radio1'>
            Opcion 1
          </label>
        </div>

        {/* Boolean attribute values */}
        {/* Attribute values with true or false are defined isinde the curly braces that we use to write javascript expressions */}
      </div>
    )
  }
}

ReactDOM.render(
  <Content key="specialChars"/>,
  document.getElementById('content')
)
