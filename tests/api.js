import request from 'supertest';

const PORT = process.env.PORT || 8080;
const api = request(`http://localhost:${PORT}`);
const { post, get } = api;
api.post = (endpoint, data) => post(endpoint).send(data).set('Accept', 'application/json');
api.get = (endpoint, token) => get(endpoint)
  .set('Accept', 'application/json')
  .set('Authorization', `Bearer ${token}`);

export default api;
