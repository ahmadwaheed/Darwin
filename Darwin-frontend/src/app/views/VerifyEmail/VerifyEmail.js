import React, { Component } from "react";
import "./VerifyEmail.css";

import { inject, observer } from "mobx-react";

@inject("store")
@observer
class VerifyEmail extends Component {
    render() {
        const { msgVerifyEmail } = this.props.store.userStore;
        return (
            <div className="wrapper-verify-email-view">
                <div className="container">
                    <h3 className="verify-email-message">{msgVerifyEmail}</h3>
                </div>
            </div>
        );
    }
}
export default VerifyEmail;
