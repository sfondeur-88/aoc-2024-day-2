# Advent of Code 2024 — Day 2: Red-Nosed Reports

## Problem
Given a list of reports (rows of numbers), determine how many are "safe" based on two rules:
- Levels must be either all increasing or all decreasing
- Adjacent levels must differ by at least 1 and at most 3

Part 2 introduces a "Problem Dampener" — a report also counts as safe if removing a single level would make it pass.

## Solution
- **`aoc.ts`** — main solution file
- **`inputs.txt`** — puzzle input (not included)

## Running
Place your `inputs.txt` in the same directory, then:

```bash
npx tsx aoc.ts
```

## Results
- Part 1: **356** safe reports
- Part 2: **413** safe reports (with Problem Dampener)
