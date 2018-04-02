import React, { Component } from "react";
import "./Employer.css";

import { inject, observer } from "mobx-react";
import routes from "../../router/routes";

import AddEmployerForm from "../../components/AddEmployerForm/AddEmployerForm";
import CreateEmployerForm from "../../components/CreateEmployerForm/CreateEmployerForm";

@inject("store")
@observer
class AddEmployer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            currentRoute: ""
        };
    }

    componentWillMount() {
        this.setCurrentRoute();
    }

    componentWillUpdate() {
        this.setCurrentRoute();
    }

    componentWillUnmount() {
        this.props.store.companyStore.employersResultSearch = [];
    }

    setCurrentRoute() {
        if (this.state.currentRoute !== this.props.store.router.currentView.path) {
            this.setState({ currentRoute: this.props.store.router.currentView.path });
        }
    }

    handleChangeSearchEmployer(val) {
        this.props.store.companyStore.employerVal = val;
        this.props.store.companyStore.searchCompanies();
    }

    render() {
        const route = this.props.store.commonStore.checkAuth() ? routes.employerCreate : routes.login;
        const { employersResultSearch, employerVal } = this.props.store.companyStore;

        return (
            <div className="container">
                <div className="wrapper-add-employer-view">
                    {this.state.currentRoute === "/add-employer" ? (
                        <AddEmployerForm
                            handleChangeSearchEmployer={val => this.handleChangeSearchEmployer(val)}
                            employersResultSearch={employersResultSearch}
                            employerVal={employerVal}
                            goToCreateEmployer={() => this.props.store.router.goTo(route)}
                            goToHome={() => this.props.store.router.goTo(routes.home)}
                        />
                    ) : (
                        <CreateEmployerForm />
                    )}
                </div>
            </div>
        );
    }
}
export default AddEmployer;
