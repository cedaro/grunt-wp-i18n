/*
 * grunt-wp-i18n
 * https://github.com/cedaro/grunt-wp-i18n
 *
 * Copyright (c) 2014 Cedaro, LLC
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function( grunt ) {

	var async = require( 'async' ),
		path = require( 'path' ),
		wp = require( './lib/wordpress' ).init( grunt );

	/**
	 * Add the text domain to gettext functions.
	 *
	 * @link http://develop.svn.wordpress.org/trunk/tools/i18n/
	 */
	grunt.registerMultiTask( 'addtextdomain', 'Add the text domain to gettext functions.', function() {
		var done = this.async(),
			files = [],
			cmdArgs, o;

		o = this.options({
			textdomain: '',
			updateDomains: []
		});

		// Use the Text Domain header or project folder name
		// if it hasn't been set.
		if ( '' === o.textdomain ) {
			o.textdomain = wp.getHeader( 'Text Domain' ) || wp.slugify();
		}

		if ( true === o.updateDomains ) {
			o.updateDomains = ['all'];
		}

		// Build the list of CLI args.
		cmdArgs = [
			path.resolve( __dirname, '../vendor/wp-i18n-tools/grunt-add-textdomain.php' ),
			'-i',
			o.textdomain,
			'',
			o.updateDomains.join( ',' )
		];

		if ( grunt.option( 'dry-run' ) ) {
			cmdArgs[1] = '';
		}

		this.files.forEach(function( f ) {
			var filtered = f.src.filter(function( filepath ) {
				// Warn on and remove invalid source files (if nonull was set).
				if ( ! grunt.file.exists( filepath ) ) {
					grunt.log.warn( 'Source file "' + filepath + '" not found.' );
					return false;
				} else {
					return true;
				}
			});

			files = files.concat( filtered );
		});

		async.eachSeries( files, function( file, nextFile ) {
			cmdArgs[3] = path.resolve( process.cwd(), file );

			grunt.util.spawn({
				cmd: 'php',
				args: cmdArgs,
				opts: { stdio: 'inherit' }
			}, function() {
				nextFile();
			});
		}, function( error, result ) {
			done( error, result );
		});
	});

};
