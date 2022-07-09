All values in Teko should be thought of as **objects**, consisting of a set of
fields as key-value pairs. This model of thinking about objects is most comparable
to JavaScript/TypeScript. The easiest way to illustrate this idea is using an
expression type known as an **object literal**:

```
alice := {
  name: "Alice",
  age: 25,
}

println(alice.name)
```

This object, `alice`, has two fields: `name`, the value of which is `"Alice"`,
and `age`, the value of which is `25`. We can access either of the fields using
attribute syntax, which should look similar to most other popular languages:
`alice.name`.

So what is the type of `alice`? Well, in Teko, object types are simply defined
by the types of their fields; in this case, the type of `alice` is something
like `{name: str, age: int}`.

```
alice: {name: str, age: int} = {
  name: "Alice",
  age: 25,
}
```

It improves both readability and reusability to split this off into a named,
user-defined type. We'll call this type `Person`:

```
type Person = {
  name: str,
  age: 25,
}

alice: Person = {
  name: "Alice",
  age: 25,
}
```

---

Depending on your language background,
you may be used to thinking of things like integers, booleans, and strings
as more primitive than objects, but in Teko they are simply objects as well,
and their types are just object types. For instance, an incomplete definition
of `str` might look something like the following:

```
{
  size: int,
  add: fn(str): str,
}
```

Recall the usage of those two fields:

```
my_str : str = "Hello"

println(my_str.size$)
println(my_str.add(", World!")
```

Strings in Teko happen to have many more fields than just these two, but they
work no differently than the two we've seen.
