penumbra-require
================

`penumbra-require` requires a module from the directory **.penumbra_modules** in the users home directory.

Install modules there, and build modules that will be shared among projects.

Basic Usage
-----------

In the **penumbra_modules** directory create a file named **test.js** with these contents:

```javascript
module.exports = function(){
    return "I'm a value from the test module.";
};
```

Some where, any where create a javascript file with these contents:

```javascript
var prequire = require('../index');
var test = prequire('test')();
console.log(test);
```

Run the above module on the command line.

Usage With penumbra
-------------------

Change the test file to this:

```javascript
module.exports = function * (){
    //Make sure this a generator function.
    var someText = yield Promise.resolve('some text');
    return "I'm a value from the test module with " + someText + ".";
};
```

In a [penumbra](https://github.com/hollowdoor/penumbra) task file

```javascript
var pen = require('penumbra')(),
    prequire = require('../index'),
    test = prequire('test');

pen.task('test', function * (){
    //Make sure to use yield * (yield star).
    //This allows the test generator to 'delegate' to this generator.
    console.log(yield * test());
});
```

Assuming the above code is saved in a file called **tasks.js** run it on the command line:

`node tasks test`

What `penumbra-require` does
----------------------------

1.	First it looks in **.penumbra_modules** under your home directory.
2.	If no module is found there it looks in the current directory.

`penumbra-require` uses a regular call to node **require** so everything is handled by node.

If you call `prequire('buildjs')`:

-	If you have a directory called **{HOME_DIR}/.penumbra_modules/buildjs** that contains an **index.js** file that module will be loaded.
-	If you have a file called **{HOME_DIR}/.penumbra_modules/buildjs.js** that file will be loaded as a module.

All the symantics for a reqular `require` call work with `penumbra-require`.

What's this for?
----------------

Some people like to reduce code rewriting. This module allows that code reduction.

Create a directory named **.penumbra_modules** in your home directory.

Then create a bunch of generator modules to be consumed by the `penumbra` task runner.

`prequire` those modules everywhere.

If you use a lot of the same kind of build code in many projects this should ease the explosion of code that comes from making task runner files.

`penumbra-require` will work with any modules, and not just `penumbra` compatible ones. So there's that too.

Some things to ponder
---------------------

Make sure you take care of working directory resolution. Anywhere you need the current working directory use:

```javascript
var cwd = process.cwd();
```

Otherwise make sure you pass the full file path to any modules you require with `penumbra-require`.

---

Dependencies for modules in **.penumbra_modules** should be installed there.

---

An alternative might be [systemjs](https://github.com/systemjs/systemjs) which uses async module loading. Which is totally doable in `penumbra`'s generator task callbacks. The support for node native modules in **systemjs** have been sketchy so be aware some modules in **node**, or from **npm** might not work with it.
