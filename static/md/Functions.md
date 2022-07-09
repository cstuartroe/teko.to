In Teko, functions are defined like so:

```
fn getSize(s: str): int {
  s.size
}

println(getSize("Hello")$)
```

Note that Teko does not make use of a `return` keyword - it is simply the last
line of the function which is used as a return value.

If you do not wish for the function to return a value, simply add a semicolon
at the end of the last line:

```
fn getSizeButReturnNull(s: str): null {
  s.size;
}

my_null: null = getSizeButReturnNull("Hello")
```

(Actually, semicolons are permitted at the end of any line in Teko, which may also
be done on occasion for readability.)

Like control blocks, the body of a function can simply be a single expression,
though in this case the right arrow `->` must be used.

```
fn getSize(s: str): int -> s.size

println(getSize("Hello")$)
```

---

The return type of a function need not be explicitly annotated - Teko will
infer the type.

```
fn getSize(s: str) -> s.size

println(getSize("Hello")$)
```

Type annotations can also be skipped for function arguments, though the rules
governing this are slightly more complex and will be discussed more later.

```
fn getSize(s) -> s.size

println(getSize("Hello")$)
```
