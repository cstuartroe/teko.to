A common operator you'll see in Teko is the suffix `$`, which converts an
object to a string. A common use of this suffix is to print objects other
than strings, as `println` only accepts a string argument.

```
n : int = 10

println(n$)
```

This practice is in keeping with the Teko philosophy of no implicit type coercion.
Similarly, and unlike in Java, JavaScript, or TypeScript, a number and a string
cannot be directly concatenated; a conversion must be performed first.

```
n : int = 10

// Try to make this expression valid!
println("The number is " + n)
---
The number is 10
```

Another unique feature of Teko is that most simple operations like this one
are actually directly equivalent to method calls, which can also be used.
For instance, using the `$` suffix is exactly the same as calling the
`.to_str()` method of an object.

```
n : int = 10

println(n.to_str())
```

---

Teko integer arithmetic looks more or less as in other languages.

```
println((3 + 10 * 5)$)
```

Integer division is floor division, yielding another integer, not a float.

```
println((5/2)$)
```

Teko uses `^` for exponentiation.

```
println((2^3)$)
```

Teko does not offer bitwise operators.

As with `$`, all of these arithmetic operations are actually method calls in
disguise:

```
println((3).add((10).mult(5)).to_str())
println((5).div(2).to_str())
println((2).exp(3).to_str())
```

---

Teko uses single-character boolean operators `&` and `|`.

```
println((true & true)$)
println((true | false)$)
```

Again, these are simply method calls.

```
println(true.and(true)$)
println(true.or(false)$)
```

Teko boolean operators are not lazily evaluated, though they may become so in
a future release.

```
fn falseWithSideEffect(): bool {
  println("side effect")
  false
}

true | falseWithSideEffect()
```

---

Strings can be concatenated with `+`.

```
println("Hello, " + "World!")
println("Hello, ".add("World!"))
```

The length of a string can be obtained with `.size`.

```
println("letters".size$)
```

---

Because these operations are simply transformed by the Teko parser into method
calls, Teko does support operator overloading. That is, user-defined classes
which define any of the methods mentioned above may then make use of the
corresponding operator symbol.
