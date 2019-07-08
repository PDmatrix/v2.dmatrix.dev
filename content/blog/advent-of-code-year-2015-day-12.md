---
title: Advent of Code. Year 2015. Day 12
date: 2019-07-08T04:00:14.179Z
description: Solution to Advent of Code Year 2015 - Day 12
tags:
  - aoc-2015
---
## --- Day 12: JSAbacusFramework.io ---

In today's challenge we have to help Santa's Accounting-Elves. They have a `JSON` document which contains a variety of things: arrays (`[1,2,3]`), objects (`{"a":1, "b":2}`), numbers, and strings.

### Part 1

In the first part, we need to find the sum of all numbers in `JSON`. To solve this part, I used `Regex.Matches` to get all numbers from `JSON` string. Then I just iterated through all of them to get the resulting sum.

```csharp
public string Part1(IEnumerable<string> lines)
{
  var input = GetInput(lines);
  var matches = Regex.Matches(input, @"-?\d+");
  var sum = 0;
  foreach (Match match in matches)
  {
    if (int.TryParse(match.Value, out var result))
      sum += result;
    else
      throw new Exception("Bad string");
  }
  return sum.ToString();
}
```

### Part 2

In the second part, we also need to find the sum of all numbers in `JSON` but this time we need to ignore any object and all of its children which has any value `"red"`.

This time we can't just parse all numbers, so we have to parse `JSON` itself. To do that, I used a library called `Json.NET`. I created a method that can figure out which method should be called with a given token. For example, if the token is `object`, then `ProcessObject` method will be called.

```csharp
private static int ProcessToken(JToken token)
{
  switch (token)
  {
    case JArray array:
      return ProcessArray(array);
    case JObject jObject:
      return ProcessObject(jObject);
    case JValue value:
      return ProcessValue(value);
  }

  return 0;
}
```

* To process array, I need to call `ProcessToken` on all elements of that array.

```csharp
private static int ProcessArray(JArray array)
{
  return array.Children().Sum(ProcessToken);
}
```

* To process value I need to try parse value to an integer and if that parse succeeds then I am returning it otherwise I am returning `0`.

```csharp
private static int ProcessValue(JValue value)
{
  return int.TryParse(value.Value.ToString(), out var elem) ? elem : 0;
}
```

* Parsing object a little bit more difficult. First, I need to iterate through all of the properties to check if that property contains the value `"red"`. If `"red"` is found I am returning return value `0`. Otherwise, I call `ProcessToken` on all properties and get the sum.

```csharp
private static int ProcessObject(JObject jObject)
{
  foreach (var jProperty in jObject.Properties())
  {
    if (!(jProperty.Value is JValue jValue))
      continue;

    if (jValue.Value.ToString() == "red")
      return 0;
  }

  return jObject.Properties().Sum(jProperty => ProcessToken(jProperty.Value));
}
```

The final piece is to parse the input and call `ProcessArray` on it.

```csharp
public string Part2(IEnumerable<string> lines)
{
  var input = GetInput(lines);
  return ProcessArray(JArray.Parse(input)).ToString();
}
```

- - -

Links:

* [Puzzle](https://adventofcode.com/2015/day/12)
* [Solution](https://github.com/PDmatrix/advent-of-code/tree/master/CSharp/Solutions/2015/12)
