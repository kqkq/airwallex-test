class Tokenlizer
{
  constructor(str) {
    this.token_list = [];
    this.current_token = -1;
    const raw_list = str.split(' ');
    let pos = 0;
    for(let i = 0; i < raw_list.length; i++) {
      pos++;
      if(raw_list[i].length === 0) continue;
      const token = this._analyzeToken({raw: raw_list[i], position: pos});
      this.token_list.push(token);
      pos += raw_list[i].length;
    }
  }

  _analyzeToken(token) {
    const operator_re = /^(\+|-|\*|\/|sqrt)$/;
    const number_re = /[-+]?[0-9]*\.?[0-9]+/;
    const ins_set = {'+': 'add', '-': 'sub', '*': 'mul', '/': 'div', 'sqrt': 'sqrt'};
    if(operator_re.test(token.raw)) {
      token.type = 'operator';
      token.operation = ins_set[token.raw];
    } else if(number_re.test(token.raw)) {
      token.type = 'operand';
      token.value = parseFloat(token.raw);
    } else if(token.raw === 'clear') {
      token.type = 'clear';
    } else if(token.raw === 'undo') {
      token.type = 'undo';
    } else {
      token.type = 'unknown';
    }
    return token;
  }

  nextToken() {
    if(this.current_token + 1 < this.token_list.length) {
      return this.token_list[++this.current_token];
    } else {
      return null;
    }
  }
}

module.exports = Tokenlizer;
