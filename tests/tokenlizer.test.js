const Tokenlizer = require('../tokenlizer');
const testdata = require('./testdata.json');

const expect = require('chai').expect;

describe('Tokenlizer test', () => {
  it('should work when input is empty', () => {
    let tokenlizer = new Tokenlizer('');
    expect(tokenlizer.nextToken()).to.be.null;
  });

  for(let case_idx = 0; case_idx < testdata.tokenlizer.input.length; case_idx++) {
    const ele = testdata.tokenlizer.input[case_idx];
    it(`should work when input is "${ele}"`, () => {
      let tokenlizer = new Tokenlizer(ele);
      let token;
      for(let i = 0; token = tokenlizer.nextToken(); i++)
      {
        expect(token).to.deep.equal(testdata.tokenlizer.output[case_idx][i]);
      }
    });
  };
});
