import request from 'supertest';
import app from '../../src/app/app';

describe('GET /api/v1/user', () => {
  it('should return 200 OK', async () => {
    const loginResponse = await request(app)
      .post('/api/v1/auth/login')
      .send({ 
        email: 'david@example.com', 
        password: 'PasswordPassword12' 
      });

    const accessToken: string = loginResponse.body.data.accessToken;

    const response = await request(app)
      .get('/api/v1/user/profile')
      .set('Authorization', `Bearer ${accessToken}`);

    expect(response.status).toBe(200);
  });

  it('should return 401 Unauthorized', async () => {
    const accessToken: string = 'secret';
    const response = await request(app)
      .get('/api/v1/user/profile')
      .set('Authorization', `Bearer ${accessToken}`);

    expect(response.status).toBe(401);
  });

  it('should return 401 Unauthorized', async () => {
    const response = await request(app)
      .get('/api/v1/user/profile');

    expect(response.status).toBe(401);
  });
});