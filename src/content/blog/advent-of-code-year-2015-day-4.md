---
title: Advent of Code. Year 2015. Day 4
pubDatetime: 2019-04-11T22:42:51.075Z
postSlug: advent-of-code-year-2015-day-4
featured: false
draft: false
tags:
  - aoc
  - aoc-2015
description: Solution to Advent of Code Year 2015 - Day 4
---

## --- Day 4: The Ideal Stocking Stuffer ---

Today, we are going to mine some AdventCoins. For this, we need to find MD5 hashes which, in hexadecimal, start with at least five zeroes. The input to the MD5 hash is some secret key followed by a number in decimal. We need to find the lowest number that produces such a hash.

## Table of Contents

## Part 1

In order to get hash from the string we took a function from [StackOverflow](https://stackoverflow.com/questions/11454004/calculate-a-md5-hash-from-a-string) and slightly modified it.

```csharp
private static string CreateMd5(string input)
{
  using (var md5 = MD5.Create())
  {
    var inputBytes = Encoding.ASCII.GetBytes(input);
    var hashBytes = md5.ComputeHash(inputBytes);
    var sb = new StringBuilder();
    foreach (var hashByte in hashBytes)
    {
      sb.Append(hashByte.ToString("X2"));
    }

    return sb.ToString();
  }
}
```

And then we used it to generate the new hash and when the hash starts with five zeros we return the number.

```csharp
public string Part1(IEnumerable<string> input)
{
  var key = input.First();
  var number = 1;
  while (true)
  {
    var hash = CreateMd5($"{key}{number}");
    if (hash.StartsWith("00000"))
      break;

    number++;
  }
  return number.ToString();
}
```

## Part 2

In the second part, we need to find the hash that starts at least with **6 zeroes**. The resulting code is essentially the same except one line where we check hash for six zeroes.

```csharp
public string Part2(IEnumerable<string> input)
{
  var key = input.First();
  var number = 1;
  while (true)
  {
    var hash = CreateMd5($"{key}{number}");
    if (hash.StartsWith("000000")) // 👈
      break;

    number++;
  }
  return number.ToString();
}
```

---

Links:

- [Puzzle](https://adventofcode.com/2015/day/4)
- [Solution](https://github.com/PDmatrix/advent-of-code/tree/master/CSharp/Solutions/2015/4)
