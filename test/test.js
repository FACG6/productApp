const test = require('tape');
const addProduct = require('../src/queries/addData');
const getData = require('../src/queries/getData');
const runDbBuild = require('../src/database/db_built');

test('test get data from product table', (t) => {
  runDbBuild((err) => {
    if (err) t.error(err, 'Error');
    const expected = [
      {
        id: 1,
        name: 'brewed tea',
        pro_date: '2018-07-13',
        exp_date: '2019-12-31',
        company_id: 1,
      },
      {
        id: 2,
        name: 'specialty coffee',
        pro_date: '2018-07-13',
        exp_date: '2019-06-30',
        company_id: 1,
      },
      {
        id: 3,
        name: 'hot chocolate',
        pro_date: '2018-02-01',
        exp_date: '2019-08-01',
        company_id: 1,
      },
      {
        id: 4,
        name: 'air trade coffee',
        pro_date: '2018-07-13',
        exp_date: '2019-12-31',
        company_id: 2,
      },
      {
        id: 5,
        name: 'sugar',
        pro_date: '2018-07-13',
        exp_date: '2019-06-30',
        company_id: 2,
      },
      {
        id: 6,
        name: 'chocolate',
        pro_date: '2018-02-01',
        exp_date: '2019-08-01',
        company_id: 2,
      },
      {
        id: 7,
        name: 'Daiya Cheddar Style Shreds',
        pro_date: '2018-07-13',
        exp_date: '2019-12-31',
        company_id: 3,
      },
      {
        id: 8,
        name: 'Daiya Mozzarella Style Shreds',
        pro_date: '2018-07-13',
        exp_date: '2019-06-30',
        company_id: 3,
      },
      {
        id: 9,
        name: 'Daiya Pepper Jack Style Shreds',
        pro_date: '2018-02-01',
        exp_date: '2019-08-01',
        company_id: 3,
      },
      {
        id: 10,
        name: 'Naya natural spring water',
        pro_date: '2018-07-13',
        exp_date: '2019-12-31',
        company_id: 4,
      },
      {
        id: 11,
        name: 'Naya Zest',
        pro_date: '2018-07-13',
        exp_date: '2019-06-30',
        company_id: 4,
      },
      {
        id: 12,
        name: 'Naya Mini',
        pro_date: '2018-02-01',
        exp_date: '2019-08-01',
        company_id: 4,
      },
    ];

    getData('product', (err, result) => {
      if (err) t.error(err);
      t.equal(result.length, 12, 'got all data');
      t.deepEqual(result, expected, 'all data is ok');
      t.end();
    });
  });
});

test('test add product function', (t) => {
  runDbBuild((err) => {
    if (err) t.error(err, 'Error');
    addProduct('water', '2018-05-15', '2019-06-04', 2, (err2) => {
      if (err2) t.error(err2);
      getData('product', (errr, result) => {
        if (errr) t.error(errr);
        t.deepEqual(result.length, 13, 'added successfully');
        t.end();
      });
    });
  });
});
