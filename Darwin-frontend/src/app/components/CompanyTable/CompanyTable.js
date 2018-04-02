import React, { Component } from "react";
import "./CompanyTable.css";
import "./customTable.css";

// Import React Table
import ReactTable from "react-table";
import "react-table/react-table.css";
import 'semantic-ui-css/components/modal.min.css';
import {Modal} from 'semantic-ui-react'
import _ from 'lodash';

import { inject, observer } from "mobx-react";

import moment from "moment";

@inject("store")
@observer
class CompanyTable extends Component {
    constructor(props){
        super(props);
        
        this.state = {companiesArray:[
                                        {name: 'companyName', isShow: true, isDropDownShow: false},
                                        {name: 'registrationNumber', isShow: true, isDropDownShow: false},
                                        {name: 'registrationIncorporationDate', isShow: true, isDropDownShow: false},
                                        {name: 'addressBlock', isShow: true, isDropDownShow: false},
                                        {name: 'country', isShow: true, isDropDownShow: false},
                                        {name: 'companyType', isShow: true, isDropDownShow: false},
                                        {name: 'businessActivity', isShow: true, isDropDownShow: false}


                                    ], isModalOpen: false, data: [],page: 0, pages: 1, pageSize: 1, isUpdate: false, skipRows: 0};
        this.showDropDown = this.showDropDown.bind(this);
        this.showColumn = this.showColumn.bind(this);
        this.setDropDown = this.setDropDown.bind(this);
        this.hideColumn = this.hideColumn.bind(this);
        this.renderCompanies = this.renderCompanies.bind(this);
        this.fetchData = this.fetchData.bind(this);
    }

