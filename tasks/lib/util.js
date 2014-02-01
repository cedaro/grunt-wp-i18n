/*
 * grunt-wp-i18n
 * https://github.com/blazersix/grunt-wp-i18n
 *
 * Copyright (c) 2014 Blazer Six, Inc.
 * Licensed under the MIT license.
 */

'use strict';

exports.init = function( grunt ) {
	var exports = {};

	/**
	 * Load local config options from config.json in the project root.
	 *
	 * The config.json may contain sensitive data and should not be included in
	 * version control.
	 *
	 * @return {Object}
	 */
	exports.getLocalConfig = function() {
		var localConfig = {};

		if ( grunt.file.exists( 'config.json' ) ) {
			localConfig = grunt.file.readJSON( 'config.json' );
		}

		return localConfig;
	};

	return exports;
};
