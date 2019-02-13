const fs = require('fs');
const path = require('path');
const getData = require('./queries/getData');

const handleHomePage = (response) => {
  const filePath = path.join(__dirname, '..', 'public', 'index.html');
  fs.readFile(filePath, (error, file) => {
    if (error) {
      response.writeHead(500, {
        'content-type': 'text/html',
      });
      response.end('<h2>Server Error</h2>');
    } else {
      response.writeHead(200, {
        'content-type': 'text/html',
      });
      response.end(file);
    }
  });
};
const handlePublicAssets = (request, response) => {
  const endpoint = request.url;
  const extantion = path.extname(endpoint).substr(1);
  const filePath = endpoint.split('/');
  const pathFile = path.join(__dirname, '..', ...filePath);
  const contantType = {
    html: 'text/html',
    css: 'text/css',
    js: 'text/javascript',
    json: 'application/json',
  };
  fs.readFile(pathFile, (error, file) => {
    if (error) {
      response.writeHead(500, {
        'content-type': 'text/html',
      });
      response.end('<h1>Internal Server Error</h1>');
    } else {
      response.writeHead(200, {
        'content-type': contantType[extantion],
      });
      response.end(file);
    }
  });
};
const handelGetCampoany = (response) => {
  getData('company', (error, res) => {
    if (error) {
      response.writeHead(500, { 'content-type': 'text/html' });
      response.end('<h1>server error</h1>');
    } else {
      response.writeHead(200, { 'content-type': 'application/json' });
      response.end(JSON.stringify({ error: null, data: res }));
    }
  });
};
// const handleAddData = (request, response) => {
//   let allData = '';
//   request.on('data', (chunkData) => {
//     allData += chunkData;
//   });
//   request.on('end', () => {

//   });
//   response.writeHead();
//   response.end();
// };
const handleNotFound = (response) => {
  response.writeHead(404, {
    'content-type': 'text/html',
  });
  response.end('<h2>Page Not Found</h2>');
};
module.exports = {
  handleHomePage,
  handleNotFound,
  // handleAddData,
  handlePublicAssets,
  handelGetCampoany,
};
