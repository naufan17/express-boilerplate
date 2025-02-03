import request from 'supertest';
import app from '../../src/app/app';

describe('GET /api/v1/account/profile', () => {
  it('should return 200 OK', async () => {
    const loginResponse = await request(app)
      .post('/api/v1/auth/login')
      .send({ 
        email: 'david@example.com', 
        password: 'PasswordPassword12' 
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

describe('POST /api/v1/account/update-profile', () => {
  it('should return 200 OK', async () => {
    const loginResponse = await request(app)
      .post('/api/v1/auth/login')
      .send({ 
        email: 'david@example.com', 
        password: 'PasswordPassword12' 
      });

    const accessToken: string = loginResponse.body.data.accessToken;

    const response = await request(app)
      .post('/api/v1/account/update-profile')
      .set('Authorization', `Bearer ${accessToken}`)
      .send({
        name: 'David Doe',
        email: 'david@example.com',
      });

    expect(response.status).toBe(200);
  });

  it('should return 400 Bad Request', async () => {
    const loginResponse = await request(app)
      .post('/api/v1/auth/login')
      .send({ 
        email: 'david@example.com', 
        password: 'PasswordPassword12' 
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
        name: 'David Doe',
        email: 'david@example.com',
      });

    expect(response.status).toBe(401);
  });
});

describe('POST /api/v1/account/update-password', () => {
  it('should return 200 OK', async () => {
    const loginResponse = await request(app)
      .post('/api/v1/auth/login')
      .send({ 
        email: 'david@example.com', 
        password: 'PasswordPassword12' 
      });

    const accessToken: string = loginResponse.body.data.accessToken;

    const response = await request(app)
      .post('/api/v1/account/update-password')
      .set('Authorization', `Bearer ${accessToken}`)
      .send({
        password: 'PasswordPassword12',
        confirmPassword: 'PasswordPassword12',
      });

    expect(response.status).toBe(200);
  });

  it('should return 400 Bad Request', async () => {
    const loginResponse = await request(app)
      .post('/api/v1/auth/login')
      .send({ 
        email: 'david@example.com', 
        password: 'PasswordPassword12' 
      });

    const accessToken: string = loginResponse.body.data.accessToken;

    const response = await request(app)
      .post('/api/v1/account/update-password')
      .set('Authorization', `Bearer ${accessToken}`)
      .send({
        password: 'PasswordPassword12',
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
        password: 'PasswordPassword12',
        confirmPassword: 'PasswordPassword12',
      });

    expect(response.status).toBe(401);
  });
});