---
title: Advent of Code. Year 2015. Day 14
pubDatetime: 2023-11-18T09:45:10.517Z
postSlug: advent-of-code-year-2015-day-14
featured: false
draft: false
tags:
  - aoc
  - aoc-2015
description: Solution to Advent of Code Year 2015 - Day 14
---

## --- Day 14: Reindeer Olympics ---

In this puzzle, the reindeer are racing each other and we have to work out who is going to win.

## Table of Contents

## Part 1

In the first part we need to find out which reindeer has won and what distance it has traveled after exactly `2503` seconds.

First, I've defined a reindeer class with all the necessary properties. There we have things like `speed`, `fly time` and `rest time`. There is also a `Points` property, but we will need that in [the second part](#part-2).

```csharp
private class Deer
{
  private readonly int _speed;
  private readonly int _flyTime;
  private readonly int _restTime;

  private int _flyTimeLeft;
  private int _restTimeLeft;
  private bool _isResting;

  public int TravelledDistance { get; set; }

  public int Points { get; set; }

  public Deer(int speed, int flyTime, int restTime)
  {
    _speed = speed;
    _flyTime = flyTime;
    _restTime = restTime;
    _flyTimeLeft = flyTime;
  }

  public void Tick()
  {
    if (_isResting)
    {
      _restTimeLeft--;
      if (_restTimeLeft != 0)
        return;

      _flyTimeLeft = _flyTime;
      _isResting = false;
      return;
    }

    _flyTimeLeft--;
    TravelledDistance += _speed;
    if(_flyTimeLeft != 0)
      return;

    _restTimeLeft = _restTime;
    _isResting = true;
  }
}
```

We also need a way to parse our input into an array of reindeer, something like this.

```csharp
private static IEnumerable<Deer> GetDeers(IEnumerable<string> lines)
{
  return lines
    .Select(r => r.Split(" "))
    .Select(r => new Deer(int.Parse(r[3]), int.Parse(r[6]), int.Parse(r[13])));
}
```

The main thing that we need from the `Deer` class is a `Tick` method. It handles all the core logic. Basically, `Tick()` is called every second for each reindeer. And after `2503` seconds we can iterate over the array of reindeers and get the maximum `TravelledDistance`. And this will be our solution for the first part.

```csharp
public object Part1(IEnumerable<string> lines)
{
  var deers = GetDeers(lines);
  var enumerable = deers as Deer[] ?? deers.ToArray();
  for (var i = 0; i < 2503; i++)
  {
    foreach (var deer in enumerable)
    {
      deer.Tick();
    }
  }
  return enumerable.Select(r => r.TravelledDistance).Max().ToString();
}
```

## Part 2

In the second part, we need to change the way we calculate the winner. This time there is a point system (that's why we needed the `Points` property in the `Deer` class) and we need to add points to the leading reindeer every second.

The solution is basically the same as in [the first part](#part-1), except that we also need to increase the `Points` property for the reindeer that's currently winning.

```csharp
public object Part2(IEnumerable<string> lines)
{
  var deers = GetDeers(lines);
  var enumerable = deers as Deer[] ?? deers.ToArray();
  for (var i = 0; i < 2503; i++)
  {
    foreach (var deer in enumerable)
    {
      deer.Tick();
    }

    var max = enumerable.Select(r => r.TravelledDistance).Max();
    enumerable = enumerable.Select(r =>
    {
      if (r.TravelledDistance == max)
        r.Points++;
      return r;
    }).ToArray();
  }

  return enumerable.Select(r => r.Points).Max().ToString();
}
```

---

Links:

- [Puzzle](https://adventofcode.com/2015/day/14)
- [Solution](https://github.com/PDmatrix/advent-of-code/tree/master/CSharp/Solutions/2015/14)
