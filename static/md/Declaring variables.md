Teko doesn't use any special keywords for variable declaration.
The variable name is simply followed by a colon and a typehint.

```
s: str = "The string type in Teko is called `str`."
```

The typehint is actually optional; Teko will infer the type of a variable if
it is not explicitly stated.

```
/* I tend to distribute whitespace a little
   differently for implicitly typed declarations,
   but the parser doesn't care where the spaces go. */

s := "Here's another `str`."
```
