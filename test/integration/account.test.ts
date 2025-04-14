import request from 'supertest';
import app from '../../src/app/app';

const name: string = 'David Doe';
const email: string = 'david@example.com';
const password: string = 'PasswordPassword1234';
const confirmPassword: string = 'PasswordPassword1234';

describe('GET /api/v1/account/profile', () => {
  it('should return 200 OK', async () => {
    const loginResponse = await request(app)
      .post('/api/v1/auth/login')
      .send({ 
        email, 
        password 
      });

    const accessToken: string = loginResponse.body.data.accessToken;

    const response = await request(app)
      .get('/api/v1/account/profile')
      .set('Authorization', `Bearer ${accessToken}`);

    expect(response.status).toBe(200);
  });

  it('should return 401 Unauthorized', async () => {
    const accessToken: string = 'secret';
    const response = await request(app)
      .get('/api/v1/account/profile')
      .set('Authorization', `Bearer ${accessToken}`);

    expect(response.status).toBe(401);
  });

  it('should return 401 Unauthorized', async () => {
    const response = await request(app)
      .get('/api/v1/account/profile');

    expect(response.status).toBe(401);
  });
});

describe('GET /api/v1/account/session', () => {
  it('should return 200 OK', async () => {
    const loginResponse = await request(app)
      .post('/api/v1/auth/login')
      .send({
        email,
        password,
      });

    const accessToken: string = loginResponse.body.data.accessToken;

    const response = await request(app)
      .get('/api/v1/account/session')
      .set('Authorization', `Bearer ${accessToken}`);

    expect(response.status).toBe(200);
  });

  it('should return 401 Unauthorized', async () => {
    const accessToken: string = 'secret';
    const response = await request(app)
      .get('/api/v1/account/session')
      .set('Authorization', `Bearer ${accessToken}`);

    expect(response.status).toBe(401);
  });

  it('should return 401 Unauthorized', async () => {
    const response = await request(app)
      .get('/api/v1/account/session');

    expect(response.status).toBe(401);
  });
});

describe('POST /api/v1/account/update-profile', () => {
  it('should return 200 OK', async () => {
    const loginResponse = await request(app)
      .post('/api/v1/auth/login')
      .send({ 
        email, 
        password 
      });

    const accessToken: string = loginResponse.body.data.accessToken;

    const response = await request(app)
      .post('/api/v1/account/update-profile')
      .set('Authorization', `Bearer ${accessToken}`)
      .send({
        name,
        email,
      });

    expect(response.status).toBe(200);
  });

  it('should return 400 Bad Request', async () => {
    const loginResponse = await request(app)
      .post('/api/v1/auth/login')
      .send({ 
        email, 
        password 
      });

    const accessToken: string = loginResponse.body.data.accessToken;

    const response = await request(app)
      .post('/api/v1/account/update-profile')
      .set('Authorization', `Bearer ${accessToken}`);

    expect(response.status).toBe(400);
  });

  it('should return 401 Unauthorized', async () => {
    const accessToken: string = 'secret';
    const response = await request(app)
      .post('/api/v1/account/update-profile')
      .set('Authorization', `Bearer ${accessToken}`)
      .send({
        name,
        email,
      });

    expect(response.status).toBe(401);
  });
});

describe('POST /api/v1/account/update-password', () => {
  it('should return 200 OK', async () => {
    const loginResponse = await request(app)
      .post('/api/v1/auth/login')
      .send({ 
        email, 
        password 
      });

    const accessToken: string = loginResponse.body.data.accessToken;

    const response = await request(app)
      .post('/api/v1/account/update-password')
      .set('Authorization', `Bearer ${accessToken}`)
      .send({
        password,
        confirmPassword,
      });

    expect(response.status).toBe(200);
  });

  it('should return 400 Bad Request', async () => {
    const loginResponse = await request(app)
      .post('/api/v1/auth/login')
      .send({ 
        email, 
        password 
      });

    const accessToken: string = loginResponse.body.data.accessToken;

    const response = await request(app)
      .post('/api/v1/account/update-password')
      .set('Authorization', `Bearer ${accessToken}`)
      .send({
        password,
        confirmPassword: 'PasswordPassword',
      });

    expect(response.status).toBe(400);
  });

  it('should return 401 Unauthorized', async () => {
    const accessToken: string = 'secret';
    const response = await request(app)
      .post('/api/v1/account/update-password')
      .set('Authorization', `Bearer ${accessToken}`)
      .send({
        password,
        confirmPassword,
      });

    expect(response.status).toBe(401);
  });
});