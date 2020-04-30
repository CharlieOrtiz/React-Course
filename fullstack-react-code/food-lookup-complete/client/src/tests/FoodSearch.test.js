// We populate this file in the chapter "Unit Testing"
/* eslint-disable no-unused-vars */
import { shallow } from 'enzyme';
import React from 'react';
import FoodSearch from '../FoodSearch';
import Client from '../Client';

jest.mock('../Client');

describe('FoodSearch', () => {
  const onFoodClick = jest.fn(); //Mock function to test that it's called with the correct argument (we use it as prop) 
  // ... initial state specs
  let wrapper;
  beforeEach(() => {
    wrapper = shallow(
      <FoodSearch
        onFoodClick = {onFoodClick}
      />
    );
  });

  afterEach(() => {
    Client.search.mockClear();
  });

  it('should not display the remove icon', () => {
    expect(
      wrapper.find('.remove.icon').length
    ).toBe(0);
  });

  it('should display zero rows', () => {
    expect(
      wrapper.find('tbody tr').length
    ).toBe(0);
  });

  describe('user populates search field', () => {
    const value = 'brocc';
    beforeEach(() => {
      // ... simulate user typing "brocc" in input
      const input = wrapper.find('input').first();
      input.simulate('change', {
        target: { value: value }
      });

    });

    // ... specs
    it('should update state property `searchValue`', () => {
      expect(
        wrapper.state().searchValue
      ).toEqual(value);
    });

    it('should display the remove icon', () => {
      expect(
        wrapper.find('.remove.icon').length
      ).toBe(1);
    });

    /*it('...todo...', () => {
      const firstInvocation = Client.search.mock.calls[0];

      console.log('First Invocation:', firstInvocation);
      console.log('All Invocations:', Client.search.mock.calls);
    })*/

    it('should call `Client.search()` with `value`', () => {
      const clientArgs = Client.search.mock.calls[0];
      expect(
        clientArgs[0]
      ).toEqual(value);
    });

    describe('and API returns results', () => {
      const foods = [
        {
          description: 'Broccolini',
          kcal: '100',
          protein_g: '11',
          fat_g: '21',
          carbohydrate_g: '31',
        },
        {
          description: 'Broccoli rabe',
          kcal: '200',
          protein_g: '12',
          fat_g: '22',
          carbohydrate_g: '32',         
        },
      ];

      beforeEach(() => {
        // ... simulate API returning results
        const clientArgs = Client.search.mock.calls[0];
        const cb = clientArgs[1]; //The callback

        cb(foods);
        wrapper.update(); //re-render
      });

      // ... specs
      it('should set the state property `foods`', () => {
        expect(
          wrapper.state().foods
        ).toEqual(foods);
      });

      it('should display two rows', () => {
        expect(
          wrapper.find('tbody tr').length
        ).toEqual(2);
      });

      it('should render the description of first food', () => {
        expect(
        wrapper.html() //returns all the html as string
        ).toContain(foods[0].description); //Validating that the correct text is the tree snapshot
      });
      
      it('should render the description of second food', () => {
        expect(
        wrapper.html()
        ).toContain(foods[1].description);
      });
      

      describe('then user clicks food item', () => {
        beforeEach(() => {
          // ... simulate user clicking food item
          const foodRow = wrapper.find('tbody tr').first();

          foodRow.simulate('click'); //Not necessary to write the event object, we're not using it inside the event (we just write the event object when we are using it inside the event function)
        });

        // ... specs
        it('should call prop onFoodClick with the arg equal to first element of foods', () => {
          expect(
            onFoodClick.mock.calls[0][0] //the onFoodClick mock gets called in the simulate click event, here we are just getting the first argument of the first call
          ).toEqual(foods[0]);  
        });

      });

      describe('then user types more', () => {
        beforeEach(() => {
          // ... simulate user typing "x"
        });

        describe('and API returns no results', () => {
          beforeEach(() => {
            // ... simulate API returning no results
          });

          // ... specs
        });
      });
    });
  });
});
