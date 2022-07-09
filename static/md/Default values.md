Teko functions may be defined with default values for one or more
arguments. If these arguments are not explicitly passed when the
function is called, their value will be the default.

```
fn intFromDigits(tens: int, ones: int = 0) -> tens*10 + ones

println(intFromDigits(4)$)
---
53
42
```
