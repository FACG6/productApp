const select = document.getElementById('select');
const send = document.getElementById('send');
const result = document.getElementById('result');
const show = document.getElementById('show');
const dialog = document.getElementById('msg');

const createElements = (tag, name, value, parent, className) => {
  const newElement = document.createElement(tag);
  newElement.classList.add(className);
  if (tag === 'option') newElement.value = value;
  newElement.textContent = name;
  parent.appendChild(newElement);
  return newElement;
};

// for delete all child in specific div
const deleteChild = (parent) => {
  while (parent.firstChild) {
    parent.removeChild(parent.firstChild);
  }
};

request('/getDataCampany', 'GET', null, (error, res) => {
  if (error) {
    createElements('p', 'request error', null, result, 'error');
  } else {
    const response = JSON.parse(res).data;
    response.forEach((row) => {
      createElements('option', getValue(row, 'name'), getValue(row, 'id'), select, 'option_company');
    });
  }
});

send.addEventListener('click', (e) => {
  e.preventDefault();
  const nameProduct = document.getElementById('name').value.trim();
  const proDate = document.getElementById('pro_date').value;
  const expDate = document.getElementById('exp_date').value;
  deleteChild(result);
  if (!(nameProduct) || !(proDate) || !(expDate) || !(select.value)) {
    createElements('p', 'Fill all fields!', null, result, 'error');
    return '';
  }
  if (!(/^([a-zA-z0-9]|\s)+$/.test(nameProduct)) || /^[0-9]+$/.test(nameProduct)) {
    createElements('p', 'Please ensure the name of product', null, result, 'error');
    return '';
  }
  if (expDate < proDate) {
    createElements('p', 'The expire date must grater than production date', null, result, 'error');
    return '';
  }

  const data = {
    name: nameProduct,
    production: proDate,
    expire: expDate,
    compnyId: select.value,
  };
  request('/addData', 'POST', JSON.stringify(data), (error, response) => {
    if (error) {
      createElements('p', 'The add faild :(', null, result, 'error');
    } else {
      createElements('p', `Product Name : ${nameProduct}`, null, dialog, 'product_name');
      createElements('p', `Production Date : ${proDate}`, null, dialog, 'product_production');
      createElements('p', `Expire Date : ${expDate}`, null, dialog, 'product_expire');
      createElements('p', `Company Name : ${select.value}`, null, dialog, 'company_name');
      const close = createElements('button', 'close', null, dialog, 'close');
      close.addEventListener('click', () => {
        deleteChild(dialog);
        dialog.close();
      });
      dialog.showModal();
    }
  });
});

show.addEventListener('click', (e) => {
  e.preventDefault();
  deleteChild(result);
  request('/getDataProduct', 'GET', null, (error, res) => {
    if (error) {
      createElements('p', 'request error', null, result, 'error');
    } else {
      const response = JSON.parse(res).data;
      response.forEach((row) => {
        const productDiv = createElements('div', '', null, result, 'product');
        createElements('p', `Product Name : ${getValue(row, 'name')}`, null, productDiv, 'product_name');
        createElements('p', `Production Date : ${getValue(row, 'pro_date')}`, null, productDiv, 'product_production');
        createElements('p', `Expire Date : ${getValue(row, 'exp_date')}`, null, productDiv, 'product_expire');
        createElements('p', `Company Name : ${getValue(row, 'com_name')}`, null, productDiv, 'company_name');
      });
    }
  });
});
