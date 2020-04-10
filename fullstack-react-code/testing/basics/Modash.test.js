// We write the tests for the Modash library in
// this file in the Unit Testing chapter
import Modash from './Modash';

function assertEqual(description, actual, expected) {
    if(actual === expected) {
        console.log(`[PASS] ${description}`);
    } else {
        console.log(`[FAIL] ${description}`);
        console.log(`\tactual: '${actual}'`);
        console.log(`\texpected: '${expected}'`);
    }
}

let actual;
let expected;
let string;
//TRUNCATE
string = 'web development is just the beginning of this road';
actual = Modash.truncate(string, 37);
expected = 'web development is just the beginning...'

assertEqual('`truncate()`: truncates a string', actual, expected);

//CAPITALIZE
actual = Modash.capitalize(string);
expected = 'Web development is just the beginning of this road'

assertEqual(`'capitalize()': capitalizes the string`, actual, expected);

//camelCase
string = 'html css js react redux grapqh node mogodb';
actual = Modash.camelCase(string);
expected = 'htmlCssJsReactReduxGrapqhNodeMogodb';

assertEqual(`'camelCase()': string with spaces`, actual, expected);

string = 'html-css-js-react-redux-grapqh-node-mogodb';
actual = Modash.camelCase(string);
expected = 'htmlCssJsReactReduxGrapqhNodeMogodb';

assertEqual(`'camelCase()': string with dashes`, actual, expected);