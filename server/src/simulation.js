const CAR = 1;
const GOAT = 0;

function randomSelectionIndex() {
  return Math.floor(Math.random() * 3);
}

function createSet() {
  const carIndex = randomSelectionIndex();
  return Array.from({ length: 3 }).map((_, index) =>
    index === carIndex ? CAR : GOAT
  );
}

function assertPositiveNumber(n) {
  if (typeof n !== 'number' || isNaN(n) || n < 0) {
    throw new Error(
      'Invalid input: number of runs (n) has to be a positive number'
    );
  }
}

function assertBooleanValue(changeDoor) {
  if (typeof changeDoor !== 'boolean') {
    throw new Error('Invalid input: changeDoor has to be a boolean');
  }
}

function runSimulation(n, changeDoor) {
  assertPositiveNumber(n);
  assertBooleanValue(changeDoor);

  return Array.from({ length: n }).reduce(wins => {
    const set = createSet();

    const selectionIndex = randomSelectionIndex();
    const revealIndex = set.findIndex(
      (value, index) => index !== selectionIndex && value !== CAR
    );

    if (changeDoor) {
      wins += set.find(
        (_, index) => index !== selectionIndex && index !== revealIndex
      );
    } else {
      wins += set[selectionIndex];
    }

    return wins;
  }, 0);
}

module.exports = runSimulation;
