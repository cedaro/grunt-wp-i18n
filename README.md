# grunt-wp-i18n

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
* [PHP CLI](http://www.php.net/manual/en/features.commandline.introduction.php) and [gettext](http://www.gnu.org/software/gettext/) must be in your system path.
* You must have a local copy of the [WordPress i18n tools](http://develop.svn.wordpress.org/trunk/tools/i18n/).

## Makepot task

_Run this task with the `grunt makepot` command._

### Overview
In your project's Gruntfile, add a section named `makepot` to the data object passed into `grunt.initConfig()`.

```js
grunt.initConfig({
    makepot: {
        target: {
            cwd: '',           // Directory of files to internationalize.
            domainPath: '',    // Where to save the POT file.
            i18nToolsPath: '', // Path to the i18n tools directory.
            mainFile: '',      // Main project file.
            potFilename: '',   // Name of the POT file.
            type: 'wp-plugin'  // Type of project (wp-plugin or wp-theme).
        }
    }
});
```

### Options

#### options.cwd
Type: `String`  
Default value: `''`

The directory that should be internationalized. Defaults to the project root, but can be set to a subdirectory, for instance, when being used in a build process. Should be relative to the project root.

#### options.domainPath
Type: `String`  
Default value: `''`
Example value: `'/languages'`

The directory where the POT file should be saved. Defaults to using the value from the 'Domain Path' header if it exists.

#### options.i18nToolsPath
Type: `String`  
Default value: `'../../../../tools/i18n/'`

Path to a local copy of the WordPress i18n tools. May be relative to the project or an absolute path. Defaults to the path where the i18n tools would exist when developing in the standard WordPress development structure from http://develop.svn.wordpress.org/trunk/

#### options.mainFile
Type: `String`  
Default value: `''`  
Example value: `'plugin-slug.php'` or `'style.css'`

Name of the main project file where the headers can be found. In themes, this will default to `style.css`. An attempt will be made to auto-discover the main file for plugins, but specifying it here can improve performance and will help disambiguate between multiple plugin files in the same project.

#### options.potFilename
Type: `String`  
Default value: `''`  
Example value: `'plugin-or-theme-slug.pot'`

Name of the POT file. Defaults to using the 'Text Domain' header if it exists, otherwise uses the project directory name.

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

#### Local Config

Gruntfile.js is shared between anyone working on a project, however, developers developers may wish to save their i18n tools in a custom location. To do so, save the `i18nToolsPath` in a `config.json` file in the project directory. This file may contain other local configuration options or sensitive data, so it should not be checked in to version control.

```json
{
    "i18nToolsPath": "/path/to/i18n-tools/"
}
```

## Roadmap

* Add a task for the `add-textdomain.php` console app.
* Consider copying project files to a temp directory so development files can be excluded (node_modueles, .git, tests, etc).
* Add some tests.

## Release History

#### 0.1.0

* Initial release.
