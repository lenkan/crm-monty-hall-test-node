const example = require('./example');

describe('example', () => {
  it('returns sum', () => {
    expect(example(1, 2)).toBe(3);
  });
});
