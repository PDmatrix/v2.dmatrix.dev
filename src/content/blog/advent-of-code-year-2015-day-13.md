---
title: Advent of Code. Year 2015. Day 13
pubDatetime: 2019-08-24T09:45:10.517Z
postSlug: advent-of-code-year-2015-day-13
featured: false
draft: false
tags:
  - aoc
  - aoc-2015
description: Solution to Advent of Code Year 2015 - Day 13
---

## --- Day 13: Knights of the Dinner Table ---

In today's puzzle, we need to find an optimal seating arrangement for a guests.

## Table of Contents

## Part 1

In the first part, we need to calculate the right seat arrangement where total happiness would be the greatest. First, we need to get all the guests from the input.

```csharp
private static IEnumerable<string> GetGuests(IEnumerable<string> lines)
{
  const string pattern =
    @"(?<who>\w+) would (lose|gain) (\d+?) happiness units by sitting next to (?<with>\w+)";
  var res = new List<string>();
  foreach (var line in lines)
  {
    var match = Regex.Match(line, pattern);
    res.Add(match.Groups["who"].Value);
    res.Add(match.Groups["with"].Value);
  }

  return res.Distinct();
}
```

After that, we need to somehow represent units of happiness of all guests. We decided to use `Dictionary` where the key is a guest name and the value is another `Dictionary` where stored other guests with units of happiness, e.g:

```json
{
  "Alice": {
    "Bob": 54,
    "David": 0
  },
  "Bob": {
    "Alice": 83,
    "David": -25
  },
  "David": {
    "Alice": -60,
    "Bob": -90
  }
}
```

Here's the code for this. In this function we also have `withMe` parameter, don't mind it now, we are going use it in the [second part](#part-2):

```csharp
private static Dictionary<string, Dictionary<string, int>> GetUnits(IEnumerable<string> lines, bool withMe = false)
{
  const string pattern =
    @"(?<who>\w+) would (?<what>lose|gain) (?<by>\d+?) happiness units by sitting next to (?<with>\w+)";
  var res = new Dictionary<string, Dictionary<string, int>>();
  foreach (var line in lines)
  {
    var match = Regex.Match(line, pattern);
    var firstGuest = match.Groups["who"].Value;
    if (!res.ContainsKey(firstGuest))
    {
      res[firstGuest] = new Dictionary<string, int>();
    }

    var secondGuest = match.Groups["with"].Value;
    if (!res.ContainsKey(secondGuest))
    {
      res[secondGuest] = new Dictionary<string, int>();
    }

    res[firstGuest][secondGuest] =
      match.Groups["what"].Value == "lose"
        ? -int.Parse(match.Groups["by"].Value)
        : int.Parse(match.Groups["by"].Value);
    if (withMe)
      res[firstGuest]["Me"] = 0;
  }

  return res;
}
```

Next thing, we need to create permutations of all guests. To do that we can use the method from the [ninth day](/posts/advent-of-code-year-2015-day-9). After all that, we can easily compute the total happiness of all guest permutations and pick the highest value.

```csharp
public string Part1(IEnumerable<string> lines)
{
  var enumerable = lines as string[] ?? lines.ToArray();
  var guests = GetGuests(enumerable).ToArray();
  var units = GetUnits(enumerable);
  var permutations = GetPer(guests);
  return permutations.Select(r => Compute(r, units)).Max().ToString();
}

private static int Compute(IEnumerable<string> list,
  IReadOnlyDictionary<string, Dictionary<string, int>> dictionary)
{
  var sum = 0;
  var enumerable = list as string[] ?? list.ToArray();
  for (var i = 0; i < enumerable.Length; i++)
  {
    if (i == 0)
      sum += dictionary[enumerable[i]][enumerable.Last()];
    else
      sum += dictionary[enumerable[i]][enumerable[i - 1]];

    if (i == enumerable.Length - 1)
      sum += dictionary[enumerable[i]][enumerable.First()];
    else
      sum += dictionary[enumerable[i]][enumerable[i + 1]];
  }

  return sum;
}
```

## Part 2

In the second part, we need to include ourselves in the guest list. As we already saw in the method `GetUnits` I have an optional parameter, called `withMe` which allows me to insert `Me` as a guest. After that, we adding new guest called `Me`. The rest of the code is the same as the [first part](#part-1):

```csharp
public string Part2(IEnumerable<string> lines)
{
  var enumerable = lines as string[] ?? lines.ToArray();
  var guests = GetGuests(enumerable).ToList();
  var units = GetUnits(enumerable, true);
  units["Me"] = new Dictionary<string, int>();
  foreach (var guest in guests)
  {
    units["Me"][guest] = 0;
  }
  guests.Add("Me");
  var permutations = GetPer(guests.ToArray());
  return permutations.Select(r => Compute(r, units)).Max().ToString();
}
```

---

Links:

- [Puzzle](https://adventofcode.com/2015/day/13)
- [Solution](https://github.com/PDmatrix/advent-of-code/tree/master/CSharp/Solutions/2015/13)
