'use strict';

var grunt = require( 'grunt' );

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

exports.makepo = {
	setUp: function( done ) {
		done();
	},

	plugin: function( test ) {
		test.expect( 1 );

		test.ok( grunt.file.exists( 'tmp/makepo-plugin/makepo-plugin-es_ES.po' ), 'should copy the POT file to makepo-plugin-es_ES.po' );

		test.done();
	},

	theme: function( test ) {
		test.expect( 1 );

		test.ok( grunt.file.exists( 'tmp/makepo-theme/es_ES.po' ), 'should copy the POT file to es_ES.po' );

		test.done();
	},
};
