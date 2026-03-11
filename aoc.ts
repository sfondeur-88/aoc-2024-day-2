import fs from "fs";

// https://adventofcode.com/2024/day/2

const inputs = fs.readFileSync('./inputs.txt', 'utf-8'); // full string file.
const split = inputs.split('\n'); // convert to file to string[] using each new line as delimiter.

// Convert string[] -> number[][]
const numReportsArr = split
  .map((s) => s
    .split(' ')
    .map((x) => Number(x)));

/**
 * Step 1 Question.
 * Checks the safety rules on a given report.
 * Returns True if the report is safe.
 */
function checkSafety(report: number[]): boolean {
  let isIncreasing = report[0] < report[1];

  for (let index = 0; index < report.length - 1; index++) {
    const current = report[index];
    const next = report[index + 1];

    if (current === next) return false; // Neither increase/decrease, fails.

    const difference = current - next;
    if (difference > 3) return false; // Positive difference, fails.
    if (difference < -3) return false; // Negative difference, fails.

    // Increasing, check for first failure.
    if (isIncreasing) {
      if (current > next) {
        return false;
      }
    }

    // Decreasing, check for first failure.
    if (!isIncreasing) {
      if (current < next) {
        return false;
      }
    }
  }

  return true; // Safe!
}

/**
 * Step 2 Question.
 * If we remove 1 bad level in a report, can it still pass as Safe?
 * Slices an index from the report[], and tests safety again.
 */
function problemDampener(report: number[]): boolean {
  for (let index = 0; index < report.length; index++) {
    const withoutIndex = [...report.slice(0, index), ...report.slice(index + 1)];

    const canPass = checkSafety(withoutIndex);

    if (canPass) return true;
  }
  return false;
}

// Ex output: `Report 1: [25,26,29,30,32,35,37,35] - UNSAFE (Potential)`
numReportsArr.forEach((report, i) => {
  const isSafe = checkSafety(report);
  let potentialPass = false;

  if (!isSafe) {
    potentialPass = problemDampener(report); // Potentially Safe if we remove 1 bad report.
  }

  console.log(`Report ${i + 1}: [${report}] - ${isSafe ? 'SAFE' : 'UNSAFE'}${potentialPass ? ' (Potential)' : ''}`);
});

const safeCount = numReportsArr.filter((r) => checkSafety(r)).length;
console.log('Safe reports: ', safeCount); // 356.

const potentialSafeCount = numReportsArr.filter((r) => checkSafety(r) || problemDampener(r)).length;
console.log('Potential Safe reports: ', potentialSafeCount); // 413.
