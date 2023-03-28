//AUTHENTIFICATION
const getJwt = () => {
  return localStorage.getItem("jwt");
};

const SERVER_URL = process.env.REACT_APP_SERVER_URL;

export const authGet = async (token) => {
  const resp = await fetch(`${SERVER_URL}/auth/verify`, {
    headers: { authorization: `Bearer ${token}` },
  });
  const result = await resp.json();
  return result;
};

export const loginFetch = async (payload) => {
  const resp = await fetch(`${SERVER_URL}/auth/login`, {
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
  const resp = await fetch(`${SERVER_URL}/auth/register`, {
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
  const resp = await fetch(`${SERVER_URL}/public/getpublicprojects`);
  const result = await resp.json();
  return result;
};

export const getComments = async () => {
  const resp = await fetch(`${SERVER_URL}/public/getcomments`);
  const result = await resp.json();
  return result;
};

//USER

export const addComment = async (payload) => {
  const jwt = getJwt();
  const resp = await fetch(`${SERVER_URL}/user/addcomment`, {
    method: "POST",
    headers: {
      authorization: `Bearer ${jwt}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });
  const result = await resp.json();
  return result;
};

export const deleteComment = async (payload) => {
  const jwt = getJwt();
  const resp = await fetch(`${SERVER_URL}/user/deletecomment`, {
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

export const getMyProjects = async () => {
  const jwt = getJwt();
  const resp = await fetch(`${SERVER_URL}/user/getmyprojects`, {
    headers: { authorization: `Bearer ${jwt}` },
  });
  const result = await resp.json();
  return result;
};

export const createProject = async (payload) => {
  const jwt = getJwt();
  const resp = await fetch(`${SERVER_URL}/user/createproject`, {
    method: "POST",
    headers: {
      authorization: `Bearer ${jwt}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });
  const result = await resp.json();
  return result;
};

export const updateProject = async (payload) => {
  const jwt = getJwt();
  const resp = await fetch(`${SERVER_URL}/user/updateproject`, {
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

export const deleteProject = async (payload) => {
  const jwt = getJwt();
  const resp = await fetch(`${SERVER_URL}/user/deleteproject`, {
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

export const updateUser = async (payload) => {
  const jwt = getJwt();
  const resp = await fetch(`${SERVER_URL}/user/updateaccount`, {
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

export const deleteAccount = async () => {
  const jwt = getJwt();
  const resp = await fetch(`${SERVER_URL}/user/deleteaccount`, {
    method: "DELETE",
    headers: { authorization: `Bearer ${jwt}` },
  });
  const result = await resp.json();
  return result;
};

export const uploadFile = async (payload) => {
  const jwt = getJwt();
  const formData = new FormData();
  formData.append("file", payload.file);
  formData.append("projectId", payload.projectId);
  const resp = await fetch(`${SERVER_URL}/user/uploadfile`, {
    method: "POST",
    headers: { authorization: `Bearer ${jwt}` },
    body: formData,
  });
  const result = await resp.json();
  return result;
};

export const deleteFile = async (payload) => {
  const jwt = getJwt();
  const resp = await fetch(`${SERVER_URL}/user/deletefile`, {
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

export const getCategories = async () => {
  const jwt = getJwt();
  const resp = await fetch(`${SERVER_URL}/user/getcategories`, {
    headers: { authorization: `Bearer ${jwt}` },
  });
  const result = await resp.json();
  return result;
};

//ADMIN

export const getUsers = async () => {
  const jwt = getJwt();
  const resp = await fetch(`${SERVER_URL}/admin/getusers`, {
    headers: { authorization: `Bearer ${jwt}` },
  });
  const result = await resp.json();
  return result;
};

export const deleteUser = async (id) => {
  const jwt = getJwt();
  const resp = await fetch(`${SERVER_URL}/admin/deleteuser/${id}`, {
    method: "DELETE",
    headers: { authorization: `Bearer ${jwt}` },
  });
  const result = await resp.json();
  return result;
};

export const getProjects = async () => {
  const jwt = getJwt();
  const resp = await fetch(`${SERVER_URL}/admin/getprojects`, {
    headers: { authorization: `Bearer ${jwt}` },
  });
  const result = await resp.json();
  return result;
};

export const deleteProjects = async (payload) => {
  const jwt = getJwt();
  const resp = await fetch(`${SERVER_URL}/admin/deleteproject`, {
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

export const createCategory = async (payload) => {
  const jwt = getJwt();
  const resp = await fetch(`${SERVER_URL}/admin/createcategory`, {
    method: "POST",
    headers: {
      authorization: `Bearer ${jwt}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });
  const result = await resp.json();
  return result;
};

export const deleteCategory = async (payload) => {
  const jwt = getJwt();
  const resp = await fetch(`${SERVER_URL}/admin/deletecategory`, {
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

export const deleteCommentAdmin = async (payload) => {
  const jwt = getJwt();
  const resp = await fetch(`${SERVER_URL}/admin/deletecomment`, {
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
