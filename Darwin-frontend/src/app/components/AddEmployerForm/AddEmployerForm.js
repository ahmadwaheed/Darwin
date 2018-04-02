import React from "react";
import "./AddEmployerForm.css";

import Autocomplete from "react-autocomplete";

const AddEmployerForm = ({
    goToCreateEmployer,
    handleChangeSearchEmployer,
    employersResultSearch,
    employerVal,
    goToHome
}) => {
    return (
        <div className="wrapper-employer-form-component">
            <h3 className="title-employer-form">Please input your current employer</h3>
            <Autocomplete
                wrapperProps={{ className: "wrapper-employer-autocomplete" }}
                inputProps={{ className: "employer-autocomplete" }}
                value={employerVal}
                items={employersResultSearch.length ? employersResultSearch : employersResultSearch.splice()}
                getItemValue={company => company.fullName}
                onSelect={company => handleChangeSearchEmployer(company)}
                renderMenu={children => <div className="wrapper-autocomplete-items">{children}</div>}
                renderItem={(item, isHighlighted) => (
                    <div
                        key={item.id}
                        className={`autocomplete-item ${isHighlighted ? "item-highlighted" : ""}`}
                    >
                        {item.fullName}
                    </div>
                )}
                onChange={(event, value) => handleChangeSearchEmployer(value)}
            />
            <button className="submit-employer">submit</button>
            <p onClick={() => goToCreateEmployer()} className="create-new-employer">
                not in the list? create a new one
            </p>
            <p onClick={() => goToHome()} className="create-new-employer">
                SKIP THIS STEP
            </p>
        </div>
    );
};

export default AddEmployerForm;
