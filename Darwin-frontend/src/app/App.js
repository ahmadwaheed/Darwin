import React, { Component } from "react";
import "./App.css";

import { MobxRouter, startRouter } from "mobx-router";
import { Provider } from "mobx-react";

import Header from "./components/Header/Header";

import commonStore from "./stores/commonStore";
import userStore from "./stores/userStore";
import companyStore from "./stores/companyStore";
import routes from "./router/routes";
import router from "./router";

const stores = {
    router,
    commonStore,
    userStore,
    companyStore
};

startRouter(routes, stores);

export default class App extends Component {
    render() {
        return (
            <Provider store={stores}>
                <div className="wrapper-router">
                    <Header />
                    <MobxRouter />
                </div>
            </Provider>
        );
    }
}
