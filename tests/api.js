import request from 'supertest';

const PORT = process.env.PORT || 8080;
const api = request(`http://localhost:${PORT}`);
const { post } = api;
api.post = (endpoint, data) => post(endpoint).send(data).set('Accept', 'application/json');
export default api;
