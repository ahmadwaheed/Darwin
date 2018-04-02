import React from "react";
import "./CreateEmployerForm.css";

const CreateEmployerForm = () => (
    <div className="wrapper-employer-form-component">
        <h3 className="title-employer-form">Please input your current employer</h3>
        <input className="create-new-employer-fields" placeholder="Registration Number" type="text" />
        <input className="create-new-employer-fields" placeholder="Company Full Name" type="text" />
        <input className="create-new-employer-fields" placeholder="Country" type="text" />
        <input className="create-new-employer-fields" placeholder="Website" type="text" />
        <button className="submit-create-employer">submit</button>
        <p className="create-new-employer-bottom">Skip ></p>
    </div>
);

export default CreateEmployerForm;
