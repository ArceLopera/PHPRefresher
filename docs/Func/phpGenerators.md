Generators provide an easy way to implement simple iterators without the overhead or complexity of implementing a class that implements the Iterator interface.

A generator allows you to write code that uses foreach to iterate over a set of data without needing to build an array in memory, which may cause you to exceed a memory limit, or require a considerable amount of processing time to generate. Instead, you can write a generator function, which is the same as a normal function, except that instead of returning once, a generator can yield as many times as it needs to in order to provide the values to be iterated over.


``` php
<?php
function xrange($start, $limit, $step = 1) {
    if ($start <= $limit) {
        if ($step <= 0) {
            throw new LogicException('Step must be positive');
        }

        for ($i = $start; $i <= $limit; $i += $step) {
            yield $i;
        }
    } else {
        if ($step >= 0) {
            throw new LogicException('Step must be negative');
        }

        for ($i = $start; $i >= $limit; $i += $step) {
            yield $i;
        }
    }
}

/*
 * Note that both range() and xrange() result in the same
 * output below.
 */

echo 'Single digit odd numbers from range():  ';
foreach (range(1, 9, 2) as $number) {
    echo "$number ";
}
echo "\n";

echo 'Single digit odd numbers from xrange(): ';
foreach (xrange(1, 9, 2) as $number) {
    echo "$number ";
}
?>
```

## Generator object

When a generator function is called, a new object of the internal Generator class is returned. This object implements the Iterator interface in much the same way as a forward-only iterator object would, and provides methods that can be called to manipulate the state of the generator, including sending values to and returning values from it.


## The yield keyword

The yield keyword is used to create a generator function. Generator functions act as iterators which can be looped through with a foreach loop.

The value given by the yield keyword is used as a value in one of the iterations of the loop.

```php
<?php
function countTo3() {
  yield "1";
  yield "2";
  yield "3";
}

foreach(countTo3() as $number) {
  echo $number;
  echo "<br>";
}
?>
```

### Yielding values with keys
PHP also supports associative arrays, and generators are no different. In addition to yielding simple values, as shown above, you can also yield a key at the same time.

```php
<?php
/*
 * The input is semi-colon separated fields, with the first
 * field being an ID to use as a key.
 */

$input = <<<'EOF'
1;PHP;Likes dollar signs
2;Python;Likes whitespace
3;Ruby;Likes blocks
EOF;

function input_parser($input) {
    foreach (explode("\n", $input) as $line) {
        $fields = explode(';', $line);
        $id = array_shift($fields);

        yield $id => $fields;
    }
}

foreach (input_parser($input) as $id => $fields) {
    echo "$id:\n";
    echo "    $fields[0]\n";
    echo "    $fields[1]\n";
}
?>
```

```
1:
    PHP
    Likes dollar signs
2:
    Python
    Likes whitespace
3:
    Ruby
    Likes blocks
```

### Yielding null values 
Yield can be called without an argument to yield a null value with an automatic key.

```php
<<?php
function gen_three_nulls() {
    foreach (range(1, 3) as $i) {
        yield;
    }
}

var_dump(iterator_to_array(gen_three_nulls()));
?>
```

```
array(3) {
  [0]=>
  NULL
  [1]=>
  NULL
  [2]=>
  NULL
}
```
function countTo2() {
  yield;
  yield;
}

### Yielding by reference
Generator functions are able to yield values by reference as well as by value. This is done in the same way as returning references from functions: by prepending an ampersand to the function name.

```php
<?php
function &gen_reference() {
    $value = 3;

    while ($value > 0) {
        yield $value;
    }
}

/*
 * Note that we can change $number within the loop, and
 * because the generator is yielding references, $value
 * within gen_reference() changes.
 */
foreach (gen_reference() as &$number) {
    echo (--$number).'... ';
}
?>

```

```
2... 1... 0...
```
### The yield from keyword


The yield from keyword provides the values from an iterator one by one each time the generator function is called until there are no items left in the iterator, then the generator will move on to the next yield keyword.

Generator delegation allows you to yield values from another generator, Traversable object, or array by using the yield from keyword. The outer generator will then yield all values from the inner generator, object, or array until that is no longer valid, after which execution will continue in the outer generator.

If a generator is used with yield from, the yield from expression will also return any value returned by the inner generator.

```php
<?php
function countTo4() {
  yield from [1, 2, 3];
  yield 4;
}

foreach(countTo4() as $number) {
  echo $number;
  echo "<br>";
}
?>
```	

## Comparing generators with Iterator objects

