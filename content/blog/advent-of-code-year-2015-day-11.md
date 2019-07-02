---
title: Advent of Code. Year 2015. Day 11
date: 2019-07-02T10:10:51.641Z
description: Solution to Advent of Code Year 2015 - Day 11
tags:
  - aoc-2015
---
## --- Day 11: Corporate Policy ---

In today's puzzle, we need to help Santa to choose his next password. Santa has a method to create the next password based on previous. He does that by **incrementing** his old password string. Also because of corporate policy, a password should pass additional requirements like: `Passwords may not contain the letters i, o, or l`.

### Part 1

To solve this puzzle I implemented a recursive method called `Increment`. It takes one string argument and based on that argument it computes incremented string and returns it.

```csharp
private static string Increment(string s)
{
  if (s == null || (s.Length == 0))
    return "a";

  var lastChar = s[s.Length - 1];
  var fragment = s.Substring(0, s.Length - 1);
  if (lastChar >= 'z')
    return Increment(fragment) + 'a';

  ++lastChar;
  return fragment + lastChar;
}
```

Next, I implemented requirements in different methods:

- Passwords must include one increasing straight of at least three letters, like `abc`, `bcd`, `cde`, and so on, up to `xyz`. They cannot skip letters; `abd` doesn't count.

```csharp
private static bool Increasing(string input)
{
  for (var i = 0; i < input.Length - 2; i++)
  {
    var firstAndSecond = input[i] - input[i + 1] == -1;
    var secondAndThird = input[i + 1] - input[i + 2] == -1;
    if (firstAndSecond && secondAndThird)
      return true;
  }

  return false;
}
```

- Passwords may not contain the letters `i`, `o`, or `l`, as these letters can be mistaken for other characters and are therefore confusing.

```csharp
private static bool NotContaining(string input)
{
  var badChars = new[] {'l', 'o', 'i'};
  return !badChars.Any(input.Contains);
}
```

- Passwords must contain at least two different, non-overlapping pairs of letters, like `aa`, `bb`, or `zz`.

```csharp
private static bool HasAtLeastTwoDifferentPairs(string input)
{
  var pairs = new List<string>();
  for (var i = 0; i < input.Length - 1; i++)
  {
    pairs.Add( string.Concat(input[i], input[i + 1]));
  }

  return pairs.Distinct().Count(r => r[0] == r[1]) >= 2;
}
```

After that, I created the method `IsValid` to check if the password is meeting requirements or not.

```csharp
private static bool IsValid(string input)
{
  return Increasing(input) &&
         NotContaining(input) &&
         HasAtLeastTwoDifferentPairs(input);
}
```

Finally, all I needed to do is to call the `Increment` method until the password became valid.

```csharp
public string Part1(IEnumerable<string> lines)
{
  var input = GetInput(lines);
  while (!IsValid(input))
    input = Increment(input);

  return input;
}
```

### Part 2

In the second part after we got the password, we just need to increment it again and keep incrementing it until the password is valid.

```csharp
public string Part2(IEnumerable<string> lines)
{
  var input = GetInput(lines);
  while (!IsValid(input))
    input = Increment(input);

  input = Increment(input);
  while (!IsValid(input))
    input = Increment(input);
  return input;
}
```

- - -

Links:
* [Puzzle](https://adventofcode.com/2015/day/11)
* [Solution](https://github.com/PDmatrix/advent-of-code/tree/master/CSharp/Solutions/2015/11)
