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
	setUp: function( done ) {
		done();
	},

	basic_plugin: function( test ) {
		test.expect( 3 );
		var pluginName = 'Example Plugin';
		var potFile = 'tmp/basic-plugin/basic-plugin.pot';
		test.ok( grunt.file.exists( potFile ), 'should compile a pot file in the main plugin directory' );

		var pot = gettext.po.parse( grunt.file.read( potFile ) );
		test.equal( pot.headers['project-id-version'], pluginName, 'the plugin name should be the project id in the pot file' );
		test.equal( pot.translations[''][ pluginName ]['msgid'], pluginName, 'the plugin name should be included as a string in the pot file' );

		test.done();
	},

	different_slugs: function( test ) {
		test.expect( 1 );
		var potFile = 'tmp/different-slugs/different-slugs.pot';
		test.ok( grunt.file.exists( potFile ), 'should compile a pot file in the main plugin directory based on the directory name' );
		test.done();
	},

	plugin_headers: function( test ) {
		test.expect( 8 );
		var potFile = 'tmp/plugin-headers/languages/example-plugin.pot';
		test.ok( grunt.file.exists( potFile ), 'should compile a pot file based on the text domain header in the /languages subdirectory' );

		var pot = grunt.file.read( potFile );
		test.equal( pot.indexOf( '# A new comment header.' ), 0, 'the comment at the beginning of the pot file should match the potComments option' );

		var teamHeader = 'Team Name <team@example.com>';
		pot = gettext.po.parse( pot );
		test.equal( pot.headers['language-team'], teamHeader, 'the language team header should match the value set in the processPot callback' );

		var bugReportHeader = 'https://github.com/blazersix/grunt-wp-i18n/issues';
		test.equal( pot.headers['report-msgid-bugs-to'], bugReportHeader, 'the report-msgid-bugs-to header should match the value set in the potHeaders option' );

		var potHeaders = pot.translations['']['']['msgstr'][0];
		test.notEqual( potHeaders.indexOf( 'X-Poedit-KeywordsList' ), -1, 'the X-Poedit-KeywordsList header is case-sensitive' );
		test.notEqual( potHeaders.indexOf( 'X-Poedit-SearchPath-0' ), -1, 'the X-Poedit-SearchPath-0 header is case-sensitive' );
		test.notEqual( potHeaders.indexOf( 'X-Poedit-SearchPathExcluded-0' ), -1, 'the X-Poedit-SearchPathExcluded-0 header is case-sensitive' );
		test.notEqual( potHeaders.indexOf( 'X-Poedit-SourceCharset' ), -1, 'the X-Poedit-SourceCharset header is case-sensitive' );

		test.done();
	},

	theme_headers: function( test ) {
		test.expect( 2 );
		var potFile = 'tmp/theme-headers/theme-headers.pot';
		test.ok( grunt.file.exists( potFile ), 'should compile a pot file in the main theme directory' );

		var pot = gettext.po.parse( grunt.file.read( potFile ) );
		var teamHeader = 'Team Name <team@example.com>';
		test.equal( pot.headers['language-team'], teamHeader, 'the language team header should match the value set in the processPot callback' );
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
		test.equal( pot.headers['project-id-version'], themeName, 'the theme name should be the project id in the pot file' );
		test.equal( pot.translations[''][ themeName ]['msgid'], themeName, 'the theme name should be included as a string in the pot file' );
		test.equal( pot.translations[''][ templateName ]['msgid'], templateName, 'the full width page template name should be included as a string in the pot file' );
		test.equal( 'Exclude' in pot.translations[''], false );

		test.done();
	},

	plugin_include: function( test ) {
		test.expect( 3 );
		var pluginName = 'Example Plugin';
		var potFile = 'tmp/plugin-include/plugin-include.pot';
		var pot = gettext.po.parse( grunt.file.read( potFile ) );

		test.equal( 'Exclude' in pot.translations[''], false, "the 'Exclude' string should not be included in the pot file" );
		test.ok( 'Include' in pot.translations[''], "the 'Include' string should be included in the pot file" );
		test.equal( pot.translations[''][ pluginName ]['msgid'], pluginName, 'the plugin name should be included as a string in the pot file' );

		test.done();
	},

	common_pot_headers: function( test ) {
		test.expect( 9 );
		var potFile = 'tmp/common-pot-headers/common-pot-headers.pot';
		var pot = gettext.po.parse( grunt.file.read( potFile ) );

		test.equal( pot.headers['language'], 'en', "the Language header value should be 'en' when potHeaders.poedit is true" );
		test.equal( pot.headers['plural-forms'], 'nplurals=2; plural=(n != 1);', "the Plural-Forms header value should be 'nplurals=2; plural=(n != 1);' when potHeaders.poedit is true" );
		test.equal( pot.headers['x-poedit-country'], 'United States', "the X-Poedit-Country header value should be 'United States' when potHeaders.poedit is true" );
		test.equal( pot.headers['x-poedit-sourcecharset'], 'UTF-8', "the X-Poedit-SourceCharset header value should be 'UTF-8' when potHeaders.poedit is true" );
		test.equal( pot.headers['x-poedit-basepath'], '../', "the X-Poedit-Basepath header value should be '../' when potHeaders.poedit is true" );
		test.equal( pot.headers['x-poedit-searchpath-0'], '.', "the X-Poedit-SearchPath-0 header value should be '.' when potHeaders.poedit is true" );
		test.equal( pot.headers['x-poedit-bookmarks'], '', "the X-Poedit-Bookmarks header value should be '' when potHeaders.poedit is true" );
		test.equal( pot.headers['x-textdomain-support'], 'yes', "the X-Textdomain-Support header value should be 'yes' when potHeaders.poedit is true" );
		test.ok( 'x-poedit-keywordslist' in pot.headers, "the X-Poedit-KeywordsList header should be included when potHeaders.poedit is true" );

		test.done();
	},

	customize_common_pot_headers: function( test ) {
		test.expect( 3 );
		var potFile = 'tmp/common-pot-headers/custom-pot-headers.pot';
		var pot = gettext.po.parse( grunt.file.read( potFile ) );

		test.equal( pot.headers['language'], 'es', "the Language header value should be 'es'" );
		test.equal( pot.headers['x-poedit-country'], 'Spain', "the X-Poedit-Country header value should be 'Spain'" );
		test.equal( pot.headers['x-poedit-keywordslist'], '', "the X-Poedit-KeywordsList header value should be empty" );

		test.done();
	},
};

exports.makepotTimestamp = {
	potDate: '2014-03-20 19:54:59+00:00',

	setUp: function( done ) {
		var potFile = 'tmp/basic-plugin/basic-plugin.pot';
		var pot = gettext.po.parse( grunt.file.read( potFile ) );

		// Set to an old date to ensure the header isn't updated.
		pot.headers['pot-creation-date'] = exports.makepotTimestamp.potDate;
		grunt.file.write( potFile, gettext.po.compile( pot ) );

		done();
	},

	persist_timestamp: function( test ) {
		test.expect( 2 );
		var potFile = 'tmp/basic-plugin/basic-plugin.pot';
		test.ok( grunt.file.exists( potFile ), 'should compile a pot file in the main plugin directory' );

		var pot = gettext.po.parse( grunt.file.read( potFile ) );
		test.equal( exports.makepotTimestamp.potDate, pot.headers['pot-creation-date'], 'the pot creation date header should not be updated' );

		test.done();
	},
};
