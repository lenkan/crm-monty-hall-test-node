const app = require('express')();
const bodyParser = require('body-parser');
const runSimulation = require('./simulation');

function isPositiveNumber(n) {
  return typeof n === 'number' && !isNaN(n) && n >= 0;
}

app.get('/health', (req, res) => res.sendStatus(200));

app.post('/simulate', bodyParser.json(), (req, res, next) => {
  if (req.header('Content-Type') !== 'application/json') {
    res.sendStatus(415);
  } else if (!req.body) {
    res.sendStatus(400);
  } else {
    next();
  }
});

app.post('/simulate', (req, res) => {
  const { numberOfRuns, changeDoor } = req.body;

  if (!isPositiveNumber(numberOfRuns)) {
    return res.status(400).send({
      reason: 'Invalid body: numberOfRuns should be a positive number'
    });
  }

  if (typeof changeDoor !== 'boolean') {
    return res.status(400).send({
      reason: 'Invalid body: changeDoor should be a boolean'
    });
  }

  const wins = runSimulation(numberOfRuns, changeDoor);

  res.status(200);
  res.json({
    wins: wins,
    total: numberOfRuns,
    losses: numberOfRuns - wins,
    ratio: Math.round((wins / numberOfRuns) * 100) / 100
  });
});

module.exports = app;
