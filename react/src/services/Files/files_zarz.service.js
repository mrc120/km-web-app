import http from "../../http-common";

  const getAll = (params) => {
    return http.get("/files_zarz/", {params});
  };

  const get = (id, data) => {
    return http.get("/files_zarz/" + id, data)
  }

  const update = (id, data) => {
    return http.put('/files_zarz/' + id, data);
  }

  const remove = id => {
    return http.delete(`/files_zarz/${id}`)
  }

  export default {
    getAll,
    get,
    update,
    remove
  }