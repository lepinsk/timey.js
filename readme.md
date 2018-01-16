# timey.js

### What

```timey.js``` is a small dependency-free command line module written in node.js to convert between milliseconds and human-readable time.

### Installation

Grab the ```timey.js``` project and place it somewhere semi-permanent on your system, then, from the project folder, run:

```
$ npm install -g .
```

This will register ```timey``` as a CLI command.

### Usage

Install ```timey.js``` globally, and run it as follows to convert from milliseconds:

```
$ timey 23660001
23660001ms in human time is 06:34:20.001
```

... and like this to convert from human-readable time to milliseconds:

```
$ timey 06:34:20.001
06:34:20.001 in milliseconds is 23660001
```

Timey will try to guess whether the input time is in human-readable or millisecond time.

### What is ```~~ (a / b)```

The ```~``` operator is javascript bitwise operator that flips the bits of the number it operates on; in practice, a double-tilde has the effect of performing an integer division of ```a``` by ```b```, and it does this slightly faster than ```Math.floor()``` does. 

More importantly, it's super-inscrutable and difficult to parse when reading code.

### Testing

```timey.js``` includes some minimally-useful unit tests; to run them:

```
$ npm install
$ npm test
```

(```timey.js``` isn't packaged with its dev dependencies by default, so ```npm install``` is necessary to grab them before running any tests.)

### License

MIT, I guess?