import http from "../http-common";

class KsiazkaDataService {
  
  getAll() {
    return http.get("/ksiazka");
  }
  
  getAll() {
    return http.get("/dzial");
  }
  get(id) {
    return http.get(`/ksiazka/${id}`);
  }
  get(id_dzialu) {
    return http.get(`/dzial/${id_dzialu}`);
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