class StackMachine
{
  constructor() {
    this._stack = [];
    this._undo_stack = [];
  }

  get stack() {
    return this._stack;
  }

  set stack(val) {
    this._stack = val; 
  }

  instruct(token) {
    switch(token.type) {
      case 'operator':
        try {
          this[`_${token.operation}`].bind(this).call();
        } catch (e) {
          e.operator = token.raw;
          e.position = token.position;
          throw e;
        }
        break;
      case 'operand':
        this._stack.push(token.value);
        this._undo_stack.push([]);
        break;
      case 'clear':
        this.clearStack();
        break;
      case 'undo':
        this.undoStack();
        break;
      default:
        let e = new Error('unknown token');
        e.operator = token.raw;
        e.position = token.position;
        throw e;
    }
  }

  clearStack() {
    this._stack = [];
  }

  undoStack() {
    let op = this._undo_stack.pop();
    this._stack.pop();
    for(let i = 0; i < op.length; i++) {
      this._stack.push(op[i]);
    }
  }

  _add() {
    this._checkOperands(2);
    let b = this._stack.pop();
    let a = this._stack.pop();
    this._undo_stack.push([a, b])
    this._stack.push(a + b);
  }

  _sub() {
    this._checkOperands(2);
    let b = this._stack.pop();
    let a = this._stack.pop();
    this._undo_stack.push([a, b])
    this._stack.push(a - b);
  }

  _mul() {
    this._checkOperands(2);
    let b = this._stack.pop();
    let a = this._stack.pop();
    this._undo_stack.push([a, b])
    this._stack.push(a * b);
  }

  _div() {
    this._checkOperands(2);
    let b = this._stack.pop();
    let a = this._stack.pop();
    this._undo_stack.push([a, b])
    this._stack.push(a / b);
  }

  _sqrt() {
    this._checkOperands(1);
    let a = this._stack.pop();
    this._undo_stack.push([a])
    this._stack.push(Math.sqrt(a));
  }

  _checkOperands(count) {
    if(this._stack.length < count) throw new Error('insufficient parameters');
  }
}

module.exports = StackMachine;