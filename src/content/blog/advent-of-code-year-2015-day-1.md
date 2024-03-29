---
title: Advent of Code. Year 2015. Day 1
pubDatetime: 2019-03-31T13:10:21.075Z
postSlug: advent-of-code-year-2015-day-1
featured: false
draft: false
tags:
  - aoc
  - aoc-2015
description: Solution to Advent of Code Year 2015 - Day 1
---

_This is my first blog post in a fascinating series of Advent of Code puzzles, where I sincerely try to properly explain workable solutions. All solutions will be solved using language C#._

---

## --- Day 1: Not Quite Lisp ---

In this puzzle we got Santa trying to deliver presents in a large apartment building, but he can't find the right floor. He starts on the ground floor (floor 0) and then follows the instructions one character at a time. Instructions look like this `()(((()))(()()()((((()(((())(()(()((((((()`, where opening parenthesis `(`, means he should go up one floor and a closing parenthesis, `)`, means he should go down one floor.

## Table of Contents

## Part 1

Our goal for the first part is to find what floor does the instructions take Santa. Solution for this part is pretty easy, we take every instruction and depending on the value we either sum result by `1` or `-1`.

```csharp
public string Part1(IEnumerable<string> input)
{
  var directions = input.First();
  return directions.Sum(r => r == '(' ? 1 : -1).ToString();
}
```

## Part 2

Second part is little trickier. Given the same instructions, we should find the position of the first character that causes him to enter the basement (floor `-1`). This is very similar to [the first part](#part-1), but instead of just summing every instruction, we can stop when we reach basement and return position of current character. In code below, we are returning `(i + 1)`, that's because position begins with `1`.

```csharp
public string Part2(IEnumerable<string> input)
{
  var directions = input.First();
  var floor = 0;
  for (var i = 0; i < directions.Length; i++)
  {
    floor += directions[i] == '(' ? 1 : -1;
    if (floor == -1)
      return (i + 1).ToString();
  }
  throw new Exception("Answer not found");
}
```

---

Links:

- [Puzzle](https://adventofcode.com/2015/day/1)
- [Solution](https://github.com/PDmatrix/advent-of-code/tree/master/CSharp/Solutions/2015/1)
