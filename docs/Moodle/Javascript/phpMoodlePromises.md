Promises in JavaScript represent the eventual completion (or failure) of an asynchronous operation and its resulting value. In Moodle, promises are commonly used for handling asynchronous tasks such as AJAX requests, loading modules, and other operations that involve waiting for some data or action to complete.

### Basic Structure of Promises

A promise can be in one of three states:

1. **Pending**: Initial state, neither fulfilled nor rejected.
2. **Fulfilled**: The operation completed successfully.
3. **Rejected**: The operation failed.

Promises allow you to write asynchronous code that is more readable and easier to manage than using traditional callback functions.

### Using Promises in Moodle

Here’s how you can effectively use promises in Moodle, focusing on the proper use of `then` and `catch` methods:

#### 1. Creating and Returning Promises

When creating a function that primarily handles asynchronous operations, it’s a good practice to return a promise from the function. This allows for better chaining and handling of subsequent asynchronous actions.

```javascript
define(['core/ajax'], function(Ajax) {
    return {
        getUserData: function() {
            return Ajax.call([{
                methodname: 'yourpluginname_get_user_data',
                args: {}
            }]);
        }
    };
});
```

#### 2. Chaining with `then`

Use the `then` method to handle the resolved value of a promise. Ensure that you return a value or another promise at the end of a `then` block for proper chaining.

```javascript
define(['core/ajax'], function(Ajax) {
    return {
        getUserData: function() {
            return Ajax.call([{
                methodname: 'yourpluginname_get_user_data',
                args: {}
            }]).then(function(response) {
                console.log('User ID:', response.userId);
                console.log('User Name:', response.userName);
                return response; // Always return at the end of a then block
            });
        }
    };
});
```

#### 3. Handling Errors with `catch`

Use the `catch` method to handle any errors that occur during the promise chain. Only use `catch` if you intend to handle errors explicitly.

```javascript
define(['core/ajax'], function(Ajax) {
    return {
        getUserData: function() {
            return Ajax.call([{
                methodname: 'yourpluginname_get_user_data',
                args: {}
            }]).then(function(response) {
                console.log('User ID:', response.userId);
                console.log('User Name:', response.userName);
                return response;
            }).catch(function(error) {
                console.error('Error:', error);
                // Handle the error appropriately
            });
        }
    };
});
```

**Note**: You shouldn't use the `done`, `fail`, or `always` functions on Promises. These are a jQuery feature and aren't present in the Native Promise implementation.

#### 4. Returning Promises from Functions

If a function is designed to create and handle a promise, make sure it returns that promise. This allows the caller of the function to continue chaining `then` and `catch` blocks as needed.

```javascript
define(['core/ajax'], function(Ajax) {
    return {
        fetchData: function() {
            return Ajax.call([{
                methodname: 'yourpluginname_get_data',
                args: {}
            }]);
        },

        processData: function() {
            return this.fetchData().then(function(response) {
                console.log('Data:', response);
                return response; // Return the data for further chaining
            }).catch(function(error) {
                console.error('Error:', error);
                // Handle the error appropriately
            });
        }
    };
});
```

In this example:

1. **loadUserData**: This function creates and returns a promise for loading user data using an AJAX call.
2. **displayUserData**: This function calls `loadUserData`, processes the response, and handles any errors using `catch`.

### Best Practices
**Always return or throw**
When writing promises they must:

+ Return another promise, or;
+ Return a synchronous value (or undefined), or;
+ Throw a synchronous error.

**Chain rather than nest**
Promises are a construct which help prevent the pyramid of doom and regain linear control flow and error handling.

+ Promises should not be nested.
+ Promises should be chained rather than nested.

**Avoid mixing callbacks and promises**
Avoid mixing callbacks and promises.
Design code to embrace promise-y patterns for asynchronous code to make maximum use of promises.

Additional reading:

+ [User talk: Poltawski/Javascript promises](https://docs.moodle.org/dev/User_talk:Poltawski/Javascript_promises).
+ [We have a problem with promises](https://pouchdb.com/2015/05/18/we-have-a-problem-with-promises.html).

### Summary

Promises in Moodle are a powerful way to handle asynchronous operations. By using `then` for handling successful resolutions, `catch` for error handling, and ensuring functions return promises when appropriate, you can create maintainable and readable asynchronous code. Always remember to return a value or another promise at the end of a `then` block to allow for proper chaining and further processing. Avoid using `done`, `fail`, or `always` functions, as they are specific to jQuery and not part of the native Promise implementation.