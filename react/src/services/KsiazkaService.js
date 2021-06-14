import http from "../http-common";

class KsiazkaDataService {
  
  getAll() {
    return http.get("/ksiazka");
  }

  get(id) {
    return http.get(`/ksiazka/${id}`);
  }
  create(data) {
    return http.post("/ksiazka", data);
  }

  update(id, data) {
    return http.put('/ksiazka/' + id, data);
  }

  remove(id) {
    return http.delete(`/ksiazka/${id}`);
  }
}


export default new KsiazkaDataService();