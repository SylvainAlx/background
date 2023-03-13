export const authGet = async (url, jwt) => {
  let data;
  fetch(url, {
    headers: { authorization: `Bearer ${jwt}` },
  })
    .then((resp) => resp.json())
    .then((json) => (data = json));
  return data;
};
