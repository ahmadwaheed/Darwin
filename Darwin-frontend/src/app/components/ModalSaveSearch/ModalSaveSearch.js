import React from "react";
import "./ModalSaveSearch.css";

const ModalSaveSearch = ({
    handleChangeSaveQueryName,
    handleChangeSaveQueryDescription,
    errSaveQuery,
    saveQueryName,
    saveQueryDescription,
    handleCloseModalSaveQuery,
    saveQuery
}) => (
    <div className="modal-save-search">
        <h3 className="modal-save-search-title">Save Search Query</h3>
        <p className="errors-save-query">{errSaveQuery && errSaveQuery.length ? errSaveQuery : ""}</p>
        <input
            type="text"
            className="save-search-field save-search-name"
            placeholder="Name"
            onChange={e => handleChangeSaveQueryName(e.target.value)}
            value={saveQueryName}
        />
        <textarea
            rows="5"
            cols="5"
            type="text"
            className="save-search-field save-search-description"
            placeholder="Description"
            onChange={e => handleChangeSaveQueryDescription(e.target.value)}
            value={saveQueryDescription}
        />
        <div className="wrapper-save-search-btn">
            <button onClick={handleCloseModalSaveQuery} className="save-search-btn btn-cancel">
                Cancel
            </button>
            <button onClick={() => saveQuery()} className="save-search-btn btn-save">
                Save
            </button>
        </div>
    </div>
);
export default ModalSaveSearch;
