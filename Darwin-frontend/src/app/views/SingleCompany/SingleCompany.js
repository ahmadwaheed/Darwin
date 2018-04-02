import React, { Component } from "react";
import "./SingleCompany.css";

import { inject, observer } from "mobx-react";

import moment from "moment";
import $ from 'jquery';

import routes from "../../router/routes";
import OverviewCompany from "../../components/OverviewCompany/OverviewCompany";
import NewsByCompany from "../../components/NewsByCompany/NewsByCompany";

@inject("store")
@observer
class SingleCompany extends Component {
    handleChangeSection(sectionName) {
        const companyID = this.props.store.router.params.id;
        $('a.tabs').attr('aria-selected',false);
        $('a.'+sectionName).attr('aria-selected',true);

        if (sectionName === "overview") {
            this.props.store.companyStore.fetchCompany(companyID);
            this.props.store.router.goTo(routes.singleCompany, { id: companyID });
        } else if (sectionName === "news") {
            this.props.store.companyStore.fetchNewsByCompany(companyID);
            this.props.store.router.goTo(routes.singleCompanyNews, { id: companyID });
        }
        else if (sectionName === "competitoroverview") {
            this.props.store.router.goTo(routes.competitorOverview,{ id: companyID });
        }
        else if (sectionName === "keystaff") {
            this.props.store.router.goTo(routes.keyStaff, { id: companyID });
        }
    }

