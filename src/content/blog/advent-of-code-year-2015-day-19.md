---
title: Advent of Code. Year 2015. Day 19
pubDatetime: 2023-11-23
postSlug: advent-of-code-year-2015-day-19
featured: false
draft: false
tags:
  - aoc
  - aoc-2015
description: Solution to Advent of Code Year 2015 - Day 19
---

## --- Day 19: Medicine for Rudolph ---

In this puzzle we have to make a medicine for Rudolph the Red-Nosed Reindeer.

## Table of Contents

## Part 1

In the first part we need to find out how many distinct molecules can be created after all the different ways you can do one replacement on the medicine molecule.

We have a list of replacements and a molecule string as an input. We need to apply each replacement to the molecule string and return a unique way that this molecule can be changed. We can use a `HashSet` to do this.

First of all, we need to define the `Replacements` class, which has two properties: `From` and `To`.

```csharp
private class Replacement
{
  public string From { get; set; } = null!;
  public string To { get; set; } = null!;
}
```

Then we need a function that parses our input into a list of replacements.

```csharp
private static IEnumerable<Replacement> GetReplacements(IEnumerable<string> lines)
{
  return lines
    .TakeWhile(line => line.IndexOf(" => ", StringComparison.Ordinal) != -1)
    .Select(line => line.Split(" => "))
    .Select(splitted => new Replacement
    {
      From = splitted.First(),
      To = splitted.Last()
    });
}
```

Now for the counting part we need to create another function that takes a list of replacements and a molecule and returns a number of distinct ways to change that molecule.

We need to create a `HashSet` that contains only unique changed molecules. We iterate through each replacement and get each index of the original molecule that matches the `From` property. And we also iterate through them to create a replacement that will be added to the `HashSet`. After that, we can return the length of the `HashSet`.

```csharp
private static int CountDistinctMolecules(IEnumerable<Replacement> replacements, string value)
{
  var molecules = new HashSet<string>();
  foreach (var replacement in replacements)
  {
    var indexes = AllIndexesOf(value, replacement.From);
    foreach (var index in indexes)
    {
      molecules.Add(Replace(value, index, replacement.From.Length, replacement.To));
    }
  }

  return molecules.Count;
}
```

`AllIndexesOf` and `Replace` are just a little helper functions that do exactly what their name says.

```csharp
private static IEnumerable<int> AllIndexesOf(string str, string searchString)
{
  var minIndex = str.IndexOf(searchString, StringComparison.Ordinal);
  while (minIndex != -1)
  {
    yield return minIndex;
    minIndex = str.IndexOf(searchString, minIndex + searchString.Length, StringComparison.Ordinal);
  }
}

private static string Replace(string text, int index, int length, string replace)
{
  return text[..index] + replace + text[(index + length)..];
}
```

Finally, we need to put it together to get the solution to the first part.

```csharp
public object Part1(IEnumerable<string> lines)
{
  var enumerable = lines as string[] ?? lines.ToArray();
  var replacements = GetReplacements(enumerable);
  var value = enumerable.Last();
  var count = CountDistinctMolecules(replacements, value);
  return count.ToString();
}
```

## Part 2

In the second part, we need to get from one molecule `e` to molecule in our input with as few steps as possible.

It was a really tough second part, probably the hardest from the `2015` year. My first thought was to use `BFS`, but I quickly realized that it would be too slow.

In the end I gave up and looked through the `adventofcode` subreddit and [found a hacky solution](https://www.reddit.com/r/adventofcode/comments/3xflz8/day_19_solutions/cy4h7ji). So I copied it and it worked. And that's all for the second part.

```csharp
public object Part2(IEnumerable<string> lines)
{
  var molecule = lines.Last();

  var num = molecule.Count(char.IsUpper) - CountStr("Rn") - CountStr("Ar") - 2 * CountStr("Y") - 1;
  return num.ToString();

  // Hacky solution
  // https://www.reddit.com/r/adventofcode/comments/3xflz8/day_19_solutions/cy4h7ji
  int CountStr(string x)
  {
    var count = 0;
    for (var index = molecule.IndexOf(x, StringComparison.Ordinal);
          index >= 0;
          index = molecule.IndexOf(x, index + 1, StringComparison.Ordinal), ++count)
    {
    }

    return count;
  }
}
```

---

Links:

- [Puzzle](https://adventofcode.com/2015/day/19)
- [Solution](https://github.com/PDmatrix/advent-of-code/tree/master/CSharp/Solutions/2015/19)
