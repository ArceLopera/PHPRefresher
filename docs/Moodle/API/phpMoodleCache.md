### Moodle Cache API: Overview and Usage

The Cache API in Moodle is a powerful system designed to improve performance and efficiency by storing and retrieving frequently used data. It provides developers with a flexible and easy-to-use mechanism for implementing caching in their plugins or core functionalities.
The Cache API, also known as MUC (Moodle Universal Cache), is a fundamental caching system within Moodle.

---

### Key Concepts of the Cache API

1. **Purpose**: Reduce database queries and expensive computations by caching data.
2. **Architecture**:
    - **Stores**: Physical storage for cache data (e.g., file system, memory, Redis, Memcached).
    - **Definitions**: Configuration settings for how data is cached.
    - **Keys**: Identifiers used to store and retrieve data.
3. **Persistence Levels**:
    - **Session Cache**: Data persists for the duration of the user's session.
    - **Request Cache**: Data persists for the duration of the current request.
    - **Application Cache**: Data persists across multiple requests and sessions.

---

### Cache API Workflow

1. [**Define Cache**](#1-defining-a-cache): Configure caching options in `db/caches.php`.
2. [**Retrieve Cache**](#2-accessing-a-cache): Use the Cache API to access the configured cache.
3. [**Store and Retrieve Data**](#3-storing-and-retrieving-data): Interact with the cache using API methods like `set`, `get`, and `delete`.
4. [**Purge Cache**](#4-purge-cache): Clear cache data when necessary, such as during debugging or when changes are made to cached items.

---

### 1. **Defining a Cache**

Getting started with the Cache API is exceptionally straightforward. It's designed for quick and easy usage, emphasizing self-containment. All you need to do is add a definition for your cache and you are ready to start working with the Cache API.
Caches are defined in the `db/caches.php` file of your plugin. This file registers the cache and specifies its behavior.
In the case of core that is the lib/db/caches.php file, in the case of a module that would be mod/myplugin/db/caches.php.

The definition is used API in order to understand a little about the cache and what it is being used for, it also allows the administrator to set things up especially for the definition if they want. From a development point of view the definition allows you to tell the API about your cache, what it requires, and any (if any) advanced features you want it to have.

##### Example: `db/caches.php`

```php
defined('MOODLE_INTERNAL') || die();

$definitions = [
    'example_cache' => [
        'mode' => cache_store::MODE_APPLICATION,
        'simplekeys' => true,       // If true, keys must be simple strings.
        'simpledata' => true,       // If true, data must be simple (e.g., arrays, strings).
        'ttl' => 3600,              // Time to live in seconds (optional).
    ],
];
```

This informs the API that the myplugin module has a cache called `example_cache` and that it is an application (globally shared) cache.

**Key Fields**:

- **`mode`**: Defines the cache scope (`MODE_SESSION`, `MODE_REQUEST`, `MODE_APPLICATION`).
- **`simplekeys`**: If true, keys must be simple strings; otherwise, complex keys are allowed.
- **`simpledata`**: If true, only simple data types (e.g., strings, arrays) can be cached.
- **`ttl`**: Time to live, in seconds. The cache expires after this duration.

Basic definition with just the required mode:

```php
$definitions = array(
    // The name of the cache area is the key. The component/plugin will be picked up from the file location.
    'area' => array(
        // [int] Required; Sets the mode for the definition. Must be one of cache_store::MODE_*
        'mode' => cache_store::MODE_*,
    )
);

```

When creating a definition that's the bare minimum, to provide an area (somedata) and 
declare the type of the cache application, session, or request.

+ An application cache is a shared cache, all users can access it.
+ Session caches are scoped to a single users session, but may not actually be stored in the session.
+ Request caches you can think of as static caches, only available to the user owning the request, and only alive until the end of the request.

There are of course many more options available that allow you to really take the cache by 
the reigns, you can read about some of the important ones further on, or skip ahead to the 
definition section which details the available options in full.

For each definition, a language string with the name cachedef_ followed by the name of the definition is expected.

```php
$string['cachedef_example_cache'] = 'This is the description of the cache example_cache';
```


Advanced definition:

```php
$definitions = array(
    // The name of the cache area is the key. The component/plugin will be picked up from the file location.
    'area' => array(
        // [int] Required; Sets the mode for the definition. Must be one of cache_store::MODE_*
        'mode' => cache_store::MODE_*,

        // All of the following options are default

        // [bool] Set to true if your cache will only use simple keys for its items.
        // Simple keys consist of digits, underscores and the 26 chars of the english language. a-zA-Z0-9_
        // If true the keys won't be hashed before being passed to the cache store for gets/sets/deletes. It will be
        // better for performance and possible only becase we know the keys are safe.
        'simplekeys' => false,

        // [bool] If set to true we know that the data is scalar or array of scalar.
        // If true, the data values will be stored as they are. Otherwise they will be serialised first.
        'simpledata' => false,

        // [array] An array of identifiers that must be provided to the cache when it is created.
        'requireidentifiers' => ['ident1', 'ident2'],

        // [bool] If set to true then only stores that can guarantee data will remain available once set will be used.
        'requiredataguarantee' => false,

        // [bool] If set to true then only stores that support multiple identifiers will be used.
        'requiremultipleidentifiers' => false,

        // [bool] If set to true then a lock will be gained before reading from the cache store. It is recommended not to use
        // this setting unless 100% absolutely positively required. Remember 99.9% of caches will NOT need this setting.
        // This setting will only be used for application caches presently.
        'requirelockingread' => false,

        // [bool] If set to true then a lock will be gained before writing to the cache store. As above this is not recommended
        // unless truly needed. Please think about the order of your code and deal with race conditions there first.
        // This setting will only be used for application caches presently.
        'requirelockingwrite' => false,

        // [int] If set this will be used as the maximum number of entries within the cache store for this definition.
        // Its important to note that cache stores don't actually have to acknowledge this setting or maintain it as a hard limit.
        'maxsize' => null,

        // [string] A class to use as the loader for this cache. This is an advanced setting and will allow the developer of the
        // definition to take 100% control of the caching solution.
        // Any class used here must inherit the cache_loader interface and must extend default cache loader for the mode they are using.
        'overrideclass' => null,

        // [string] Suplements the above setting indicated the file containing the class to be used. This file is included when required.
        'overrideclassfile' => null,

        // [string] A class to use as the data loader for this definition.
        // Any class used here must inherit the cache_data_loader interface.
        'datasource' => null,

        // [string] Suplements the above setting indicated the file containing the class to be used. This file is included when required.
        'datasourcefile' => null,

        // [bool] This setting does two important things. First it tells the cache API to only instantiate the cache structure for
        // this definition once, further requests will be given the original instance.
        // Second the cache loader will keep an array of the items set and retrieved to the cache during the request.
        // This has several advantages including better performance without needing to start passing the cache instance between
        // function calls, the downside is that the cache instance + the items used stay within memory.
        // Consider using this setting when you know that there are going to be many calls to the cache for the same information
        // or when you are converting existing code to the cache and need to access the cache within functions but don't want
        // to add it as an argument to the function.
        'staticacceleration' => false,

        // [int] This supplements the above setting by limiting the number of items in the caches persistent array of items.
        // Tweaking this setting lower will allow you to minimise the memory implications above while hopefully still managing to
        // offset calls to the cache store.
        'staticaccelerationsize' => null,

        // [int] A time to live for the data (in seconds). It is strongly recommended that you don't make use of this and
        // instead try to create an event driven invalidation system.
        // Not all cache stores will support this natively and there are undesired performance impacts if the cache store does not.
        'ttl' => 0,

        // [bool] If set to true only the mapped cache store(s) will be used and the default mode store will not. This is a super
        // advanced setting and should not be used unless absolutely required. It allows you to avoid the default stores for one
        // reason or another.
        'mappingsonly' => false,

        // [array] An array of events that should cause this cache to invalidate some or all of the items within it.
        'invalidationevents' => array('event1', 'event2'),
        
        // [int] The sharing options that are appropriate for this definition. Should be the sum of the possible options.
        'sharingoptions' => cache_definition::SHARING_DEFAULT,
        
        // [int] The default sharing option to use. It's highly recommended that you don't set this unless there is a very
        // specific reason not to use the system default.
        'defaultsharing' => cache_definition::SHARING_DEFAULT,
    )
);

```

---

### 2. **Accessing a Cache**

To use the defined cache, instantiate a cache object using the `cache::make()` function. 

##### Example: Getting a Cache Object

Getting a cache instance for a definition

Once your definition has been created you should bump the version number so that Moodle 
upgrades and processes the definitions file at which point your definition will be useable.

Now within code you can get a cache object corresponding to the definition created earlier.

```php
$cache = cache::make('local_myplugin', 'example_cache');

// Most basic
$cache = cache::make('component', 'area');

// Using identifiers
$cache = cache::make('component', 'area', ['dbfamily' => 'pgsql']);
```

**Parameters**:

- **Component**: The name of your plugin or module (e.g., `local_myplugin`).
- **Area**: The name of the cache area defined in `db/caches.php` (e.g., `example_cache`).

The `cache::make()` method is a factory method, it will create a cache object to allow you 
to work with your cache. The cache object will be one of several classes chosen by the API 
based upon what your definition contains. All of these classes will extend the base cache 
class, and in nearly all cases you will get one of `cache_application`, `cache_session`, or 
`cache_request` depending upon the mode you selected.

#### Getting an ad-hoc cache instance

Using cache definitions is the recommended method. 
Ad-hoc caches should only be used where you have a rarely used cache, or insignificant cache. 
Typical use-case can be when you are refactoring some local static variables into 
MODE_REQUEST caches.

This is the alternative method of using the cache API.
It involves creating a cache using just the required params at the time that it is required. 
It doesn't require that a definition exists making it quicker and easier to use, 
however it can only use the default settings and is only recommended for insignificant 
caches (rarely used during operation, never to be mapped or customised, 
only existing in a single place in code).

Once a cache object has been retrieved it operates exactly as the same as a cache that 
has been created for a definition.

To create an ad-hoc cache you would use the following:

```php
// Application cache
$cache = cache::make_from_params(cache_store::MODE_APPLICATION, 'component', 'area');

// Session cache
$cache = cache::make_from_params(cache_store::MODE_SESSION, 'component', 'area');

// Request cache
$cache = cache::make_from_params(cache_store::MODE_REQUEST, 'component', 'area');

// Using identifiers
$cache = cache::make_from_params(cache_store::MODE_APPLICATION, 'component', 'area',
    array('dbfamily' => 'pgsql'));

// Using persistence so that the cache instance is stored for future use/request
$cache = cache::make_from_params(cache_store::MODE_APPLICATION, 'component', 'area', array(),
    array('persistent' => true));

// Using a request cache to replace static variable
$cache = cache::make_from_params(cache_store::MODE_REQUEST, 'component', 'area', array(),
    array('simplekeys' => true, 'simpledata' => true));
```
Don't be lazy, if you don't have a good reason to use an ad-hoc cache you should be spending 
an extra 5 minutes creating a definition.

---

### 3. **Storing and Retrieving Data**

Once the cache object is instantiated, you can store, retrieve, and manage data using 
the Cache API methods.

##### Example: Storing and Retrieving Data

```php
// Get a cache instance
$cache = cache::make(cache_store::MODE_APPLICATION, 'component', 'area');

// Key can be an int or string
$data = $cache->get('key');

// Data returned will be what ever was stored, or false if it was not in the cache.

// Storing data in the cache.
$cache->set('unique_key', 'cached_value');

// Retrieving data from the cache.
$cachedValue = $cache->get('unique_key');

if ($cachedValue === false) {
    // Cache miss - fetch data and store it.
    $data = expensive_function_call();
    $cache->set('unique_key', $data);
} else {
    // Cache hit - use the cached data.
    echo $cachedValue;
}

// Deleting a specific key.
$cache->delete('unique_key');
```

Once you have a cache object (will extend the cache class and implements `cache_loader`) 
you are ready to start interacting with the cache.

There are three basic basic operations: get, set, and delete.

The first is to send something to the cache.

```php
$result = $cache->set('key', 'value');
```

The key must be an int or a string. The value can be absolutely anything your want that 
is serializable. The result is true if the operation was a success, false otherwise.

The second is to retrieve something from the cache.

```php
$data = $cache->get('key');
```

`$data` will either be whatever was being stored in the cache, or false if the cache could not find the key.

The third and final operation is delete.

```php
$result = $cache->delete('key');
```

Again just like set the result will either be true if the operation was a success, or false otherwise.

You can also set, get, and delete multiple key => value pairs in a single transaction.

```php
$result = $cache->set_many([
    'key1' => 'data1',
    'key3' => 'data3'
]);
// $result will be the number of pairs sucessfully set.

$result = $cache->get_many(['key1', 'key2', 'key3']);
print_r($result);
// Will print the following:
// array(
//     'key1' => 'data1',
//     'key2' => false,
//     'key3' => 'data3'
// )

$result = $cache->delete_many(['key1', 'key3']);
// $result will be the number of records sucessfully deleted.
```

##### Example: Bulk Operations

Not all cache stores will support fetching many keys at once, some stores will take the array of keys and process them one by one. If you have many keys to fetch it is recommended to use this still as cache stores that do support this will likely perform better.

```php

$cache = cache::make(cache_store::MODE_APPLICATION, 'component', 'area');

// Set some data so I can show results
$cache->set('key1', 'data1');
$cache->set('key3', 'data3');

// Keys can be an int or string
$keys = array(
    'key1',
    'key2',
    'key3'
);
$results = $cache->get_many($keys);

print_r($results);

// Will print the following:
// array(
//     'key1' => 'data1',
//     'key2' => false,
//     'key3' => 'data3'
// )

// Storing multiple values at once.
$cache->set_many([
    'key1' => 'value1',
    'key2' => 'value2',
]);

// Retrieving multiple values at once.
$values = $cache->get_many(['key1', 'key2']);

// Deleting multiple keys.
$cache->delete_many(['key1', 'key2']);
```

Store a key

```php
// Get a cache instance
$cache = cache::make(cache_store::MODE_APPLICATION, 'component', 'area');

// Key can be an int or string
// Data can be anything
$result = $cache->set('key', 'data');

// Result will be true on success, false otherwise.
```

Store many keys at once

Note not all stores will support setting several items in a single transaction, stores that don't will process each item of the array separately. It is still recommended to use this method if you have many items to set as those stores that do support it will likely perform better.

```php
// Get a cache instance
$cache = cache::make(cache_store::MODE_APPLICATION, 'component', 'area');

// Prepare an associative array of key => value pairs.
// Key can be an int or string
// Data can be anything
$data = array(
    'key1' => 'data1',
    'key3' => 'data3'
);

// Use set_many
$result = $cache->set_many($data);

// Result will be an int, the number of items successfully set.
```

Delete a key

If you have several keys you want to delete you should use delete_many. If you want to delete everything you should use purge.

```php
// Get a cache instance
$cache = cache::make(cache_store::MODE_APPLICATION, 'component', 'area');

// Key can be an int or string 
$result = $cache->delete('key');

// Result will be true on success, false otherwise.
```

Delete many keys at once

```php
// Get a cache instance
$cache = cache::make(cache_store::MODE_APPLICATION, 'component', 'area');

// Array of Keys can be an int or string
$keys = array('key1', 'key2');

$result = $cache->delete_many($keys);
// $result will contain the number of items successfully deleted.
```


---

### 4. **Purge Cache**

Caches can be purged manually or programmatically to ensure that stale data does not remain in the system.

##### Manual Purging
Administrators can purge caches via **Site administration > Development > Purge caches**.

##### Programmatic Purging

```php
$cache->purge(); // Clears all data in the cache.
```

Delete all keys

It is not recommended to purge unless absolutely required, this will cause the store (plugin instance) being used by your cache to be purged. Not all stores can tell which keys belong to your cache and in that circumstance all keys in the store are deleted, not just the keys belonging to your cache, also the keys belonging to other caches using that same store.

```php
// Get a cache instance
$cache = cache::make(cache_store::MODE_APPLICATION, 'component', 'area');

$result = $cache->purge();
// $result will contain the number of items successfully deleted.
```

---

### 5. **Debugging and Testing**

Use debugging tools to inspect the behavior of the cache:

- Enable Moodle debugging: **Site administration > Development > Debugging**.
- Log cache hits and misses: Use custom logging for cache operations.

---

##### Practical Example: Implementing Cache in a Plugin

Let’s create a cache to store user preferences for a plugin:

##### `db/caches.php`

```php
$definitions = [
    'user_preferences' => [
        'mode' => cache_store::MODE_APPLICATION,
        'simplekeys' => true,
        'simpledata' => true,
    ],
];
```

##### Using the Cache in a Plugin

```php
function local_myplugin_get_user_preference($userid) {
    $cache = cache::make('local_myplugin', 'user_preferences');

    // Check if preference exists in the cache.
    $preference = $cache->get($userid);

    if ($preference === false) {
        // Fetch from database if cache miss.
        global $DB;
        $preference = $DB->get_field('user_preferences', 'preference', ['userid' => $userid]);

        // Store in cache for future requests.
        $cache->set($userid, $preference);
    }

    return $preference;
}
```

---

### 6. **Advanced Features**

#### Cache Locking
When multiple processes access the same cache key, locking prevents race conditions.

```php
$lock = cache::lock('unique_key');

if ($lock->acquire()) {
    // Perform the operation.
    $lock->release();
}
```

#### Cache Events
Listen to cache-related events, such as purging or clearing, for custom behavior.

Invalidating keys from a cache

Invalidate keys using an event

```php
cache_helper::invalidate_by_event('event1', array('key1', 'key2'));
```

Invalidate keys using belonging to a definition

```php
// Identifiers for the definitions
$identifiers = array(
    'ident1' => 'something'
);

// Keys to invalidate
$keys = array('key1', 'key2');

cache_helper::invalidate_by_definition('component', 'area', $identifiers, $keys);
```

---

### Benefits of Using the Cache API

- **Improved Performance**: Reduces the load on the database and increases speed.
- **Flexible Configuration**: Supports multiple storage backends.
- **Ease of Use**: Simple API for common operations.
- **Scalability**: Suitable for large-scale applications with heavy traffic.

---

### Conclusion

The Cache API in Moodle is a robust tool for enhancing performance by reducing redundant computations and database queries. By carefully defining cache settings, using appropriate scopes, and handling cache misses effectively, developers can ensure smooth and efficient plugin functionality.