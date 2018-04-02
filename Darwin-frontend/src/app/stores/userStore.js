import { observable, action, computed } from "mobx";
import agent from "../agent";
import commonStore from "./commonStore";
import router from "../router";
import routes from "../router/routes";
import emailDomains from "../../data/emailDomains";

const env = process.env.NODE_ENV || "development";
const config = require(`../../../config/${env}.json`);

class UserStore {
    linkedInClientId = config.LINKEDIN_CLIENT_ID;
    userEmail = "";

    @observable _isForgotPasswordSubmit = false;
    @observable _isForgotPasswordChange = false;
    @observable _isSignup = false;
    @observable _isForgotPassword = false;
    @observable _userData = window.localStorage.getItem("userData");

    @observable _firstName = "";
    @observable _lastName = "";
    @observable _email = "";
    @observable _password = "";
    @observable _confirmPassword = "";

    @observable errFirstName = "";
    @observable errLastName = "";
    @observable errEmail = "";
    @observable errForgotPassword = "";
    @observable errPassword = "";
    @observable warningVerifyEmail = "";

    @observable msgVerifyEmail = "";

    @observable token = window.localStorage.getItem("jwtToken");
    @observable isAuth = window.localStorage.getItem("jwtToken") ? true : false;

    @action
    setToken(token) {
        window.localStorage.setItem("jwtToken", token);
        this.token = token;
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

    @computed
    get isSignup() {
        return this._isSignup;
    }
    set isSignup(val) {
        this._isSignup = val;
    }

    @computed
    get isForgotPasswordSubmit() {
        return this._isForgotPasswordSubmit;
    }
    set isForgotPasswordSubmit(val) {
        this._isForgotPasswordSubmit = val;
    }

    @computed
    get isForgotPasswordChange() {
        return this._isForgotPasswordChange;
    }
    set isForgotPasswordChange(val) {
        this._isForgotPasswordChange = val;
    }

    @computed
    get isForgotPassword() {
        return this._isForgotPassword;
    }
    set isForgotPassword(val) {
        this._isForgotPassword = val;
    }

    @computed
    get firstName() {
        return this._firstName;
    }
    set firstName(val) {
        this._firstName = val;
    }

    get lastName() {
        return this._lastName;
    }
    @computed
    set lastName(val) {
        this._lastName = val;
    }

    @computed
    get email() {
        return this._email;
    }
    set email(val) {
        this._email = val;
    }

    get password() {
        return this._password;
    }
    @computed
    set password(val) {
        this._password = val;
    }

    get confirmPassword() {
        return this._confirmPassword;
    }
    @computed
    set confirmPassword(val) {
        this._confirmPassword = val;
    }

    get userData() {
        return this._userData;
    }
    @computed
    set userData(val) {
        this._userData = val;
    }

    @action
    resetErrors() {
        this.errFirstName = "";
        this.errLastName = "";
        this.errEmail = "";
        this.errPassword = "";
        this.errForgotPassword = "";
        this.warningVerifyEmail = "";
    }

    @action
    resetValues() {
        this.firstName = "";
        this.lastName = "";
        this.email = "";
        this.password = "";
    }

    @action
    saveUserData(data) {
        window.localStorage.setItem("userData", JSON.stringify(data));
        this.userData = window.localStorage.getItem("userData");
    }

    @action
    signup() {
        this.resetErrors();
        if (this.validation()) {
            return agent.User.signup(this.firstName, this.lastName, this.email, btoa(this.password))
                .then(res => {
                    console.log(res);
                    if (!res.success) {
                        this.errEmail = res.msg;
                    } else {
                        this.resetValues();
                        this.warningVerifyEmail = "You have been sent an email, please confirm your email";
                    }
                })
                .catch(err => console.error("ERROR", err));
        }
    }

    @action
    verifyEmail(token) {
        if (token.length) {
            agent.User.verifyToken(token)
                .then(res => {
                    
                    this.msgVerifyEmail = res.msg;
                    this.setToken(res.jwtToken);
                    this.saveUserData(res.user);
                    this.isAuth = true;
                    router.goTo(routes.home);
                })
                .catch(err => console.error("ERROR", err));
        } else {
            this.msgVerifyEmail = "Token not Provided";
        }
    }

    @action
    login() {
        this.resetErrors();
        if (this.validation()) {
            return agent.User.login(this.email, btoa(this.password))
                .then(res => {
                    if (!res.success) {
                        this.errEmail = res.msg;
                    } else {
                        this.setToken(res.jwtToken);
                        this.saveUserData(res.user);
                        this.isAuth = true;
                        // console.log("res", res);
                        router.goTo(routes.home);
                    }
                })
                .catch(err => console.error("ERROR", err));
        }
    }

    @action
    validation() {
        let validStatus = true;
        if (!this.isForgotPassword && this.isSignup && !this.firstName.length) {
            validStatus = false;
            this.errFirstName = "Please Enter Your First Name";
        }
        if (!this.isForgotPassword && this.isSignup && !this.lastName.length) {
            validStatus = false;
            this.errLastName = "Please Enter Your Last Name";
        }
        if (!this.email.length) {
            validStatus = false;
            this.isForgotPassword
                ? (this.errForgotPassword = "Please Enter Your Work Email")
                : (this.errEmail = "Please Enter Your Work Email");
        } else {
            const regExpEmail = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            if (!regExpEmail.test(this.email)) {
                validStatus = false;
                this.errEmail = "Please Enter Valid Email";
            } else {
                const emailDomain = this.email.replace(/.*@/, "").split(".")[0];
                if (emailDomains.indexOf(emailDomain) !== -1) {
                    validStatus = false;
                    this.errEmail = "Please Enter Work Email";
                }
            }
        }
        if (!this.isForgotPassword && this.password.length < 8) {
            validStatus = false;
            this.errPassword = "Minimum Password Length 8";
        }
        console.log("validStatus", validStatus);
        return validStatus;
    }

    @action
    validationNewPassword() {
        this.resetErrors();
        let validStatus = true;
        if (this.password.length < 8) {
            validStatus = false;
            this.errForgotPassword = "Min Length 8";
        } else {
            if (this.password !== this.confirmPassword) {
                validStatus = false;
                this.errForgotPassword = "These passwords don't match";
            }
        }
        return validStatus;
    }

    @action
    handleLinkedInLogin(data) {
        const { id, firstName, lastName, email, profilePicURL, publicProfileURL } = data.profile;
        return agent.User.loginLinkedId(id, firstName, lastName, email, profilePicURL, publicProfileURL)
            .then(res => {
                console.log(res);
                if (!res.success) {
                    this.errEmail = res.msg;
                } else {
                    commonStore.setToken(res.jwtToken);
                    commonStore.saveUserData(res.user);
                    //router.goTo(routes.employerAdd);
                    router.goTo(routes.home);
                }
            })
            .catch(err => console.error("ERROR", err));
    }

    @action
    handleLinkedInLoginFailure(err) {
        console.error("LinkedIn Auth ERROR", err);
    }

    @action
    forgotPasswordSubmit() {
        this.resetErrors();
        if (this.validation()) {
            return agent.User.forgotPassword(this.email)
                .then(res => {
                    console.log(res);
                    if (!res.success) {
                        this.errForgotPassword = res.msg;
                    } else {
                        this.isForgotPasswordChange = false;
                        this.isForgotPasswordSubmit = true;
                        console.log("success", res);
                    }
                })
                .catch(err => console.error("ERROR", err));
        }
    }

    @action
    forgotPasswordVerifyToken(token) {
        console.log(token);
        return agent.User.forgotPasswordVerifyToken(token)
            .then(res => {
                console.log(res);
                if (!res.success) {
                    this.errForgotPassword = res.msg;
                } else {
                    this.isForgotPasswordSubmit = false;
                    this.isForgotPasswordChange = true;
                    this.userEmail = res.email;
                    console.log("success", res);
                }
            })
            .catch(err => console.error("ERROR", err));
    }

    @action
    submitNewPassword() {
        if (this.validationNewPassword()) {
            return agent.User.createNewPassword(this.userEmail, btoa(this.password))
                .then(res => {
                    console.log(res);
                    if (!res.success) {
                        this.errForgotPassword = res.msg;
                    } else {
                        this.isForgotPasswordSubmit = false;
                        this.isForgotPasswordChange = false;
                        router.goTo(routes.login);
                        console.log("success", res);
                    }
                })
                .catch(err => console.error("ERROR", err));
        }
    }

    logout() {
        window.localStorage.removeItem("jwtToken");
        window.localStorage.removeItem("userData");
        this.isAuth = false;
    }
}

export default new UserStore();
