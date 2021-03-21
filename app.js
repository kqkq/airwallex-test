const Tokenlizer = require('./tokenlizer');
const StackMachine = require('./stack_machine');

const readline = require("readline");
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

async function input(prompt) {
  return new Promise(function (resolve) {
    rl.question(prompt, function(rpn) {
      resolve(rpn);
    });
  });
}

(async function () {
  console.log('------------------------------');
  console.log('Airwallex Programming Exercise');
  console.log('        RPN Calculator        ');
  console.log('------------------------------');
  console.log('');

  let machine = new StackMachine();

  while(1) {
    let rpn = await input('> ')
    let tokenlizer = new Tokenlizer(rpn);
    let token;
    while(token = tokenlizer.nextToken()) {
      try {
        machine.instruct(token);
      } catch (e) {
        console.log(`operator ${e.operator} (position: ${e.position}): ${e.message}`);
        break;
      }
    }
    if(machine.stack.length) console.log('stack: ' + machine.stack.reduce((accu, curr) => `${accu} ${curr}`));
    else console.log('stack:');
  }
})();