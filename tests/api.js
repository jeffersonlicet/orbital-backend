import request from 'supertest';

const PORT = process.env.PORT || 8080;
const api = request(`http://localhost:${PORT}`);
const { post, get, put } = api;
api.post = (endpoint, data, token) => {
  const method = post(endpoint)
    .send(data)
    .set('Accept', 'application/json');

  if (token) {
    method.set('Authorization', `Bearer ${token}`);
  }

  return method;
};

api.get = (endpoint, token) => get(endpoint)
  .set('Accept', 'application/json')
  .set('Authorization', `Bearer ${token}`);

api.put = (endpoint, token, data) => put(endpoint)
  .send(data)
  .set('Accept', 'application/json')
  .set('Authorization', `Bearer ${token}`);

export default api;
