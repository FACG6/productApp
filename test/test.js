const test = require('tape');
const addProduct = require('../src/queries/addData');
const getData = require('../src/queries/getData');
const runDbBuild = require('../src/database/db_built');

test('test get data from product table', (t) => {
  runDbBuild((err) => {
    if (err) t.error(err, 'Error');
    const expected = [
      {
        name: 'brewed tea',
        pro_date: '2018-07-13',
        exp_date: '2019-12-31',
        com_name: 'Cott',
      },
      {
        name: 'specialty coffee',
        pro_date: '2018-07-13',
        exp_date: '2019-06-30',
        com_name: 'Cott',
      },
      {
        name: 'hot chocolate',
        pro_date: '2018-02-01',
        exp_date: '2019-08-01',
        com_name: 'Cott',
      },
      {
        name: 'air trade coffee',
        pro_date: '2018-07-13',
        exp_date: '2019-12-31',
        com_name: 'Just Us!',
      },
      {
        name: 'sugar',
        pro_date: '2018-07-13',
        exp_date: '2019-06-30',
        com_name: 'Just Us!',
      },
      {
        name: 'chocolate',
        pro_date: '2018-02-01',
        exp_date: '2019-08-01',
        com_name: 'Just Us!',
      },
      {
        name: 'Daiya Cheddar Style Shreds',
        pro_date: '2018-07-13',
        exp_date: '2019-12-31',
        com_name: 'Daiya',
      },
      {
        name: 'Daiya Mozzarella Style Shreds',
        pro_date: '2018-07-13',
        exp_date: '2019-06-30',
        com_name: 'Daiya',
      },
      {
        name: 'Daiya Pepper Jack Style Shreds',
        pro_date: '2018-02-01',
        exp_date: '2019-08-01',
        com_name: 'Daiya',
      },
      {
        name: 'Naya natural spring water',
        pro_date: '2018-07-13',
        exp_date: '2019-12-31',
        com_name: 'Naya Waters',
      },
      {
        name: 'Naya Zest',
        pro_date: '2018-07-13',
        exp_date: '2019-06-30',
        com_name: 'Naya Waters',
      },
      {
        name: 'Naya Mini',
        pro_date: '2018-02-01',
        exp_date: '2019-08-01',
        com_name: 'Naya Waters',
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
