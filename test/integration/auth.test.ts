import request from 'supertest';
import app from '../../src/app/app';

describe('POST /api/v1/auth/register', () => {
  it('should return 200 OK', async () => {
    const response = await request(app)
      .post('/api/v1/auth/register')
      .send({
        name: 'David Doe',
        email: 'david@example.com',
        password: 'PasswordPassword12',
      });

    expect(response.status).toBe(201);
  });

  it('should return 400 Bad Request', async () => {
    const response = await request(app)
      .post('/api/v1/auth/register')
      .send({
        email: 'david@example.com',
        password: 'PasswordPassword12',
      });

    expect(response.status).toBe(400);
  });

  it('should return 400 Bad Request', async () => {
    const response = await request(app)
      .post('/api/v1/auth/register')
      .send({
        name: 'David Doe',
        email: 'david@example.com',
        password: 'Password',
      });

    expect(response.status).toBe(400);
  });

  it('should return 409 Conflict', async () => {
    const response = await request(app)
      .post('/api/v1/auth/register')
      .send({
        name: 'David Doe',
        email: 'david@example.com',
        password: 'PasswordPassword12',
      });

    expect(response.status).toBe(409);
  });
})

describe('POST /api/v1/auth/login', () => {
  it('should return 200 OK', async () => {
    const response = await request(app)
      .post('/api/v1/auth/login')
      .send({
        email: 'david@example.com',
        password: 'PasswordPassword12',
      });

    expect(response.status).toBe(200);
  });

  it('should return 401 Unauthorized', async () => {
    const response = await request(app)
      .post('/api/v1/auth/login')
      .send({
        email: 'david@example.com',
      });

    expect(response.status).toBe(401);
  });

  it('should return 401 Unauthorized', async () => {
    const response = await request(app)
      .post('/api/v1/auth/login')
      .send({
        email: 'david@example.com',
        password: 'PasswordPassword',
      });

    expect(response.status).toBe(401);
  });
});