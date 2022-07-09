Teko comparators are similar to other languages.

```
println((3 == 5)$)
println((3 != 5)$)
println((3 < 5)$)
println((3 <= 5)$)
println((3 > 5)$)
println((3 >= 5)$)
```

Unlike the other operators so far, Teko comparators are not directly equivalent
to a method call. However, they do make underlying use of a method `compare`.
If `x.compare(y)` returns an integer, then comparators may be used between
`x` and `y`. If `x.compare(y)` is less than zero, then `x` is considered to be
less than `y`; if `x.compare(y)` is greater than zero, then `x` is considered to be
greater than `y`; if `x.compare(y)` is equal to zero, then `x` is considered to be
equal to `y`.

For example, the integer `compare` method is identical to the subtraction method
`sub`.

```
println((3).compare(5)$)
print((3).sub(5)$)
```

Comparison has not yet been implemented for any native types besides `int`.
