import React, { Component } from "react";
import "./Header.css";

import { observer, inject } from "mobx-react";
// import Select from 'react-select-plus';
// import "react-select-plus/dist/react-select-plus.css";

import routes from "../../router/routes";

@inject("store")
@observer
class Header extends Component {
    constructor(props) {
        super(props);
        this.state = { selectedOption: '', isDisplaySearch: false,isDropDownShow: false };
    }
    logout() {
        this.props.store.userStore.logout();
        this.props.store.router.goTo(routes.home);
        // this.forceUpdate();
    }
    handleChange = (selectedOption) => {
        if (selectedOption) {
        this.setState({ selectedOption });
        const withAllValue = JSON.parse(selectedOption.query).withAll[0];
        this.props.store.companyStore.mainSearchValue = withAllValue;
        this.props.store.companyStore.updateWithAllItems(withAllValue);
        this.props.store.companyStore.isAdvancedSearch = true;
        this.props.store.router.goTo(routes.searchResults);
        this.props.store.companyStore.mainSearchAction();
        console.log(`Selected: ${selectedOption.label}`);
        }
        
    }

    renderHeaderMenu() {
        if (this.props.store.userStore.isAuth) {
            const user = JSON.parse(this.props.store.userStore.userData);
            const {savedQueries} = this.props.store.companyStore;
            const { selectedOption,isDisplaySearch,isDropDownShow } = this.state;
            const value = selectedOption && selectedOption.value;
              
              
            return (
                <div className="header-user-menu">
                    <button className="username" >{`${user.firstName} ${user.lastName}`}</button>
                    <div className="wrapper-dropdown">
                        {/* <Select
                            style={{marginBottom: '10px'}}
                            name="form-field-name"
                            value={value}
                            onChange={this.handleChange}
                            options={savedQueries}
                        /> */}
                        {/* <p onMouseOver= {() => this.setState({isDisplaySearch: true})} style={{cursor:'pointer'}}>
                            Saved Searches ->
                        </p>
                        {isDisplaySearch ?
                            <div style={{display:'flex', flexDirection:'column'}}  onMouseLeave= {() => this.setState({isDisplaySearch: false})} >
                                {savedQueries.map((selectedQuery,i) => {
                                    return <a style={{ cursor:'pointer'}}  onMouseDown={() => this.handleChange(selectedQuery)}>{selectedQuery.label}</a>
                                })}
                            </div>
                            :
                            null
                        } */}
                       
                        
                        <p onClick={() => this.logout()} className="logout-btn">
                            Logout
                        </p>
                    </div>
                </div>
            );
        }
        return (
            <nav className="header-nav">
                <p
                    onClick={() => this.props.store.router.goTo(routes.signup)}
                    className="header-links signup-link"
                >
                    Sign Up
                </p>
                <p
                    onClick={() => this.props.store.router.goTo(routes.login)}
                    className="header-links login-link"
                >
                    Login
                </p>
            </nav>
        );
    }

    render() {
        return (
            <div className="wrapper-header-component">
                <div className="wrapper-header">
                    <div className="wrapper-header-logo">
                        {/* <h2 onClick={() => this.props.store.router.goTo(routes.home)} className="logo-title">
                            NGJ
                        </h2> */}
                        <img src={require("../../../assets/images/icons/logo.png")} alt="NGJ"  id="logongj" onClick={() => this.props.store.router.goTo(routes.home)} className="logo-title"/>
                    </div>
                    <div className="wrapper-header-nav">{this.renderHeaderMenu()}</div>
                </div>
            </div>
        );
    }
}
export default Header;
