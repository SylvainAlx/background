export const authGet = async (jwt) => {
  const resp = await fetch("http://localhost:9875/auth/verify", {
    headers: { authorization: `Bearer ${jwt}` },
  });
  const result = await resp.json();
  return result;
};

export const loginFetch = async (payload) => {
  const resp = await fetch("http://localhost:9875/auth/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });
  const result = await resp.json();
  return result;
};

export const registerFetch = async (payload) => {
  const resp = await fetch("http://localhost:9875/auth/register", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });
  const result = await resp.json();
  return result;
};

export const getPublics = async () => {
  const resp = await fetch("http://localhost:9875/public/getpublicprojects");
  const result = await resp.json();
  return result;
};
