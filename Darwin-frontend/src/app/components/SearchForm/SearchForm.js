import React from "react";
import "./SearchForm.css";

import Filters from "../../components/Filters/Filters";
import Autocomplete from "react-autocomplete";

const SearchForm = ({
    handleChangeSearch,
    homeSearchValue,
    handleSearchHome,
    mainSearchValue,
    handleSearchValue,
    mainSearchAction,
    mainSearchError,
    toggleFilters,
    toggleFiltersAction,
    handleChangeSearchEmployer,
    employersResultSearch,
    employerVal,
    handleSelectCompanyFromAutocomplete,
    isAdvancedSearch
}) => (
    <div className={!isAdvancedSearch ? "wrapper-home-form" : "wrapper-home-form advanced-search"}>
        {!isAdvancedSearch ? (
            [
                <h2 key="SearchFormTitle" className="home-fome-title">
                    Search info of any company in Singapore
                </h2>,
                <div key="wrapperHomeSearchField" className="wrapper-home-search-field">
                    <img
                        className="search-icon"
                        src={require("../../../assets/images/icons/search.svg")}
                        alt=""
                    />
                    <Autocomplete
                        wrapperProps={{
                            className:
                                homeSearchValue.length > 4
                                    ? "wrapper-home-search-autocomplete"
                                    : "wrapper-home-search-autocomplete no-border"
                        }}
                        inputProps={{
                            className: "search-home-field",
                            placeholder: "type company name, registration number, etc.",
                            onKeyPress: e => (e.key === "Enter" ? handleSearchHome() : null)
                        }}
                        value={homeSearchValue}
                        items={
                            employersResultSearch.length
                                ? employersResultSearch
                                : employersResultSearch.splice()
                        }
                        getItemValue={company => company.fullName}
                        onSelect={(companyName, company) => handleSelectCompanyFromAutocomplete(company)}
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
                    {homeSearchValue.length ? (
                        <img
                            onClick={() => handleChangeSearchEmployer("")}
                            className="cross-icon"
                            src={require("../../../assets/images/icons/cross.svg")}
                            alt=""
                        />
                    ) : null}

                    <button className="search-btn-home" onClick={() => handleSearchHome()}>
                        Search
                    </button>
                </div>,
                <div
                    key="wrapperHomeMoreDilters"
                    className={
                        toggleFilters ? "wrapper-home-more-filters filters-open" : "wrapper-home-more-filters"
                    }
                >
                    {/* <button className="more-filters-btn" onClick={toggleFiltersAction}>
                        {toggleFilters ? "hide" : "more filters"}

                        <img
                            className="more-filters-icon"
                            src={require("../../../assets/images/icons/sort-down.svg")}
                            alt=""
                        />
                    </button> */}
                </div>
            ]
        ) : (
            <Filters />
        )}
    </div>
);

export default SearchForm;
