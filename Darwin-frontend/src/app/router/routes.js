import React from "react";
import { Route } from "mobx-router";

import Signup from "../views/Signup/Signup";
import Login from "../views/Login/Login";
import Home from "../views/Home/Home";
import ForgotPassword from "../views/ForgotPassword/ForgotPassword";
import Employer from "../views/Employer/Employer";
import SingleCompany from "../views/SingleCompany/SingleCompany";
import SearchResults from "../views/SearchResults/SearchResults";
import VerifyEmail from "../views/VerifyEmail/VerifyEmail";

const routes = {
    signup: new Route({
        path: "/signup",
        component: <Signup />
    }),
    verifyEmail: new Route({
        path: "/signup/verify/:token",
        component: <VerifyEmail />,
        onEnter: (route, params, store) => {
            if (params && params.token && store) {
                store.userStore.verifyEmail(params.token);
            }
        }
    }),
    login: new Route({
        path: "/login",
        component: <Login />
    }),
    home: new Route({
        path: "/",
        component: <Home />
    }),
    forgotPassword: new Route({
        path: "/forgot-password",
        component: <ForgotPassword />
    }),
    forgotPasswordVerify: new Route({
        path: "/user/forgot_password/:token",
        component: <ForgotPassword />,
        onEnter: (route, params, store) => {
            if (params && params.token && params.token.length) {
                store.userStore.forgotPasswordVerifyToken(params.token);
            }
        }
    }),
    employerAdd: new Route({
        path: "/add-employer",
        component: <Employer currentRoute={"/add-employer"} />
    }),
    employerCreate: new Route({
        path: "/create-employer",
        component: <Employer currentRoute={"/create-employer"} />,
        onEnter: (route, params, store) => {
            if (store && !store.commonStore.checkAuth()) {
                store.router.goTo(routes.home);
            }
        }
    }),
    singleCompany: new Route({
        path: "/company/:id/overview",
        component: <SingleCompany currentRoute={"/company/overview"} />,
        onEnter: (route, params, store) => {
            if (params && params.id && store) {
                store.companyStore.fetchCompany(params.id);
            }
        }
    }),
    singleCompanyNews: new Route({
        path: "/company/:id/news",
        component: <SingleCompany currentRoute={"/company/news"} />,
        onEnter: (route, params, store) => {
            if (params && params.id && store) {
                console.log("PARAMS", params);
                store.companyStore.fetchNewsByCompany(params.id);
            }
        }
    }),
    searchResults: new Route({
        path: "/search-results",
        component: <SearchResults currentRoute={"/search-results"} />
    }),
    competitorOverview: new Route({
        path: "/company/:id/competitoroverview",
        component: <SingleCompany currentRoute={"/company/competitoroverview"} />
    }),
   keyStaff: new Route({
        path: "/company/:id/keystaff",
        component: <SingleCompany currentRoute={"/company/keystaff"} />
    })
};

export default routes;
