const url = '/newsletter';

// Mailchimp doesn't allow their api's to be used from the client
// Hence we are sending it to our own server

export default function subscribe(email, id) {
  const xhr = new XMLHttpRequest();
  const payload = {
    email,
    id
  };

  return new Promise(function(resolve, reject) {
    xhr.onreadystatechange = function() {
      if (4 != xhr.readyState) return;
      if (xhr.status < 400 || xhr.status > 100) {
        return resolve(xhr.responseText);
      }
      const err = new Error(xhr.responseText);
      err.status = xhr.status;
      err.statusText = xhr.statusText;
      reject(err);
    };

    xhr.open('POST', url, true);
    xhr.setRequestHeader('Accept', 'application/json');
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.send(JSON.stringify(payload));
  });
}
