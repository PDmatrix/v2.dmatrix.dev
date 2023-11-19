---
title: Advent of Code. Year 2015. Day 15
pubDatetime: 2023-11-19
postSlug: advent-of-code-year-2015-day-15
featured: false
draft: false
tags:
  - aoc
  - aoc-2015
description: Solution to Advent of Code Year 2015 - Day 15
---

## --- Day 15: Science for Hungry People ---

In this puzzle, we have to find the right balance of ingredients, i.e. the maximum score among all permutations of ingredients.

## Table of Contents

## Part 1

In the first part, we need to find the maximum score among all permutations of ingredients. First, we need to parse our input to the `Dictionary` of ingredients. In this function we iterate through an input and populate our ingredient `Dictionary`.

```csharp
private static Dictionary<string, Dictionary<string, int>> GetIngredients(IEnumerable<string> lines)
{
  var ingredients = new Dictionary<string, Dictionary<string, int>>();
  foreach (var line in lines)
  {
    var splitted = line.Split(":");
    var name = splitted.First();
    var matches = Regex.Matches(splitted.Last(), @"-?\d");

    ingredients[name] = new Dictionary<string, int>
    {
      { "capacity", int.Parse(matches[0].Value) },
      { "durability", int.Parse(matches[1].Value) },
      { "flavor", int.Parse(matches[2].Value) },
      { "texture", int.Parse(matches[3].Value) },
      { "calories", int.Parse(matches[4].Value) },
    };
  }

  return ingredients;
}
```

Next, we need to have a function to make cookies. Here we will create a cookie based on the ingredients we provide. Ignore the `withCalories` parameter, we will need it in the [second part](#part-2).

```csharp
private static long MakeCookie(Dictionary<string, int> currentIngredients,
  IReadOnlyDictionary<string, Dictionary<string, int>> allIngredients, bool withCalories = false)
{
  var propertiesList = new List<string>
  {
    "calories",
    "capacity",
    "durability",
    "flavor",
    "texture"
  };

  long res = 1;
  foreach (var property in propertiesList)
  {
    var intermediate = currentIngredients.Aggregate<KeyValuePair<string, int>, long>(0,
      (current, kv) => current + allIngredients[kv.Key][property] * kv.Value);

    intermediate = intermediate > 0 ? intermediate : 0;
    if (withCalories && property == "calories" && intermediate != 500)
      return 0;
    if (property == "calories")
      continue;

    res *= intermediate;
  }

  return res <= 0 ? 0 : res;
}
```

Finally, we can create a function (`GetMaxCookieScore`) that calculates the total score of all the permutations and returns the maximum value. And this will be our solution for the first part.

```csharp
public object Part1(IEnumerable<string> lines)
{
  return GetMaxCookieScore(lines);
}

private static long GetMaxCookieScore(IEnumerable<string> lines, bool withCalories = false)
{
  var ingredients = GetIngredients(lines);
  var res = new List<long>();
  for (var sprinkles = 1; sprinkles < 100; sprinkles++)
  {
    for (var butterscotch = 1; butterscotch < 100 - sprinkles; butterscotch++)
    {
      for (var chocolate = 1; chocolate < 100 - sprinkles - butterscotch; chocolate++)
      {
        var candy = 100 - sprinkles - butterscotch - chocolate;
        var currentIngredients = new Dictionary<string, int>
        {
          { "Sprinkles", sprinkles },
          { "Butterscotch", butterscotch },
          { "Chocolate", chocolate },
          { "Candy", candy }
        };
        res.Add(MakeCookie(currentIngredients, ingredients, withCalories));
      }
    }
  }

  return res.Max();
}
```

## Part 2

In the second part we need to do the same thing, but we also need to have the `calory` property equal to `500`. For this we had an additional `withCalories` parameter in our `GetMaxCookieScore` and `MakeCookie` functions. So we just need to pass it to our function and that will give us a solution.

The `withCalories` parameter adds an extra check, and if it's true, we just return `0`.

```csharp
if (withCalories && property == "calories" && intermediate != 500)
  return 0;
```

This will be the final solution for the second part.

```csharp
public object Part2(IEnumerable<string> lines)
{
  return GetMaxCookieScore(lines, true);
}
```

---

Links:

- [Puzzle](https://adventofcode.com/2015/day/15)
- [Solution](https://github.com/PDmatrix/advent-of-code/tree/master/CSharp/Solutions/2015/15)
