//AUTHENTIFICATION

export const authGet = async (token) => {
  const resp = await fetch("http://localhost:9875/auth/verify", {
    headers: { authorization: `Bearer ${token}` },
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

export const getComments = async () => {
  const resp = await fetch("http://localhost:9875/public/getcomments");
  const result = await resp.json();
  return result;
};

//USER

export const addComment = async (payload) => {
  const jwt = localStorage.getItem("jwt");
  const resp = await fetch("http://localhost:9875/user/addcomment", {
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
  const jwt = localStorage.getItem("jwt");
  const resp = await fetch(`http://localhost:9875/user/deletecomment`, {
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
  const jwt = localStorage.getItem("jwt");
  const resp = await fetch("http://localhost:9875/user/getmyprojects", {
    headers: { authorization: `Bearer ${jwt}` },
  });
  const result = await resp.json();
  return result;
};

export const createProject = async (payload) => {
  const jwt = localStorage.getItem("jwt");
  const resp = await fetch("http://localhost:9875/user/createproject", {
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
  const jwt = localStorage.getItem("jwt");
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

export const deleteProject = async (payload) => {
  const jwt = localStorage.getItem("jwt");
  const resp = await fetch(`http://localhost:9875/user/deleteproject`, {
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

export const uploadFile = async (payload) => {
  const jwt = localStorage.getItem("jwt");
  const formData = new FormData();
  formData.append("file", payload.file);
  formData.append("projectId", payload.projectId);
  const resp = await fetch(`http://localhost:9875/user/uploadfile`, {
    method: "POST",
    headers: { authorization: `Bearer ${jwt}` },
    body: formData,
  });
  const result = await resp.json();
  return result;
};

export const deleteFile = async (payload) => {
  const jwt = localStorage.getItem("jwt");
  const resp = await fetch(`http://localhost:9875/user/deletefile`, {
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
  const jwt = localStorage.getItem("jwt");
  const resp = await fetch("http://localhost:9875/user/getcategories", {
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

export const createCategory = async (payload) => {
  const jwt = localStorage.getItem("jwt");
  const resp = await fetch(`http://localhost:9875/admin/createcategory`, {
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

export const deleteCategory = async (jwt, payload) => {
  const resp = await fetch(`http://localhost:9875/admin/deletecategory`, {
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
  const jwt = localStorage.getItem("jwt");
  const resp = await fetch(`http://localhost:9875/admin/deletecomment`, {
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
