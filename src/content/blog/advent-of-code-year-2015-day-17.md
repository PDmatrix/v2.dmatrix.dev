---
title: Advent of Code. Year 2015. Day 17
pubDatetime: 2023-11-21
postSlug: advent-of-code-year-2015-day-17
featured: false
draft: false
tags:
  - aoc
  - aoc-2015
description: Solution to Advent of Code Year 2015 - Day 17
---

## --- Day 17: No Such Thing as Too Much ---

In this puzzle, we have to find all possible combinations of numbers to get a given sum.

## Table of Contents

## Part 1

In the first part we have to find all possible combinations of numbers to get a given sum. To do this, we can use [a recursive function](https://stackoverflow.com/a/29321673), which returns all possible combinations.

```csharp
private static List<List<int>> SumUp(IReadOnlyList<int> numbers, int target)
{
  return SumUpRecursive(numbers, target, new List<int>());
}

private static List<List<int>> SumUpRecursive(IReadOnlyList<int> numbers, int target, List<int> partial)
{
  var res = new List<List<int>>();
  var s = partial.Sum();

  if (s == target)
    res.Add(partial);

  if (s >= target)
    return res;

  for (var i = 0; i < numbers.Count; i++)
  {
    var remaining = new List<int>();
    var n = numbers[i];
    for (var j = i + 1; j < numbers.Count; j++)
      remaining.Add(numbers[j]);

    var partialRec = new List<int>(partial) {n};
    var rs = SumUpRecursive(remaining, target, partialRec);
    res = res.Union(rs).ToList();
  }

  return res;
}
```

And that will be our solution to the first part.

```csharp
public object Part1(IEnumerable<string> lines)
{
  var numbers = lines.Select(int.Parse).ToArray();
  var res = SumUp(numbers, 150);
  return res.Count.ToString();
}
```

## Part 2

In the second part, we need to find a way to use minimum containers and check how many combinations exist with that number of containers. The code is almost the same, but with an additional step to find `min` and count a combination equal to `min`.

```csharp
public object Part2(IEnumerable<string> lines)
{
  var numbers = lines.Select(int.Parse).ToArray();
  var res = SumUp(numbers, 150);
  var min = res.Select(r => r.Count).Min();
  return res.Count(r => r.Count == min).ToString();
}
```

---

Links:

- [Puzzle](https://adventofcode.com/2015/day/17)
- [Solution](https://github.com/PDmatrix/advent-of-code/tree/master/CSharp/Solutions/2015/17)
