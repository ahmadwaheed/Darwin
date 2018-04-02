import React, { Component } from "react";
import "./SearchResults.css";

import CompanyTable from "../../components/CompanyTable/CompanyTable";
import ModalSaveSearch from "../../components/ModalSaveSearch/ModalSaveSearch";
import ModalSelectSavedQuery from "../../components/ModalSelectSavedQuery/ModalSelectSavedQuery";
import SearchForm from "../../components/SearchForm/SearchForm";

import routes from "../../router/routes";

import { inject, observer } from "mobx-react";

@inject("store")
@observer
class SearchResults extends Component {
    constructor(props) {
        super(props);
        this.state = {
            toggleFilters: false
        };
    }
    handleSelectCompany(params) {
        let company;
        if (params.original) {
            company = params.original;
        }
        else {
            company = params;
        }
        this.props.store.companyStore.fetchCompany(company.id);
        this.props.store.router.goTo(routes.singleCompany, { id: company.id });
    }

    handleToggleFilters = () => {
    
        this.props.store.companyStore.isAdvancedSearch = true;
        this.props.store.router.goTo(routes.searchResults);
        
    };

    handleSearchHome = () => {
    
        const {mainSearchValue} = this.props.store.companyStore;
        this.props.store.companyStore.updateWithAllItems(mainSearchValue);
        this.handleToggleFilters();
        this.props.store.companyStore.searchAction();
    }

    handleChangeSearch = event => {
        const id = event.target.id;
        const value = event.target.value;
        this.props.store.companyStore[id] = value;
    };

    handleChangeSaveQueryName = val => (this.props.store.companyStore.saveQueryName = val);

    handleChangeSaveQueryDescription = val => (this.props.store.companyStore.saveQueryDescription = val);

    handleCloseModalSaveQuery = () => {
        this.props.store.companyStore.errSaveQuery = "";
        this.props.store.companyStore.showModal = false;
        this.props.store.companyStore.isModalSaveQuery = false;
    };

    handleChangeSearchEmployer(val) {
        this.props.store.companyStore.mainSearchValue = val;
        this.props.store.companyStore.searchCompanies("homesearch");
    }

    render() {
        const {
            companies,
            isLoadingSearch,
            mainSearchValue,
            mainSearchError,
            saveQueryName,
            saveQueryDescription,
            errSaveQuery,
            savedQueries,
            employersResultSearch,
            isAdvancedSearch,
            displayCompanyName,
            displayIndustry,
            displayCountry,
            displayAddress
        } = this.props.store.companyStore;
        return (
            <div className="wrapper-search-results-view">
                <div className={!isAdvancedSearch ? "wrapper-home" : "wrapper-home advanced-search"}>
                    <SearchForm
                        mainSearchValue={mainSearchValue}
                        mainSearchError={mainSearchError}
                        toggleFilters={this.state.toggleFilters}
                        toggleFiltersAction={this.handleToggleFilters}
                        handleSearchHome={() => this.handleSearchHome()}
                        handleChangeSearch={event => this.handleChangeSearch(event)}
                        mainSearchAction={() => this.props.store.companyStore.mainSearchAction()}
                        employersResultSearch={employersResultSearch}
                        handleChangeSearchEmployer={val => this.handleChangeSearchEmployer(val)}
                        handleSelectCompanyFromAutocomplete={company => this.handleSelectCompany(company)}
                        isAdvancedSearch={isAdvancedSearch}
                    />
                </div>

                {this.props.store.companyStore.showModal ? (
                    <div className="modal-save-search-overlay" />
                ) : null}
                {this.props.store.companyStore.showModal ? (
                    <div className="wrapper-modal-save-search">
                        {this.props.store.companyStore.isModalSaveQuery ? (
                            <ModalSaveSearch
                                errSaveQuery={errSaveQuery}
                                handleChangeSaveQueryName={text => this.handleChangeSaveQueryName(text)}
                                handleChangeSaveQueryDescription={text =>
                                    this.handleChangeSaveQueryDescription(text)
                                }
                                saveQueryName={saveQueryName}
                                saveQueryDescription={saveQueryDescription}
                                handleCloseModalSaveQuery={this.handleCloseModalSaveQuery}
                                saveQuery={() => this.props.store.companyStore.saveQuery()}
                            />
                        ) : (
                            <ModalSelectSavedQuery
                                savedQueries={savedQueries}
                                selectSaveQuery={el => this.props.store.companyStore.selectSaveQuery(el)}
                                handleCloseModalSaveQuery={this.handleCloseModalSaveQuery}
                            />
                        )}
                    </div>
                ) : null}

                {/* {isLoadingSearch ? (
                    <div className="wrapper-loading-search">
                        <div className="wrapper-preloader">
                            <div className="loader" />
                        </div>
                    </div>
                ) : (
                    <div className="container">
                        <CompanyTable
                            displayCompanyName={displayCompanyName}
                            displayIndustry={displayIndustry}
                            displayCountry={displayCountry}
                            displayAddress={displayAddress}
                            selectCompany={company => this.handleSelectCompany(company)}
                            companies={companies}
                        />
                    </div>
                )} */}
            </div>
        );
    }
}

export default SearchResults;
