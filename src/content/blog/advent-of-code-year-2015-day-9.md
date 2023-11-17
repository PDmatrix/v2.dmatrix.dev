---
title: Advent of Code. Year 2015. Day 9
pubDatetime: 2019-05-24T15:36:26.991Z
postSlug: advent-of-code-year-2015-day-9
featured: false
draft: false
tags:
  - aoc
  - aoc-2015
description: Solution to Advent of Code Year 2015 - Day 9
---

## --- Day 9: All in a Single Night ---

In this puzzle, we need to help Santa deliver his presents to all locations without repeating them.

## Table of Contents

## Part 1

In the first part, we need to find the minimal distance between all of the locations. First of all, we need to get all permutations between all of the locations.

```csharp
private static IEnumerable<List<string>> GetPer(string[] list, int k, int m)
{
  var res = new List<List<string>>();
  if (k == m)
  {
    res.Add(list.ToList());
  }
  else
    for (var i = k; i <= m; i++)
    {
      Swap(ref list[k], ref list[i]);
      var permutations = GetPer(list, k + 1, m);
      res = res.Union(permutations).ToList();
      Swap(ref list[k], ref list[i]);
    }

  return res;
}
```

After that, we can get all cities, routes, get permutations and after that compute distance. Next, we need to get minimal distance and that will be the answer.

```csharp
public string Part1(IEnumerable<string> lines)
{
  var enumerable = lines as string[] ?? lines.ToArray();
  var cities = GetCities(enumerable).ToArray();
  var routes = GetRoutes(enumerable);
  var permutations = GetPer(cities);
  return permutations.Select(r => Compute(r, routes)).Min().ToString();
}

private static int Compute(IEnumerable<string> list,
  IReadOnlyDictionary<string, Dictionary<string, int>> dictionary)
{
  var sum = 0;
  var enumerable = list as string[] ?? list.ToArray();
  for (var i = 0; i < enumerable.Length - 1; i++)
  {
    sum += dictionary[enumerable[i]][enumerable[i + 1]];
  }

  return sum;
}
```

## Part 2

In the second part, we need to find the maximum distance between locations. Everything is the same except now we need to call `.Max()` instead of `.Min()` in the result.

```csharp
public string Part2(IEnumerable<string> lines)
{
  var enumerable = lines as string[] ?? lines.ToArray();
  var cities = GetCities(enumerable).ToArray();
  var routes = GetRoutes(enumerable);
  var permutations = GetPer(cities);
  return permutations.Select(r => Compute(r, routes)).Max().ToString(); // 👈
}
```

---

Links:

- [Puzzle](https://adventofcode.com/2015/day/9)
- [Solution](https://github.com/PDmatrix/advent-of-code/tree/master/CSharp/Solutions/2015/9)
