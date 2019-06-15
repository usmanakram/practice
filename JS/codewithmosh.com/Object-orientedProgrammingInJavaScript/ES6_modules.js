// Source: Object-oriented Programming in JavaScript | Mosh
// Source Link: 

//////////////////////////////////////////////////////////////

// Modules

/**
 * We should split our code into multiple files, and we call each of these 
 * files a module. This gives us a number of benefits.
 * 1) Maintainability (better organized)
 * 2) Reuse
 * 3) Abstract (hide complexity in a module, expose only essentials)
 */ 

/** 
 * In ES5 we didn't have the concept of modules. So different solutions emerged to solve this problem. Smart developers 
 * in the community introduced new syntaxes to define modules. We refer to these syntax's as module formats. 
 * So the populur module formats we have are 
 * 1) AMD which stands for asynchronous module definition, and this is primarily used in browser applications. 
 * 2) You also have CommonJS which is used in Node, 
 * 3) you have UMD which stands for universal module definition, and this can be used both in the browser and in Node. 
 * So we use this module formats in ES5, but as of ES6 JavaScript natively supports a module format. Now out of this list, 
 * we're going to focus only on two formats. 
 * CommonJS because that's used in Node, 
 * and ES6 modules because that's used in browsers. 
 * So technically going forward, you don't need to learn about AMD or UMD unless you're maintaining a lagacy application 
 * that is build around these module formats.
 */

//////////////////////////////////////////////////////////////

// CommonJS Modules

// Look inside "006ES6_modulesCommonJS_Modules" directory

//////////////////////////////////////////////////////////////

// ES6 Modules

// Look inside "006ES6_modulesES6_Modules" directory

//////////////////////////////////////////////////////////////

// ES6 Tooling

/**
 * When using modern JavaScript we need two kinds of tools, 
 * 1) transpiler
 * 2) bundler
 * 
 * Transpiler is the combination of two words. Translator & Compiler.
 * It's a tool that convert modern JS code into lagacy code that every browser can understand.
 * Babel is a very popular example of transpiler.
 * 
 * Module bundler is responsible for combining all our JS files into a single file which we call a bundle.
 * Webpack is a very popular example of budler/module bundler. Webpack minify the code as well.
 */

//////////////////////////////////////////////////////////////

// Babel

/**
 * Instal latest stable version of node
 * Create a new folder using command "mkdir es6-tooling"
 * Go inside the folder "cd es6-tooling"
 * Initialize a node project in this folder by running command "npm init --yes"
 * It will create a file named package.json which is an identification of our application.
 * 
 * We are going to install 3 packages.
 * 1) babel-cli, it is Babels's command line interface 
 * 2) babel-core, it contains all the logic for transpiling code is implemented. 
 * 3) babel-preset-env, in Babel we have a separet plugin for every new JavaScript feature starting from ES6.
 * 		"preset" is the combination of all these plugins, so it understands all new features of JS starting from ES6.
 * 
 * "--save-dev" flag means, we are going to install these as development dependencies.
 * 		So they are not going to be part of our application, they are not going to be deployed to the production,
 * 		they are purely on the development machine
 * 
 * "npm i babel-cli@6.26.0 babel-core@6.26.0 babel-preset-env@1.6.1 --save-dev"
 */

// Look "index.js" inside "es6-tooling" directory

/**
 * Modify a line inside "package.json"
 * Replace ("test": "echo \"Error: no test specified\" && exit 1")
 * with ("babel": "babel --presets env index.js -o build/index.js")
 * Run npm command "npm run babel" inside "es6-tooling" directory, 
 * it will automatically run the command that we have modified inside "package.json" file.
 */

//////////////////////////////////////////////////////////////

// Webpack

/**
 * We are going to install webpack globally so we can access it in every project.
 * Go to "006ES6_modulesWebpack" directory and run following command
 * 		"npm i -g webpack-cli@2.0.14"
 * put "sudo", if you are on Mac and have not set permissions properly.
 * Now, we need to create webpack configuration file. Fro that, run another command inside same folder
 * 		"webpack-cli init"
 * and answer simple questions
 * Now, we need "package.json" file. Run another command
 * 		"npm init --yes"
 * In the script section of "package.json" file, we are going to add a new command 
 * 		("build": "webpack",)
 * Now everything is ready, let's bundle our application. Run following command 
 * 		"npm run build"
 */

 // Last tutorial "Webpack" could not perform practically, because, some error occurred