#### Script loading strategies

The `defer` attribute, which tells the browser to continue downloading the HTML content once the `<script>` tag element has been reached.

```
<script src="script.js" defer></script>
```

In this case both the script and the HTML will load simultaneously and the code will work.

Note: In the external case, we did not need to use the `DOMContentLoaded` event because the `defer` attribute solved the problem for us. We didn't use the `defer` solution for the internal JavaScript example because `defer` only works for external scripts.

An old-fashioned solution to this problem used to be to put your script element right at the bottom of the body (e.g. just before the `</body>` tag), so that it would load after all the HTML has been parsed. The problem with this solution is that loading/parsing of the script is completely blocked until the HTML DOM has been loaded. On larger sites with lots of JavaScript, this can cause a major performance issue, slowing down your site.

##### async and defer

There are actually two ways we can bypass the problem of the blocking script — `async` and `defer`. Let's look at the difference between these two.

Async scripts will download the script without blocking rendering the page and will execute it as soon as the script finishes downloading. You get no guarantee that scripts will run in any specific order, only that they will not stop the rest of the page from displaying. It is best to use `async` when the scripts in the page run independently from each other and depend on no other script on the page.

For example, if you have the following script elements:

```
<script async src="js/vendor/jquery.js"></script>

<script async src="js/script2.js"></script>

<script async src="js/script3.js"></script>
```

You can't rely on the order the scripts will load in. `jquery.js` may load before or after `script2.js` and `script3.js` and if this is the case, any functions in those scripts depending on `jquery` will produce an error because `jquery` will not be defined at the time the script runs.

`defer` will run the scripts in the order they appear in the page and execute them as soon as the script and content are downloaded:

```
<script defer src="js/vendor/jquery.js"></script>

<script defer src="js/script2.js"></script>

<script defer src="js/script3.js"></script>
```

All the scripts with the `defer` attribute will load in the order they appear on the page. So in the second example, we can be sure that `jquery.js` will load before `script2.js` and `script3.js` and that `script2.js` will load before `script3.js`.

To summarize:

- If your scripts don't need to wait for parsing and can run independently without dependencies, then use `async`.
- If your scripts need to wait for parsing and depend on other scripts load them using `defer` and put their corresponding `<script>` elements in the order you want the browser to execute them.

[Read more](https://developer.mozilla.org/en-US/docs/Learn/JavaScript/First_steps/What_is_JavaScript)