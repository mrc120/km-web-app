import http from "../../http-common"

const register = (login, password) => {
  return http.post("auth/signup/", {
    login,
    password
  });
};

const login = (login, password) => {
  return http.post("auth/signin/", {
    login,
    password,
  }).then((response) => {
      if (response.data.accessToken) {
        localStorage.setItem("user", JSON.stringify(response.data));
      }
      return response.data;
    });
};

const updatePassword = (id, password) => {
  return http.put(`auth/users/${id}`, {
    id,
    password
  });
};

const updateRole = (userId, roleId) => {
  return http.put(`auth/user_roles/${userId}`, {
    userId,
    roleId 
  })
}

const logout = () => {
  localStorage.removeItem("user");
};

const getCurrentUser = () => {
  return JSON.parse(localStorage.getItem("user"));
};


export default {
  register,
  login,
  logout,
  getCurrentUser,
  updatePassword,
  updateRole
};