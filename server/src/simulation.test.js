/* eslint-env jest */
const runSimulation = require('./simulation');

beforeEach(() => {
  jest.clearAllMocks();
});

test('return a positive number when not changing door', () => {
  const result = runSimulation(100, false);
  expect(typeof result).toBe('number');
  expect(result).toBeGreaterThanOrEqual(0);
});

test('return a positive number when changing door', () => {
  const result = runSimulation(100, true);
  expect(typeof result).toBe('number');
  expect(result).toBeGreaterThanOrEqual(0);
});

test('throw error when number of runs is negative number', () => {
  expect(() => runSimulation(-10, false)).toThrowError('Invalid input');
});

test('throw error when number of runs is undefined', () => {
  expect(() => runSimulation(undefined)).toThrowError('Invalid input');
});

test('throw error when number of runs is NaN', () => {
  expect(() => runSimulation(NaN)).toThrowError('Invalid input');
});

test('throw error when change door is undefined', () => {
  expect(() => runSimulation(10, undefined)).toThrowError('Invalid input');
});

test('throw error when change door is a string', () => {
  expect(() => runSimulation(10, 'true')).toThrowError('Invalid input');
});

test('throw error when change door is not passed', () => {
  expect(() => runSimulation(10)).toThrowError('Invalid input');
});
