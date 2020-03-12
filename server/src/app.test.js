/* eslint-env jest */
const mockSimulation = jest.fn(numRuns => numRuns * 0.5);
jest.mock('./simulation', () => mockSimulation);

const supertest = require('supertest');
const app = require('./app');

beforeEach(() => {
  jest.clearAllMocks();
});

test('health endpoint returns 200', async () => {
  const result = await supertest(app).get('/health');
  expect(result.status).toBe(200);
});

test('simulation endpoint returns 415 on unsupported media type', async () => {
  const result = await supertest(app)
    .post('/simulate')
    .set('Content-Type', 'application/xml')
    .send('<xml />');
  expect(result.status).toBe(415);
});

test('simulation endpoint returns 400 on invalid input', async () => {
  const result = await supertest(app)
    .post('/simulate')
    .set('Content-Type', 'application/json')
    .send({ numberOfRuns: -1, changeDoor: true });

  expect(result.status).toBe(400);
});

test('simulation endpoint returns result object', async () => {
  const numberOfRuns = 10;
  mockSimulation.mockReturnValue(7);
  const result = await supertest(app)
    .post('/simulate')
    .set('Content-Type', 'application/json')
    .send({
      numberOfRuns,
      changeDoor: true
    });

  expect(result.status).toBe(200);
  expect(result.body).toBeDefined();
  expect(result.body).toEqual({
    wins: 7,
    ratio: 0.7,
    total: 10,
    losses: 3
  });
});

test('simulation calls simulation', async () => {
  mockSimulation.mockReturnValue(7);

  const numberOfRuns = 10;
  await supertest(app)
    .post('/simulate')
    .set('Content-Type', 'application/json')
    .send({
      numberOfRuns,
      changeDoor: true
    });

  expect(mockSimulation).toHaveBeenCalledTimes(1);
  expect(mockSimulation).toHaveBeenCalledWith(numberOfRuns, true);
});