    render() {
        const {
            store: { companyStore: { selectCompany, newsByCompany }, router: { goTo } },
            currentRoute
        } = this.props;

        const renderOpenTab = () => {
            if (currentRoute === "/company/overview") {
                return selectCompany && Object.keys(selectCompany).length ? (
                    <OverviewCompany selectCompany={selectCompany} />
                ) : (
                    <div className="wrapper-notfound-company container">Company Not Found</div>
                );
            } else if (currentRoute === "/company/news") {
                return newsByCompany.length ? (
                    <NewsByCompany newsByCompany={newsByCompany} />
                ) : (
                    <div className="wrapper-notfound-company container">
                        Coming Soon
                    </div>
                );
            }
            else if (currentRoute === "/company/competitoroverview") {
                return (
                    <div className="wrapper-notfound-company container">
                        Coming Soon
                    </div>
                )

            }
            else if (currentRoute === "/company/keystaff") {
                return (
                    <div className="wrapper-notfound-company container">
                        Coming Soon
                    </div>
                )
            }

        };

        return (
            // <div className="wrapper-single-company-view">
            //     <div className="container container-wrapper flexbox">
            //         <aside className="aside">
            //             <div className="aside-title">
            //                 <span>Company info</span>
            //             </div>
            //             <ul className="nav-list">
            //                 <li className="nav-list__item">
            //                     <span
            //                         className={
            //                             currentRoute === "/company/overview"
            //                                 ? "nav-list__link active"
            //                                 : "nav-list__link"
            //                         }
            //                         onClick={() => this.handleChangeSection("overview")}
            //                     >
            //                         Overview
            //                     </span>
            //                 </li>
            //                 <li className="nav-list__item">
            //                     <span className="nav-list__link">Competitor Overview</span>
            //                 </li>
            //                 <li className="nav-list__item">
            //                     <span
            //                         className={
            //                             currentRoute === "/company/news"
            //                                 ? "nav-list__link active"
            //                                 : "nav-list__link"
            //                         }
            //                         onClick={() => this.handleChangeSection("news")}
            //                     >
            //                         News
            //                     </span>
            //                 </li>
            //                 <li className="nav-list__item">
            //                     <span className="nav-list__link">Key Staff</span>
            //                 </li>
            //             </ul>
            //         </aside>
            //         {renderOpenTab()}
            //     </div>
            // </div>
            <main>
                <div className="container wrapper-single-company-view">
                    <section className="modal-tabbed modal-tabbed--transparent modal-tabbed--standalone">
                        <h2 className="h2--large h2--my-profile">Company Info</h2>
                        <section>
                            <div className="modal-tabbed__header">
                                <a className="modal-tabbed__btn tabs overview" role="tab"  aria-selected="true" aria-controls="tab1-content" tabIndex="0"  onClick={() => this.handleChangeSection("overview")}>
                                    <svg className="modal-tabbed__ico" width="20" height="20" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M10 13.6c2 0 3.7-1.6 3.7-3.6S12.1 6.4 10 6.4C8 6.4 6.3 8 6.3 10S8 13.6 10 13.6zM8.2 19c-.3 0-.5-.1-.5-.5l-.3-2.2-.1-.1a38.3 38.3 0 0 1-1.7-.8l-2 .9c-.3.1-.5 0-.6-.3l-1.8-3-.1-.2c-.1-.2 0-.4.1-.6a167.8 167.8 0 0 1 2-1.5V9.5c0-.3 0-.5-.3-.6L1 7.6c-.1 0-.1-.2 0-.4l.1-.3 1.7-3c.2-.2.4-.3.7-.2l2 .8h.2l1.4-.7c.2 0 .2-.1.2-.3l.3-2c0-.4.2-.5.5-.5h3.6c.4 0 .5.1.5.5l.3 2.2.1.1 1.5.8h.2l2-.8c.3-.2.5-.2.7.2l1.8 3c.2.4.1.6-.2.8L17 9l-.1.2v1.3c0 .3 0 .4.2.6l1.6 1.2c.3.2.3.4.2.7L17 16c-.2.3-.4.4-.7.3a214.7 214.7 0 0 1-2.3-.9l-1.3.7-.2.3-.3 2.2c0 .3-.1.4-.5.4H8.2z"
                                        stroke="#0D2C54" fill="none" fillRule="evenodd"/>
                                    </svg>

                                    <span id="tab1-description">Overview</span>
                                </a>
                                <a className="modal-tabbed__btn tabs competitoroverview" role="tab"  aria-selected="false" aria-controls="tab1-content" tabIndex="0"  onClick={() => this.handleChangeSection("competitoroverview")}>
                                    <svg className="modal-tabbed__ico" width="20" height="20" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M10 13.6c2 0 3.7-1.6 3.7-3.6S12.1 6.4 10 6.4C8 6.4 6.3 8 6.3 10S8 13.6 10 13.6zM8.2 19c-.3 0-.5-.1-.5-.5l-.3-2.2-.1-.1a38.3 38.3 0 0 1-1.7-.8l-2 .9c-.3.1-.5 0-.6-.3l-1.8-3-.1-.2c-.1-.2 0-.4.1-.6a167.8 167.8 0 0 1 2-1.5V9.5c0-.3 0-.5-.3-.6L1 7.6c-.1 0-.1-.2 0-.4l.1-.3 1.7-3c.2-.2.4-.3.7-.2l2 .8h.2l1.4-.7c.2 0 .2-.1.2-.3l.3-2c0-.4.2-.5.5-.5h3.6c.4 0 .5.1.5.5l.3 2.2.1.1 1.5.8h.2l2-.8c.3-.2.5-.2.7.2l1.8 3c.2.4.1.6-.2.8L17 9l-.1.2v1.3c0 .3 0 .4.2.6l1.6 1.2c.3.2.3.4.2.7L17 16c-.2.3-.4.4-.7.3a214.7 214.7 0 0 1-2.3-.9l-1.3.7-.2.3-.3 2.2c0 .3-.1.4-.5.4H8.2z"
                                        stroke="#0D2C54" fill="none" fillRule="evenodd"/>
                                    </svg>

                                    <span id="tab1-description">Competitor Overview</span>
                                </a>
                                <a className="modal-tabbed__btn tabs news" role="tab"  aria-selected="false" aria-controls="tab4-content" tabIndex="0"  onClick={() => this.handleChangeSection("news")}>
                                    <svg className="modal-tabbed__ico" width="21" height="17" xmlns="http://www.w3.org/2000/svg">
                                        <g stroke="#0D2C54" fill="none" fillRule="evenodd">
                                            <rect x="11.5" y="9.5" width="8" height="6" rx="1"/>
                                            <rect x=".5" y="9.5" width="8" height="6" rx="1"/>
                                            <rect x="11.5" y=".5" width="8" height="6" rx="1"/>
                                            <rect x=".5" y=".5" width="8" height="6" rx="1"/>
                                        </g>
                                    </svg>
                                    <span id="tab4-description">News</span>
                                </a>
                                <a className="modal-tabbed__btn tabs keystaff" role="tab" aria-selected="false" aria-controls="tab3-content" tabIndex="0"  onClick={() => this.handleChangeSection("keystaff")}>
                                    <svg className="modal-tabbed__ico" width="22" height="20" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M4.6 18.8c-.7 0-1.5-.2-2.2-.4l-1-.6c-.3-.3-.4-.6-.4-1V16c0-.3.2-.5.4-.7.4-.5.9-.9 1.4-1.2.7-.5 1.5-.8 2.3-1.1l.4-.3c.3-.5.4-1 .2-1.5v-.1c-1-1-1.5-2.2-1.7-3.5-.1-.9 0-1.7.3-2.5.5-1 1.3-1.7 2.4-1.9 1.1-.2 2.2 0 3.1.7.6.5 1 1.2 1.1 2 .3 1 .1 2-.2 3-.3.7-.8 1.5-1.4 2.1v.2c-.2.4-.2.8 0 1.2 0 .2 0 .3.2.4l.2.1c1 .4 1.9.8 2.7 1.3l1.1 1c.3.3.5.7.5 1.2l-.1.7c0 .3-.4.6-.7.8-.4.3-.9.4-1.3.6l-2 .3-2.4.1c-1 0-2 0-2.9-.2zm7.3-16a3 3 0 0 1 2.3-1.7c.7-.2 1.4 0 2.1.3a3 3 0 0 1 1.5 1.8c.2 1 .2 1.8 0 2.7-.2 1-.7 1.8-1.3 2.6l-.2.4v.6l.4.3c.8.2 1.5.6 2.3 1l1.4 1c.2.3.4.6.4 1v.8c0 .3-.2.6-.5.8-.4.3-.9.4-1.3.6a11.3 11.3 0 0 1-2.7.3" stroke="#0D2C54" fill="none" fillRule="evenodd" opacity=".8"/>
                                    </svg>
                                    <span id="tab3-description">Key Staff</span>
                                </a>
                            </div>
                            <div className="modal-tabbed__tabs-wrap">
                                <ul className="modal-tabbed__tabs scrollbar" style={{backgroundColor: '#fff'}}>
                                    <li id="general-content" className="modal-tabbed__tab contents" role="tabpanel" aria-labelledby="tab1-description"  aria-hidden="false" style={{display:'block'}}>
                                        {renderOpenTab()}
                                    </li>
                            
                                </ul>
                            </div>
                        </section>
                    </section>
                </div>
            </main>
            
        );
    }
}

export default SingleCompany;
