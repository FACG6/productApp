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
  const name = document.getElementById('name');
  const nameProduct = name.value.trim();
  const dateP = document.getElementById('pro_date');
  const proDate = dateP.value;
  const dateEX = document.getElementById('exp_date');
  const expDate = dateEX.value;
  const selectValue = select.value;
  deleteChild(result);
  if (!(nameProduct) || !(proDate) || !(expDate) || !(selectValue)) {
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
    compnyId: selectValue,
  };
  request('/addData', 'POST', JSON.stringify(data), (error, response) => {
    deleteChild(dialog);
    if (error) {
      createElements('p', 'The add faild :(', null, result, 'error');
    } else {
      const company = document.querySelector(`option[value="${  selectValue  }"]`).innerText;
      createElements('p', `Product Name : ${nameProduct}`, null, dialog, 'product_name');
      createElements('p', `Production Date : ${proDate}`, null, dialog, 'product_production');
      createElements('p', `Expire Date : ${expDate}`, null, dialog, 'product_expire');
      createElements('p', `Company Name : ${company}`, null, dialog, 'company_name');
      const close = createElements('button', 'close', null, dialog, 'close');
      close.addEventListener('click', () => {
        dialog.close();
      });
      dialog.showModal();
    }
  });
  name.value = '';
  dateEX.value = '';
  dateP.value = '';
  select.value = '';
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
