import React, { Component } from "react";
import "./Login.css";

import { inject, observer } from "mobx-react";
import routes from "../../router/routes";

import LoginForm from "../../components/LoginForm/LoginForm";

@inject("store")
@observer
class Login extends Component {
    constructor(props) {
        super(props);
        this.props.store.userStore.isSignup = false;
        this.props.store.userStore.isForgotPassword = false;
    }

    componentWillUnmount() {
        this.props.store.userStore.resetErrors();
        this.props.store.userStore.resetValues();
    }

    handleEmailChange = val => (this.props.store.userStore.email = val);
    handlePasswordChange = val => (this.props.store.userStore.password = val);

    render() {
        const {
            router: { goTo },
            userStore: {
                email,
                password,
                errEmail,
                errPassword,
                linkedInClientId,
                handleLinkedInLogin,
                handleLinkedInLoginFailure
            }
        } = this.props.store;
        const errors = { errEmail, errPassword };
        return (
            <div className="wrapper-login-view">
                <div className="container">
                    <div className="wrapper-login">
                        <LoginForm
                            submitAction={() => this.props.store.userStore.login()}
                            goToSignUp={() => goTo(routes.signup)}
                            goToLogin={() => goTo(routes.login)}
                            goToForgotPassword={() => goTo(routes.forgotPassword)}
                            handleEmailChange={val => this.handleEmailChange(val)}
                            handlePasswordChange={val => this.handlePasswordChange(val)}
                            values={{ email, password }}
                            errors={errors}
                            linkedInClientId={linkedInClientId}
                            handleLinkedInLogin={data => handleLinkedInLogin(data)}
                            handleLinkedInLoginFailure={err => handleLinkedInLoginFailure(err)}
                        />
                    </div>
                </div>
            </div>
        );
    }
}
export default Login;
