---
title: Advent of Code. Year 2015. Day 5
pubDatetime: 2019-04-30T13:40:38.031Z
postSlug: advent-of-code-year-2015-day-5
featured: false
draft: false
tags:
  - aoc
  - aoc-2015
description: Solution to Advent of Code Year 2015 - Day 5
---

## --- Day 5: Doesn't He Have Intern-Elves For This? ---

In today's puzzle, we need to help Santa figuring out which strings in his text file are naughty or nice.

## Table of Contents

## Part 1

A nice string is one with all of the following properties:

- It contains at least three vowels (aeiou only), like `aei`, `xazegov`, or `aeiouaeiouaeiou`.
- It contains at least one letter that appears twice in a row, like `xx`, `abcdde` (**dd**), or `aabbccdd` (**aa**, **bb**, **cc**, or **dd**).
- It does not contain the strings `ab`, `cd`, `pq`, or `xy`, even if they are part of one of the other requirements.

The easiest way to solve this part is to use regular expressions.

```csharp
public string Part1(IEnumerable<string> input)
{
  bool HasThreeVowels(string str) =>
    Regex.Matches(str, @"[aeiou]").Count >= 3;

  bool HasDoubledLetter(string str) =>
    Regex.IsMatch(str, @"(\w)\1");

  bool ContainsNaughtyStrings(string str) =>
    Regex.IsMatch(str, @"ab|cd|pq|xy");

  bool IsNiceString(string str) =>
    HasThreeVowels(str)
    && HasDoubledLetter(str)
    && !ContainsNaughtyStrings(str);

  var niceStrings = input.Count(IsNiceString);
  return niceStrings.ToString();
}
```

## Part 2

In the second part we have new properties:

- It contains a pair of any two letters that appears at least twice in the string without overlapping, like `xyxy` (**xy**) or `aabcdefgaa` (**aa**), but not like `aaa` (**aa**, but it overlaps).
- It contains at least one letter which repeats with exactly one letter between them, like `xyx`, `abcdefeghi` (efe), or even `aaa`.

The solution is very much like [the first part](#part-1), except now we have two methods and different regular expressions.

```csharp
public string Part2(IEnumerable<string> input)
{
  bool HasPair(string str) =>
    Regex.IsMatch(str, @"(\w{2}).*\1");

  bool HasDuplicate(string str) =>
    Regex.IsMatch(str, @"(\w).\1");

  bool IsNiceString(string str) =>
    HasDuplicate(str)
    && HasPair(str);

  var niceStrings = input.Count(IsNiceString);
  return niceStrings.ToString();
}
```

---

Links:

- [Puzzle](https://adventofcode.com/2015/day/5)
- [Solution](https://github.com/PDmatrix/advent-of-code/tree/master/CSharp/Solutions/2015/5)
