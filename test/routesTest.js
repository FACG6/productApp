const test = require('tape');
const supertest = require('supertest');
const router = require('../src/router');

test('Home route returns a status code of 200', (t) => {
  supertest(router)
    .get('/')
    .expect(200)
    .expect('content-type', /html/)
    .end((err,res) => {
      if (err) t.error(err);
      t.equal(res.text.includes('Products'),true,'the title must Product')
      t.end();
    });
});

test('Undefined routes', (t) => {
  supertest(router)
    .get('/foo')
    .expect(404)
    .expect('content-type', /html/)
    .end((err, res) => {
      if (err) t.error(err);
      t.equal(res.text.includes('Page Not Found'), true, 'should retun html file');
      t.end();
    });
});

test('Test getDatProduct route', (t) => {
  supertest(router)
    .get('/getDataProduct')
    .expect(200)
    .expect('content-type', /json/)
    .end((err, res) => {
      if (err) t.error(err);
      t.equal(typeof res, 'object', 'should return an object');
      t.end();
    });
});

test('Test getDataCampany route', (t) => {
  supertest(router)
    .get('/getDataCampany')
    .expect(200)
    .expect('content-type', /json/)
    .end((err, res) => {
      if (err) t.error(err);
      t.equal(typeof res, 'object', 'should return an object');
      t.end();
    });
});
