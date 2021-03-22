const StackMachine = require('../stack_machine');
const testdata = require('./testdata.json');

const expect = require('chai').expect;

describe('StackMachine test', () => {
  for(let op in testdata.machine.input) {
    const ele = testdata.machine.input[op];
    let machine = new StackMachine();
    it(`should do the ${op} operation`, () => {
      for(let i = 0; i < ele.length; i++)
      {
        machine.instruct(ele[i]);
      }
      expect(machine.stack).to.deep.equal(testdata.machine.output[op]);
    });
  };
  it('should throw insufficient parameters', () => {
    let machine = new StackMachine();
    machine.instruct({"raw":"1","position":1,"type":"operand","value":1});
    expect(() => { 
      machine.instruct({"raw":"+","position":3,"type":"operator","operation":"add"});
    }).to.throw('insufficient parameters');
  })
  it('should throw unknown token', () => {
    let machine = new StackMachine();
    expect(() => { 
      machine.instruct({"raw":"xxx","position":1,"type":"unknown"});
    }).to.throw('unknown token');
  })
  it('should throw nothing to undo', () => {
    let machine = new StackMachine();
    expect(() => { 
      machine.instruct({"raw": "undo","position": 1,"type": "undo"});
    }).to.throw('nothing to undo');
  })
});