---
title: Advent of Code. Year 2015. Day 18
pubDatetime: 2023-11-22
postSlug: advent-of-code-year-2015-day-18
featured: false
draft: false
tags:
  - aoc
  - aoc-2015
description: Solution to Advent of Code Year 2015 - Day 18
---

## --- Day 18: Like a GIF For Your Yard ---

In this puzzle, we have to create our own [Conway's Game of Life](https://en.wikipedia.org/wiki/Conway%27s_Game_of_Life).

The rules are simple:

- If cell is **alive**:
  - If neighbors are less than `2`, cell **dies**.
  - If neighbors is `2` or `3`, cell **lives**.
  - If neighbors is greater than `3`, cell **dies**.
- If cell is **dead**:
  - If neighbors is `3`, cell becomes **alive**.

## Table of Contents

## Part 1

In the first part we need to find out how many lights are on after `100` steps. Here `step` means a generation of cells, but we will call them `lights` as the puzzle suggests.

As input we have the initial state of `lights` and need a way to parse it. For our `state` we can use a nested list (list of lists) with a bool value.

- `true` - means the light is turned **on**.
- `false` - means the light is turned **off**.

```csharp
private static List<List<bool>> GetState(IEnumerable<string> lines)
{
  return lines.Select(line => line.Select(light => light == '#').ToList()).ToList();
}
```

Next, we need to define a function that can return the number of neighbors by `row` and `column`. We also count the diagonals, so the maximum is `8`.

```csharp
private static int GetNeighborsCount(int rowIdx, int colIdx, IReadOnlyList<List<bool>> state)
{
  var res = 0;
  for (var i = rowIdx - 1; i <= rowIdx + 1; i++)
  {
    for (var j = colIdx - 1; j <= colIdx + 1; j++)
    {
      if (i == rowIdx && j == colIdx)
        continue;

      res += GetNeighbor(i, j, state);
    }
  }

  return res;
}
```

And `GetNeighbor` is just a little helper.

```csharp
private static int GetNeighbor(int row, int col, IReadOnlyList<List<bool>> state)
{
  try
  {
    return state[row][col] ? 1 : 0;
  }
  catch
  {
    return 0;
  }
}
```

Finally, we need a `Step` function that updates our state based on the rules of [Conway's Game of Life](https://en.wikipedia.org/wiki/Conway%27s_Game_of_Life) (we defined the rules at the beginning).

This function takes the current state, and returns new state, without any modifications.

```csharp
private static List<List<bool>> Step(IReadOnlyList<List<bool>> state)
{
  var newState = new List<List<bool>>();
  for (var rowIdx = 0; rowIdx < state.Count; rowIdx++)
  {
    var newRow = new List<bool>();
    for (var colIdx = 0; colIdx < state[rowIdx].Count; colIdx++)
    {
      var neighborsCount = GetNeighborsCount(rowIdx, colIdx, state);
      if (state[rowIdx][colIdx])
        newRow.Add(neighborsCount is 2 or 3);
      else
        newRow.Add(neighborsCount == 3);
    }
    newState.Add(newRow);
  }

  return newState;
}
```

After that, we can call the `Step` function `100` times and count the number of lights turned on. And that will be our solution to the first part.

```csharp
public object Part1(IEnumerable<string> lines)
{
  var state = GetState(lines);
  for (var i = 0; i < 100; i++)
    state = Step(state);

  return state.Select(r => r.Count(x => x)).Sum().ToString();
}
```

## Part 2

In the second part, we have an extra step - the lights in the corners are stuck and can't be turned off.

We need to implement a function that modifies the current state and turns on lights at every corner.

```csharp
private static void Stuck(IReadOnlyList<List<bool>> state)
{
  state[0][0] = true;
  state[0][99] = true;
  state[99][0] = true;
  state[99][99] = true;
}
```

We can then call this function before our steps and after each step to simulate that some lights are stuck. This will give us a solution for the second part.

```csharp
public object Part2(IEnumerable<string> lines)
{
  var state = GetState(lines);
  Stuck(state);
  for (var i = 0; i < 100; i++)
  {
    state = Step(state);
    Stuck(state);
  }

  return state.Select(r => r.Count(x => x)).Sum().ToString();
}
```

---

Links:

- [Puzzle](https://adventofcode.com/2015/day/18)
- [Solution](https://github.com/PDmatrix/advent-of-code/tree/master/CSharp/Solutions/2015/18)
