import React from "react";
import "./LoginForm.css";

import LinkedInButton from "../LinkedInButton/LinkedInButton";

const LoginForm = ({
    values: { email, password },
    handleEmailChange,
    handlePasswordChange,
    submitAction,
    errors,
    linkedInClientId,
    handleLinkedInLogin,
    handleLinkedInLoginFailure,
    goToLogin,
    goToSignUp,
    goToForgotPassword
}) => (
    <div className="wrapper-login-form-component">
        <h1 className="title-login">
            Please <span onClick={() => goToLogin()}>Login</span> or <span onClick={() => goToSignUp()}>Sign up</span>
        </h1>
        <div className="wrapper-login-form">
            <div className="wrapper-linkedin-login">
                <LinkedInButton
                    provider="linkedin"
                    appId={linkedInClientId}
                    onLoginSuccess={data => handleLinkedInLogin(data)}
                    onLoginFailure={err => handleLinkedInLoginFailure(err)}
                >
                    Sign in with LinkedIn
                </LinkedInButton>
            </div>
            <div className="wrapper-login-fields">
                <span className="errors-login-form">{errors.errEmail.length ? errors.errEmail : ""}</span>
                <input
                    type="email"
                    className="login-fields"
                    placeholder="Work Email"
                    value={email}
                    onChange={e => handleEmailChange(e.target.value)}
                />
                <span className="errors-login-form">
                    {errors.errPassword.length ? errors.errPassword : ""}
                </span>
                <input
                    type="password"
                    className="login-fields"
                    placeholder="Password"
                    value={password}
                    onChange={e => handlePasswordChange(e.target.value)}
                />
            </div>
            <button onClick={submitAction} className="login">
                login
            </button>
            <p onClick={() => goToForgotPassword()} className="forgot-password">
                Forgot Password?
            </p>
            <label className="remember-me">
                <input type="checkbox" className="remember-me-checkbox" />
                Remember me on this computer
            </label>
        </div>
    </div>
);

export default LoginForm;
