import http from "../http-common";

const getAll = () => {
    return http.get("/ksiazka");
}

const get = id => {
    return http.get(`/ksiazka/${id}`);
}

const create = data => {
    return http.post("/ksiazka", data);
}

const update = (id, data) => {
    return http.put('/ksiazka/' + id, data);
}

const remove = id => {
    return http.delete(`/ksiazka/${id}`);
}

const KsiazkaService = {
    getAll,
    get,
    create,
    update,
    remove,
};

export default KsiazkaService;