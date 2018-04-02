import React, { Component } from "react";
import "./LinkedInButton.css";
import SocialLogin from "react-social-login";

class LinkedInButton extends Component {
    render() {
        const { triggerLogin, triggerLogout, ...props } = this.props;

        return (
            <button onClick={triggerLogin} {...props} className="linkedin-signup">
                <img src={require("../../../assets/images/icons/linkedin.svg")} alt="" />
                <span>{this.props.children}</span>
            </button>
        );
    }
}

export default SocialLogin(LinkedInButton);
