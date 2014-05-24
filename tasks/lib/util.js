/*
 * grunt-wp-i18n
 * https://github.com/blazersix/grunt-wp-i18n
 *
 * Copyright (c) 2014 Blazer Six, Inc.
 * Licensed under the MIT license.
 */

'use strict';

exports.init = function( grunt ) {
	var crypto = require( 'crypto' ),
		exports = {};

	/**
	 * Normalize POT objects created by gettext-parser.
	 *
	 * Headers are stored in two locations.
	 *
	 * @param {Object} pot POT file object created by gettext-parser.
	 * @param {Object} data Additional data to normalize.
	 *
	 * @return {Object}
	 */
	function normalizePotData( pot, data ) {
		// Normalize the content type case.
		pot.headers['content-type'] = pot.headers['content-type'].toLowerCase();
		pot.translations['']['']['msgstr'][0] = pot.translations['']['']['msgstr'][0].replace( /UTF-8/, 'utf-8' );

		// Update the date.
		if ( 'undefined' !== typeof data && 'date' in data ) {
			pot.headers['pot-creation-date'] = data.date;
			pot.translations['']['']['msgstr'][0] = pot.translations['']['']['msgstr'][0].replace( /POT-Creation-Date: (.+)/, 'POT-Creation-Date: ' + data.date );
		}

		return pot;
	}

	/**
	 * Determine whether two POT file objects are the same.
	 *
	 * Replaces the date in the second object before comparing.
	 *
	 * @param {Object} pot POT file object created by gettext-parser.
	 * @param {Object} pot POT file object created by gettext-parser.
	 *
	 * @return {Boolean}
	 */
	exports.comparePotFiles = function( original, compare ) {
		var compareHash, originalDate, originalHash;

		original = normalizePotData( original );
		originalDate = original.headers['pot-creation-date'];
		originalHash = crypto.createHash( 'md5' ).update( JSON.stringify( original ) ).digest( 'hex' );

		compare = normalizePotData( compare, { date: originalDate });
		compareHash = crypto.createHash( 'md5' ).update( JSON.stringify( compare ) ).digest( 'hex' );

		return originalHash === compareHash;
	};

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

	/**
	 * Fix POT headers.
	 *
	 * Updates case-sensitive Poedit headers.
	 *
	 * @param {String} pot POT file contents.
	 *
	 * @return {String}
	 */
	exports.fixHeaders = function( pot ) {
		pot = pot.replace( /x-poedit-keywordslist:/i, 'X-Poedit-KeywordsList:' );
		pot = pot.replace( /x-poedit-searchpath-0:/i, 'X-Poedit-SearchPath-0:' );
		pot = pot.replace( /x-poedit-sourcecharset:/i, 'X-Poedit-SourceCharset:' );
		return pot;
	};

	return exports;
};
