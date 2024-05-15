/* eslint-disable no-unused-vars */
/* eslint-disable import/no-unresolved */
/* eslint-disable jest/prefer-expect-assertions */
// tests/app.test.js
import request from 'supertest';
import app from '../server'; // Make sure to export your Express app in server.js
import { db } from '../utils/db';
import redisClient from '../utils/redis';

describe('app Endpoints', () => {
  // eslint-disable-next-line jest/no-hooks
  beforeAll(async () => {
    await db.collection('users').deleteMany({});
    await db.collection('files').deleteMany({});
  });

  it('gET /status', async () => {
    const res = await request(app).get('/status');
    expect(res.statusCode).toStrictEqual(200);
    expect(res.body).toHaveProperty('redis', true);
    expect(res.body).toHaveProperty('db', true);
  });

  it('gET /stats', async () => {
    const res = await request(app).get('/stats');
    expect(res.statusCode).toStrictEqual(200);
    expect(res.body).toHaveProperty('users', expect.any(Number));
    expect(res.body).toHaveProperty('files', expect.any(Number));
  });

  it('pOST /users', async () => {
    const res = await request(app)
      .post('/users')
      .send({ email: 'test@example.com', password: 'password123' });
    expect(res.statusCode).toStrictEqual(201);
    expect(res.body).toHaveProperty('id');
    expect(res.body).toHaveProperty('email', 'test@example.com');
  });

  it('pOST /users with missing email', async () => {
    const res = await request(app).post('/users').send({ password: 'password123' });
    expect(res.statusCode).toStrictEqual(400);
    expect(res.body).toHaveProperty('error', 'Missing email');
  });

  it('pOST /users with missing password', async () => {
    const res = await request(app).post('/users').send({ email: 'test2@example.com' });
    expect(res.statusCode).toStrictEqual(400);
    expect(res.body).toHaveProperty('error', 'Missing password');
  });
});
