const fs = require('fs');
const path = require('path');

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
const handlePublicAssets = (request,response)=>{

};
const handleAddData = (request, response) => {
  let allData = '';
  request.on('data', (chunkData) => {
    allData += chunkData;
  });
  request.on('end', () => {

  });
  response.writeHead();
  response.end();
};
const handleNotFound = (response) => {
  response.writeHead(404, {
    'content-type': 'text/html',
  });
  response.end('<h2>Page Not Found</h2>');
};
module.exports = {
  handleHomePage,
  handleNotFound,
  handleAddData,
  handlePublicAssets,
};
