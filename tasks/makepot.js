/*
 * grunt-wp-i18n
 * https://github.com/blazersix/grunt-wp-i18n
 *
 * Copyright (c) 2014 Blazer Six, Inc.
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function( grunt ) {

	var _ = require( 'underscore' ),
		gettext = require( 'gettext-parser' ),
		path = require( 'path' ),
		util = require( './lib/util' ).init( grunt ),
		localConfig = util.getLocalConfig(),
		wp = require( './lib/wordpress' ).init( grunt );

	// Mix no-conflict string functions into the Underscore namespace.
	_.str = require( 'underscore.string' );
	_.mixin( _.str.exports() );

	/**
	 * Generate a POT file for translating strings.
	 *
	 * php-cli should be in the system path to run this task.
	 *
	 * @link http://develop.svn.wordpress.org/trunk/tools/i18n/
	 */
	grunt.registerMultiTask( 'makepot', function() {
		var done = this.async(),
			defaultI18nToolsPath = path.resolve( __dirname, '../vendor/wp-i18n-tools/' ),
			gruntBase = process.cwd(),
			cmdArgs, o;

		o = this.options({
			cwd: process.cwd(),
			domainPath: '',
			exclude: [],
			i18nToolsPath: defaultI18nToolsPath,
			mainFile: '',
			potFilename: '',
			type: 'wp-plugin'
		});

		// Set the current working directory.
		o.cwd = path.resolve( process.cwd(), o.cwd );
		grunt.file.setBase( o.cwd );

		// Attempt to discover the main project file.
		if ( '' === o.mainFile ) {
			o.mainFile = wp.getMainFile( o.type );
		}

		// Use Domain Path header if the domain path hasn't been set.
		if ( '' === o.domainPath ) {
			o.domainPath = wp.getHeader( 'Domain Path', o.mainFile );
		}

		// Use the Text Domain header or project folder name
		// for the pot file if it hasn't been set.
		if ( '' === o.potFilename ) {
			o.potFilename = wp.getHeader( 'Text Domain', o.mainFile ) + '.pot' || wp.slugify() + '.pot';
		}

		o.domainPath = _.ltrim( o.domainPath, [ '/', '\\' ] );
		o.i18nToolsPath = localConfig.i18nToolsPath || o.i18nToolsPath;
		o.potFile = path.join( o.cwd, o.domainPath, o.potFilename );

		// Make sure the makepot.php script exists.
		o.makepotScript = path.join( o.i18nToolsPath, 'makepot.php' );
		if ( ! grunt.file.exists( o.makepotScript ) ) {
			grunt.fatal( 'makepot.php could not be found in ' + o.i18nToolsPath );
		}

		// Create the domain path directory if it doesn't exist.
		grunt.file.mkdir( path.resolve( o.cwd, o.domainPath ) );

		// Reset the working directory.
		grunt.file.setBase( gruntBase );

		// Exclude the node_modules directory by default.
		o.exclude.push( 'node_modules/.*' );

		// Build the list of CLI args.
		cmdArgs = [
			o.makepotScript,
			o.type,
			o.cwd,
			o.potFile
		];

		// Only add custom CLI args if using the bundled tools.
		if ( defaultI18nToolsPath === o.i18nToolsPath ) {
			cmdArgs.push( o.exclude.join( ',' ) );
		}

		grunt.util.spawn({
			cmd: 'php',
			args: cmdArgs,
			opts: { stdio: 'inherit' }
		}, function( error, result, code ) {
			var pot;

			if ( 0 === code && grunt.file.exists( o.potFile ) ) {
				// Remove duplicates from the POT file.
				pot = gettext.po.parse( grunt.file.read( o.potFile ) );
				grunt.file.write( o.potFile, gettext.po.compile( pot ) );

				grunt.log.ok( 'POT file saved to ' + o.potFile );
			}

			done( error, result );
		});
	});

};
