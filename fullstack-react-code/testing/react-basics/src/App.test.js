import React from 'react';
import App from './App';
import { shallow } from 'enzyme';

//1. Asser that we have a table header with Items as its content
describe('App', () => {
  let wrapper; //The variables is globally to be available in all specs.
 //beforeEach is a special function that runs just before every it block, we use this kind of functions to declare some special setup before running any assertion 
  beforeEach(() => {
    wrapper = shallow(
      <App/>
    ); //In this case we need to have our shallow object to be render every time we need in our assertions. In this way we guarantee that every time that we use our wrapper in our assertions we are using a fresh set of context.
  });

  it('should have the `th` "Items"', () => {
    expect(
      wrapper.contains(<th>Items</th>)
      ).toEqual(true);
  });

  it('should have a `button` element', () => {
    expect(
      wrapper.containsMatchingElement(<button>Add item</button>)
    ).toBe(true);
  });

  it('should have an `input` element', () => {
    expect(
      wrapper.containsMatchingElement(<input/>)
    ).toBe(true);
  });

  it('button should be disabled', () => {
    const button = wrapper.find('button').first();

    expect(
      button.props().disabled //Here we get the value of the disabled property, in this case, disabled is equal to true
    ).toBe(true);
  });

  describe('the user populates the input', () => {
    const item = 'Vancouver';

    beforeEach(() => {
      const input = wrapper.find('input').first();

      input.simulate('change', {
        target: {
          value: item
        }
      });
    });

    it('should update the state property `item`', () => {
      expect(
        wrapper.state().item
      ).toEqual(item);
    });

    it('should enable `button`', () => {
      const button = wrapper.find('button').first();

      expect(
        button.props().disabled
      ).toBe(false);
    });

    describe('and then clears the input', () => {
      beforeEach(() => {
        const input = wrapper.find('input').first();
        input.simulate('change', {
          target: {value: ''}
        });
      });

      it('should disable `button`', () => {
        const button = wrapper.find('button').first();
        expect(
          button.props().disabled
        ).toBe(true);
      });
    });
  });
}); 