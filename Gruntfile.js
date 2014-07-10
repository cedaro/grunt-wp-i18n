/*
 * grunt-wp-i18n
 * https://github.com/blazersix/grunt-wp-i18n
 *
 * Copyright (c) 2014 Blazer Six, Inc.
 * Licensed under the MIT license.
 */

'use strict';

//For convenience store keywards in global
var keywords = [
	'__:1,2d',
	'_e:1,2d',
	'_x:1,2c,3d',
	'esc_html__:1,2d',
	'esc_html_e:1,2d',
	'esc_html_x:1,2c,3d',
	'esc_attr__:1,2d', 
	'esc_attr_e:1,2d', 
	'esc_attr_x:1,2c,3d', 
	'_ex:1,2c,3d',
	'_n:1,2,4d', 
	'_nx:1,2,4c,5d',
	'_n_noop:1,2,3d',
	'_nx_noop:1,2,3c,4d'
	];

module.exports = function(grunt) {

	grunt.loadTasks( 'tasks' );
	grunt.loadNpmTasks( 'grunt-contrib-clean' );
	grunt.loadNpmTasks( 'grunt-contrib-copy' );
	grunt.loadNpmTasks( 'grunt-contrib-jshint' );
	grunt.loadNpmTasks( 'grunt-contrib-nodeunit' );

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
		},

		// Before generating any new files, remove any previously-created files.
		clean: {
			tests: ['tmp']
		},

		// Copy test files
		copy: {
			tests: { // Copies tests/fixtures/foobar/foobar.ext to tmp/foobar/foobar.ext
				files: [
					{
						expand: true,
						cwd: 'test/fixtures',
						src: [ '**' ],
						dest: 'tmp/'
					}
				]
			}
		},

		// Configuration to be run (and then tested).
		makepot: {
			basic_plugin: {
				options: {
					cwd: 'tmp/basic-plugin',
					type: 'wp-plugin'
				}
			},
			persist_timestamp: {
				options: {
					cwd: 'tmp/basic-plugin',
					type: 'wp-plugin',
					updateTimestamp: false
				}
			},
			different_slugs: {
				options: {
					cwd: 'tmp/different-slugs',
					type: 'wp-plugin'
				}
			},
			plugin_headers: {
				options: {
					cwd: 'tmp/plugin-headers',
					potComments: 'A new comment header.',
					potHeaders: {
						'report-msgid-bugs-to': 'https://github.com/blazersix/grunt-wp-i18n/issues',
						'x-poedit-keywordslist': '',
						'x-poedit-searchpath-0': '',
						'x-poedit-sourcecharset': ''
					},
					processPot: function( pot, options ) {
						pot.headers['language-team'] = 'Team Name <team@example.com>';
						return pot;
					},
					type: 'wp-plugin'
				}
			},
			theme_headers: {
				options: {
					cwd: 'tmp/theme-headers',
					processPot: function( pot, options ) {
						pot.headers['language-team'] = 'Team Name <team@example.com>';
						return pot;
					},
					type: 'wp-theme'
				}
			},
			ignore_headers: {
				options: {
					cwd: 'tmp/plugin-headers',
					domainPath: '.',
					potFilename: 'override.pot',
					type: 'wp-plugin'
				}
			},
			basic_theme: {
				options: {
					cwd: 'tmp/basic-theme',
					exclude: ['exclude/.*'],
					type: 'wp-theme'
				}
			}
		},

		// Configuration to be run (and then tested).
		checktextdomain: {
			correctDomain: {
				options:{
					textdomain: 'my-domain',
					createReportFile: 'tmp/check-textdomain/correct-domain.json',
					keywords: keywords
				},
				files: [{
					src: ['tmp/check-textdomain/correct-domain.php'],
					expand: true,
				}],
			},
			missing_domain: {
				options:{
					textdomain: 'my-domain',
					createReportFile: 'tmp/check-textdomain/missing-domain.json',
					keywords: keywords
				},
				files: [{
					src: ['tmp/check-textdomain/missing-domain.php'],
					expand: true,
				}],
			},
			missing_domain_ignore_missing: {
				options:{
					textdomain: 'my-domain',
					reportMissing: false,
					createReportFile: 'tmp/check-textdomain/missing-domain-ignore-missing.json',
					keywords: keywords
				},
				files: [{
					src: ['tmp/check-textdomain/missing-domain.php'],
					expand: true,
				}],
			},
			incorrect_domain_autocomplete: {
				options:{
					textdomain: 'my-domain',
					correctDomain: true,
					createReportFile: 'tmp/check-textdomain/incorrect-domain-autocomplete.json',
					keywords: keywords
				},
				files: [{
					src: ['tmp/check-textdomain/incorrect-domain-autocorrect.php'],
					expand: true,
				}],
			},
			variable_domain_autocomplete: {
				options:{
					textdomain: 'my-domain',
					correctDomain: true,
					createReportFile: 'tmp/check-textdomain/variable-domain-autocorrect.json',
					keywords: keywords
				},
				files: [{
					src: ['tmp/check-textdomain/variable-domain-autocorrect.php'],
					expand: true,
				}],
			},
			plurals: {
				options:{
					textdomain: 'my-domain',
					createReportFile: 'tmp/check-textdomain/plurals.json',
					keywords: keywords
				},
				files: [{
					src: ['tmp/check-textdomain/plurals.php'],
					expand: true,
				}],
			}
		},

		// Unit tests.
		nodeunit: {
			tests: ['test/*_test.js'],
		}

	});

	// Register default task.
	grunt.registerTask( 'default', ['jshint', 'test']);

	// Whenever the "test" task is run, first clean the "tmp" dir,
	// copy the "fixtures", then run this plugin's task(s), then test the result.
	grunt.registerTask( 'test', ['clean', 'copy', 'makepot', 'checktextdomain', 'nodeunit']);

};
