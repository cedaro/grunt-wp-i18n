# grunt-wp-i18n [![Build Status](https://travis-ci.org/blazersix/grunt-wp-i18n.png?branch=develop)](https://travis-ci.org/blazersix/grunt-wp-i18n)

> Internationalize WordPress plugins and themes.

WordPress has a robust suite of tools to help internationalize plugins and themes. This plugin brings the power of those existing tools to Grunt in order to make it easy for you to automate the i18n process and make your projects more accessible to an international audience.

If you're not familiar with i18n concepts, read the Internationalization entries in the [Plugin Developer Handbook](http://make.wordpress.org/docs/plugin-developer-handbook/plugin-components/internationalization/) or [Theme Developer Handbook](http://make.wordpress.org/docs/theme-developer-handbook/theme-functionality/internationalization/).


## Getting Started

If you haven't used [Grunt](http://gruntjs.com/) before, be sure to check out the [Getting Started](http://gruntjs.com/getting-started) guide, as it explains how to create a [Gruntfile](http://gruntjs.com/sample-gruntfile) as well as install and use Grunt plugins. Once you're familiar with that process, you may install this plugin with this command:

```shell
npm install grunt-wp-i18n --save-dev
```

Once the plugin has been installed, it may be enabled inside your Gruntfile with this line of JavaScript:

```js
grunt.loadNpmTasks( 'grunt-wp-i18n' );
```

### Requirements

* This plugin requires Grunt `~0.4.0`.
* [PHP CLI](http://www.php.net/manual/en/features.commandline.introduction.php) must be in your system path.


## Tasks

This plugin consists of two configurable tasks:

* [makepot](docs/makepot.md) - Generate a POT file.
* [addtextdomain](docs/addtextdomain.md) - Add a text domain to gettext functions.


## Local Config

Options defined in Gruntfile.js are shared between anyone working on a project, however, developers may wish to save their i18n tools in a custom location. To do so, add the `i18nToolsPath` in a `config.json` file in the project directory. This file may contain other local configuration options or sensitive data, so it should not be checked in to version control.

```json
{
    "i18nToolsPath": "/path/to/i18n-tools/"
}
```
