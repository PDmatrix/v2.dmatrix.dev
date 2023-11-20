---
title: Advent of Code. Year 2015. Day 16
pubDatetime: 2023-11-20
postSlug: advent-of-code-year-2015-day-16
featured: false
draft: false
tags:
  - aoc
  - aoc-2015
description: Solution to Advent of Code Year 2015 - Day 16
---

## --- Day 16: Aunt Sue ---

In this puzzle, we have to find the right Aunt Sue based on some compounds.

## Table of Contents

## Part 1

In the first part, we need to find the right Aunt Sue based on some compounds. As input we have a list of `500` aunts with different compounds and values for them. It may be that we don't have the same compounds on all of them, but only some.

First, we need to parse our input to the list of `Dictionary`. The key will be the compound name. In this function we iterate through an input and return a list of `Dictionary`.

```csharp
private static IEnumerable<Dictionary<string, int>> GetAunts(IEnumerable<string> lines)
{
  foreach (var line in lines)
  {
    var splitted = line.Split().Select(r =>
      r.Replace(",", string.Empty)
        .Replace(":", string.Empty)).ToArray();
    yield return new Dictionary<string, int>
    {
      { "id", int.Parse(splitted[1]) },
      { splitted[2], int.Parse(splitted[3]) },
      { splitted[4], int.Parse(splitted[5]) },
      { splitted[6], int.Parse(splitted[7]) }
    };
  }
}
```

Next, we need to create function that returns our aunt's compounds. Since we have defined them in the puzzle description, we can also hardcode them.

```csharp
private static Dictionary<string, int> GetEtalonAunt()
{
  return new Dictionary<string, int>
  {
    {"children", 3},
    {"cats", 7},
    {"samoyeds", 2},
    {"pomeranians", 3},
    {"akitas", 0},
    {"vizslas", 0},
    {"goldfish", 5},
    {"trees", 3},
    {"cars", 2},
    {"perfumes", 1}
  };
}
```

Then we need a way to find our aunt from the list. We can iterate through each aunt and then iterate through each compound. If we will find something that doesn't match, we can safely ignore that aunt because it's not ours. Ignore the `withFixedInstructions` parameter, we will need it in the [second part](#part-2).

```csharp
private static object FindRightAunt(IEnumerable<Dictionary<string, int>> aunts, IReadOnlyDictionary<string, int> etalonAunt, bool withFixedInstructions = false)
{
  foreach (var aunt in aunts)
  {
    var match = MatchAunts(etalonAunt, withFixedInstructions, aunt);

    if (match)
      return aunt["id"].ToString();
  }

  return "error";
}

private static bool MatchAunts(IReadOnlyDictionary<string, int> etalonAunt, bool withFixedInstructions, Dictionary<string, int> aunts)
{
  var match = true;
  foreach (var (key, value) in aunts)
  {
    if (key == "id")
      continue;

    if (withFixedInstructions && (key == "trees" || key == "cats"))
    {
      if (value <= etalonAunt[key])
      {
        match = false;
        break;
      }

      continue;
    }

    if (withFixedInstructions && (key == "pomeranians" || key == "goldfish"))
    {
      if (value >= etalonAunt[key])
      {
        match = false;
        break;
      }

      continue;
    }

    if (value == etalonAunt[key])
      continue;

    match = false;
    break;
  }

  return match;
}
```

And that will be our solution for the first part.

```csharp
public object Part1(IEnumerable<string> lines)
{
  var aunts = GetAunts(lines);
  var etalonAunt = GetEtalonAunt();
  return FindRightAunt(aunts, etalonAunt);
}
```

## Part 2

In the second part, we need to do the same thing, but treat some compounds differently.

- `cats` and `trees` - represent **greater than**.
- `pomeranians` and `goldfish` - represent **fewer than**.

The `withFixedInstructions` parameter adds an extra check for these changes.

```csharp
if (withFixedInstructions && (key == "trees" || key == "cats"))
{
  if (value <= etalonAunt[key])
  {
    match = false;
    break;
  }

  continue;
}

if (withFixedInstructions && (key == "pomeranians" || key == "goldfish"))
{
  if (value >= etalonAunt[key])
  {
    match = false;
    break;
  }

  continue;
}
```

This will be the final solution for the second part.

```csharp
public object Part2(IEnumerable<string> lines)
{
  var aunts = GetAunts(lines);
  var etalonAunt = GetEtalonAunt();
  return FindRightAunt(aunts, etalonAunt, true);
}
```

---

Links:

- [Puzzle](https://adventofcode.com/2015/day/16)
- [Solution](https://github.com/PDmatrix/advent-of-code/tree/master/CSharp/Solutions/2015/16)
