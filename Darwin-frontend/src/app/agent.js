import superagentPromise from "superagent-promise";
import _superagent from "superagent";

const env = process.env.NODE_ENV || "development";
const config = require(`../../config/${env}.json`);

const superagent = superagentPromise(_superagent, global.Promise);
const responseBody = res => res.body;

function getUserData() {
    return JSON.parse(window.localStorage.getItem("userData"));
}

function getAuthToken() {
    return window.localStorage.getItem("jwtToken");
}
// const handleErrors = err => {
//     if (err && err.response && err.response.status === 401) {
//         authStore.logout();
//     }
//     return err;
// };

// const tokenPlugin = req => {
//     if (commonStore.token) {
//         req.set("jwt-token", `${commonStore.token}`);
//     }
// };

const apiKey = req => {
    req.set("api-key", `${config.API_KEY}`);
};

const setToken = req => (getAuthToken() ? req.set("jwt-token", getAuthToken()) : null);

const requests = {
    del: url =>
        superagent
            .del(`${config.API_HOST}${config.API_PORT}${config.API_VERSION}${url}`)
            .use(apiKey)
            .end(console.log("END"))
            .then(responseBody),
    get: url =>
        superagent
            .get(`${config.API_HOST}${config.API_PORT}${config.API_VERSION}${url}`)
            .use(apiKey)
            .end(console.log("END"))
            .then(responseBody),
    put: (url, body) =>
        superagent
            .put(`${config.API_HOST}${config.API_PORT}${config.API_VERSION}${url}`, body)
            .use(apiKey)
            .use(setToken)
            .end(console.log("END"))
            .then(responseBody),
    post: (url, body) =>
        superagent
            .post(`${config.API_HOST}${config.API_PORT}${config.API_VERSION}${url}`, body)
            .use(apiKey)
            .end(console.log("END"))
            .then(responseBody)
};

const User = {
    login: (email, password) => requests.post("/auth", { email, password }),
    signup: (firstName, lastName, email, password) =>
        requests.post("/user", { firstName, lastName, email, password }),
    verifyToken: token => requests.get(`/user/verify/${token}`),
    loginLinkedId: (idLinkedIn, firstName, lastName, email, profilePicURL, publicProfileURL) =>
        requests.post("/user/linkedin", {
            idLinkedIn,
            firstName,
            lastName,
            email,
            profilePicURL,
            publicProfileURL
        }),
    forgotPassword: email => requests.post("/user/forgot_password", { email: email }),
    forgotPasswordVerifyToken: token => requests.get(`/user/forgot_password/${token}`),
    createNewPassword: (email, password) =>
        requests.post(`/user/forgot_password/new_password`, { email: email, password: password }),
    saveQueries: body => requests.put(`/user/${getUserData().id}/search`, body),
    fetchSavedQueries: () => requests.get(`/user/${getUserData().id}/search`)
};

const Company = {
    singleCompany: id => requests.get(`/company/${id}`),
    getSingleNewByCompany: id => requests.get(`/news/company/${id}`)
};

const Search = {
    filterCompany: queries => requests.post("/search/filters", queries),
    searchCompanies: val => requests.get(`/search/companies/${val}`),
    searchIndustry: val => requests.get(`/search/industry/${val}`),
    searchLocation: val => requests.get(`/search/countries/${val}`),
    industryTree: queryStr =>
        requests.get(`/search/industries_tree${queryStr && queryStr.length ? queryStr : ""}`)
};

export default {
    User,
    Company,
    Search
};
