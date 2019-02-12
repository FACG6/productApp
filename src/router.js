const {
  handleHomePage,
  handlePublicAssets,
  handleAddData,
  handleGetData,
  handleNotFound,
} = require('./handler');

const router = (request, response) => {
  const endpoint = request.url;
  if (endpoint === '/') {
    handleHomePage(request, response);
  } else if (endpoint.includes('/public/')) {
    handlePublicAssets(request, response, endpoint);
  } else if (endpoint === '/addData') {
    handleAddData(request, response, endpoint);
  } else if (endpoint === '/getData') {
    handleGetData(request, response, endpoint);
  } else {
    handleNotFound(request, response);
  }
};

module.exports = router;
