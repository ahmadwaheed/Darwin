import React from "react";
import "./SignupForm.css";

import LinkedInButton from "../LinkedInButton/LinkedInButton";

const SignupForm = ({
    values: { firstName, lastName, email, password },
    handleFirsNameChange,
    handleLastNameChange,
    handleEmailChange,
    handlePasswordChange,
    submitAction,
    errors,
    linkedInClientId,
    handleLinkedInLogin,
    handleLinkedInLoginFailure,
    warningVerifyEmail,
    goToLogin,
    goToSignUp
}) => (
    <div className="wrapper-signup-form-component">
        <h1 className="title-signup">
        Please <span onClick={() => goToLogin()}>Login</span> or <span onClick={() => goToSignUp()}>Sign up</span>
        </h1>
        <div className="wrapper-signup-form">
            <div className="wrapper-linkedin-signup">
                <LinkedInButton
                    provider="linkedin"
                    appId={linkedInClientId}
                    onLoginSuccess={data => handleLinkedInLogin(data)}
                    onLoginFailure={err => handleLinkedInLoginFailure(err)}
                >
                    Sign up with LinkedIn
                </LinkedInButton>
                <p className="linkedin-description">
                    We won't post anything without your permission and your personal details are kept private.
                </p>
            </div>
            <div className="wrapper-signup-fields">
                <span className="warning-verify-email">
                    {warningVerifyEmail.length ? warningVerifyEmail : ""}
                </span>
                <span className="errors-signup-form">
                    {errors.errFirstName.length ? errors.errFirstName : ""}
                </span>
                <input
                    type="text"
                    className="signup-fields"
                    placeholder="First Name"
                    value={firstName}
                    onChange={e => handleFirsNameChange(e.target.value)}
                />
                <span className="errors-signup-form">
                    {errors.errLastName.length ? errors.errLastName : ""}
                </span>
                <input
                    type="text"
                    className="signup-fields"
                    placeholder="Last Name"
                    value={lastName}
                    onChange={e => handleLastNameChange(e.target.value)}
                />
                <span className="errors-signup-form">{errors.errEmail.length ? errors.errEmail : ""}</span>
                <input
                    type="email"
                    className="signup-fields"
                    placeholder="Work Email"
                    value={email}
                    onChange={e => handleEmailChange(e.target.value)}
                />
                <span className="errors-signup-form">
                    {errors.errPassword.length ? errors.errPassword : ""}
                </span>
                <input
                    type="password"
                    className="signup-fields"
                    placeholder="Password"
                    value={password}
                    onChange={e => handlePasswordChange(e.target.value)}
                />
            </div>
            <button onClick={submitAction} className="signup">
                sign up
            </button>
            <p className="terms-of-use">
                By signing up, you agree to our <a href="">terms of use</a>
            </p>
        </div>
    </div>
);

export default SignupForm;
