const CAR = 1;
const GOAT = 0;

function randomSelectionIndex() {
  return Math.floor(Math.random() * 3);
}

function createDoors() {
  const carIndex = randomSelectionIndex();
  return Array.from({ length: 3 }).map((_, index) =>
    index === carIndex ? CAR : GOAT
  );
}

function assertPositiveNumber(n) {
  if (typeof n !== 'number' || isNaN(n) || n < 0) {
    throw new Error(
      'Invalid input: number of runs has to be a positive number'
    );
  }
}

function assertBooleanValue(changeDoor) {
  if (typeof changeDoor !== 'boolean') {
    throw new Error('Invalid input: changeDoor has to be a boolean');
  }
}

function accumulate(times, func) {
  let sum = 0;

  for (let n = 0; n < times; ++n) {
    sum += func();
  }

  return sum;
}

function runSimulation(changeDoor) {
  const doors = createDoors();

  const selectedDoorIndex = randomSelectionIndex();
  const revealedDoorIndex = doors.findIndex(
    (value, index) => index !== selectedDoorIndex && value !== CAR
  );

  const otherDoorIndex = doors.findIndex(
    (_, index) => index !== selectedDoorIndex && index !== revealedDoorIndex
  );

  if (changeDoor) {
    return doors[otherDoorIndex];
  } else {
    return doors[selectedDoorIndex];
  }
}

function run(numberOfRuns, changeDoor) {
  assertPositiveNumber(numberOfRuns);
  assertBooleanValue(changeDoor);

  return accumulate(numberOfRuns, () => runSimulation(changeDoor));
}

module.exports = run;
