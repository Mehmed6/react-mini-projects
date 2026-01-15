import axios from "axios";
import {toast} from "react-toastify";
import {router} from "../routes/index.jsx";
//import {store} from "../pages/store/store.js";

axios.defaults.baseURL = "http://localhost:5000/";
axios.defaults.withCredentials = true;


let token = null;
export const setAuthToken = (newToken) => { token = newToken;};

axios.interceptors.request.use(request => {
    //const token = store.getState().account.user?.token;
    if (token)
        request.headers.Authorization = `Bearer ${token}`;

    return request;
})

let onHttpError = null;
export const setOnHttpError = (handler) => {
    onHttpError = handler;
}

axios.interceptors.response.use(
    response => response,
    error => {
        const resp = error.response;
        const normalized = {
            status: resp?.status ?? 0,
            data: resp?.data,
            message: resp?.data?.message || error.message || "Something went wrong"
        };
        if (onHttpError) onHttpError(normalized);
        return Promise.reject(normalized);
    }
)

/*axios.interceptors.response.use(
    response => {
        return response;
    },
    error => {
        const {data, status} = error.response;
        switch (status) {
            case 400:
                toast.error(data.message);
                break;
            case 401:
                toast.error(data.message);
                break;
            case 403:
                if (data.errors) {
                    const errors = [];

                    for (const key in data.errors)
                        errors.push(data.errors[key]);

                    throw {errors: errors, message: data.message};
                }
                break;
            case 404:
                router.navigate("/errors/not-found")
                break;
            case 500:
                router.navigate("/errors/server-error", {
                    state: {error: data, status: status}});
                break;
            default:
                toast.error(data.message);
        }
        return Promise.reject(error);
    }
) */


const methods = {
    get : url => axios.get(url).then(response => response.data),
    post: (url, body) => axios.post(url,body).then(response => response.data),
    put : (url, body) => axios.put(url, body).then(response => response.data),
    delete : url => axios.delete(url).then(response => response.data)
};

const products = {
    list: () => methods.get("products"),
    details: id => methods.get(`products/${id}`)
};

const cart = {
    get: () => methods.get("carts"),
    addItem: (productId, quantity = 1) => methods.post(`carts?productId=${productId}&quantity=${quantity}`, {}),
    deleteItem: (productId, quantity = 1) => methods.delete(`carts?productId=${productId}&quantity=${quantity}`),
};

const account = {
    login: formData => methods.post("users/login", formData),
    register: formData => methods.post("users/register", formData),
    getUser: () => methods.get("users/getUser"),
}

const orders = {
    getOrders: () => methods.get("orders"),
    getOrderById: id => methods.get(`orders/${id}`),
    createOrder: formData => methods.post("orders", formData)
}

const errors = {
    get400Error: () => methods.get("errors/bad-request"),
    get401Error: () => methods.get("errors/unauthorized"),
    get403Error: () => methods.get("errors/validation-error"),
    get404Error: () => methods.get("errors/not-found"),
    get500Error: () => methods.get("errors/server-error"),
}

const requests = {
    products,
    errors,
    cart,
    account,
    orders
};

export default requests;