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

export const updateProject = async (jwt, payload) => {
  const resp = await fetch(`http://localhost:9875/user/updateproject`, {
    method: "PUT",
    headers: {
      authorization: `Bearer ${jwt}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });
  const result = await resp.json();
  return result;
};

export const deleteProject = async (jwt, payload) => {
  const resp = await fetch(`http://localhost:9875/user/deleteproject`, {
    method: "DELETE",
    headers: {
      authorization: `Bearer ${jwt}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });
};

export const updateUser = async (jwt, payload) => {
  const resp = await fetch(`http://localhost:9875/user/updateaccount`, {
    method: "PUT",
    headers: {
      authorization: `Bearer ${jwt}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });
  const result = await resp.json();
  return result;
};

export const deleteAccount = async (jwt) => {
  const resp = await fetch(`http://localhost:9875/user/deleteaccount`, {
    method: "DELETE",
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

export const getProjects = async (jwt) => {
  const resp = await fetch("http://localhost:9875/admin/getprojects", {
    headers: { authorization: `Bearer ${jwt}` },
  });
  const result = await resp.json();
  return result;
};

export const deleteProjects = async (jwt, payload) => {
  const resp = await fetch(`http://localhost:9875/admin/deleteproject`, {
    method: "DELETE",
    headers: {
      authorization: `Bearer ${jwt}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });
  const result = await resp.json();
  return result;
};

export const getTemplates = async (jwt) => {
  const resp = await fetch("http://localhost:9875/admin/gettemplates", {
    headers: { authorization: `Bearer ${jwt}` },
  });
  const result = await resp.json();
  return result;
};

export const deleteTemplate = async (jwt, payload) => {
  const resp = await fetch(`http://localhost:9875/admin/deletetemplate`, {
    method: "DELETE",
    headers: {
      authorization: `Bearer ${jwt}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });
  const result = await resp.json();
  return result;
};
