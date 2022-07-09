Teko control blocks look at first glance like other languages,
particularly JavaScript.

```
l := [1, 2, 3, 4, 5]

for n in l {
  if n % 2 == 1 {
    println(n$)
  }
}

if l.size < 3 {
  println("l is a short list")
} else if l.size < 6 {
  println("l is a medium list")
} else {
  println("l is a long list")
}
```

---

However, there are several key differences.

The first is that `while`, `for`, and `if`...(`else`) don't necessarily need
full codeblocks as their body. Any expression can serve as the body of a control 
block.

```
l := [1, 2, 3, 4, 5]

for (n in l) println(n$)
```

`if` statements optionally use the keyword `then`, which can be used in any
circumstance. `then` is particularly helpful for improving readability when
the body of the `if` is just a simple expression.

```
l := [1, 2, 3, 4, 5]

if l.size < 3 then println("l is a short list") else println("l is a long list")
```

---

The second key difference is that all control blocks actually evaluate to
values.

This supports Teko's preference for immutable and non-nullable variables.
While in other languages you might initialize a variable to some null value
and then assign it based on the outcome of some conditional, in Teko the
preferred pattern is simply to directly assign an immutable variable to the
outcome of a conditional block.

```
l := [1, 2, 3, 4, 5]

size_descriptor : str = if l.size < 3 {
  "short"
} else if l.size < 6 {
  "medium"
} else {
  "long"
}

println("l is a " + size_descriptor + " list")
```

Teko doesn't have a separate ternary expression syntax; `if`...`then`...`else`
can simply be used as a value.

```
println(if (3 < 5) then "smaller" else "larger")
```

`for` and `while` statements evaluate to arrays.

```
l := [1, 2, 3, 4, 5]

number_strings := for n in l n$

println(number_strings$)
```
