
var fs = require('fs');
var path = require('path');
var links = require('./linkList.json').links;
var exec = require('child_process').exec;
var colors = require('colors/safe');

console.log(colors.blue("Processing " + links.length + " urls"));

var index = links.length - 1;

var processLink = function() {
	if (index < 0) {
		console.log(colors.blue("************ TERMINATED **************"));

		return;
	}

	var link = links[index--];

	console.log(colors.blue("Starting: " + link.title));

	var filename = path.join('/home/pippo/Desktop/Epics', link.title + '.mp3');

	var command = 'youtube-dl -o \'' + filename + '\' -x --audio-format \'mp3\' --verbose \'' + link.url + '\'';

	console.log(colors.gray(command));

	var childProcess = exec( command,
		(err,stdout, stderr) => {
			if (err)
				console.log(colors.red(err));

			if (stdout)
				console.log(colors.green(stdout));

			if (stderr)
				console.log(colors.yellow(stderr));
		});

	childProcess.on('exit', () => processLink());
};

processLink();