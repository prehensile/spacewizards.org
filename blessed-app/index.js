var blessed = require('blessed');
var fs = require('fs');

var home = require('./home');

// Create a screen object.
var screen = blessed.screen({
  smartCSR: true
});

screen.title = 'my window title';

var h  = new home.Home( screen );


// Quit on Escape, q, or Control-C.
screen.key(['escape', 'q', 'C-c'], function(ch, key) {
  return process.exit(0);
});


// Focus our element.
// box.focus();

// Render the screen.
screen.render();