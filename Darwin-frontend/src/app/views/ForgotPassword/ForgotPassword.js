import React, { Component } from "react";
import "./ForgotPassword.css";

import { inject, observer } from "mobx-react";

import ForgotPasswordForm from "../../components/ForgotPasswordForm/ForgotPasswordForm";

@inject("store")
@observer
class ForgotPassword extends Component {
    constructor(props) {
        super(props);
        this.props.store.userStore.isSignup = false;
        this.props.store.userStore.isForgotPassword = true;
    }

    componentWillUnmount() {
        this.props.store.userStore.resetErrors();
        this.props.store.userStore.resetValues();
    }

    handleEmailChange = val => (this.props.store.userStore.email = val);
    handlePasswordChange = val => (this.props.store.userStore.password = val);
    handleConfirmPasswordChange = val => (this.props.store.userStore.confirmPassword = val);

    render() {
        const {
            email,
            password,
            confirmPassword,
            errForgotPassword,
            isForgotPasswordSubmit,
            isForgotPasswordChange
        } = this.props.store.userStore;

        return (
            <div className="wrapper-forgot-password-view">
                <ForgotPasswordForm
                    email={email}
                    password={password}
                    confirmPassword={confirmPassword}
                    errForgotPassword={errForgotPassword}
                    handleEmailChange={val => this.handleEmailChange(val)}
                    handlePasswordChange={val => this.handlePasswordChange(val)}
                    handleConfirmPasswordChange={val => this.handleConfirmPasswordChange(val)}
                    forgotPasswordSubmit={() => this.props.store.userStore.forgotPasswordSubmit()}
                    isForgotPasswordSubmit={isForgotPasswordSubmit}
                    isForgotPasswordChange={isForgotPasswordChange}
                    submitNewPassword={() => this.props.store.userStore.submitNewPassword()}
                    validationNewPassword={() => this.props.store.userStore.validationNewPassword()}
                />
            </div>
        );
    }
}
export default ForgotPassword;
