import FastFetch from '../src/index.js';

// GET Method
FastFetch.get('http://api.example.com/data')
  .then(response => console.log('GET response:', response.data))
  .catch(error => console.error('GET error:', error));


// POST Method
FastFetch.post('http://api.example.com/data', { key: 'value' }, {
  headers: {
    'Custom-Header': 'CustomValue',
    'Authorization': 'Bearer your_token'
  },
  timeout: 5000 // 5 seconds
})
  .then(response => console.log('POST response:', response.data))
  .catch(error => console.error('POST error:', error));



// PUT Method
FastFetch.put('http://api.example.com/data/1', { key: 'updatedValue' }, {
  headers: {
    'Authorization': 'Bearer your_token'
  }
})
  .then(response => console.log('PUT response:', response.data))
  .catch(error => console.error('PUT error:', error));



// DELETE Method
FastFetch.delete('http://api.example.com/data/1', {
  headers: {
    'Authorization': 'Bearer your_token'
  }
})
  .then(response => console.log('DELETE response:', response.data))
  .catch(error => console.error('DELETE error:', error));



// PATCH Method
FastFetch.patch('http://api.example.com/data/1', { key: 'patchedValue' }, {
  headers: {
    'Authorization': 'Bearer your_token'
  }
})
  .then(response => console.log('PATCH response:', response.data))
  .catch(error => console.error('PATCH error:', error));