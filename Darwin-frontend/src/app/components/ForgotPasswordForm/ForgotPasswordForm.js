import React from "react";
import "./ForgotPasswordForm.css";

const ForgotPasswordForm = ({
    email,
    password,
    confirmPassword,
    errForgotPassword,
    handleEmailChange,
    forgotPasswordSubmit,
    isForgotPasswordSubmit,
    isForgotPasswordChange,
    handlePasswordChange,
    handleConfirmPasswordChange,
    submitNewPassword,
    validationNewPassword
}) => {
    const renderForgotPassword = () => {
        if (isForgotPasswordSubmit) {
            return (
                <div className="wrapper-forgot-password-form-component">
                    <h2 className="forgot-password-submitted">
                        A link to change your password has been sent to your email
                    </h2>
                </div>
            );
        } else {
            return (
                <div className="wrapper-forgot-password-form-component">
                    <div className="wrapper-forgot-password-form">
                        <div className="wrapper-forgot-password-title">
                            {isForgotPasswordChange ? "Please Enter New Password" : "Please Enter Your Email"}
                        </div>
                        <div className="wrapper-forgot-password-fields">
                            <span className="errors-forgot-password">
                                {errForgotPassword.length ? errForgotPassword : ""}
                            </span>
                            {isForgotPasswordChange ? (
                                <div className="wrapper new-pass-form">
                                    <input
                                        type="password"
                                        className="login-fields"
                                        placeholder="New Password"
                                        value={password}
                                        onChange={e => handlePasswordChange(e.target.value)}
                                        onBlur={() => validationNewPassword()}
                                    />
                                    <input
                                        type="password"
                                        className="login-fields"
                                        placeholder="Confirm Password"
                                        value={confirmPassword}
                                        onChange={e => handleConfirmPasswordChange(e.target.value)}
                                        onBlur={() => validationNewPassword()}
                                    />
                                </div>
                            ) : (
                                <input
                                    type="email"
                                    className="login-fields"
                                    placeholder="Work Email"
                                    value={email}
                                    onChange={e => handleEmailChange(e.target.value)}
                                />
                            )}
                        </div>
                        <button
                            onClick={isForgotPasswordChange ? submitNewPassword : forgotPasswordSubmit}
                            className="forgot-password-submit"
                        >
                            send
                        </button>
                    </div>
                </div>
            );
        }
    };

    return renderForgotPassword();
};

export default ForgotPasswordForm;
