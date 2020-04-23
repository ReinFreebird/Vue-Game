/* eslint-disable consistent-return */
/* eslint-disable no-prototype-builtins */
/* eslint-disable prefer-template */
/* eslint-disable no-param-reassign */
/* eslint-disable array-callback-return */
/* eslint-disable no-undef */
/**
 * @file Class Error Response
 * @copyright Phire Studio, 2019
 * @version 1.0.0
 * @module utils/errorResponse
 */

// Dependencies
const readline = require('readline');
const events = require('events');
const os = require('os');
const v8 = require('v8');

class _events extends events {}
const e = new _events();

// Initiate CLI Module Object
const cli = {};

// Input Handlers
e.on('man', () => cli.responders.help());
e.on('help', () => cli.responders.help());
e.on('exit', () => cli.responders.exit());
e.on('stats', () => cli.responders.stats());

// Responders to Input Object
cli.responders = {};

// @desc      Help command
// @command   /man
cli.responders.help = () => {
  // Codify the commands and their explanations
  const commands = {
    exit: 'Kill the application',
    man: 'Show help page',
    help: 'Alias of the "man" command',
    stats:
      'Get statistics on the underlying operating system and resource utilization',
  };

  // Show a header for the help page that is as wide as the screen
  cli.horizontalLine();
  cli.centered('Phire Intelligent Platform');
  cli.horizontalLine();
  cli.verticalSpace(2);

  // Show each command, followed by its explanation, in white and yellow respectively
  Object.keys(commands).forEach(key => {
    const value = commands[key];
    let line = `      \x1b[33m ${key}      \x1b[0m`;
    const padding = 60 - line.length;
    for (i = 0; i < padding; i++) {
      line += ' ';
    }
    line += value;
    console.log(line);
    cli.verticalSpace();
  });

  cli.verticalSpace(1);

  // End with another horizontal line
  cli.horizontalLine();
};

// Create a vertical space
cli.verticalSpace = lines => {
  lines = typeof lines === 'number' && lines > 0 ? lines : 1;
  for (i = 0; i < lines; i++) {
    console.log('');
  }
};

// Create a horizontal line across the screen
cli.horizontalLine = () => {
  // Get the available screen size
  const width = process.stdout.columns;

  // Put in enough dashes to go across the screen
  let line = '';
  for (i = 0; i < width; i++) {
    line += '-';
  }
  console.log(line);
};

// Create centered text on the screen
cli.centered = str => {
  str =
    typeof str === 'string' && str.trim().length > 0
      ? str.trim()
      : '';

  // Get the available screen size
  const width = process.stdout.columns;

  // Calculate the left padding there should be
  const leftPadding = Math.floor((width - str.length) / 2);

  // Put in left padded spaces before the string itself
  let line = '';
  for (i = 0; i < leftPadding; i++) {
    line += ' ';
  }
  line += str;
  console.log(line);
};

// Exit
cli.responders.exit = () => {
  process.exit(0);
};

// @desc      Statistic command
// @command   /stats
cli.responders.stats = () => {
  // Compile an object of stats
  const stats = {
    'CPU Count': os.cpus().length,
    'Load Average': os.loadavg().join(' '),
    'Free Memory (MB)': os.freemem() / 1000000,
    'Current Malloced Memory (KB)':
      v8.getHeapStatistics().malloced_memory / 1000,
    'Peak Malloced Memory (KB)':
      v8.getHeapStatistics().peak_malloced_memory / 1000,
    'Allocated Heap Used (%)': Math.round(
      (v8.getHeapStatistics().used_heap_size /
        v8.getHeapStatistics().total_heap_size) *
        100,
    ),
    'Available Heap Allocated (%)': Math.round(
      (v8.getHeapStatistics().total_heap_size /
        v8.getHeapStatistics().heap_size_limit) *
        100,
    ),
    Uptime: `${os.uptime()} Seconds`,
  };

  // Create a header for the stats
  cli.horizontalLine();
  cli.centered('SYSTEM STATISTICS');
  cli.horizontalLine();
  cli.verticalSpace(2);

  // Log out each stat
  Object.keys(stats).forEach(key => {
    const value = stats[key];
    let line = '      \x1b[33m ' + key + '      \x1b[0m';
    const padding = 60 - line.length;
    for (i = 0; i < padding; i++) {
      line += ' ';
    }
    line += value;
    console.log(line);
    cli.verticalSpace();
  });

  // Create a footer for the stats
  cli.verticalSpace();
  cli.horizontalLine();
};

// Input processor
cli.processInput = str => {
  str =
    typeof str === 'string' && str.trim().length > 0
      ? str.trim()
      : false;
  // Only process the input if the user actually wrote something, else ignore it
  if (str) {
    // Codify the unique strings that identify the different unique questions allowed be the asked
    const uniqueInputs = ['man', 'help', 'exit', 'stats'];

    // Go through the possible inputs, emit event when a match is found
    let matchFound = false;
    uniqueInputs.some(input => {
      if (str.toLowerCase().indexOf(input) > -1) {
        matchFound = true;
        // Emit event matching the unique input, and include the full string given
        e.emit(input, str);
        return true;
      }
    });

    // If no match is found, tell the user to try again
    if (!matchFound) {
      console.log('Sorry, try again');
    }
  }
};

// Init script
cli.init = () => {
  // Send to console with styling (Color: Dark blue)
  console.log('\x1b[34m%s\x1b[0m', 'The CLI is running');

  // Start interface
  const _interface = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
    prompt: '>>> ',
  });

  // Create initial prompt
  _interface.prompt();

  // Input Handling for separate line
  _interface.on('line', str => {
    // Send to input processor
    cli.processInput(str);

    // Re-initialize prompt
    _interface.prompt();
  });

  // If user stop CLI (kill associated process)
  _interface.on('close', () => {
    process.exit(0);
  });
};

// Export the module
module.exports = cli;
