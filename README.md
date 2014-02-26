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

* [makepot](#makepot-task) - Generate a POT file.
* [addtextdomain](#addtextdomain-task) - Add a text domain to gettext functions.


## Makepot task

Generate a POT file for translators to use when translating your plugin or theme.

_Run this task with the `grunt makepot` command._


### Overview

In your project's Gruntfile, add a section named `makepot` to the data object passed into `grunt.initConfig()`.

```js
grunt.initConfig({
    makepot: {
        target: {
            options: {
                cwd: '',           // Directory of files to internationalize.
                domainPath: '',    // Where to save the POT file.
                exclude: [],       // List of files or directories to ignore.
                i18nToolsPath: '', // Path to the i18n tools directory.
                mainFile: '',      // Main project file.
                potFilename: '',   // Name of the POT file.
                type: 'wp-plugin'  // Type of project (wp-plugin or wp-theme).
            }
        }
    }
});
```

### Options

#### options.cwd
Type: `String`  
Default value: `''`  
Example value: `'release'`

The directory that should be internationalized. Defaults to the project root, but can be set to a subdirectory, for instance, when being used in a build process. Should be relative to the project root.

#### options.domainPath
Type: `String`  
Default value: `''`  
Example value: `'/languages'`

The directory where the POT file should be saved. Defaults to the value from the "Domain Path" header if it exists.

#### options.exclude
Type: `String`  
Default value: `[]]`  
Example value: `'['subdir/.*']'`

List of files or directories to ignore when generating the POT file. Note that the globbing pattern is a basic PHP [regular expression](https://github.com/blazersix/grunt-wp-i18n/blob/develop/vendor/wp-i18n-tools/extract.php#L59).

#### options.i18nToolsPath
Type: `String`

Path to a local copy of the WordPress i18n tools. May be relative to the project or an absolute path. Defaults to a bundled version of the i18n tools.

#### options.mainFile
Type: `String`  
Default value: `''`  
Example value: `'plugin-slug.php'` or `'style.css'`

Name of the main project file where the headers can be found. In themes, this will default to `style.css`. An attempt will be made to auto-discover the main file for plugins, but specifying it here can improve performance and will help disambiguate between multiple plugin files in the same project.

#### options.potFilename
Type: `String`  
Default value: `''`  
Example value: `'plugin-or-theme-slug.pot'`

Name of the POT file. Defaults to the "Text Domain" header if it exists, otherwise uses the project directory name.

#### options.type
Type: `String`
Default value: `'wp-plugin'`  
Example value: `'wp-plugin'` or `'wp-theme'`

The type of project.


### Usage Examples

#### Default Options

All options are optional, but at the very least a target needs to exist, so at a minimum, set an option specifying the type of project.

```js
grunt.initConfig({
    makepot: {
        target: {
            options: {
                type: 'wp-plugin'
            }
        }
    }
});
```

#### Custom Options

If using with a custom build process, the following config would process strings in the `/release` subdirectory and save the POT file at `/release/languages/plugin-slug.pot`.

```js
grunt.initConfig({
    makepot: {
        target: {
            options: {
                cwd: 'release'
                domainPath: '/languages',
                mainFile: 'plugin-slug.php',
                potFilename: 'plugin-slug.pot',
                type: 'wp-plugin'
            }
        }
    }
});
```

## Addtextdomain task

Add the text domain to gettext functions in your plugin or theme.

**Warning:** This task will overwrite files in your project. Be sure to have a backup or commit any changes before running it. Viewing a diff after the task has run is a good way to verify any changes.

_Run this task with the `grunt addtextdomain` command._

### Overview

In your project's Gruntfile, add a section named `addtextdomain` to the data object passed into `grunt.initConfig()`.

```js
grunt.initConfig({
    addtextdomain: {
        options: {
            i18nToolsPath: '', // Path to the i18n tools directory.
            textdomain: '',    // Project text domain.
        },
        target: {
            files: {}
        }
    }
});
```

### Options

#### options.i18nToolsPath
Type: `String`

Path to a local copy of the WordPress i18n tools. May be relative to the project or an absolute path. Defaults to a bundled version of the i18n tools.

#### options.textdomain
Type: `String`  
Default value: `''`  
Example value: `'plugin-or-theme-slug'`

Defaults to the "Text Domain" header if it exists, otherwise uses the project directory name.


### Usage Examples

Options may be specified at the task or target level, but are optional. Each target must define the files that should be operated on. It's not necessary to declare a destination since the files will be updated in place.

```js
grunt.initConfig({
    addtextdomain: {
        target: {
            files: {
                src: [ '*.php', '**/*.php', '!node_modules/**', '!tests/**' ]
            }
        }
    }
});
```

This task supports the file mapping format Grunt supports. Please read [Globbing patterns](http://gruntjs.com/configuring-tasks#globbing-patterns) and [Building the files object dynamically](http://gruntjs.com/configuring-tasks#building-the-files-object-dynamically) for additional details.


## Local Config

Options defined in Gruntfile.js are shared between anyone working on a project, however, developers may wish to save their i18n tools in a custom location. To do so, add the `i18nToolsPath` in a `config.json` file in the project directory. This file may contain other local configuration options or sensitive data, so it should not be checked in to version control.

```json
{
    "i18nToolsPath": "/path/to/i18n-tools/"
}
```


## Release History

#### 0.4.0

* Added an `exclude` option to ignore strings in specified directories or files.
* Set the current working directory based on the `cwd` option. All options should be relative to `cwd`.
* Fixed the searching process in `wordpress.getMainFile()` if the standard main file can't be found.
* Attempt to prevent an error in the CLI tools if the main plugin file name doesn't match the guessed slug.
* Added some basic tests.

#### 0.3.1

* Fixed a bug where the text domain wasn't properly guessed in subdirectories if the Text Domain header didn't exist.
* Moved all the makepot functionality into a single task.

#### 0.3.0

* Added the `addtextdomain` task.

#### 0.2.0

* Forked and bundled the WordPress i18n tools so they no longer need to be downloaded separately.
* Removed the gettext dependency by relying on the [gettext-parser](https://github.com/andris9/gettext-parser) package to remove duplicate strings in POT files.
* Fixed the wp.slugify() method to properly guess the project slug when in an SVN repo.

#### 0.1.0

* Initial release.
