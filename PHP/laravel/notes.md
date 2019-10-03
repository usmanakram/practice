<p align="center"><img src="https://laravel.com/assets/img/components/logo-laravel.svg"></p>

## Routing


Sometimes you may need to register a route that responds to multiple HTTP verbs. You may do so using the `match` method. Or, you may even register a route that responds to all HTTP verbs using the `any` method:

```php
Route::match(['get', 'post'], '/', function () {
    //
});

Route::any('/', function () {
    //
});
```

#### Redirect Routes
If you are defining a route that redirects to another URI, you may use the `Route::redirect` method. This method provides a convenient shortcut so that you do not have to define a full route or controller for performing a simple redirect:

```php
Route::redirect('/here', '/there');
```

By default, `Route::redirect` returns a `302` status code. You may customize the status code using the optional third parameter:

```php
Route::redirect('/here', '/there', 301);
```

#### Regular Expression Constraints

You may constrain the format of your route parameters using the `where` method on a route instance. The `where` method accepts the name of the parameter and a regular expression defining how the parameter should be constrained:

```php
Route::get('user/{name}', function ($name) {
    //
})->where('name', '[A-Za-z]+');

Route::get('user/{id}', function ($id) {
    //
})->where('id', '[0-9]+');

Route::get('user/{id}/{name}', function ($id, $name) {
    //
})->where(['id' => '[0-9]+', 'name' => '[a-z]+']);
```

##### Encoded Forward Slashes

The Laravel routing component allows all characters except /. You must explicitly allow / to be part of your placeholder using a `where` condition regular expression:

```php
Route::get('search/{search}', function ($search) {
    return $search;
})->where('search', '.*');
```

Note: Encoded forward slashes are only supported within the last route segment.

#### Sub-Domain Routing

Route groups may also be used to handle sub-domain routing. Sub-domains may be assigned route parameters just like route URIs, allowing you to capture a portion of the sub-domain for usage in your route or controller. The sub-domain may be specified by calling the `domain` method before defining the group:

```php
Route::domain('{account}.myapp.com')->group(function () {
    Route::get('user/{id}', function ($account, $id) {
        //
    });
});
```

Note: In order to ensure your sub-domain routes are reachable, you should register sub-domain routes before registering root domain routes. This will prevent root domain routes from overwriting sub-domain routes which have the same URI path.

### Fallback Routes
Using the `Route::fallback` method, you may define a route that will be executed when no other route matches the incoming request. Typically, unhandled requests will automatically render a "404" page via your application's exception handler. However, since you may define the `fallback` route within your `routes/web.php` file, all middleware in the `web` middleware group will apply to the route. You are free to add additional middleware to this route as needed:

```php
Route::fallback(function () {
    //
});
```

Note: The fallback route should always be the last route registered by your application.

### Rate Limiting
Laravel includes a middleware to rate limit access to routes within your application. To get started, assign the `throttle` middleware to a route or a group of routes. The `throttle` middleware accepts two parameters that determine the maximum number of requests that can be made in a given number of minutes. For example, let's specify that an authenticated user may access the following group of routes 60 times per minute:

```php
Route::middleware('auth:api', 'throttle:60,1')->group(function () {
    Route::get('/user', function () {
        //
    });
});
```

##### Dynamic Rate Limiting

You may specify a dynamic request maximum based on an attribute of the authenticated `User` model. For example, if your `User` model contains a `rate_limit` attribute, you may pass the name of the attribute to the `throttle` middleware so that it is used to calculate the maximum request count:

```php
Route::middleware('auth:api', 'throttle:rate_limit,1')->group(function () {
    Route::get('/user', function () {
        //
    });
});
```

[Reference](https://laravel.com/docs/5.8/routing)


## Middleware


#### Middleware Parameters

Middleware can also receive additional parameters. For example, if your application needs to verify that the authenticated user has a given "role" before performing a given action, you could create a `CheckRole` middleware that receives a role name as an additional argument.

Additional middleware parameters will be passed to the middleware after the $next argument:

```php
<?php

namespace App\Http\Middleware;

use Closure;

class CheckRole
{
    /**
     * Handle the incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure  $next
     * @param  string  $role
     * @return mixed
     */
    public function handle($request, Closure $next, $role)
    {
        if (! $request->user()->hasRole($role)) {
            // Redirect...
        }

        return $next($request);
    }

}
```

Middleware parameters may be specified when defining the route by separating the middleware name and parameters with a :. Multiple parameters should be delimited by commas:

```php
Route::put('post/{id}', function ($id) {
    //
})->middleware('role:editor');
```

#### Terminable Middleware

Note: read it

[Reference](https://laravel.com/docs/5.8/middleware)


## CSRF Protection


##### CSRF Tokens & JavaScript

When building JavaScript driven applications, it is convenient to have your JavaScript HTTP library automatically attach the CSRF token to every outgoing request. By default, the `resources/js/bootstrap.js` file registers the value of the `csrf-token` meta tag with the Axios HTTP library. If you are not using this library, you will need to manually configure this behavior for your application.

### Excluding URIs From CSRF Protection

Sometimes you may wish to exclude a set of URIs from CSRF protection. For example, if you are using `Stripe` to process payments and are utilizing their webhook system, you will need to exclude your Stripe webhook handler route from CSRF protection since Stripe will not know what CSRF token to send to your routes.

Typically, you should place these kinds of routes outside of the `web` middleware group that the `RouteServiceProvider` applies to all routes in the `routes/web.php` file. However, you may also exclude the routes by adding their URIs to the `$except` property of the `VerifyCsrfToken` middleware:

```php
<?php

namespace App\Http\Middleware;

use Illuminate\Foundation\Http\Middleware\VerifyCsrfToken as Middleware;

class VerifyCsrfToken extends Middleware
{
    /**
     * The URIs that should be excluded from CSRF verification.
     *
     * @var array
     */
    protected $except = [
        'stripe/*',
        'http://example.com/foo/bar',
        'http://example.com/foo/*',
    ];
}
```

Note: The CSRF middleware is automatically disabled when running tests.

### X-CSRF-TOKEN

In addition to checking for the CSRF token as a POST parameter, the `VerifyCsrfToken` middleware will also check for the `X-CSRF-TOKEN` request header. You could, for example, store the token in an HTML `meta` tag:

<meta name="csrf-token" content="{{ csrf_token() }}">

Then, once you have created the `meta` tag, you can instruct a library like jQuery to automatically add the token to all request headers. This provides simple, convenient CSRF protection for your AJAX based applications:

```javascript
$.ajaxSetup({
    headers: {
        'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
    }
});
```

Note: By default, the `resources/js/bootstrap.js` file registers the value of the `csrf-token` meta tag with the Axios HTTP library. If you are not using this library, you will need to manually configure this behavior for your application.

### X-XSRF-TOKEN

Laravel stores the current CSRF token in a `XSRF-TOKEN` cookie that is included with each response generated by the framework. You can use the cookie value to set the `X-XSRF-TOKEN` request header.

This cookie is primarily sent as a convenience since some JavaScript frameworks and libraries, like Angular and Axios, automatically place its value in the `X-XSRF-TOKEN` header.

[Reference](https://laravel.com/docs/5.8/csrf)