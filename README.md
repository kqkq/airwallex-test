# Airwallex RPN Calculator

This is a command-line based RPN calculator.

* The calculator has a stack that can contain real numbers.
* The calculator waits for user input and expects to receive strings containing whitespace separated lists of numbers and 
operators.
* Numbers are pushed on to the stack. Operators operate on numbers that are on the stack.
* Available operators are `+`, `-`, `*`, `/`, `sqrt`, `undo`, `clear`.
* Operators pop their parameters off the stack, and push their results back onto the stack.
* The `clear` operator removes all items from the stack.
* The `undo` operator undoes the previous operation. `undo undo` will undo the previous two operations.
* `sqrt` performs a square root on the top item from the stack.
* The `+`, `-`, `*`, `/` operators perform addition, subtraction, multiplication and division respectively on the top two items from the stack.
* After processing an input string, the calculator displays the current contents of the stack as a space-separated list.
* Numbers should be stored on the stack to at least 15 decimal places of precision, but displayed to 10 decimal places (or less if it causes no loss of precision).
* All numbers should be formatted as plain decimal strings (ie. no engineering formatting).
* If an operator cannot find a sufficient number of parameters on the stack, a warning is displayed:
`operator <operator> (position: <pos>): insufficient parameters`
* After displaying the warning, all further processing of the string terminates and the current state of the stack is displayed.

## Quick start

The project is implemented and tested on Node.js `v14.16.0` (with npm `v6.14.11`).

In case you don't have a Node.js environment prepared, a `docker-compose.yml` is prepared for your test.

If `docker` and `docker-compose` are installed, you can build, test, and enter an interactive mode by just one command:

```
docker-compose run --rm app
```

HTML test reports are generated in the `reports/` directory.

## Brief test reports

### Unit test report

```
  StackMachine test
    ✓ should do the add operation
    ✓ should do the sub operation
    ✓ should do the mul operation
    ✓ should do the div operation
    ✓ should do the sqrt operation
    ✓ should do the undo operation
    ✓ should do the clear operation
    ✓ should throw insufficient parameters
    ✓ should throw unknown token
    ✓ should throw nothing to undo

  Tokenlizer test
    ✓ should work when input is empty
    ✓ should work when input is "5 2 / 4 * sqrt undo sqrt clear xxx"

  12 passing (22ms)
```

### Code coverage

```
------------------|---------|----------|---------|---------|-------------------
File              | % Stmts | % Branch | % Funcs | % Lines | Uncovered Line #s 
------------------|---------|----------|---------|---------|-------------------
All files         |     100 |      100 |     100 |     100 |                   
 stack_machine.js |     100 |      100 |     100 |     100 |                   
 tokenlizer.js    |     100 |      100 |     100 |     100 |                   
------------------|---------|----------|---------|---------|-------------------
```

## Build

Install all dependencies by

```
npm install
```

then run the app by

```
npm start
```

## Unit test

To run the unit test and collect the test coverage:

```
npm test
```

The HTML unit test report can be found in `reports/test/index.html`. The code coverage report can be found in `reports/coverage/index.html`.

A brief report can also be found in the console output.

## Interactive test case

### Example 1

```
> 5 2
stack: 5 2
```

### Example 2

```
> 2 sqrt
stack: 1.4142135623
> clear 9 sqrt
stack: 3
```

### Example 3

```
> 5 2 -
stack: 3
> 3 -
stack: 0
> clear
stack:
```

### Example 4

```
> 5 4 3 2
stack: 5 4 3 2
> undo undo *
stack: 20
> 5 *
stack: 100
> undo
stack: 20 5
```

### Example 5

```
> 7 12 2 /
stack: 7 6
> *
stack: 42
> 4 /
stack: 10.5
```

### Example 6

```
> 1 2 3 4 5
stack: 1 2 3 4 5
> *
stack: 1 2 3 20
> clear 3 4 -
stack: -1
```

### Example 7

```
> 1 2 3 4 5
stack: 1 2 3 4 5
> * * * *
stack: 120
```

### Example 8

```
> 1 2 3 * 5 + * * 6 5
operator * (position: 15): insucient parameters
stack: 11
```

