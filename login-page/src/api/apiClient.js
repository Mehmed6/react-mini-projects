import axios from "axios";

axios.defaults.baseURL = "http://localhost:8080/api/";
axios.defaults.withCredentials = true;

const methods = {
    get: url => axios.get(url).then(res => res.data),
    post: (url, body) => axios.post(url, body).then(res => res.data),
}

const account = {
    login: formData => methods.post("auth/login", formData),
    fetchMe: () => methods.get("auth/me"),
    logout: () => methods.post("auth/logout"),
}

const requests = {
    account,
};

export default requests;