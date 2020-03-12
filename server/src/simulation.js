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

function runSimulation(n, changeDoor) {
  if (typeof n !== 'number' || isNaN(n) || n < 0) {
    throw new Error(
      'Invalid input: number of runs (n) has to be a positive number'
    );
  }

  if (typeof changeDoor !== 'boolean') {
    throw new Error('Invalid input: changeDoor has to be a boolean');
  }

  const runs = Array.from({ length: n }).reduce(result => {
    const set = createSet();

    const selectionIndex = randomSelectionIndex();
    const revealIndex = set.findIndex(
      (value, index) => index !== selectionIndex && value !== CAR
    );

    if (changeDoor) {
      result += set.find(
        (_, index) => index !== selectionIndex && index !== revealIndex
      );
    } else {
      result += set[selectionIndex];
    }

    return result;
  }, 0);

  return runs;
}

module.exports = runSimulation;
