---
title: Advent of Code. Year 2015. Day 10
pubDatetime: 2019-06-10T04:02:17.297Z
postSlug: advent-of-code-year-2015-day-10
featured: false
draft: false
tags:
  - aoc-2015
description: Solution to Advent of Code Year 2015 - Day 10
---

## --- Day 10: Elves Look, Elves Say ---

In today's puzzle, the Elves are playing [look-and-say](https://en.wikipedia.org/wiki/Look-and-say_sequence). They take turns making sequences by reading aloud the previous sequence and using that reading as the next sequence. For example, `211` is read as "one two, two ones", which becomes `1221` (1 2, 2 1s).

### Part 1

In the first part, we need to apply this process to our puzzle input `40` times and get the length of the result.
Firstly, we need to create a function that accepts the previous sequence and returning next sequence.

```csharp
private static string ProcessInput(string input)
{
  var counter = -1;
  var processing = '\0';
  var sb = new StringBuilder();
  foreach (var num in input)
  {
    if (counter == -1)
    {
      processing = num;
      counter = 1;
      continue;
    }

    if (num == processing)
      counter++;
    else
    {
      sb.Append(counter.ToString());
      sb.Append(processing);
      counter = 1;
      processing = num;
    }
  }
  sb.Append(counter.ToString());
  sb.Append(processing);
  return sb.ToString();
}
```

Then, we just call this function `40` times in a loop to get the answer.

```csharp
public string Part1(IEnumerable<string> lines)
{
  var input = GetInput(lines);
  for (var i = 0; i < 40; i++)
  {
    input = ProcessInput(input);
  }
  return input.Length.ToString();
}
```

### Part 2

In the second part, we need to call that function `50` times instead of `40`. The solution will run a little bit slower but other than that it has no difference from the first part.

```csharp
public string Part2(IEnumerable<string> lines)
{
  var input = GetInput(lines);
  for (var i = 0; i < 50; i++)
  {
    input = ProcessInput(input);
  }
  return input.Length.ToString();
}
```

---

Links:

- [Puzzle](https://adventofcode.com/2015/day/10)
- [Solution](https://github.com/PDmatrix/advent-of-code/tree/master/CSharp/Solutions/2015/10)
