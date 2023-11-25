---
title: Advent of Code. Year 2015. Day 20
pubDatetime: 2023-11-25
postSlug: advent-of-code-year-2015-day-20
featured: false
draft: false
tags:
  - aoc
  - aoc-2015
description: Solution to Advent of Code Year 2015 - Day 20
---

## --- Day 20: Infinite Elves and Infinite Houses ---

In this puzzle we have to find the lowest house number of the house to get at least as many presents as the number in our puzzle input.

## Table of Contents

## Part 1

In the first part we need to figure out which the lowest house number gets as many presents as our input number.

If we look at an example, we can see that it looks like a sum of divisors.

```plaintext
House 1 got 10 presents.  | 1 => 1 (1)
House 2 got 30 presents.  | 2 => 3 (1 + 2)
House 3 got 40 presents.  | 3 => 4 (1 + 3)
House 4 got 70 presents.  | 4 => 7 (1 + 2 + 4)
House 5 got 60 presents.  | 5 => 6 (1 + 5)
House 6 got 120 presents. | 6 => 12 (1 + 2 + 3 + 6)
House 7 got 80 presents.  | 7 => 8 (1 + 7)
House 8 got 150 presents. | 8 => 15 (1 + 2 + 4 + 8)
House 9 got 130 presents. | 9 => 13 (1 + 3 + 9)
```

We need to create this function. You can ignore the `limit` parameter, we will need it in [the second part](#part-2).

```csharp
private static int GetDivisorsSum(int n, int limit = -1)
{
  var sum = 0;
  var iterations = 1;
  for (var i = 1; i <= Math.Sqrt(n); i++)
  {
    if (limit != -1 && iterations >= limit)
      break;

    if (n % i != 0)
      continue;

    sum += i;
    iterations++;
    if (n / i == i)
      continue;

    sum += n / i;
    iterations++;
  }
  return sum;
}
```

And to find the lowest house number we can brute force the answer by getting the sum of the divisors on each house number (**1**, **2**, **3**...) until we get the number that is greater than the input value. And that will give us an answer to the first part.

```csharp
public object Part1(IEnumerable<string> lines)
{
  var input = int.Parse(lines.FirstOrDefault());
  var calculatedValue = 0;
  var houseNumber = 0;
  while (input > calculatedValue)
  {
    houseNumber++;
    calculatedValue = GetDivisorsSum(houseNumber) * 10;
  }
  return houseNumber.ToString();
}
```

## Part 2

In the second part, we can't visit an infinite number of houses, so we need some sort of limit.

In `GetDivisorsSum` we already have a `limit` parameter that we can pass. The main thing that will change, is that we'll stop iterating after we set `limit`.

```csharp
if (limit != -1 && iterations >= limit)
  break;
```

But otherwise the solution looks exactly the same as in [the first part](#part-1). Oh, we also have to multiply by `11` instead of `10`. And that will be our solution for the second part.

```csharp
public object Part2(IEnumerable<string> lines)
{
  var input = int.Parse(lines.FirstOrDefault());
  var calculatedValue = 0;
  var houseNumber = 0;
  while (input > calculatedValue)
  {
    houseNumber++;
    calculatedValue = GetDivisorsSum(houseNumber, 50) * 11;
  }
  return houseNumber.ToString();
}
```

---

Links:

- [Puzzle](https://adventofcode.com/2015/day/20)
- [Solution](https://github.com/PDmatrix/advent-of-code/tree/master/CSharp/Solutions/2015/20)
