/*
 * grunt-wp-i18n
 * https://github.com/blazersix/grunt-wp-i18n
 *
 * Copyright (c) 2014 Blazer Six, Inc.
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function(grunt) {

	grunt.loadTasks( 'tasks' );
	grunt.loadNpmTasks( 'grunt-contrib-jshint' );

	grunt.config.init({

		jshint: {
			options: {
				jshintrc: '.jshintrc'
			},
			all: [
				'Gruntfile.js',
				'tasks/*.js',
				'tasks/lib/*.js'
			]
		}

	});

	// Register default task.
	grunt.registerTask( 'default', ['jshint']);

};
