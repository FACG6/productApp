const request = (url, method, value, cb) => {
  const xhr = new XMLHttpRequest();
  xhr.onreadystatechange = () => {
    if (xhr.readyState === 4) {
      // const response = JSON.parse(xhr.responseText);
      if (xhr.status === 200) {
        // if (response.error) {
        // cb(new TypeError(response.error));
        // } else {
        cb(null, xhr.responseText);
        // }
      } else {
        cb(xhr.responseType);
      }
    }
  };
  xhr.open(method, url);
  xhr.send(value);
};
