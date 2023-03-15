//AUTHENTIFICATION

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

//PUBLICS

export const getPublics = async () => {
  const resp = await fetch("http://localhost:9875/public/getpublicprojects");
  const result = await resp.json();
  return result;
};

//USER

export const getMyProjects = async (jwt) => {
  const resp = await fetch("http://localhost:9875/user/getmyprojects", {
    headers: { authorization: `Bearer ${jwt}` },
  });
  const result = await resp.json();
  return result;
};

//ADMIN

export const getUsers = async (jwt) => {
  const resp = await fetch("http://localhost:9875/admin/getusers", {
    headers: { authorization: `Bearer ${jwt}` },
  });
  const result = await resp.json();
  return result;
};

export const deleteUser = async (jwt, id) => {
  const resp = await fetch(`http://localhost:9875/admin/deleteuser/${id}`, {
    method: "DELETE",
    headers: { authorization: `Bearer ${jwt}` },
  });
  const result = await resp.json();
  return result;
};
