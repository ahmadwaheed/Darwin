import React, { Component } from "react";
import "./Filters.css";

import { inject, observer } from "mobx-react";

import Autocomplete from "react-autocomplete";

import routes from "../../router/routes";

import $ from 'jquery';

import _ from 'lodash';

import IndustryTree from "../../components/IndustryTree/IndustryTree";
import CompanyTable from "../CompanyTable/CompanyTable";
import FilterModal from "./filter_modal";
let filterObj;

@inject("store")
@observer
class Filters extends Component {
    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
        this.onFilterSlider = this.onFilterSlider.bind(this);
        this.handleSelectCompany = this.handleSelectCompany.bind(this);
        this.removeTag = this.removeTag.bind(this);
        this.removeTagByKey = this.removeTagByKey.bind(this);
        this.addTag = this.addTag.bind(this);
        this.addFilter = this.addFilter.bind(this);
        this.selectStoreProperty = this.selectStoreProperty.bind(this);
        this.selectStoreFilterProperty = this.selectStoreFilterProperty.bind(this);
        this.selectedTag = this.selectedTag.bind(this);
        this.handleChangeSearchEmployer = this.handleChangeSearchEmployer.bind(this);
        filterObj = this;
        this.state = {
            activeTab: "keyword", withAllTags: [], withAnyTags: [], withOutTags: [],
            filterGroup: [{
                    type: "Keywords",
                    filters: [
                    {text: 'With all this words',filterType: 'withAll', placeholder: 'e.g renewable'}
                    ]
                },
                {
                    type: "Location",
                    filters: []
                },
                {
                    type: "Status",
                    filters: []
                },
                {
                    type: "IndustryNew",
                    filters: []
                },
                {
                    type:"CompanyType",
                    filters: []
                }
            ],
            isOpenModal: false
        };
    }

    onFilterSlider() {
        $("#Filter_slide").toggleClass("open")
        $(".filter_btn").toggleClass("active")
    }
   
    handleChange(tags) {
        this.setState({tags})
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
    
    selectedTag(filterType) {
        if (filterType === "withAll") {
            return this.state.withAllTags;
        }
        else if (filterType === "withAny") {
            return this.state.withAnyTags;
        }
        else if (filterType === "withOut") {
            return this.state.withOutTags;
        }
    }
    removeTag(item, filterType) {
        if (filterType === "withAll") {
            var array = this.state.withAllTags;
            var index = array.indexOf(item)
            array.splice(index, 1);
            this.setState({withAllTags: array }, () => this.props.store.companyStore.withAll.remove(item));
        }
        else if (filterType === "withAny") {
            var array = this.state.withAnyTags;
            var index = array.indexOf(item)
            array.splice(index, 1);
            this.setState({withAnyTags: array }, () => this.props.store.companyStore.withAny.remove(item));
        }
        else if (filterType === "withOut") {
            var array = this.state.withOutTags;
            var index = array.indexOf(item)
            array.splice(index, 1);
            this.setState({withOutTags: array }, () => this.props.store.companyStore.without.remove(item));

        }
    }
    
    removeTagByKey(filterType) {
        
    
        if (filterType === "withAll") { 
        
            var array = [...this.state.withAllTags];
            if ( array.length  === 1 ) {
                this.setState({withAllTags: []}, () => this.props.store.companyStore.withAll.remove(this.props.store.companyStore.withAll[this.props.store.companyStore.withAll.length - 1]));
            }
            else if (array.length > 1) {
                let index = array.length - 1;
                array.splice(index, 1);
                this.setState({withAllTags: array }, () => this.props.store.companyStore.withAll.remove(this.props.store.companyStore.withAll[this.props.store.companyStore.withAll.length - 1]));
            }
           
        }
        else if (filterType === "withAny") {
            var array = [...this.state.withAnyTags];
            if ( array.length  === 1 ) {
                this.setState({withAnyTags: []}, () => this.props.store.companyStore.withAny.remove(this.props.store.companyStore.withAny[this.props.store.companyStore.withAny.length - 1]));
            }
            else if (array.length > 1) {
                let index = array.length - 1;
                array.splice(index, 1);
                this.setState({withAnyTags: array }, () => this.props.store.companyStore.withAny.remove(this.props.store.companyStore.withAny[this.props.store.companyStore.withAny.length - 1]));
            }
        }
        else if ( filterType === "withOut") {
            var array = [...this.state.withOutTags];
            if ( array.length  === 1 ) {
                this.setState({withOutTags: []}, () => this.props.store.companyStore.without.remove(this.props.store.companyStore.without[this.props.store.companyStore.without.length - 1]));
            }
            else if (array.length > 1) {
                let index = array.length - 1;
                array.splice(index, 1);
                this.setState({withOutTags: array }, () => this.props.store.companyStore.without.remove(this.props.store.companyStore.without[this.props.store.companyStore.without.length - 1]));
            }
        }
        
    }
    addTag(e, filterType) {
        
        if (e.key === "Backspace" || e.key === "Delete") {
            this.removeTagByKey(filterType);
        }
        else   if (e.key === " " || e.key === "Enter") {        
            if (filterType === "withAll") {
                if (this.state.withAllTags.length < 3) {
                    let str = e.target.value;
            
                    if (str.charAt(0) == " ") {
                        str = str.slice(1);
                    }
                    if (str.charAt(0) == "'" ) {
                        if (str.charAt(0) == "'" && str.charAt(str.length-1) == "'") {
                            var res = str.slice(1, str.length-1);
                            this.setState({ withAllTags: [...this.state.withAllTags, res] }, () => this.props.store.companyStore.updateWithAllItems(res));
                            e.target.value = "";
                         }
                    }
                    else {
                        this.setState({ withAllTags: [...this.state.withAllTags, str] }, () =>this.props.store.companyStore.updateWithAllItems(str));
                        e.target.value = "";
                    }
                } 
            }
            else if (filterType === "withAny"){
                if (this.state.withAnyTags.length < 3) {
                    let str = e.target.value;
                
                    if (str.charAt(0) == " ") {
                        str = str.slice(1);
                    
                    }
                    if (str.charAt(0) == "'" ) {
                        if (str.charAt(0) == "'" && str.charAt(str.length-1) == "'") {
                            var res = str.slice(1, str.length-1);
                            this.setState({ withAnyTags: [...this.state.withAnyTags, res] }, () => this.props.store.companyStore.updateWithAnyItems(res));
                            e.target.value = "";
                         }
                    }
                    else {
                        this.setState({ withAnyTags: [...this.state.withAnyTags, str] }, () =>this.props.store.companyStore.updateWithAnyItems(str));
                        e.target.value = "";
                    }
                }
        
            }
            else  if (filterType === "withOut"){
                if (this.state.withOutTags.length < 3) {
                    let str = e.target.value;
                
                    if (str.charAt(0) == " ") {
                        str = str.slice(1);
                    
                    }
                    if (str.charAt(0) == "'" ) {
                        if (str.charAt(0) == "'" && str.charAt(str.length-1) == "'") {
                            var res = str.slice(1, str.length-1);
                            this.setState({ withOutTags: [...this.state.withOutTags, res] }, () => this.props.store.companyStore.updateWithOutItems(res));
                            e.target.value = "";
                         }
                    }
                    else {
                        this.setState({ withOutTags: [...this.state.withOutTags, str] }, () =>this.props.store.companyStore.updateWithOutItems(str));
                        e.target.value = "";
                    }
                }
       
            }
            // else if (e.key === "Enter") {
            //     this.props.store.companyStore.searchAction();
            // }
        }

    }
 

    componentWillMount() {
        this.props.store.companyStore.fetchSectionsindustryTree();
    }

    componentWillUnmount() {
        this.props.store.companyStore.isAdvancedSearch = false;
    }

    handleChangeCheckbox = event => {
        const id = event.target.id;
        this.props.store.companyStore[id] = !this.props.store.companyStore[id];
    };

    handleChangeShowStatus = () => {
        this.props.store.companyStore.showModal = true;
        this.props.store.companyStore.isModalSaveQuery = true;
    };

    handleShowModalSelectedSavedQueries() {
        this.props.store.companyStore.fetchSavedQueries();
        this.props.store.companyStore.showModal = true;
        this.props.store.companyStore.isModalSaveQuery = false;
    }

    handleChangeActiveTab(newActiveTab) {
        this.setState({ activeTab: newActiveTab });
    }

    handleChangeIndustryAutocompleteVal(val) {
        this.props.store.companyStore.industryAutocompleteVal = val;
        this.props.store.companyStore.indusrtyAutocompleteSearch();
    }

    handleSelectIndustryAutocompleteVal(industry) {
        let alreadyAdded = false;
        for (const industryFromSelected of this.props.store.companyStore.selectedIndustryVal) {
            if (industryFromSelected.activityDescription === industry.activityDescription) {
                alreadyAdded = true;
            }
        }
        console.log(industry);

        if (!alreadyAdded) {
            this.props.store.companyStore.selectNodeFromIndustryTree(null, null, null, null, false, industry);
        }
    }

    removeSelectedItemIndustry(i, el) {
        this.props.store.companyStore.selectedIndustryVal.splice(i, 1);
        this.props.store.companyStore.removeItemFromRequestQuery(el);
    }

    handleChangeLocationAutocompleteVal(val) {
        this.props.store.companyStore.locationAutocompleteVal = val;
        this.props.store.companyStore.locationAutocompleteSearch();
    }

    handleSelectLocationAutocompleteVal(location) {
        let alreadyAdded = false;
        for (const locationFromSelected of this.props.store.companyStore.selectedLocationVal) {
            if (locationFromSelected.countryName === location.countryName) {
                alreadyAdded = true;
            }
        }

        if (!alreadyAdded) {
            this.props.store.companyStore.selectedLocationVal.push(location);
        }
    }

    removeSelectedItemLocation(i) {
        this.props.store.companyStore.selectedLocationVal.splice(i, 1);
    }

    openChildren(index, parentIndex, currentLvl, path) {
        this.props.store.companyStore.fetchIndustryTreeNode(path, index, currentLvl, () =>
            this.forceUpdate()
        );
    }

    checkNode(index, parentIndex, currentLvl, path) {
        this.props.store.companyStore.selectNodeFromIndustryTree(
            path,
            index,
            currentLvl,
            () => this.forceUpdate(),
            true
        );
    }
    addFilter(filter) {
        this.setState({isOpenModal: false});
        let filterItem =  _.find(this.state.filterGroup, {type: filter.type});
        if (filter.type === "Keywords") {
            if (filter.filterType === "withAny") {
                let copyFilterItem = {...filterItem};
                let itemToPush = {
                    text: 'With any of these words',filterType: 'withAny', placeholder: 'e.g warren'
                }
                copyFilterItem.filters.push(itemToPush);
                this.state.filterGroup.map( (item, index) => {
                if (item.type !== "Keywords") {
                    // This isn't the item we care about - keep it as-is
                    return item;
                }
        
                // Otherwise, this is the one we want - return an updated value
                return {
                    ...item,
                    ...copyFilterItem
                };    
                });



            }
            else if (filter.filterType === "withOut") {
            
                let copyFilterItem = {...filterItem};
                let itemToPush = {
                 text: 'AND without the words',filterType: 'withOut', placeholder: 'e.g chicago'
                }
                copyFilterItem.filters.push(itemToPush);
                this.state.filterGroup.map( (item, index) => {
                    if (item.type !== "Keywords") {
                        // This isn't the item we care about - keep it as-is
                        return item;
                    }
            
                    // Otherwise, this is the one we want - return an updated value
                    return {
                        ...item,
                        ...copyFilterItem
                    };    
                });
            
            }
        }
        else if (filter.type === "Location") {
            if (filter.filterType === "Region") {
                let copyFilterItem = {...filterItem};
                let itemToPush = {
                    text: 'Region',filterType: 'Region'
                }
                copyFilterItem.filters.push(itemToPush);
                this.state.filterGroup.map( (item, index) => {
                if (item.type !== "Location") {
                    // This isn't the item we care about - keep it as-is
                    return item;
                }
        
                // Otherwise, this is the one we want - return an updated value
                return {
                    ...item,
                    ...copyFilterItem
                };    
                });
            }
        }
        else if (filter.type === "Status") {
            if (filter.filterType === "Listed") {
                let copyFilterItem = {...filterItem};
                let itemToPush = {
                    text: 'Listed',filterType: 'Listed', name: 'listed'
                }
                copyFilterItem.filters.push(itemToPush);
                this.state.filterGroup.map( (item, index) => {
                if (item.type !== "Status") {
                    return item;
                }
        
                return {
                    ...item,
                    ...copyFilterItem
                };    
                });
            }
            else if (filter.filterType === "Private") {
                let copyFilterItem = {...filterItem};
                let itemToPush = {
                    text: 'Private',filterType: 'Private', name: 'privateInp'
                }
                copyFilterItem.filters.push(itemToPush);
                this.state.filterGroup.map( (item, index) => {
                if (item.type !== "Status") {
                    return item;
                }
        
                return {
                    ...item,
                    ...copyFilterItem
                };    
                });
            }
            else if (filter.filterType === "companyName") {
                let copyFilterItem = {...filterItem};
                let itemToPush = {
                    text: 'Company Name',filterType: 'companyName', name: 'companyName'
                }
                copyFilterItem.filters.push(itemToPush);
                this.state.filterGroup.map( (item, index) => {
                if (item.type !== "Status") {
                    return item;
                }
        
                return {
                    ...item,
                    ...copyFilterItem
                };    
                });
            }
            else if (filter.filterType === "industry") {
                let copyFilterItem = {...filterItem};
                let itemToPush = {
                    text: 'Industry',filterType: 'industry', name: 'industry'
                }
                copyFilterItem.filters.push(itemToPush);
                this.state.filterGroup.map( (item, index) => {
                if (item.type !== "Status") {
                    return item;
                }
        
                return {
                    ...item,
                    ...copyFilterItem
                };    
                });
            }
            else if (filter.filterType === "country") {
                let copyFilterItem = {...filterItem};
                let itemToPush = {
                    text: 'Country',filterType: 'country', name: 'country'
                }
                copyFilterItem.filters.push(itemToPush);
                this.state.filterGroup.map( (item, index) => {
                if (item.type !== "Status") {
                    return item;
                }
        
                return {
                    ...item,
                    ...copyFilterItem
                };    
                });
            }
            else if (filter.filterType === "address") {
                let copyFilterItem = {...filterItem};
                let itemToPush = {
                    text: 'Address',filterType: 'address', name: 'address'
                }
                copyFilterItem.filters.push(itemToPush);
                this.state.filterGroup.map( (item, index) => {
                if (item.type !== "Status") {
                    return item;
                }
        
                return {
                    ...item,
                    ...copyFilterItem
                };    
                });
            }
        
        }
        else if ( filter.type === "CompanyType") {
            
            if (filter.filterType === "Public Limited Company") {
                let copyFilterItem = {...filterItem};
                let itemToPush = {
                    text: 'Public Limited Company',filterType: 'Public Limited Company', name: 'Public Limited Company'
                }
                copyFilterItem.filters.push(itemToPush);
                this.state.filterGroup.map( (item, index) => {
                if (item.type !== "Public Limited Company") {
                    return item;
                }
        
                return {
                    ...item,
                    ...copyFilterItem
                };    
                });
                this.props.store.companyStore.updateFiltersCompanyType("Public Limited Company");
            }
            else if (filter.filterType === "Private Limited Company") {
                
                    let copyFilterItem = {...filterItem};
                    let itemToPush = {
                        text: 'Private Limited Company',filterType: 'Private Limited Company', name: 'Private Limited Company'
                    }
                    copyFilterItem.filters.push(itemToPush);
                    this.state.filterGroup.map( (item, index) => {
                    if (item.type !== "Private Limited Company") {
                        return item;
                    }
            
                    return {
                        ...item,
                        ...copyFilterItem
                    };    
                    });
                    this.props.store.companyStore.updateFiltersCompanyType("Private Limited Company");

            }
            else if (filter.filterType === "Exempt Private Limited Company") {
                    let copyFilterItem = {...filterItem};
                    let itemToPush = {
                        text: 'Exempt Private Limited Company',filterType: 'Exempt Private Limited Company', name: 'Exempt Private Limited Company'
                    }
                    copyFilterItem.filters.push(itemToPush);
                    this.state.filterGroup.map( (item, index) => {
                    if (item.type !== "Exempt Private Limited Company") {
                        return item;
                    }
            
                    return {
                        ...item,
                        ...copyFilterItem
                    };    
                    });
                    this.props.store.companyStore.updateFiltersCompanyType("Exempt Private Limited Company");

            }
            else if (filter.filterType === "Deregistered") {
                    let copyFilterItem = {...filterItem};
                    let itemToPush = {
                        text: 'Deregistered',filterType: 'Deregistered', name: 'Deregistered'
                    }
                    copyFilterItem.filters.push(itemToPush);
                    this.state.filterGroup.map( (item, index) => {
                    if (item.type !== "Deregistered") {
                        return item;
                    }
            
                    return {
                        ...item,
                        ...copyFilterItem
                    };    
                    });
                    this.props.store.companyStore.updateFiltersCompanyType("Deregistered");

            }
            else if (filter.filterType === "Other Entity Type") {
                    let copyFilterItem = {...filterItem};
                    let itemToPush = {
                        text: 'Other Entity Type',filterType: 'Other Entity Type', name: 'Other Entity Type'
                    }
                    copyFilterItem.filters.push(itemToPush);
                    this.state.filterGroup.map( (item, index) => {
                    if (item.type !== "Other Entity Type") {
                        return item;
                    }
            
                    return {
                        ...item,
                        ...copyFilterItem
                    };    
                    });
                    this.props.store.companyStore.updateFiltersCompanyType("Other Entity Type");

            }
        }
        else if (filter.type === "IndustryNew") {
            if (filter.filterType === "IndustryNew") {
            
                let copyFilterItem = {...filterItem};
                let itemToPush = {
                    text: 'Industry',filterType: 'IndustryNew', name: 'Industry'
                }
                copyFilterItem.filters.push(itemToPush);
                this.state.filterGroup.map( (item, index) => {
                if (item.type !== "IndustryNew") {
                    return item;
                }
        
                return {
                    ...item,
                    ...copyFilterItem
                };    
                });
            }
        }
    
    }
    selectStoreProperty(filterName) {
        if (filterName === "companyName") {
            return   this.props.store.companyStore.displayCompanyName
        }
      
    }
    selectStoreFilterProperty(filterType) {
        if (filterType === "Public Limited Company") {
            return this.props.store.companyStore.displayPublicCompany;
        }
        else if (filterType === "Private Limited Company") {
            return this.props.store.companyStore.displayPrivateCompany;
        }
        else if (filterType === "Exempt Private Limited Company") {
            return this.props.store.companyStore.displayExemptPrivateCompany;
        }
        else if (filterType === "Other Entity Type") {
            return this.props.store.companyStore.displayOtherEntityType;
        }
        else if (filterType === "Deregistered") {
            return this.props.store.companyStore.displayDeregisteredCompany;
        }
    }
    changeCompanyFiltersCheckbox = (filterType) => {
        if (filterType === "Public Limited Company") {
            this.props.store.companyStore.displayPublicCompany = !this.props.store.companyStore.displayPublicCompany;
        }
        else if (filterType === "Private Limited Company") {
            this.props.store.companyStore.displayPrivateCompany = !this.props.store.companyStore.displayPrivateCompany;
        }
        else if (filterType === "Exempt Private Limited Company") {
            this.props.store.companyStore.displayExemptPrivateCompany = !this.props.store.companyStore.displayExemptPrivateCompany;
        }
        else if (filterType === "Other Entity Type") {
            this.props.store.companyStore.displayOtherEntityType = !this.props.store.companyStore.displayOtherEntityType;
        }
        else if (filterType === "Deregistered") {
            this.props.store.companyStore.displayDeregisteredCompany = !this.props.store.companyStore.displayDeregisteredCompany;
        }
        var displayProperty = this.selectStoreFilterProperty(filterType);
        // displayProperty = !displayProperty;
       
        if (displayProperty) {
            this.props.store.companyStore.updateFiltersCompanyType(filterType);
        }
        else {
            this.props.store.companyStore.removeFiltersCompanyType(filterType);
        }
        
    }
        
    componentWillUpdate (nextProps, nextState) {
        
        if (this.state.withAllTags.length === 0) {
            if (this.props.store.companyStore.withAll.length > 0) {
                this.setState({withAllTags: this.props.store.companyStore.withAll});
            }
  
        }
    }
    onClickSearchBtn = () => {
        if ($("#Filter_slide").hasClass("open")) {
            $("#Filter_slide").toggleClass("open")
        }
        this.props.store.companyStore.searchAction();
    }
    handleSearchHome = () => {
        if ($("#Filter_slide").hasClass("open")) {
            $("#Filter_slide").toggleClass("open")
        }
        const {mainSearchValue} = this.props.store.companyStore;
        this.props.store.companyStore.updateWithAllItems(mainSearchValue);
        this.props.store.companyStore.mainSearchAction();
    }
    handleSelectCompanyFromAutocomplete(company) {
        this.props.store.companyStore.fetchCompany(company.id);
        this.props.store.router.goTo(routes.singleCompany, { id: company.id });
    }
    handleChangeSearchEmployer(val) {
        this.props.store.companyStore.mainSearchValue = val;
        this.props.store.companyStore.employerVal = val;
        this.props.store.companyStore.searchCompanies();
    }

    render() {
        const {
            companies,
            isLoadingSearch,
            selectAll,
            companyName,
            address,
            description,
            listed,
            privateInp,
            region,
            indusrtyCompany,
            displayList,
            reset,
            countCompanies,
            withAll,
            withAny,
            without,
            industryAutocompleteVal,
            industryAutocompleteResult,
            selectedIndustryVal,
            locationAutocompleteVal,
            selectedLocationVal,
            locationAutocompleteResult,
            sectionsIndustry,
            displayCompanyName,
            displayIndustry,
            displayCountry,
            displayAddress,
            mainSearchValue,
            employersResultSearch
        } = this.props.store.companyStore;

        const { goTo } = this.props.store.router;

        const { withAllTags, withAnyTags, withOutTags, isOpenModal, filterGroup }= this.state;

        return (
            <section>
                <div className="container-fluid">
                    <div className="row">
                        <aside className="sidebar112 col-xl-2 pr-lg-0 col-lg-3">
                       
                            <div className="wrapper-filters widget112" style={{height: '500px'}} id="Filter_slide">
                                {/* <h3 className="advanced-search-title">Advanced Search</h3> */}
                                <div className="wrapper-advanced-search-content">
                                    <div className="wrapper-advanced-search-keywords" style={{maxHeight: '50vh'}}>
                                        <div className="wrapper-keywords-search">
                                            <div className="wrapper-keywords">
                                                <p className="title-advanced-search">Search info of any company in Singapore</p>
                                                {/* <div className="add-filter" tabIndex="0"><i className="fa fa-plus" onClick={() => this.setState({isOpenModal: true})}></i><span style={{marginLeft: '10px'}}>Add filters</span></div>
                                                {filterGroup.map((filter,index) => {
                
                                                    if (filter.type === "Keywords") {
                                        
                                                        return  filter.filters.map((newFilter, i) => {
                                                            return (
                                                                <div key={i} className="wrap-div-flex" style={{marginTop: '1rem'}}>
                                                                    <label>{newFilter.text}</label>
                                                     
                                                                    <div className="react-tagsinput">
                                                                
                                                                        {filterObj.selectedTag(newFilter.filterType).map((tag,k) => {
                                                            
                                                                            return (
                                                                                <span key={k} className="react-tagsinput-tag">
                                                                                    <a onClick={() => filterObj.removeTag(tag,newFilter.filterType)} className="react-tagsinput-remove"></a>
                                                                                    <span className="react-tags-text">{tag}</span>
                                                                                </span>
                                                                            )        
                                                                        })}
                                                                        <input type="text" placeholder={newFilter.placeholder}  onKeyUp={(e) => filterObj.addTag(e,newFilter.filterType)}  className="react-tagsinput-input" />
                                                                    </div>
                                                                </div>
                                                            )
                                                        })
                                                    
                                                    }
                                                    else if (filter.type === "Location") {
                                                        return filter.filters.map((newFilter, i) => {
                                                            return (
                                                                <div key={i} className="wrapper-location">
                                                                    <div className="wrapper-location-input">
                                                                        <p className="label-industry-input">Region</p>
                                                                        <Autocomplete
                                                                            wrapperStyle={{ display: "flex", position: "relative" }}
                                                                            wrapperProps={{
                                                                                className: "wrapper-location-input"
                                                                            }}
                                                                            inputProps={{
                                                                                className: "location-input",
                                                                                placeholder: "Location"
                                                                            }}
                                                                            value={locationAutocompleteVal}
                                                                            items={
                                                                                locationAutocompleteResult.length
                                                                                    ? locationAutocompleteResult
                                                                                    : locationAutocompleteResult.splice()
                                                                            }
                                                                            getItemValue={location => location.countryName}
                                                                            onSelect={(locationName, location) =>
                                                                                this.handleSelectLocationAutocompleteVal(location)
                                                                            }
                                                                            renderMenu={children => (
                                                                                <div className="wrapper-autocomplete-items">{children}</div>
                                                                            )}
                                                                            renderItem={(item, isHighlighted) => (
                                                                                <div
                                                                                    key={item.id}
                                                                                    className={`autocomplete-item ${
                                                                                        isHighlighted ? "item-highlighted" : ""
                                                                                    }`}
                                                                                >
                                                                                    {item.countryName}
                                                                                </div>
                                                                            )}
                                                                            onChange={(event, value) =>
                                                                                this.handleChangeLocationAutocompleteVal(value)
                                                                            }
                                                                        />
                
                                                                        <div className="wrapper-selected-location">
                                                                            {selectedLocationVal.length
                                                                                ? selectedLocationVal.map((el, i) => (
                                                                                    <p className="selected-item selected-location-item">
                                                                                        <span
                                                                                            onClick={() => this.removeSelectedItemLocation(i)}
                                                                                            className="cross"
                                                                                        >
                                                                                            +
                                                                                        </span>
                                                                                        {el.countryName}
                                                                                    </p>
                                                                                ))
                                                                                : null}
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            )
                                                        });
                                                    }
                                                    else if (filter.type === "Status") {
                                            
                                                            return (
                                                                <div key="status" className="wrapper-status">
                                                                    {filter.filters && filter.filters.length > 0 ?
                                                                        <p className="title-status">Status</p>
                                                                        :
                                                                        null
                                                                    }
                                                                    { filter.filters.map((newFilter, i) => {
                                                                        if (newFilter.filterType === "Private" || newFilter.filterType === "Listed") {
                                                                            return(
                                                                                <label key ={i} from={newFilter.name}>
                                                                                    <input
                                                                                        type="checkbox"
                                                                                        id={newFilter.name}
                                                                                        checked={newFilter.name}
                                                                                        onChange={event => this.handleChangeCheckbox(event)}
                                                                                    />
                                                                                    <span>{newFilter.text}</span>
                                                                                </label>
                                                                            )
                                                                        }
                                                                        else {
                                                                            let displayProperty = this.selectStoreProperty(newFilter.name);
                                                                            return (
                
                                                                                <label key={i} from={newFilter.name}>
                                                                                    <input
                                                                                        onChange={() =>
                                                                                            displayProperty = !displayProperty
                                                                                        }
                                                                                        checked={this.selectStoreProperty(newFilter.name)}
                                                                                        type="checkbox"
                                                                                        id={newFilter.name}
                                                                                    />
                                                                                    <span>{newFilter.text}</span>
                                                                                </label>
                                                                        
                                                                            )
                                                                        }
                                                                          
                                                                    }) }
                                                                </div>
                                                            )
                                                    }
                                                    else if (filter.type === "CompanyType") {
                                                        return (
                                                            <div key="companyType" className="wrapper-status">
                                                                {filter.filters && filter.filters.length > 0 ?
                                                                        <p className="title-status">Company Type</p>
                                                                        :
                                                                        null
                                                                }
                                                                { filter.filters.map((newFilter, i) => {
                                                                    let displayProperty = this.selectStoreFilterProperty(newFilter.filterType);
                                                                    return (
                                                                        <label key={i} from={newFilter.name}>
                                                                            <input
                                                                                onChange={() =>
                                                                                    this.changeCompanyFiltersCheckbox(newFilter.filterType)
                                                                                }
                                                                                checked={this.selectStoreFilterProperty(newFilter.filterType)}
                                                                                type="checkbox"
                                                                                id={newFilter.name}
                                                                            />
                                                                            <span>{newFilter.text}</span>
                                                                        </label>
                                                                    )
                                                                })}
                                                            </div>
                                                        )
                                                    }
                                                    else if (filter.type === "IndustryNew") {
                                                    
                                                        return filter.filters.map((newFilter, i) => {
                                        
                                                            return (
                                                                
                                                                <div key={i} className="wrapper-search-industry">
                                                                    <div className="wrapper-industry-input">
                                                                        <p className="label-industry-input">Industry</p>
                                                                        <Autocomplete
                                                                            wrapperStyle={{ display: "flex", position: "relative" }}
                                                                            wrapperProps={{
                                                                                className: "wrapper-industry-input"
                                                                            }}
                                                                            inputProps={{
                                                                                className: "industry-input",
                                                                                placeholder: "Keyword"
                                                                            }}
                                                                            value={industryAutocompleteVal}
                                                                            items={
                                                                                industryAutocompleteResult.length
                                                                                    ? industryAutocompleteResult
                                                                                    : industryAutocompleteResult.splice()
                                                                            }
                                                                            getItemValue={industry => industry.activityDescription}
                                                                            onSelect={(industryDescription, industry) =>
                                                                                this.handleSelectIndustryAutocompleteVal(industry)
                                                                            }
                                                                            renderMenu={children => (
                                                                                <div className="wrapper-autocomplete-items">{children}</div>
                                                                            )}
                                                                            renderItem={(item, isHighlighted) => (
                                                                                <div
                                                                                    key={item.id}
                                                                                    className={`autocomplete-item ${
                                                                                        isHighlighted ? "item-highlighted" : ""
                                                                                    }`}
                                                                                >
                                                                                    {item.activityDescription}
                                                                                </div>
                                                                            )}
                                                                            onChange={(event, value) =>
                                                                                this.handleChangeIndustryAutocompleteVal(value)
                                                                            }
                                                                        />
                                                                        <div className="wrapper-selected-industry">
                                                                            {selectedIndustryVal.length
                                                                                ? selectedIndustryVal.map((el, i) => (
                                                                                    <p key={i} className="selected-item selected-industry-item">
                                                                                        <span
                                                                                            onClick={() =>
                                                                                                this.removeSelectedItemIndustry(i, el)
                                                                                            }
                                                                                            className="cross"
                                                                                        >
                                                                                            +
                                                                                        </span>
                                                                                        {el.activityDescription}
                                                                                    </p>
                                                                                ))
                                                                                : null}
                                                                        </div>
                                                                    </div>
                                                                    <div>
                                                                        <IndustryTree
                                                                            parentIndex={null}
                                                                            currentLvl={0}
                                                                            path={[]}
                                                                            openChildren={(index, parentIndex, lvl, path) =>
                                                                                this.openChildren(index, parentIndex, lvl, path)
                                                                            }
                                                                            checkNode={(index, parentIndex, currentLvl, path) =>
                                                                                this.checkNode(index, parentIndex, currentLvl, path)
                                                                            }
                                                                            sectionsIndustry={this.props.store.companyStore.sectionsIndustry}
                                                                        />
                                                                    </div>
                                                                </div>
                                                            )
                                                        })
                                                    }
                                               
                                               
                                                })}
                                            */}
                                                <div key="wrapperHomeSearchField" className="wrapper-home-search-field">
                                                    <img
                                                        className="search-icon"
                                                        src={require("../../../assets/images/icons/search.svg")}
                                                        alt=""
                                                    />
                                                    <Autocomplete
                                                        wrapperProps={{
                                                            className:
                                                                mainSearchValue.length > 4
                                                                    ? "wrapper-home-search-autocomplete"
                                                                    : "wrapper-home-search-autocomplete no-border"
                                                        }}
                                                        inputProps={{
                                                            className: "search-home-field",
                                                            placeholder: "Type",
                                                            onKeyPress: e => (e.key === "Enter" ? this.handleSearchHome() : null)
                                                        }}
                                                        value={mainSearchValue}
                                                        items={
                                                            employersResultSearch.length
                                                                ? employersResultSearch
                                                                : employersResultSearch.splice()
                                                        }
                                                        getItemValue={company => company.fullName}
                                                        onSelect={(companyName, company) => this.handleSelectCompanyFromAutocomplete(company)}
                                                        renderMenu={children => <div className="wrapper-autocomplete-items">{children}</div>}
                                                        renderItem={(item, isHighlighted) => (
                                                            <div
                                                                key={item.id}
                                                                className={`autocomplete-item ${isHighlighted ? "item-highlighted" : ""}`}
                                                            >
                                                                {item.fullName}
                                                            </div>
                                                        )}
                                                        onChange={(event, value) => this.handleChangeSearchEmployer(value)}
                                                    />
                                                    {mainSearchValue.length ? (
                                                        <img
                                                            style={{right: '10px'}}
                                                            onClick={() => this.handleChangeSearchEmployer("")}
                                                            className="cross-icon"
                                                            src={require("../../../assets/images/icons/cross.svg")}
                                                            alt=""
                                                        />
                                                    ) : null}
                                                </div>
                                        
                                            </div>
                                        </div>
                                        {/* <div className="wrapper-search-category">
                                            <p className="title-advanced-search">Search by Category:</p>
                                            <div className="wrapper-search-category-checkboxes">
                                                <label from="companyName">
                                                    <input
                                                        type="checkbox"
                                                        id="companyName"
                                                        checked={companyName}
                                                        onChange={event => this.handleChangeCheckbox(event)}
                                                    />
                                                    <span>Company Name / Ticker</span>
                                                </label>
                                                <label from="address">
                                                    <input
                                                        type="checkbox"
                                                        id="address"
                                                        checked={address}
                                                        onChange={event => this.handleChangeCheckbox(event)}
                                                    />
                                                    <span>Address</span>
                                                </label>
                                                <label from="description">
                                                    <input
                                                        type="checkbox"
                                                        id="description"
                                                        checked={description}
                                                        onChange={event => this.handleChangeCheckbox(event)}
                                                    />
                                                    <span>Description</span>
                                                </label>
                                            </div>
                                        </div> */}
                                    </div>
                                    {/* <div className="wrapper-company-criteria">
                                        <p className="title-advanced-search">Company Criteria</p>
                                        <div className="wrapper-company-criteria-content">
                                            <div className="wrapper-search-industry">
                                                <div className="wrapper-industry-input">
                                                    <p className="label-industry-input">Industry</p>
                                                    <Autocomplete
                                                        wrapperStyle={{ display: "flex", position: "relative" }}
                                                        wrapperProps={{
                                                            className: "wrapper-industry-input"
                                                        }}
                                                        inputProps={{
                                                            className: "industry-input",
                                                            placeholder: "Keyword"
                                                        }}
                                                        value={industryAutocompleteVal}
                                                        items={
                                                            industryAutocompleteResult.length
                                                                ? industryAutocompleteResult
                                                                : industryAutocompleteResult.splice()
                                                        }
                                                        getItemValue={industry => industry.activityDescription}
                                                        onSelect={(industryDescription, industry) =>
                                                            this.handleSelectIndustryAutocompleteVal(industry)
                                                        }
                                                        renderMenu={children => (
                                                            <div className="wrapper-autocomplete-items">{children}</div>
                                                        )}
                                                        renderItem={(item, isHighlighted) => (
                                                            <div
                                                                key={item.id}
                                                                className={`autocomplete-item ${
                                                                    isHighlighted ? "item-highlighted" : ""
                                                                }`}
                                                            >
                                                                {item.activityDescription}
                                                            </div>
                                                        )}
                                                        onChange={(event, value) =>
                                                            this.handleChangeIndustryAutocompleteVal(value)
                                                        }
                                                    />
                                                    <div className="wrapper-selected-industry">
                                                        {selectedIndustryVal.length
                                                            ? selectedIndustryVal.map((el, i) => (
                                                                <p key={i} className="selected-item selected-industry-item">
                                                                    <span
                                                                        onClick={() =>
                                                                            this.removeSelectedItemIndustry(i, el)
                                                                        }
                                                                        className="cross"
                                                                    >
                                                                        +
                                                                    </span>
                                                                    {el.activityDescription}
                                                                </p>
                                                            ))
                                                            : null}
                                                    </div>
                                                </div>
                                                <div className="wrapper-industry-tree-component">
                                                    <IndustryTree
                                                        parentIndex={null}
                                                        currentLvl={0}
                                                        path={[]}
                                                        openChildren={(index, parentIndex, lvl, path) =>
                                                            this.openChildren(index, parentIndex, lvl, path)
                                                        }
                                                        checkNode={(index, parentIndex, currentLvl, path) =>
                                                            this.checkNode(index, parentIndex, currentLvl, path)
                                                        }
                                                        sectionsIndustry={this.props.store.companyStore.sectionsIndustry}
                                                    />
                                                </div>
                                            </div>
                                            <div className="wrapper-location">
                                                <div className="wrapper-location-input">
                                                    <p className="label-industry-input">Region</p>
                                                    <Autocomplete
                                                        wrapperStyle={{ display: "flex", position: "relative" }}
                                                        wrapperProps={{
                                                            className: "wrapper-location-input"
                                                        }}
                                                        inputProps={{
                                                            className: "location-input",
                                                            placeholder: "Location"
                                                        }}
                                                        value={locationAutocompleteVal}
                                                        items={
                                                            locationAutocompleteResult.length
                                                                ? locationAutocompleteResult
                                                                : locationAutocompleteResult.splice()
                                                        }
                                                        getItemValue={location => location.countryName}
                                                        onSelect={(locationName, location) =>
                                                            this.handleSelectLocationAutocompleteVal(location)
                                                        }
                                                        renderMenu={children => (
                                                            <div className="wrapper-autocomplete-items">{children}</div>
                                                        )}
                                                        renderItem={(item, isHighlighted) => (
                                                            <div
                                                                key={item.id}
                                                                className={`autocomplete-item ${
                                                                    isHighlighted ? "item-highlighted" : ""
                                                                }`}
                                                            >
                                                                {item.countryName}
                                                            </div>
                                                        )}
                                                        onChange={(event, value) =>
                                                            this.handleChangeLocationAutocompleteVal(value)
                                                        }
                                                    />

                                                    <div className="wrapper-selected-location">
                                                        {selectedLocationVal.length
                                                            ? selectedLocationVal.map((el, i) => (
                                                                <p className="selected-item selected-location-item">
                                                                    <span
                                                                        onClick={() => this.removeSelectedItemLocation(i)}
                                                                        className="cross"
                                                                    >
                                                                        +
                                                                    </span>
                                                                    {el.countryName}
                                                                </p>
                                                            ))
                                                            : null}
                                                    </div>
                                                </div>
                                                <div className="wrapper-status">
                                                    <p className="title-status">Status</p>
                                                    <label from="listed">
                                                        <input
                                                            type="checkbox"
                                                            id="listed"
                                                            checked={listed}
                                                            onChange={event => this.handleChangeCheckbox(event)}
                                                        />
                                                        <span>Listed</span>
                                                    </label>
                                                    <label from="privateInp">
                                                        <input
                                                            type="checkbox"
                                                            id="privateInp"
                                                            checked={privateInp}
                                                            onChange={event => this.handleChangeCheckbox(event)}
                                                        />
                                                        <span>Private</span>
                                                    </label>
                                                </div>
                                            </div>
                                        </div>
                                    </div> */}
                                </div>
                                {/* <div className="wrapper-dispay">
                                    <p className="title-dispay">Display List</p>
                                    <div className="wrapper-display-checkbox">
                                        <label from="companyName">
                                            <input
                                                onChange={() =>
                                                    (this.props.store.companyStore.displayCompanyName = !this.props.store
                                                        .companyStore.displayCompanyName)
                                                }
                                                checked={this.props.store.companyStore.displayCompanyName}
                                                type="checkbox"
                                                id="companyName"
                                            />
                                            <span>Company Name</span>
                                        </label>

                                        <label from="industry">
                                            <input
                                                onChange={() =>
                                                    (this.props.store.companyStore.displayIndustry = !this.props.store
                                                        .companyStore.displayIndustry)
                                                }
                                                checked={this.props.store.companyStore.displayIndustry}
                                                type="checkbox"
                                                id="industry"
                                            />
                                            <span>Industry</span>
                                        </label>

                                        <label from="description">
                                            <input type="checkbox" id="description" />
                                            <span>Description</span>
                                        </label>

                                        <label from="country">
                                            <input
                                                onChange={() =>
                                                    (this.props.store.companyStore.displayCountry = !this.props.store
                                                        .companyStore.displayCountry)
                                                }
                                                checked={this.props.store.companyStore.displayCountry}
                                                type="checkbox"
                                                id="country"
                                            />
                                            <span>Country</span>
                                        </label>

                                        <label from="phone">
                                            <input type="checkbox" id="phone" />
                                            <span>Phone</span>
                                        </label>

                                        <label from="address">
                                            <input
                                                onChange={() =>
                                                    (this.props.store.companyStore.displayAddress = !this.props.store
                                                        .companyStore.displayAddress)
                                                }
                                                checked={this.props.store.companyStore.displayAddress}
                                                type="checkbox"
                                                id="address"
                                            />
                                            <span>Address</span>
                                        </label>
                                    </div>
                                </div> */}
                                <div className="wrapper-advanced-search-btns">
                                    {/* <button
                                        onClick={() =>
                                            this.props.store.commonStore.checkAuth()
                                                ? this.handleChangeShowStatus()
                                                : goTo(routes.login)
                                        }
                                    >
                                        Save search
                                    </button> */}
                                    {/* handlesearchButton will change to onclicksearch button when we would revert back to old filters */}
                                    <button
                                        className="search-btn" 
                                        onClick={() => this.handleSearchHome()}
                                    >
                                        Search
                                    </button>
                                </div>
                            </div>
                        
                        </aside>
                        <div className="col-xl-10 col-lg-9">
                            {isLoadingSearch ? (
                                <div className="wrapper-loading-search">
                                    <div className="wrapper-preloader">
                                        <div className="loader" />
                                    </div>
                                </div>
                            ) : (
                                <div className="container" style={{marginTop: '10px'}}>
                                    <a  className="filter_btn" id="filter_slider" style={{zIndex: '800', width:'15px', cursor: 'pointer'}} onClick={this.onFilterSlider}> 
                                        <i class="fa fa-bars"></i>
                                    </a>
                                    <CompanyTable
                                        displayCompanyName={displayCompanyName}
                                        displayIndustry={displayIndustry}
                                        displayCountry={displayCountry}
                                        displayAddress={displayAddress}
                                        selectCompany={company => this.handleSelectCompany(company)}
                                        companies={companies}
                                    />
                                </div>
                            )}
                        </div>
                    </div>
                </div>
                <FilterModal open={isOpenModal} addFilter={(filter) => this.addFilter(filter)} onClose={() => this.setState({isOpenModal: false})} />
            </section>
         
        );
    }
}

export default Filters;
