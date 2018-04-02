import React from "react";
import "./ModalSelectSavedQuery.css";

const ModalSelectSavedQuery = ({ savedQueries, selectSaveQuery, handleCloseModalSaveQuery }) => (
    <div className="wrapper-select-saved-query">
        <h3 className="modal-save-search-title">Select Search Query</h3>
        <ul className="saved-query-list">
            {savedQueries && savedQueries.length ? (
                savedQueries.map(el => (
                    <li onClick={() => selectSaveQuery(el)} key={el.id} className="saved-query-item">
                        {el.name}
                        <p className="description-saved-query">{el.description}</p>
                    </li>
                ))
            ) : (
                <li>No Saved Queries</li>
            )}
        </ul>
        <button onClick={handleCloseModalSaveQuery} className="save-search-btn btn-cancel">
            Cancel
        </button>
    </div>
);

export default ModalSelectSavedQuery;
