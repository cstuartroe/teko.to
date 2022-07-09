Function arguments can also be passed by name:

```
fn getSize(s: str) -> s.size

println(getSize(s: "Hello")$)
```

When there are multiple arguments, all arguments passed by position must
come before all arguments passed by name:

```
fn intFromDigits(tens: int, ones: int) -> tens*10 + ones

println(intFromDigits(5, ones: 3)$)
// Make this a valid function call:
println(intFromDigits(tens: 4, 2)$)
---
53
42
```
