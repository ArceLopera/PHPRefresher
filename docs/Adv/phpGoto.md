The goto operator can be used to jump to another section in the program. The target point is specified by a case-sensitive label followed by a colon, and the instruction is given as goto followed by the desired target label. This is not a full unrestricted goto. The target label must be within the same file and context, meaning that you cannot jump out of a function or method, nor can you jump into one. You also cannot jump into any sort of loop or switch structure. You may jump out of these, and a common use is to use a goto in place of a multi-level break.

``` php
<?php
goto label;
echo "hello";
label:
echo "world";
?>
```

The above example will output:

```
world
```