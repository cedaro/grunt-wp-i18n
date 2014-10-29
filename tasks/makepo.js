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
		util = require( './lib/util' ).init( grunt );

	/**
	 * Create a PO file from an existing POT file.
	 */
	grunt.registerMultiTask( 'makepo', 'Create a PO file for a locale from an existing POT file.', function( locale ) {
		var o;

		locale = locale || grunt.option( 'locale' );

		if ( _.isEmpty( locale ) ) {
			grunt.fatal( 'Specify a locale for the PO file. Ex: grunt makepo::{locale} or grunt makepo --locale={locale}' );
		}

		o = this.options({
			processPo: null,
			type: ''
		});

		// Determine the project type if it hasn't been specified.
		if ( '' === o.type ) {
			o.type = grunt.file.exists( 'style.css' ) ? 'wp-theme' : 'wp-plugin';
		}

		this.files.forEach(function( f ) {
			var files, poFile, pot, potFile;

			files = f.src.filter(function( filepath ) {
				// Warn on and remove invalid source files (if nonull was set).
				if ( ! grunt.file.exists( filepath ) ) {
					grunt.log.warn( 'Source file "' + filepath + '" not found.' );
					return false;
				} else {
					return true;
				}
			});

			// Only need the first source file.
			potFile = files.shift();

			if ( ! grunt.file.exists( potFile ) ) {
				// @todo Add an option to force the makepot task to run beforehand.
				// @todo Add an option to specify which makepot target to run.
				grunt.fatal( 'A POT file could not be found at ' + potFile );
			}

			poFile = ( 'wp-theme' === o.type ) ? path.join( f.orig.dest, locale + '.po' ) : f.dest.replace( '.pot', '-' + locale + '.po' );

			if ( grunt.file.exists( poFile ) ) {
				grunt.warn( 'A PO file for that locale already exists.' );
				// @todo msgmerge would be good in this case, but would need a Node-based solution.
			}

			pot = gettext.po.parse( grunt.file.read( potFile ) );

			// @todo Update some common headers if they exist (language, plural-forms?).

			// Allow the POT file to be modified with a callback.
			if ( _.isFunction( o.processPo ) ) {
				pot = o.processPo.call( undefined, pot, o );
			}

			// Fix headers.
			pot = gettext.po.compile( pot ).toString();
			pot = util.fixHeaders( pot );

			// Save the PO file.
			grunt.file.write( poFile, pot );
			grunt.log.ok( 'PO file saved to ' + poFile );
		});
	});

};
