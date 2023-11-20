---
title: Advent of Code. Year 2015. Day 7
pubDatetime: 2019-05-04T16:27:00.245Z
postSlug: advent-of-code-year-2015-day-7
featured: false
draft: false
tags:
  - aoc
  - aoc-2015
description: Solution to Advent of Code Year 2015 - Day 7
---

## --- Day 7: Some Assembly Required ---

In this challenge, we need to help little Bobby Tables to assemble the circuit. In order to do this, we have a booklet that describes how to connect parts together: `x AND y -> z` means to connect `x` and `y` to an `AND` gate, and then connect its output to wire `z`.

## Table of Contents

## Part 1

We need to find out, which signal is ultimately provided to _wire `a`_.
Our solution is based on recursive function which can calculate value of a given wire. For example, imagine that we have such instructions:

```plaintext
123 -> x
456 -> y
x AND y -> d
x OR y -> e
x LSHIFT 2 -> f
y RSHIFT 2 -> g
NOT x -> h
NOT y -> i
```

And here's what happens if we call `Process("d")`:

- It gets instructions based on wire `d`, in our case it will be `["x", "AND", "y", "->", "d"]`.
- Then, function `GetValue(instructions)` is called, where based on instructions will be calculated a new value.
- Inside `GetValue` a new `Process("x")` will be called.
- `Process("x")` once again will call `GetValue` with the new instructions `["123", "->", "x"]`.
- `GetValue` will return `123` because there is no other operation.
- `Process("y")` once again will call `GetValue` with the new instructions `["456", "->", "x"]`.
- `GetValue` will return `456` because there is no other operation.
- After that, in original Process `_instructions` will be updated to a new value `["72", "->", "d"]`, so that we don't have to compute same value again.
- Finally, computed value returns.

```csharp
private Dictionary<string, string[]>
            _instructions = new Dictionary<string, string[]>();

private int Process(string input)
{
  var ins = _instructions[input];
  var value = GetValue(ins);
  _instructions[input] = new[] { value.ToString(), "->", input };
  return value;
}

private int GetValue(IReadOnlyList<string> instruction)
{
  int ComputeValue(string x) => char.IsLetter(x[0]) ? Process(x) : int.Parse(x);
  int Assign(IReadOnlyList<string> x) => ComputeValue(x[0]);
  int And(IReadOnlyList<string> x) => ComputeValue(x[0]) & ComputeValue(x[2]);
  int Or(IReadOnlyList<string> x) => ComputeValue(x[0]) | ComputeValue(x[2]);
  int LShift(IReadOnlyList<string> x) => ComputeValue(x[0]) << ComputeValue(x[2]);
  int RShift(IReadOnlyList<string> x) => ComputeValue(x[0]) >> ComputeValue(x[2]);
  int Not(IReadOnlyList<string> x) => ~ComputeValue(x[1]);

  switch (instruction[1])
  {
    case "->":
      return Assign(instruction);
    case "AND":
      return And(instruction);
    case "OR":
      return Or(instruction);
    case "LSHIFT":
      return LShift(instruction);
    case "RSHIFT":
      return RShift(instruction);
    default:
      return instruction[0] == "NOT" ? Not(instruction) : 0;
  }
}
```

When we got all this code, we needed only populate `_instructions` and then to compute the value of wire `a` by only calling `Process("a")`.

```csharp
public string Part1(IEnumerable<string> input)
{
  _instructions = input.Select(r => r.Split()).ToDictionary(r => r.Last());
  var value = Process("a");
  return value.ToString();
}
```

## Part 2

In the second part, after we computed the value of wire `a` we needed to override wire `b` to that signal, and reset the other wires (including wire `a`). After that, we needed again to find the value of wire `a`.

```csharp
public string Part2(IEnumerable<string> input)
{
  var enumerable = input as string[] ?? input.ToArray();
  _instructions = enumerable.Select(r => r.Split()).ToDictionary(r => r.Last());
  var value = Process("a");
  _instructions = enumerable.Select(r => r.Split()).ToDictionary(r => r.Last());
  _instructions["b"] = new []{value.ToString(), "->", "b"};
  return Process("a").ToString();
}
```

---

Links:

- [Puzzle](https://adventofcode.com/2015/day/7)
- [Solution](https://github.com/PDmatrix/advent-of-code/tree/master/CSharp/Solutions/2015/7)
