const fetchWithToken = (endpoint, data, method = 'GET') => {
  const url = `${process.env.REACT_APP_API_URI}/${endpoint}`;

  if (method === 'GET') {
    return fetch(url);
  } else {
    return fetch(url, {
      method,
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
  }
};

export { fetchWithToken };
