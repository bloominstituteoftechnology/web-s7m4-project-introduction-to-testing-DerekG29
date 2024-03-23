import React from 'react'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import App from './App'

const { en: en, esp: esp } = require('../i18n/index.json');

describe('Module 4 Project Tests', () => {
  describe('English Language', () => {
    /*
      👉 TASK 1

      One test is done for you as an example.
    */
    for (const key in en) {
      if (key === 'PLACEHOLDER_USERNAME') {
        test(`${key} is visible`, () => {
          render(<App lang='en' />);
          expect(screen.getByPlaceholderText(`${en[key]}`)).toBeVisible();
        })
      } else {
        test(`${key} is visible`, () => {
          render(<App lang='en' />);
          expect(screen.getByText(`${en[key]}`)).toBeVisible();
        })
      }
    }
  })
  describe('Spanish Language', () => {
    /*
      👉 TASK 3

      This is done after making the UI multilingual.
    */
      for (const key in en) {
        if (key === 'PLACEHOLDER_USERNAME') {
          test(`${key} is visible`, () => {
            render(<App lang='esp' />);
            expect(screen.getByPlaceholderText(`${esp[key]}`)).toBeVisible();
          })
        } else {
          test(`${key} is visible`, () => {
            render(<App lang='esp' />);
            expect(screen.getByText(`${esp[key]}`)).toBeVisible();
          })
        }
      }
  })

  const testObj = {
    abc_1: "data_abc_1",
    abc_2: "data_abc_2",
    xyz_1: "data_xyz_1",
    abc_3: "data_abc_3",
  }
  const solution1 = [
    ["abc_1", "data_abc_1"],
    ["abc_2", "data_abc_2"],
    ["abc_3", "data_abc_3"],
  ]
  const solution2 = [
    ["xyz_1", "data_xyz_1"],
  ]
  
  describe('getEntriesByKeyPrefix', () => {
    let actual = getEntriesByKeyPrefix(testObj, 'abc');
    let expected = solution1;
    test('can extract the correct data', () => {
      expect(actual).toEqual(expected);
    })
    actual = getEntriesByKeyPrefix(testObj, 'xyz');
    expected = solution2;
    test('should work with different prefixes', () => {
      expect(actual).toEqual(expected);
    })
    actual = getEntriesByKeyPrefix(testObj, 'foo');
    expected = [];
    test('passing in a prefix with no matches should return empty array', () => {
      expect(actual).toEqual(expected);
    })
    actual = getEntriesByKeyPrefix({ test_1: 'data_1', test_2: 'data_2', abc: 'abc'}, 'test');
    expected = [['test_1', 'data_1'], ['test_2', 'data_2']];
    test('should be able to take different length prefixes', () => {
      expect(actual).toEqual(expected);
    })

  })
})

function getEntriesByKeyPrefix(obj, keyPrefix) {
  let result = [];

  for (const key in obj) {
    if (key.slice(0, keyPrefix.length) === keyPrefix) {
      result.push([key, obj[key]]);
    }
  }

  return result;
  /*
  👉 TASK 4 part 1
  
  Implement a function that takes as first argument an object `obj` such as this:
  
  {
    abc_1: "data_abc_1",
    abc_2: "data_abc_2",
    xyz_1: "data_xyz_1",
    abc_3: "data_abc_3",
  }
  
  and takes as second argument a string `keyPrefix` such as this: "abc"
  
  and returns an array of arrays such as this (for the arguments given in the examples above):
  
  [
    ["abc_1", "data_abc_1"],
    ["abc_2", "data_abc_2"],
    ["abc_3", "data_abc_3"],
  ]
  
  If the function is passed the same `obj` as above but a `keyPrefix` of "xyz" then it would return:
  
  [
    ["xyz_1", "data_xyz_1"],
  ]
  
  If the function is passed the same `obj` as above but a `keyPrefix` of "foo" then it would return the empty array.
  
  The function looks inside the object `obj`, finds all properties whose property names begin
  with the `keyPrefix` given (followed by an underscore), and reorganizes the information before returning it.
  The properties that match the `keyPrefix` are returned inside an array holding key-value-pair sub-arrays.
  
  */

}
