---
title: Advent of Code. Year 2015. Day 3
date: 2019-04-07
description: Solution to Advent of Code Year 2015 - Day 3
tags:
  - aoc-2015
---
## --- Day 3: Perfectly Spherical Houses in a Vacuum ---

In this puzzle, we have Santa delivering presents to an infinite two-dimensional grid of houses. He begins by delivering a present to the house at his starting point `[0, 0]` and then an elf at the North Pole calls him via radio and tells him where to move next. But the elf's directions are a little of, and Santa ends up visiting some houses more than once. We have to find how many houses receive at least one present.

### Part 1

For this part, I created an anonymous object (**1**) for Santa's location and HashSet of points (**2**). After that, I go through all of the directions and compute Santa's new location based on the direction and the previous location and add it to the HashSet of points (**3**).

```csharp{4,5,16}
public string Part1(IEnumerable<string> input)
{
  var directions = input.First();
  var location = new {X = 0, Y = 0}; // 1
  var points = new HashSet<object>{location}; // 2
  foreach (var direction in directions)
  {
    if (direction == '>')
      location = new {X = location.X + 1, location.Y};
    if (direction == '<')
      location = new {X = location.X - 1, location.Y};
    if (direction == '^')
      location = new {location.X, Y = location.Y + 1};
    if (direction == 'v')
      location = new {location.X, Y = location.Y - 1};
    points.Add(location); // 3
  }
  return points.Count.ToString();
}
```

### Part 2

In the second part, we have Santa and Robo-Santa to deliver presents. I created two objects that represent the location of the Santa's (**1**) and boolean variable for Santa's turn (**2**) then, based on this variable I am computing the new location and adding it to the HashSet of points.

```csharp{4,5,6}
public string Part2(IEnumerable<string> input)
{
  var directions = input.First();
  var santa = new {X = 0, Y = 0}; // 1
  var roboSanta = new {X = 0, Y = 0}; // 1
  var santaTurn = true; // 2
  var points = new HashSet<object>{santa};
  foreach (var direction in directions)
  {
    var location = santaTurn ? santa : roboSanta;
    if (direction == '>')
      location = new {X = location.X + 1, location.Y};
    if (direction == '<')
      location = new {X = location.X - 1, location.Y};
    if (direction == '^')
      location = new {location.X, Y = location.Y + 1};
    if (direction == 'v')
      location = new {location.X, Y = location.Y - 1};
    if (santaTurn)
      santa = location;
    else
      roboSanta = location;
    santaTurn = !santaTurn;
    points.Add(location);
  }
  return points.Count.ToString();
}
```

- - -

Links:

* [Puzzle](https://adventofcode.com/2015/day/3)
* [Solution](https://github.com/PDmatrix/advent-of-code/tree/master/CSharp/Solutions/2015/3)
