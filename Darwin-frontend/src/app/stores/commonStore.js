import { observable, action, computed } from "mobx";
import userStore from "./userStore";

class CommonStore {
    @observable token = window.localStorage.getItem("jwtToken");
    @observable isAuth = false;

    @action
    setToken(token) {
        window.localStorage.setItem("jwtToken", token);
        this.token = token;
    }
    @action
    saveUserData(data) {
        userStore.saveUserData(data);
        userStore.isAuth = true;
    }

    @action
    checkAuth() {
        if (window.localStorage.getItem("jwtToken")) {
            this.isAuth = true;
        } else {
            this.isAuth = false;
        }

        return this.isAuth;
    }
}

export default new CommonStore();
