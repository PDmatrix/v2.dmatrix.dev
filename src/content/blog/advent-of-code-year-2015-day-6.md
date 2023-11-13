---
title: Advent of Code. Year 2015. Day 6
pubDatetime: 2019-05-03T20:10:50.771Z
postSlug: advent-of-code-year-2015-day-6
featured: false
draft: false
tags:
  - aoc-2015
description: Solution to Advent of Code Year 2015 - Day 6
---

## --- Day 6: Probably a Fire Hazard ---

In today's challenge, we need to deploy one million lights in a 1000x1000 grid. Furthermore, Santa has mailed us instructions on how to display an ideal lighting configuration.

### Part 1

In the first part, we need to count how many lights are lit after all instructions.

First of all, I created an Instruction class which consist of StartX, StartY, EndX, EndY, and an Operation.

```csharp
private class Instruction
{
  public int StartX { get; set; }
  public int EndX { get; set; }
  public int StartY { get; set; }
  public int EndY { get; set; }
  public string Operation { get; set; }
}
```

Next, I created a function which parses the input and returns a list of Instruction objects.

```csharp
private static IEnumerable<Instruction> GetInstructions(IEnumerable<string> input)
{
  const string pattern =
    @"(turn on|turn off|toggle) (\d+),(\d+) through (\d+),(\d+)";
  return input.Select(r => Regex.Match(r, pattern).Groups)
    .Select(r => new Instruction
    {
      Operation = r[1].Value,
      StartX = int.Parse(r[2].Value),
      StartY = int.Parse(r[3].Value),
      EndX = int.Parse(r[4].Value),
      EndY = int.Parse(r[5].Value)
    });
}
```

After that, all I need to do is to create 1000x1000 bool grid then iterate through instructions and change grid values in a box with start coordinate (StartX, StartY) and end coordinate (EndX, EndY) based on the operation.

```csharp
public string Part1(IEnumerable<string> input)
{
  var instructions = GetInstructions(input);
  var grid = new bool[1000, 1000];
  foreach (var instruction in instructions)
  {
    for (var x = instruction.StartX; x <= instruction.EndX; x++)
    {
      for (var y = instruction.StartY; y <= instruction.EndY; y++)
      {
        var newValue = grid[x, y];
        switch (instruction.Operation)
        {
          case "turn on":
            newValue = true;
            break;
          case "turn off":
            newValue = false;
            break;
          default:
            newValue = !newValue;
            break;
        }
        grid[x, y] = newValue;
      }
    }
  }

  var result = 0;
  for (var x = 0; x < 1000; x++)
  {
    for (var y = 0; y < 1000; y++)
    {
      result += grid[x, y] ? 1 : 0;
    }
  }

  return result.ToString();
}
```

### Part 2

The second part consists of the same steps as the first part except now we need to create a grid of `int` because we need to calculate the total brightness of all lights. And of course, now we have different operations.

```csharp
public string Part2(IEnumerable<string> input)
{
  var instructions = GetInstructions(input);
  var grid = new int[1000, 1000];
  foreach (var instruction in instructions)
  {
    for (var x = instruction.StartX; x <= instruction.EndX; x++)
    {
      for (var y = instruction.StartY; y <= instruction.EndY; y++)
      {
        var newValue = grid[x, y];
        switch (instruction.Operation)
        {
          case "turn on":
            newValue++;
            break;
          case "turn off":
            newValue = newValue == 0 ? 0 : newValue - 1;
            break;
          default:
            newValue += 2;
            break;
        }
        grid[x, y] = newValue;
      }
    }
  }

  var result = 0;
  for (var x = 0; x < 1000; x++)
  {
    for (var y = 0; y < 1000; y++)
    {
      result += grid[x, y];
    }
  }

  return result.ToString();
}
```

---

Links:

- [Puzzle](https://adventofcode.com/2015/day/6)
- [Solution](https://github.com/PDmatrix/advent-of-code/tree/master/CSharp/Solutions/2015/6)
