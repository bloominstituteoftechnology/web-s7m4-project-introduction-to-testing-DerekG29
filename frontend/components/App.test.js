import React from 'react'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import App from './App'
import languages from '../i18n/index.json';

describe('Module 4 Project Tests', () => {

  describe('English Language', () => {
    const texts = getEntriesByKeyPrefix(languages.en, 'TEXT');
    for (let [key, val] of texts) {
      test(`${key} is visible`, () => {
        render(<App lang='en' />);
        expect(screen.getByText(val)).toBeVisible();
      })
    }

    const labels = getEntriesByKeyPrefix(languages.en, 'LABEL');
    for (let [key, val] of labels) {
      test(`${key} is visible`, () => {
        render(<App lang='en' />);
        expect(screen.getByLabelText(val)).toBeVisible();
      })
    }

    const placeholders = getEntriesByKeyPrefix(languages.en, 'PLACEHOLDER');
    for (let [key, val] of placeholders) {
      test(`${key} is visible`, () => {
        render(<App lang='en' />);
        expect(screen.getByPlaceholderText(val)).toBeVisible();
      })
    }
  });

  describe('Spanish Language', () => {
    const texts = getEntriesByKeyPrefix(languages.esp, 'TEXT');
    for (let [key, val] of texts) {
      test(`${key} is visible`, () => {
        render(<App lang='esp' />);
        expect(screen.getByText(val)).toBeVisible();
      })
    }

    const labels = getEntriesByKeyPrefix(languages.esp, 'LABEL');
    for (let [key, val] of labels) {
      test(`${key} is visible`, () => {
        render(<App lang='esp' />);
        expect(screen.getByLabelText(val)).toBeVisible();
      })
    }

    const placeholders = getEntriesByKeyPrefix(languages.esp, 'PLACEHOLDER');
    for (let [key, val] of placeholders) {
      test(`${key} is visible`, () => {
        render(<App lang='esp' />);
        expect(screen.getByPlaceholderText(val)).toBeVisible();
      })
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
    actual = getEntriesByKeyPrefix({ test_1: 'data_1', test_2: 'data_2', abc: 'abc' }, 'test');
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
}
