import React, { Component } from "react";
import "./Home.css";

import ModalSaveSearch from "../../components/ModalSaveSearch/ModalSaveSearch";
import ModalSelectSavedQuery from "../../components/ModalSelectSavedQuery/ModalSelectSavedQuery";
import SearchForm from "../../components/SearchForm/SearchForm";

import routes from "../../router/routes";

import { inject, observer } from "mobx-react";

@inject("store")
@observer
class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            toggleFilters: false
        };
    }

    componentDidMount() {
        this.props.store.companyStore.getCountAllCompany();
        this.props.store.companyStore.fetchSavedQueries();
    }

    componentWillUnmount() {
        this.props.store.companyStore.employersResultSearch = [];
    }

    toggleFilters = () => {
        this.props.store.companyStore.isAdvancedSearch = true;
        this.props.store.router.goTo(routes.searchResults);
        this.props.store.companyStore.getCountAllCompany();
    };

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
        this.props.store.companyStore.homeSearchValue = val;
    }

    handleSelectCompanyFromAutocomplete(company) {
        this.props.store.companyStore.fetchCompany(company.id);
        this.props.store.router.goTo(routes.singleCompany, { id: company.id });
    }
    handleToggleFilters = () => {
        this.props.store.companyStore.isAdvancedSearch = true;
        this.props.store.router.goTo(routes.searchResults);
    };
    handleSearchHome = () => {
        debugger;
        const {mainSearchValue,homeSearchValue, employersResultSearch} = this.props.store.companyStore;
        if (employersResultSearch.length === 1) {
        
                let company = employersResultSearch[0];
                this.props.store.companyStore.fetchCompany(company.id);
                this.props.store.router.goTo(routes.singleCompany, { id: company.id });
        
        }
        else {
            this.props.store.companyStore.mainSearchValue = homeSearchValue;
            this.props.store.companyStore.updateWithAllItems(mainSearchValue);
            this.handleToggleFilters();
            this.props.store.companyStore.mainSearchAction();
            this.props.store.companyStore.homeSearchValue = '';
        }
       
    }

    render() {
        const { toggleFilters } = this.state;
        const {
            mainSearchValue,
            homeSearchValue,
            mainSearchError,
            saveQueryName,
            saveQueryDescription,
            errSaveQuery,
            savedQueries,
            employersResultSearch,
            isAdvancedSearch
        } = this.props.store.companyStore;

        return (
            <div className="wrapper-home-view">
                <div className="wrapper-top-section">
                    <div className="wrapper-home">
                        <SearchForm
                            mainSearchValue={mainSearchValue}
                            homeSearchValue={homeSearchValue}
                            mainSearchError={mainSearchError}
                            handleSearchHome={() => this.handleSearchHome()}
                            toggleFilters={toggleFilters}
                            toggleFiltersAction={this.toggleFilters}
                            handleChangeSearch={event => this.handleChangeSearch(event)}
                            mainSearchAction={() => this.props.store.companyStore.mainSearchAction()}
                            employersResultSearch={employersResultSearch}
                            handleChangeSearchEmployer={val => this.handleChangeSearchEmployer(val)}
                            handleSelectCompanyFromAutocomplete={company =>
                                this.handleSelectCompanyFromAutocomplete(company)
                            }
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
                </div>
                <div className="wrapper-about-us-section">
                    <h3 className="title-about-us">About Darwin11</h3>
                    <div className="wrapper-content-about-us">
                        <p className="about-us-text">
                            Darwin11 started as a platform for users to search, filter and profile companies
                            based in Singapore.<br />
                            <br />
                            Make no mistake, it is not intended to be a business directory, we have
                            bigger plans.<br />
                            <br /> In this fast-changing world, we believe that businesses need to *evolve* in
                            order to survive. Survival is the first step, aspiring businesses aim to thrive,
                            in order to thrive, businesses must *innovate*.<br />
                            <br /> DarwIN 11 would continue to evolve and innovate. Eventually, it would
                            become an Asia-focused business intelligence platform that drives key business
                            decisions.<br />
                            <br />
                            Till then, we seek your patience and hope the current state of the platform
                            continues to deliver value. There will be more to come, watch this space.
                        </p>
                    </div>
                </div>
            </div>
        );
    }
}

export default Home;
