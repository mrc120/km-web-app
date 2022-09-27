import http from "../../http-common";

  const getAll = (params) => {
    return http.get("/files_podst/", {params});
  };

  const get = (id, data) => {
    return http.get("/files_podst/" + id, data)
  }

  const update = (id, data) => {
    return http.put('/files_podst/' + id, data);
  }

  const remove = id => {
    return http.delete(`/files_podst/${id}`)
  }

  export default {
    getAll,
    get,
    update,
    remove
  }