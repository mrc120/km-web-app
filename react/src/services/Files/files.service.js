import http from "../../http-common";

  const getAll = (params) => {
    return http.get("/files_uchw/", {params});
  };

  const get = (id, data) => {
    return http.get("/files_uchw/" + id, data)
  }

  const update = (id, data) => {
    return http.put("/files_uchw/" + id, data);
  }

  const remove = id => {
    return http.delete(`/files_uchw/${id}`)
  }

  export default {
    getAll,
    get,
    update,
    remove
  }