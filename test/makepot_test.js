'use strict';

var grunt = require( 'grunt' ),
	gettext = require( 'gettext-parser' );

/*
======== A Handy Little Nodeunit Reference ========
https://github.com/caolan/nodeunit

Test methods:
	test.expect( numAssertions )
	test.done()
Test assertions:
	test.ok( value, [message])
	test.equal( actual, expected, [message])
	test.notEqual( actual, expected, [message])
	test.deepEqual( actual, expected, [message])
	test.notDeepEqual( actual, expected, [message])
	test.strictEqual( actual, expected, [message])
	test.notStrictEqual( actual, expected, [message])
	test.throws( block, [error], [message])
	test.doesNotThrow( block, [error], [message])
	test.ifError( value )
*/

exports.makepot = {
	setUp: function(done) {
		// setup here if necessary
		done();
	},

	basic_plugin: function( test ) {
		test.expect( 3 );
		var pluginName = 'Example Plugin';
		var potFile = 'tmp/basic-plugin/basic-plugin.pot';
		test.ok( grunt.file.exists( potFile ), 'should compile a pot file in the main plugin directory' );

		var pot = gettext.po.parse( grunt.file.read( potFile ) );
		test.equal( pluginName, pot.headers['project-id-version'], 'the plugin name should be the project id in the pot file' );
		test.equal( pluginName, pot.translations[''][ pluginName ]['msgid'], 'the plugin name should be included as a string in the pot file' );

		test.done();
	},

	different_slugs: function( test ) {
		test.expect( 1 );
		var potFile = 'tmp/different-slugs/different-slugs.pot';
		test.ok( grunt.file.exists( potFile ), 'should compile a pot file in the main plugin directory based on the directory name' );
		test.done();
	},

	plugin_headers: function( test ) {
		test.expect( 2 );
		var potFile = 'tmp/plugin-headers/languages/example-plugin.pot';
		test.ok( grunt.file.exists( potFile ), 'should compile a pot file based on the text domain header in the /languages subdirectory' );

		var pot = gettext.po.parse( grunt.file.read( potFile ) );
		var teamHeader = 'Team Name <team@example.com>';
		test.equal( teamHeader, pot.headers['language-team'], 'the language team header should match the value set in the processPot callback.' );

		test.done();
	},

	ignore_headers: function( test ) {
		test.expect( 1 );
		var potFile = 'tmp/plugin-headers/override.pot';
		test.ok( grunt.file.exists( potFile ), 'should compile a pot file in the main directory and ignore the headers' );
		test.done();
	},

	basic_theme: function( test ) {
		test.expect( 5 );
		var themeName = 'Example Theme';
		var templateName = 'Full Width';
		var potFile = 'tmp/basic-theme/basic-theme.pot';

		test.ok( grunt.file.exists( potFile ), 'should compile a pot file in the main theme directory' );

		var pot = gettext.po.parse( grunt.file.read( potFile ) );
		test.equal( themeName, pot.headers['project-id-version'], 'the theme name should be the project id in the pot file' );
		test.equal( themeName, pot.translations[''][ themeName ]['msgid'], 'the theme name should be included as a string in the pot file' );
		test.equal( templateName, pot.translations[''][ templateName ]['msgid'], 'the full width page template name should be included as a string in the pot file' );
		test.equal( false, 'Exclude' in pot.translations[''] );

		test.done();
	},
};
