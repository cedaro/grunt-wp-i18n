/*
 * grunt-wp-i18n
 * https://github.com/cedaro/grunt-wp-i18n
 *
 * Copyright (c) 2014 Cedaro, LLC
 * Licensed under the MIT license.
 */

'use strict';

var wpi18n = require( 'node-wp-i18n' );

module.exports = function( grunt ) {

	/**
	 * Add the text domain to gettext functions.
	 *
	 * @link http://develop.svn.wordpress.org/trunk/tools/i18n/
	 */
	grunt.registerMultiTask( 'addtextdomain', 'Add the text domain to gettext functions.', function() {
		var options,
			done = this.async(),
			files = [];

		options = this.options({
			dryRun: grunt.option( 'dry-run' ),
			textdomain: '',
			updateDomains: []
		});

		this.files.forEach(function( f ) {
			var filtered = f.src.filter(function( filepath ) {
				return grunt.file.exists( filepath );
			});

			files = files.concat( filtered );
		});

		wpi18n.addtextdomain( files, options )
		.catch(function( error ) {
			console.log( error );
		})
		.finally( done );
	});

};
