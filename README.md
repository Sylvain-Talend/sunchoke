# [Talend Sunchoke](http://talend.github.io/sunchoke/doc/index.html)

Sunchoke is a set of reusable components built with [AngularJS](https://angularjs.org/) and [Bourbon](http://bourbon.io/)

### Dependencies
* angularJS 1.5 min. The widgets are based on the component helper definition introduced with version 1.5.
* angular-animate. Some widgets use angular-animate to perform some animations
* Bourbon 4. Bourbon is a sass library.

### Getting started

##### With Bower
```
bower install sunchoke
```

##### Main files
Npm and Bower "main files" configuration refers to
* the non minified distribution file
* the main Sass file (not the generated css)

Feel free to override the configuration as you need in your project configuration
```
"overrides": {
    "sunchoke": {
      "main": [
        "dist/sunchoke.min.js",
        "dist/sunchoke.min.css"
      ]
    },
}
```

##### Add sunchoke module to your project
```
angular.module('my-app', [
    'talend.sunchoke'
    ... your other dependencies
])
```

### Contribute

##### CLI
To create a new widget, please use the CLI to create the files and follow our naming conventions.
```
npm run add:widget
```
This will launch a CLI. You will have to answer 2 questions
* The widget name in camelCase with a capital letter (ex: FancyButton)
* Choose the optional entities (style file, controller file)

##### Lint
You can lint your code with eslint
```
npm run lint
```

##### Use Sunchoke  locally, without deploy to GitHub (developmment mode for example)
In order to update Sunchoke dependency locally :
- At the root of Sunchoke project
 ``` bower link ```
- At the root of the project which needs Sunchoke
 ``` bower link tds-sunchoke-new ```

You can use Sunchoke locally

##### Tests
```
npm run test
```

To run the tests in watch mode
```
npm run test:auto
```

The tests run generates a code coverage, available in the created `coverage/` folder.

##### Distribution
To generate distribution files
```
npm run dist
```

This will generate in a `dist/` folder containing 
* a minified Sunchoke lib, 
* a non minified one
* a generated minified css file
* a non minified one

##### Git
You can freely submit a pull request. [Github documentation](https://help.github.com/articles/using-pull-requests/)

Before that : 
* use ES6
* use Sass and bourbon mixins
* lint and clean your code
* test your code
* Please squash ! [Documentation](https://git-scm.com/book/en/v2/Git-Tools-Rewriting-History#Squashing-Commits)

##### Documentation
[Sunchoke user documentation](http://talend.github.io/sunchoke/doc/index.html) is hosted by Github Pages. It is based on gitbook.

Please refer to gh-pages branch README to add your documentation.

### Licence
Apache License Version 2.0, January 2004

See LICENCE file
