export const CustomRequestOptions = (url, apiTokenReceived, postData) => {
  const requestOptions = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Basic ${apiTokenReceived}`,
      clientId: 'TRANZOLBOSS',
      clientSecret: 'TRANZOLBOSSPAN',
    },
    redirect: 'follow',
    body: JSON.stringify(postData),
  };

  return {url, requestOptions};
};

export const CustomRequestOptionsAdmin = (url, apiTokenReceived) => {
  const requestOptions = {
    method: 'GET',
    headers: {
      Authorization: `Basic ${apiTokenReceived}`,
      clientId: 'TRANZOLBOSS',
      clientSecret: 'TRANZOLBOSSPAN',
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    redirect: 'follow',
  };
  return {url, requestOptions};
};
