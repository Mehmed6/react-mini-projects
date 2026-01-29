import axios from "axios";

axios.defaults.baseURL = "http://localhost:8080/api/";

const methods = {
    post: (url, body) => axios.post(url, body).then(res => res.data),
}

const account = {
    register: formData => methods.post("register", formData)
}

export const requests = {
    account,
}