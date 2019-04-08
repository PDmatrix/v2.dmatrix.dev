---
title: Advent of Code. Year 2015. Day 2
date: 2019-04-05T13:35:44.827Z
description: Advent of Code. Year 2015. Day 2
tags:
  - aoc-2015
---
## --- Day 2: I Was Told There Would Be No Math ---

In this challenge, we have to help elves by calculating the required wrapping paper for each gift. Fortunately, they gave us a formula (`2*l*w + 2*w*h + 2*h*l`), which makes things a little easier. The elves also need a little extra paper for each present: the area of the smallest side.

### Part 1

In the first part we have to find how many total square feet of wrapping paper should they order. To do that, we are parsing input into separate variables. Then we are finding the smallest side of the present. After that we are summing it with the value calculated by the formula.

```csharp
public string Part1(IEnumerable<string> input)
{
  var result = 0;
  foreach (var dimension in input)
  {
    var dims = dimension.Split('x').Select(int.Parse).ToList();
    int l = dims[0],
        w = dims[1],
        h = dims[2];
    var smallestSide = Math.Min(Math.Min(l * w, w * h), h * l);
    result += smallestSide + 2 * l * w + 2 * w * h + 2 * h * l;
  }
  return result.ToString();
}
```

### Part 2

In the second part we have to find how many total feet of ribbon should they order. To find the answer, we are getting input, sorting it. Then, we are multiplying the first two items by 2 to get the shortest distance and then summing it by cubic feet of volume of the present to get result.

```csharp
public string Part2(IEnumerable<string> input)
{
  var result = 0;
  foreach (var dimension in input)
  {
    var dims = dimension.Split('x').Select(int.Parse).ToList();
    dims.Sort();
    result += dims[0] * 2 + dims[1] * 2 + dims.Aggregate((i, w) => i * w);
  }
  return result.ToString();
}
```

---
Links:
* [Puzzle](https://adventofcode.com/2015/day/2)
* [Solution](https://github.com/PDmatrix/advent-of-code/tree/master/CSharp/Solutions/2015/2)
