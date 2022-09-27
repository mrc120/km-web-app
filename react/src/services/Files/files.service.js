import http from "../../http-common";

  const getAll = (params) => {
    return http.get("/files/", {params});
  };

  const get = (id, data) => {
    return http.get("/files/" + id, data)
  }

  const update = (id, data) => {
    return http.put("/files/" + id, data);
  }

  const remove = id => {
    return http.delete(`/files/${id}`)
  }

  export default {
    getAll,
    get,
    update,
    remove
  }