The primary advantage of generators is their simplicity. Much less boilerplate code has to be written compared to implementing an Iterator class, and the code is generally much more readable. For example, the following function and class are equivalent:

```php
<?php
function getLinesFromFile($fileName) {
    if (!$fileHandle = fopen($fileName, 'r')) {
        return;
    }

    while (false !== $line = fgets($fileHandle)) {
        yield $line;
    }

    fclose($fileHandle);
}

// versus...

class LineIterator implements Iterator {
    protected $fileHandle;

    protected $line;
    protected $i;

    public function __construct($fileName) {
        if (!$this->fileHandle = fopen($fileName, 'r')) {
            throw new RuntimeException('Couldn\'t open file "' . $fileName . '"');
        }
    }

    public function rewind() {
        fseek($this->fileHandle, 0);
        $this->line = fgets($this->fileHandle);
        $this->i = 0;
    }

    public function valid() {
        return false !== $this->line;
    }

    public function current() {
        return $this->line;
    }

    public function key() {
        return $this->i;
    }

    public function next() {
        if (false !== $this->line) {
            $this->line = fgets($this->fileHandle);
            $this->i++;
        }
    }

    public function __destruct() {
        fclose($this->fileHandle);
    }
}
?>
```

This flexibility does come at a cost, however: generators are forward-only iterators, and cannot be rewound once iteration has started. This also means that the same generator can't be iterated over multiple times: the generator will need to be rebuilt by calling the generator function again.


##  Iterating Efficiently over Large or Expensive Datasets

When you want to iterate through a list of items, but the entire list takes up a lot of memory
or is very slow to generate.

Use a generator:

```php
<?php
function FileLineGenerator($file) {
 if (!$fh = fopen($file, 'r')) {
 return;
 }
 while (false !== ($line = fgets($fh))) {
 yield $line;
 }
 fclose($fh);
}
$file = FileLineGenerator('log.txt');
foreach ($file as $line) {
 if (preg_match('/^rasmus: /', $line)) { print $line; }
}
?>
```

Generators provide a simple way to efficiently loop over items without the overhead and expense of loading all the data into an array. 

A perfect use of a generator is processing all the lines in a file. The simplest way is to use the file() function. This open the file, loads each line into an element of an array, and closes it. However, then you store the entire file in memory.

```php
<?php
$file = file('log.txt');
foreach ($file as $line) {
 if (preg_match('/^rasmus: /', $line)) { print $line; }
}
?>
```

Another option is to use the standard file reading functions, but then your code for reading from the file and acting on each line gets intertwined. This doesn’t make for reusable or easy-to-read code:


```php
<?php
function print_matching_lines($file, $regex) {
 if (!$fh = fopen('log.txt','r')) {
 return;
 }
 while(false !== ($line = fgets($fh))) {
 if (preg_match($regex, $line)) { print $line; }
 }
 fclose($fh);
}
print_matching_lines('log.txt', '/^rasmus: /');

?>
```

However, if you wrap the code to process the file into a generator, you get the best of both options—a general function to efficiently iterate through lines of a file and then clean syntax as if all the data is stored in an array:


```php
<?php
function FileLineGenerator($file) {
 if (!$fh = fopen($file, 'r')) {
 return;
 }
 while (false !== ($line = fgets($fh))) {
    yield $line;
 }
 fclose($fh);
}
$file = FileLineGenerator('log.txt');
foreach ($file as $line) {
 if (preg_match('/^rasmus: /', $line)) { print $line; }
}
?>
```

In a generator, control passes back and forth between the loop and the function via the yield statement. The first time the generator is called, control begins at the top of the function and pauses when it reaches a yield statement, returning the value.

In this example, the FileLineGenerator() generator function loops through lines of a file. After the file is opened, fgets() is called in a loop. As long as there are more lines, the loop yields $line back to the iterator. At the end of the file, the loop terminates, the file is closed, and the function terminates. Because nothing is yielded back, the foreach() exits.

Now, FileLineGenerator() can be used any time you want to loop through a file. The previous example prints lines beginning with rasmus: . The following one prints a random line from the file:


```php
<?php
$line_number = 0;
foreach (FileLineGenerator('sayings.txt') as $line) {
 $line_number++;
 if (mt_rand(0, $line_number - 1) == 0) {
 $selected = $line;
 }
}
print $selected . "\n";

?>
```

Despite a completely different use case, FileLineGenerator() is reusable without modifications. In this example, the generator is invoked from within the foreach loop instead of storing it in a variable.
You cannot rewind a generator. They only iterate forward.

