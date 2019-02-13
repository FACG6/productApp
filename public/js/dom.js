const select = document.getElementById('select');
const send = document.getElementById('send');
const result = document.getElementById('result');
// const company = document.getElementById('name');
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
      createElements('option', row.name, row.id, select, 'option_company');
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
    createElements('p', 'full all field', null, result, 'error');
    return '';
  }
  if (!(/^[a-zA-z0-9]+$/.test(nameProduct)) || /^[0-9]+$/.test(nameProduct)) {
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
      createElements('p', 'The add sucsseful :)', null, result, 'done');
    }
  });
});
