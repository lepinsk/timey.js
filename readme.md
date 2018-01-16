# timey.js

### What

```timey.js``` is a small dependency-free command line module written in node.js to convert between milliseconds and human-readable time.

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