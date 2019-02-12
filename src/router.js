const {
  handleHomePage,
  handleNotFound,
  // handleAddData,
   handlePublicAssets,
   handelGetCampoany,
} = require('./handler');

const router = (request, response) => {
  const endpoint = request.url;
  if (endpoint === '/') {
    handleHomePage(response);
   } else if (endpoint.includes('/public/')) {
    handlePublicAssets(request, response);
  } else if (endpoint === '/addData') {
    handleAddData(request, response, endpoint);
  } else if (endpoint === '/getData') {
    handleGetData(request, response, endpoint);
  } else if(endpoint === '/getDataCampany'){
    handelGetCampoany(response);
  }else {
    handleNotFound(request, response);
  }
};

module.exports = router;
