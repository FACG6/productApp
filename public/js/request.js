const request = (url, method, value, cb) => {
  const xhr = new XMLHttpRequest();
  xhr.onreadystatechange = () => {
    if (xhr.readyState === 4) {
      if (xhr.status === 200) {
        cb(null, xhr.responseText);
      } else {
        cb(xhr.responseType);
      }
    }
  };
  xhr.open(method, url);
  xhr.send(value);
};
