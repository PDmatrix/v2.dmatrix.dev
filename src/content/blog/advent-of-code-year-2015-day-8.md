---
title: Advent of Code. Year 2015. Day 8
pubDatetime: 2019-05-07T13:22:38.533Z
postSlug: advent-of-code-year-2015-day-8
featured: false
draft: false
tags:
  - aoc
  - aoc-2015
description: Solution to Advent of Code Year 2015 - Day 8
---

## --- Day 8: Matchsticks ---

Today, we are going to count the difference between the number of characters _in the code representation of the string literal_ and _the number of characters in the in-memory string itself_.

## Table of Contents

## Part 1

In the first part, we have a list of an escaped string literal, and all we have to do is to count how many total characters there are minus characters in-memory string itself. To do this, we just loop through a string and increment `numberOfCharsMemory` variable in each iteration. If the value appears to be escaped, then we increase the index.

```csharp
public string Part1(IEnumerable<string> lines)
{
  int numberOfCharsLiteral = 0, numberOfCharsMemory = 0;
  foreach (var line in lines)
  {
    numberOfCharsLiteral += line.Length;
    var mutable = line.Substring(1, line.Length - 2);
    var idx = 0;
    while (idx < mutable.Length)
    {
      switch (mutable[idx])
      {
        case '\\' when idx + 1 != mutable.Length - 1 && mutable[idx + 1] == 'x':
          idx += 3;
          break;
        case '\\':
          idx++;
          break;
      }

      idx++;
      numberOfCharsMemory++;
    }
  }
  return (numberOfCharsLiteral - numberOfCharsMemory).ToString();
}
```

## Part 2

In the second part, we need to encode string and count new length of that string.

```csharp
public string Part2(IEnumerable<string> lines)
{
  int numberOfCharsLiteral = 0, numberOfNewCharsLiteral = 0;
  foreach (var line in lines)
  {
    numberOfCharsLiteral += line.Length;
    var mutable = line;
    foreach (var c in mutable)
    {
      if (c == '"' || c == '\\')
      {
        numberOfNewCharsLiteral++;
      }
      numberOfNewCharsLiteral++;
    }

    numberOfNewCharsLiteral += 2;
  }
  return (numberOfNewCharsLiteral - numberOfCharsLiteral).ToString();
}
```

---

Links:

- [Puzzle](https://adventofcode.com/2015/day/8)
- [Solution](https://github.com/PDmatrix/advent-of-code/tree/master/CSharp/Solutions/2015/8)
