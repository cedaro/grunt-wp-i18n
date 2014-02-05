/*
 * grunt-wp-i18n
 * https://github.com/blazersix/grunt-wp-i18n
 *
 * Copyright (c) 2014 Blazer Six, Inc.
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function( grunt ) {

	var async = require( 'async' ),
		path = require( 'path' ),
		util = require( './lib/util' ).init( grunt ),
		localConfig = require( './lib/util' ).init( grunt ).getLocalConfig(),
		wp = require( './lib/wordpress' ).init( grunt );

	/**
	 * Add the text domain to gettext functions.
	 *
	 * @link http://develop.svn.wordpress.org/trunk/tools/i18n/
	 */
	grunt.registerMultiTask( 'addtextdomain', function() {
		var done = this.async(),
			o;

		o = this.options({
			i18nToolsPath: path.resolve( __dirname, '../vendor/wp-i18n-tools/' ),
			textdomain: ''
		});

		// Use the Text Domain header or project folder name
		// if it hasn't been set.
		if ( '' === o.textdomain ) {
			o.textdomain = wp.getHeader( 'Text Domain' ) || wp.slugify();
		}

		o.i18nToolsPath = localConfig.i18nToolsPath || o.i18nToolsPath;

		// Make sure the add-textdomain.php script exists.
		o.addTextdomainScript = path.join( o.i18nToolsPath, 'add-textdomain.php' );
		if ( ! grunt.file.exists( o.addTextdomainScript ) ) {
			grunt.fatal( 'add-textdomain.php could not be found in ' + o.i18nToolsPath );
		}

		this.files.forEach(function( f ) {
			var files = f.src.filter(function( filepath ) {
				// Warn on and remove invalid source files (if nonull was set).
				if ( ! grunt.file.exists( filepath ) ) {
					grunt.log.warn( 'Source file "' + filepath + '" not found.' );
					return false;
				} else {
					return true;
				}
			});

			async.eachSeries( files, function( file, nextFile ) {
				grunt.util.spawn({
					cmd: 'php',
					args: [
						o.addTextdomainScript,
						'-i',
						o.textdomain,
						path.resolve( process.cwd(), file ),
						path.resolve( process.cwd(), f.dest.replace( '/', '' ) )
					],
					opts: { stdio: 'inherit' }
				}, function( error, result, code ) {
					nextFile();
				});
			}, function( error, result ) {
				done( error, result );
			});
		});
	});

};