    showDropDown(columnName) {
       const column =  _.find( this.state.companiesArray, {name: columnName});
       return column.isDropDownShow;
    }
    showColumn(columnName) {
    
        const column =  _.find( this.state.companiesArray, {name: columnName});
        return column.isShow;
    }
    setDropDown(columnName) {
        let columns = {...this.state.companiesArray};
        let column =  _.find( columns, {name: columnName});
        column.isDropDownShow = !column.isDropDownShow;
        this.setState({companiesArray: columns});
    }
    hideColumn(columnName) {
        if (columnName === "companyName") {
            this.props.store.companyStore.displayCompanyName = !this.props.store.companyStore.displayCompanyName;
            let columns = {...this.state.companiesArray};
            let column =  _.find( columns, {name: columnName});
            column.isShow =  this.props.store.companyStore.displayCompanyName;
            this.setState({companiesArray: columns});

        }
        else if (columnName === "industry") {
            this.props.store.companyStore.displayIndustry = !this.props.store.companyStore.displayIndustry;
            let columns = {...this.state.companiesArray};
            let column =  _.find( columns, {name: columnName});
            column.isShow =  this.props.store.companyStore.displayIndustry;
            this.setState({companiesArray: columns});
        }
        else if (columnName === "addressBlock") {
            this.props.store.companyStore.displayAddress = !this.props.store.companyStore.displayAddress;
            let columns = {...this.state.companiesArray};
            let column =  _.find( columns, {name: columnName});
            column.isShow =  this.props.store.companyStore.displayAddress;
            this.setState({companiesArray: columns});
        }
        else if ( columnName === "country") {
            this.props.store.companyStore.displayCountry = !this.props.store.companyStore.displayCountry;
            let columns = {...this.state.companiesArray};
            let column =  _.find( columns, {name: columnName});
            column.isShow =  this.props.store.companyStore.displayCountry;
            this.setState({companiesArray: columns});
        }
        else if ( columnName === "companyType") {
            this.props.store.companyStore.displayCompanyType = !this.props.store.companyStore.displayCompanyType;
            let columns = {...this.state.companiesArray};
            let column =  _.find( columns, {name: columnName});
            column.isShow =  this.props.store.companyStore.displayCompanyType;
            this.setState({companiesArray: columns});
        }
        else if ( columnName === "businessActivity") {
            this.props.store.companyStore.displayBusinessActivity = !this.props.store.companyStore.displayBusinessActivity;
            let columns = {...this.state.companiesArray};
            let column =  _.find( columns, {name: columnName});
            column.isShow =  this.props.store.companyStore.displayBusinessActivity;
            this.setState({companiesArray: columns});
        }
        else {
            let columns = {...this.state.companiesArray};
            let column =  _.find( columns, {name: columnName});
            column.isShow = false;
            this.setState({companiesArray: columns});
        }
     
    }
    renderCompanies() {
        
        const {countCompanies} = this.props.store.companyStore;
        if (countCompanies) {
            return (
                <div className="wrapper-not-found-companies">
                    <h3 className="not-found-companies-title">{countCompanies} Companies Available</h3>
                </div>
            )
        }
        else {
            return (
                <div className="wrapper-not-found-companies">
                    <h3 className="not-found-companies-title">Company Not Found</h3>
                </div>
            )
        }
    }
    fetchData(state, instance) {
        const {companies} = this.props;
        const {data} = this.state;
        if (data.length === 0) {
            let data = companies;
            let pages = Math.ceil(companies.length / 10);
            let pageSize = 10;
            this.setState({data, pages, pageSize});
        }
        else if (state.page >=9 && (state.page === (state.pages - 1) || state.page === (state.pages - 2))) {
            let skipRows = this.state.skipRows + companies.length;
            if (skipRows <= this.props.store.companyStore.countCompanies) {
                let newPage = this.state.page + 1;
                this.setState({isUpdate : true,skipRows: skipRows,page: newPage}, () => this.props.store.companyStore.loadMoreData({skipRows,newPage}));
            }
           
        }
       
     
      
    }
    componentWillUpdate(nextProps, nextState) {
        
        if (this.state.isUpdate === true) {
            
            const {companies} = nextProps;
            if (companies && companies.length > 0 && this.state.data.length > 0) {
                let currentPages = this.state.pages;
                
                let pages = Math.ceil(nextProps.companies.length / this.state.pageSize);
                pages = currentPages + pages;
                let data = [...this.state.data, ...nextProps.companies];
                this.setState({data,pages,  isUpdate: false});
            }
        }
    }
    render() {
        const {companies,selectCompany} = this.props;
        const {isModalOpen} = this.state;
        const hrefStyle = { cursor: 'pointer' };
        const {data, pages, pageSize} = this.state;
        
        return (
            <div>
                {companies && companies.length  ? (
                    <div>
                        <div className="wrapper-advanced-search-btns wrapper-advanced-column-btn">
                            <button className="column-btn" onClick={() =>this.setState({isModalOpen:true})}> 
                            <span className="icon-cls">
                                <svg viewBox="0 0 24 24" style={{width:'1.40rem', marginTop:'5px'}}>
                                    <path d="M9,4V20H5V4H9M9,2H5A2,2,0,0,0,3,4V20a2,2,0,0,0,2,2H9a2,2,0,0,0,2-2V4A2,2,0,0,0,9,2Z"></path><path d="M19,4V20H15V4h4m0-2H15a2,2,0,0,0-2,2V20a2,2,0,0,0,2,2h4a2,2,0,0,0,2-2V4a2,2,0,0,0-2-2Z"></path><polygon points="9 14 5 14 5 16 9 16 9 14 9 14"></polygon><polygon points="19 14 15 14 15 16 19 16 19 14 19 14"></polygon><polygon points="9 8 5 8 5 10 9 10 9 8 9 8"></polygon><polygon points="19 8 15 8 15 10 19 10 19 8 19 8"></polygon>
                                </svg>
                            </span>
                            <span className="btn-text">
                                Columns
                            </span>
                            </button>
                        </div>
                        <ReactTable 
                            data={data}
                    
                            columns={[
                                {
                                    Header:() =><div>Company Name</div>,
                                    accessor: "fullName",
                                    Cell: props => <span   data-label="Company Name"  onClick={() => selectCompany(props)} style={{cursor:'pointer', color:'blue', textAlign:'left'}} className="table-column-name">{props.value} </span>,
                                    headerClassName: "header-class",
                                    show: this.showColumn('companyName')
                        
                                },
                                {
                                    Header:() =><div>Registration Number</div>,
                                    accessor: "registrationNumber",
                                    headerClassName: "header-class",
                                    show: this.showColumn('registrationNumber')
                                },
                                {
                                    Header:() =><div>Registration Incorporation Date</div>,
                                    accessor: "registrationIncorporationDate",
                                    headerClassName: "header-class",
                                    Cell: props => <span style={{textAlign:'center'}} className='number'>{moment(props.value).format("D MMM YYYY")}</span>,
                                    show: this.showColumn('registrationIncorporationDate')
                                },

                                // {
                                //     id: "industry",
                                //     Header:() =><div>Industry</div>,
                                //     headerClassName: "header-class",
                                //     accessor: d =>`${d.pUerDescribedActivity && d.pUerDescribedActivity.activityDescription ? d.pUerDescribedActivity.activityDescription : ""}`,
                                //     show: this.showColumn('industry')
                                // },

                                {
                                    id: "addressBlock",
                                    Header:() =><div>Address (Block / Street / Building Name)</div>,
                                    headerClassName: "header-class",
                                    accessor: d =>  `${d.addressBuilding ? (d.addressBuilding + ' ,') : ''}  ${d.addressBlock ? (d.addressBlock + ' ') : ''} ${d.addressStreet ? (d.addressStreet + ' ,') : ''} ${d.addressLevel ?  ('#' + d.addressLevel) : ''}${d.addressUnit ?  ("-" + d.addressUnit + ' , ') : ''}  ${d.postalCode ? (d.postalCode + ' ') : ''}  ${d.countryId ? d.countryId.countryName : ''}`,
                                    show: this.showColumn('addressBlock')
                                },
                                {
                                    id: "CompanyType",
                                    Header:() => <div>Company Type</div>,
                                    headerClassName: "header-class",
                                    accessor: d => `${d.entityT && d.entityT.entityDescription ? d.entityT.entityDescription : ""}`,
                                    show: this.showColumn('companyType')
                                },
                                {
                                    id: "BusinessActivity",
                                    Header:() => <div>Business Activity</div>,
                                    headerClassName: "header-class",
                                    accessor: "businessActivity",
                                    show: this.showColumn('businessActivity')
                                },
                                {
                                    id: "country",
                                    Header:() =><div>Country</div>,
                                    headerClassName: "header-class",
                                    accessor: d =>   `${d.countryId && d.countryId.countryName ? d.countryId.countryName : ""}`,
                                    show: this.showColumn('country')
                                }
                            
                                // {
                                //     Header:() =><div>Website</div>,
                                //     accessor:'website',
                                //     headerClassName: "header-class",
                                //     show: this.showColumn('website')
                                // }

                            ]}
                            pages={pages}
                            pageSize= {pageSize}
                            className="-striped -highlight"
                            
                            onFetchData={this.fetchData}
                            getTheadProps={(state, rowInfo, column, instance) => {
                                return {
                                onClick: (e, handleOriginal) => {
                                    console.log('A Td Element was clicked!')
                                    console.log('it produced this event:', e)
                                    console.log('It was in this column:', column)
                                    console.log('It was in this row:', rowInfo)
                                    console.log('It was in this table instance:', instance)
                                    instance.props.defaultSortMethod(null, null, true);
                                    if (handleOriginal) {
                                    handleOriginal()
                                    }
                                }
                                }
                            }}
                            onPageSizeChange={(pageSize, pageIndex) => {
                                let pages = Math.ceil(companies.length / pageSize);
                                this.setState({ pages, pageSize});
                            }}
                        />
                        <div>
                            {this.props.store.companyStore.countCompanies === this.state.data.length ?
                                <h3> {this.props.store.companyStore.countCompanies} companies found </h3>
                                :
                                <h3>{this.props.store.companyStore.countCompanies} companies found, displaying {this.state.data.length} only </h3>
                            }
                           
                        </div>
                        <Modal open={isModalOpen} closeOnDimmerClick={true} style={{ maxWidth: '30rem', left:'64%' }}>
                            <section className="modal-tabbeds">
                                <div className="modal-tabbeds__headers">
                                    <div className="modal-tabbeds__btns" style={{outline:'none'}}>
                                        <span id="tab1-description">Display List</span>
                                    </div>
                                    <a className="modal-tabbeds__close" id="js_modal-close"  onClick={() =>this.setState({isModalOpen:false})} style={hrefStyle}>close</a>
                                </div>
                                <ul className="unstyled-list" style={{display: 'flex', flexDirection:'column', margin:'0', justifyContent:'center',alignItems:'center'}}>
                                    <li>
                                    <div className="wrapper-dispay white-bottom">
                                    <div className="wrapper-display-checkbox">
                                        <label from="companyName">
                                            <input
                                                onChange={() =>this.hideColumn('companyName')}
                                                checked={this.props.store.companyStore.displayCompanyName}
                                                type="checkbox"
                                                id="companyName"
                                            />
                                            <span>Company Name</span>
                                        </label>

                                        <label from="industry">
                                            <input
                                                onChange={() =>this.hideColumn('industry')}
                                                checked={this.props.store.companyStore.displayIndustry}
                                                type="checkbox"
                                                id="industry"
                                            />
                                            <span>Industry</span>
                                        </label>
{/* 
                                        <label from="description">
                                            <input type="checkbox" id="description" />
                                            <span>Description</span>
                                        </label> */}
                                        <label from="businessActivity">
                                            <input
                                                onChange={() =>this.hideColumn('businessActivity')}
                                                checked={this.props.store.companyStore.displayBusinessActivity}
                                                type="checkbox"
                                                id="businessActivity"
                                            />
                                            <span>Business Activity</span>
                                        </label>
                                    </div>
                                    </div>
                                    </li>
                                    <li>
                                    <div className="wrapper-dispay white-bottom">
                                        <div className="wrapper-display-checkbox"> 
                                            <label from="country">
                                                    <input
                                                        onChange={() =>this.hideColumn('country')}
                                                        checked={this.props.store.companyStore.displayCountry}
                                                        type="checkbox"
                                                        id="country"
                                                    />
                                                    <span>Country</span>
                                            </label>

                                            <label from="companyType">
                                                <input 
                                                    type="checkbox" 
                                                    id="companyType"
                                                    onChange={() =>this.hideColumn('companyType')}
                                                    checked={this.props.store.companyStore.displayCompanyType}
                                                />
                                                <span>Company Type</span>
                                            </label>

                                            <label from="address">
                                                <input
                                                    onChange={() =>this.hideColumn('addressBlock')}
                                                    checked={this.props.store.companyStore.displayAddress}
                                                    type="checkbox"
                                                    id="address"
                                                />
                                                <span>Address</span>
                                            </label>
                                        </div>
                                    </div>
                                  
                                    </li>
                                </ul>
                            </section>
                        </Modal>
                    </div>

                )  : (
                    <div>
                         {this.renderCompanies()}
                    </div>
                   
                    
                )}
            </div>
        )
    }
}
export default CompanyTable;
