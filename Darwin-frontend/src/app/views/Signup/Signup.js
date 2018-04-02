import React, { Component } from "react";
import "./Signup.css";

import { inject, observer } from "mobx-react";
import routes from "../../router/routes";
import SignupForm from "../../components/SignupForm/SignupForm";

@inject("store")
@observer
class Signup extends Component {
    constructor(props) {
        super(props);
        this.props.store.userStore.isForgotPassword = false;
        this.props.store.userStore.isSignup = true;
    }

    componentWillUnmount() {
        this.props.store.userStore.resetErrors();
        this.props.store.userStore.resetValues();
    }

    handleFirsNameChange = val => (this.props.store.userStore.firstName = val);
    handleLastNameChange = val => (this.props.store.userStore.lastName = val);
    handleEmailChange = val => (this.props.store.userStore.email = val);
    handlePasswordChange = val => (this.props.store.userStore.password = val);
    render() {
        const {
            router: { goTo },
            userStore: {
                firstName,
                lastName,
                email,
                password,
                errFirstName,
                errLastName,
                errEmail,
                errPassword,
                linkedInClientId,
                handleLinkedInLogin,
                handleLinkedInLoginFailure,
                warningVerifyEmail
            }
        } = this.props.store;

        const errors = { errFirstName, errLastName, errEmail, errPassword };

        return (
            <div className="wrapper-signup-view">
                <div className="container">
                    <div className="wrapper-signup">
                        <SignupForm
                            submitAction={() => this.props.store.userStore.signup()}
                            goToLogin={() => goTo(routes.login)}
                            goToSignUp={() => goTo(routes.signup)}
                            handleFirsNameChange={val => this.handleFirsNameChange(val)}
                            handleLastNameChange={val => this.handleLastNameChange(val)}
                            handleEmailChange={val => this.handleEmailChange(val)}
                            handlePasswordChange={val => this.handlePasswordChange(val)}
                            values={{ firstName, lastName, email, password }}
                            errors={errors}
                            linkedInClientId={linkedInClientId}
                            handleLinkedInLogin={data => handleLinkedInLogin(data)}
                            handleLinkedInLoginFailure={err => handleLinkedInLoginFailure(err)}
                            warningVerifyEmail={warningVerifyEmail}
                        />
                    </div>
                </div>
            </div>
        );
    }
}
export default Signup;
