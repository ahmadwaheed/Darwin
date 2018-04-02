import { extendObservable, observable, action, computed } from "mobx";
import agent from "../agent";
import router from "../router";
import routes from "../router/routes";
import userStore from "./userStore";


class CompanyStore {
    @observable isAdvancedSearch = false;

    // Start Display List
    @observable displayCompanyName = true;
    @observable displayIndustry = true;
    @observable displayCountry = true;
    @observable displayAddress = true;

    // End Display List

    //Checkbox
    @observable _selectAll = false;
    @observable _companyName = false;
    @observable _address = false;
    @observable _description = false;
    @observable _listed = false;
    @observable _privateInp = false;
    @observable countCompanies = null;
    @observable selectCompany = {};
    @observable displayPrivateCompany = true;
    @observable displayPublicCompany = true;
    @observable displayExemptPrivateCompany = true;
    @observable displayOtherEntityType = true;
    @observable displayDeregisteredCompany = true;
    @observable displayCompanyType = true;
    @observable displayBusinessActivity = true;
    @observable filtersCompanyType = [];
    @observable homeSearchValue = '';

    @observable newsByCompany = [];

    @observable employersResultSearch = [];
    // input text
    @observable _withAll = "";
    @observable _withAny = "";
    @observable _without = "";

    @observable _filtersCollection = [
        {id:1,filterType:"withAny",type:"Keywords", name:'With any of these words'},
        {id: 1,filterType: "withOut", type: "Keywords", name:'Without the words'},
        {id: 3,filterType: "IndustryNew", type: "IndustryNew", name:'Industry'},
        {id: 4,filterType: "Private", type: "Status", name:'Private'},
        {id: 4,filterType: "Listed", type: "Status", name:'Listed'},
        // {id: 4,filterType: "companyName", type: "Status", name:'Company Name'},
        // {id: 4,filterType: "industry", type: "Status", name:'Industry'},
        // {id: 4,filterType: "country", type: "Status", name:'Country'},
        // {id: 4,filterType: "address", type: "Status", name:'Address'},
        {id: 5,filterType: "Region", type: "Location", name:'Region'},
        {id: 6,filterType: "Public Limited Company", type: "CompanyType", name:'Public Limited Company'},
        {id: 6,filterType: "Private Limited Company", type: "CompanyType", name:'Private Limited Company'},
        {id: 6,filterType: "Exempt Private Limited Company", type: "CompanyType", name:'Exempt Private Limited Company'},
        {id: 6,filterType: "Deregistered", type: "CompanyType", name:'Deregistered'},
        {id: 6,filterType: "Other Entity Type", type: "CompanyType", name:'Other Entity Type'}
    ];

    @observable _employerVal = "";

    @observable isLoadingSearch = false;

    @observable _saveQueryName = "";
    @observable _saveQueryDescription = "";
    @observable showModal = false;
    @observable isModalSaveQuery = false;

    // Button select
    @observable _region = false;
    @observable _indusrtyCompany = false;
    @observable _displayList = false;

    @observable savedQueries = [];
    // Mein search input
    @observable _mainSearchValue = "";
    @observable errNotFoundCompany = "";
    // Errors
    @observable errSaveQuery = "";
    @observable _mainSearchError = null;

    @observable companies = [];

    debounceTimeOut = null;

    @observable industryAutocompleteVal = "";
    @observable selectedIndustryVal = [];
    @observable industryAutocompleteResult = [];

    @observable locationAutocompleteVal = "";
    @observable selectedLocationVal = [];
    @observable locationAutocompleteResult = [];

    @observable sectionsIndustry = [];

    sectionsIndustryForRequest = [
        { lvl: 0, ids: [] },
        { lvl: 1, ids: [] },
        { lvl: 2, ids: [] },
        { lvl: 3, ids: [] },
        { lvl: 4, ids: [] }
    ];

    @computed
    get saveQueryName() {
        return this._saveQueryName;
    }
    set saveQueryName(val) {
        this._saveQueryName = val;
    }

    @computed
    get saveQueryDescription() {
        return this._saveQueryDescription;
    }
    set saveQueryDescription(val) {
        this._saveQueryDescription = val;
    }

    @computed
    get selectAll() {
        return this._selectAll;
    }
    set selectAll(val) {
        this._selectAll = val;
    }

    @computed
    get companyName() {
        return this._companyName;
    }
    set companyName(val) {
        this._companyName = val;
    }

    @computed
    get address() {
        return this._address;
    }
    set address(val) {
        this._address = val;
    }

    @computed
    get description() {
        return this._description;
    }
    set description(val) {
        this._description = val;
    }

    @computed
    get listed() {
        return this._listed;
    }
    set listed(val) {
        this._listed = val;
    }

    @computed
    get privateInp() {
        return this._privateInp;
    }
    set privateInp(val) {
        this._privateInp = val;
    }

    @computed
    get withAll() {
        return this._withAll;
    }
    set withAll(val) {
        this._withAll = val;
    }

    @computed
    get withAny() {
        return this._withAny;
    }
    set withAny(val) {
        this._withAny = val;
    }

    @computed
    get without() {
        return this._without;
    }
    set without(val) {
        this._without = val;
    }

    @computed
    get filtersCollection() {
        return this._filtersCollection;
    }
    set filtersCollection(val) {
        this._filtersCollection = val;
    }

    @computed
    get region() {
        return this._region;
    }
    set region(val) {
        this._region = val;
    }

    @computed
    get indusrtyCompany() {
        return this._indusrtyCompany;
    }
    set indusrtyCompany(val) {
        this._indusrtyCompany = val;
    }

    @computed
    get displayList() {
        return this._displayList;
    }
    set displayList(val) {
        this._displayList = val;
    }

    @computed
    get mainSearchValue() {
        return this._mainSearchValue;
    }
    set mainSearchValue(val) {
        this._mainSearchValue = val;
    }

    @computed
    get mainSearchError() {
        return this._mainSearchError;
    }
    set mainSearchError(val) {
        this._mainSearchError = val;
    }

    @computed
    get employerVal() {
        return this._employerVal;
    }
    set employerVal(val) {
        this._employerVal = val;
    }

    @action
    fetchCompany(id) {
        return agent.Company.singleCompany(id)
            .then(res => {
                console.log(res);
                if (res.success) {
                    this.selectCompany = res.company;
                } else {
                    this.errNotFoundCompany = res.msg;
                }
            })
            .catch(err => console.error("ERROR", err));
    }

    fetchNewsByCompany(id) {
        return agent.Company.getSingleNewByCompany(id)
            .then(res => {
                if (res.success) {
                    this.newsByCompany = res.news;
                    console.log("NEWS", this.newsByCompany);
                } else {
                    this.errNotFoundCompany = res.msg;
                }
            })
            .catch(err => console.error("ERROR", err));
    }

    @action
    reset = () => {
        this.selectAll = false;
        this.companyName = false;
        this.address = false;
        this.description = false;
        this.listed = false;
        this.privete = false;

        // input text
        this.withAll = "";
        this.withAny = "";
        this.without = "";

        // Button select
        this.region = false;
        this.indusrtyCompany = false;
        this.displayList = false;

        // Mein search input
        this.mainSearchValue = "";
    };

    @action
    mainSearchAction = () => {

        router.goTo(routes.searchResults);
        if (this.mainSearchValue.length) {
            this.isLoadingSearch = true;
            agent.Search.filterCompany({ withAll: [this.mainSearchValue] })
                .then(res => {
                    
                    this.companies = res.companies;
                    this.countCompanies = res.count;
                    this.isLoadingSearch = false;
                
                    
                })
                .catch(err => console.error("ERROR", err));
        }
        else {
            this.companies = [];
        }
    };

    @action
    getCountAllCompany = () => {
        agent.Search.filterCompany()
            .then(res => {
                this.countCompanies = res.count;
            })
            .catch(err => console.error("ERROR", err));
    };

    @action
    fetchSavedQueries() {
        if (userStore.checkAuth()) {
            agent.User.fetchSavedQueries()
            .then(res => {
                
                let queriesCollection = [];
                res.queries.forEach(selectedQuery => {
                    let queryNew = {
                        value: selectedQuery.name,
                        label: selectedQuery.description,
                        query: selectedQuery.query
                    };
                    queriesCollection.push(queryNew);
                });
            
                this.savedQueries = queriesCollection;
            })
            .catch(err => console.error("ERROR", err));
        }
   
    }

    @action
    createArrayOfStringForSearch(string) {
        return string.split(" ").filter(el => el.length);
    }

    @action
    createQueriesObject() {
        return {
            withAll: this.withAll.length ? this.withAll : [],
            withAny: this.withAny.length ? this.withAny : [],
            without: this.without.length ? this.without : []
        };
    }
    @action 
    updateWithAllItems(items) {
    //   this.withAll = [...this.withAll, items]; old code
    let newArray = [];
    newArray.push(items);
    this.withAll = newArray;
    }
    @action 
    updateFiltersCompanyType(items) {
    
        this.filtersCompanyType = [...this.filtersCompanyType, items];
    }
    @action 
    removeFiltersCompanyType(item) {

        const index = this.filtersCompanyType.indexOf(item);
        if (index !== -1) {
            this.filtersCompanyType.splice(index, 1);
        }
    }



    @action
    updateWithAnyItems(items) {
        this.withAny = [...this.withAny, items];
    }

    @action
    updateWithOutItems(items) {
        this.without = [...this.without, items];
    }

    @action
    updateFilterCollection(items) {
        this.filtersCollection = [...items];
    }


    @action
    searchAction(queryObj = this.createQueriesObject()) {
        debugger;
        if (this.selectedIndustryVal.length) {
            queryObj.companyActivities = [];
            for (const companyActivitiy of this.selectedIndustryVal) {
                queryObj.companyActivities.push(companyActivitiy.id);
            }
        }

        if (this.selectedLocationVal.length) {
            queryObj.countries = [];
            for (const country of this.selectedLocationVal) {
                queryObj.countries.push(country.id);
            }
        }

        // this.createArrForRequestTreeIndustries(0, this.sectionsIndustry);
        queryObj.industries = this.sectionsIndustryForRequest;
        queryObj.companyTypes = this.filtersCompanyType;
        queryObj.rowsSkip = 0;

        this.isLoadingSearch = true;
        router.goTo(routes.searchResults);
        agent.Search.filterCompany(queryObj)
            .then(res => {
                console.log("companies", res.companies[0]);
                this.companies = res.companies;
                this.countCompanies = res.count;
                this.isLoadingSearch = false;
              
            })
            .catch(err => console.error("ERROR", err));
    }
    @action
    loadMoreData(objParam) {
        debugger;
        let queryObj = this.createQueriesObject();
        queryObj.rowsSkip = objParam.skipRows;
        queryObj.page = objParam.newPage;
        
        queryObj.industries = this.sectionsIndustryForRequest;
        queryObj.companyTypes = this.filtersCompanyType;
        agent.Search.filterCompany(queryObj)
            .then(res => {
                if (res.companies && res.companies.length > 0) {
                    this.companies = res.companies;
                }
              
            })
            .catch(err => console.error("ERROR", err));
    }

    @action
    selectSaveQuery(query) {
        const queryObj = JSON.parse(query.query);
        this.withAll = queryObj.withAll.length ? queryObj.withAll.reduce((a, b) => a + " " + b) : "";
        this.withAny = queryObj.withAny.length ? queryObj.withAny.reduce((a, b) => a + " " + b) : "";
        this.without = queryObj.without.length ? queryObj.without.reduce((a, b) => a + " " + b) : "";

        this.searchAction(queryObj);
        this.showModal = false;
        this.isModalSaveQuery = false;
    }

    @action
    saveQuery() {
        if (this.withAll.length || this.withAny.length || this.without.length) {
            if (this.saveQueryName.length) {
                const obj = {
                    name: this.saveQueryName,
                    description: this.saveQueryDescription,
                    query: JSON.stringify(this.createQueriesObject())
                };
                var thisObj = this;
                agent.User.saveQueries(obj)
                    .then(res => {
                        if (res.success) {
                            this.showModal = false;
                            this.errSaveQuery = "";
                            this.saveQueryName = "";
                            this.saveQueryDescription = "";
                            let selectedQuery = res.result;
                            let queryNew = {
                                value: selectedQuery.name,
                                label: selectedQuery.description,
                                query: selectedQuery.query
                            };
                            thisObj.savedQueries = [...thisObj.savedQueries, queryNew];
                        } else {
                            this.errSaveQuery = res.msg;
                        }
                    })
                    .catch(err => console.error("ERROR", err));
            } else {
                this.errSaveQuery = "Please Enter Name";
            }
        } else {
            this.errSaveQuery = "Please Create Query";
        }
    }

    @action
    searchCompanies(actionType = "employer") {
        let val;
        if (actionType === "homesearch") {
            val = this.mainSearchValue;
        } else {
            val = this.employerVal;
        }

        if (val.length >= 1) {
            var thisObj = this;
            clearTimeout(this.debounceTimeOut);
            this.debounceTimeOut = setTimeout(() => {
                agent.Search.searchCompanies(val)
                    .then(res => {
                        console.log(res);
                        if (res.success) {
                            thisObj.employersResultSearch = res.companies;
                
                            if (thisObj.employersResultSearch.length === 1) {
                                let company = thisObj.employersResultSearch[0];
                       
                            }
                          
                        }
                    })
                    .catch(err => console.error("ERROR", err));
            }, 400);
        } else {
            this.employersResultSearch = [];
        }
    }

    @action
    indusrtyAutocompleteSearch() {
        if (this.industryAutocompleteVal.length) {
            clearTimeout(this.debounceTimeOut);
            this.debounceTimeOut = setTimeout(() => {
                agent.Search.searchIndustry(this.industryAutocompleteVal)
                    .then(res => {
                        if (res.success) {
                            this.industryAutocompleteResult = res.industries;
                        }
                    })
                    .catch(err => console.error("ERROR", err));
            }, 400);
        } else {
            this.industryAutocompleteResult = [];
        }
    }

    @action
    locationAutocompleteSearch() {
        if (this.locationAutocompleteVal.length) {
            clearTimeout(this.debounceTimeOut);
            this.debounceTimeOut = setTimeout(() => {
                agent.Search.searchLocation(this.locationAutocompleteVal)
                    .then(res => {
                        console.log(res);
                        if (res.success) {
                            this.locationAutocompleteResult = res.countries;
                        }
                    })
                    .catch(err => console.error("ERROR", err));
            }, 400);
        } else {
            this.locationAutocompleteResult = [];
        }
    }

    @action
    fetchSectionsindustryTree() {
        agent.Search.industryTree()
            .then(res => {
                if (res.success) {
                    this.sectionsIndustry = res.response.map(el => ({
                        isOpen: false,
                        isSelected: false,
                        id: el.id,
                        sectionClass: el.sectionClass,
                        sectionName: el.sectionName,
                        children: []
                    }));
                }
            })
            .catch(err => console.error("ERROR", err));
    }

    @action
    fetchIndustryTreeNode(path, currentIndex, lvl, callback) {
        let node = [];

        if (path.length) {
            for (const nodeIndex of path) {
                if (node.length) {
                    node = node[nodeIndex].children;
                } else {
                    node = this.sectionsIndustry[nodeIndex].children;
                }
            }
        } else {
            node = this.sectionsIndustry;
        }

        if (!node[currentIndex].isOpen) {
            const querySrt = `?parentId=${node[currentIndex].id}&&lvl=${lvl + 1}`;
            agent.Search.industryTree(querySrt)
                .then(res => {
                    if (res.success) {
                        node[currentIndex].children = res.response.map(el => ({
                            isOpen: false,
                            isSelected: node[currentIndex].isSelected,
                            id: el.id,
                            sectionName: el.ssicDescription,
                            sectionClass: el.ssic,
                            parentId: el.parentId,
                            children: []
                        }));

                        node[currentIndex].isOpen = true;
                        callback();
                    }
                })
                .catch(err => console.error("ERROR", err));
        } else {
            node[currentIndex].isOpen = false;
            callback();
        }
    }

    selectNodeFromIndustryTree(path, currentIndex, lvl, callback, isTree, activity) {
        if (isTree) {
            let node = [];
            if (path.length) {
                for (const nodeIndex of path) {
                    if (node.length) {
                        node = node[nodeIndex].children;
                    } else {
                        node = this.sectionsIndustry[nodeIndex].children;
                    }
                }
            } else {
                node = this.sectionsIndustry;
            }

            const cuurentElem = node[currentIndex];
            if (this.sectionsIndustryForRequest[lvl].ids.indexOf(cuurentElem.id) === -1) {
                this.sectionsIndustryForRequest[lvl].ids.push(cuurentElem.id);
                this.selectedIndustryVal.push({
                    activityDescription: cuurentElem.sectionName,
                    id: cuurentElem.id,
                    lvl: lvl
                });

                const changeChildSelected = node => {
                    if (node.children && node.children.length) {
                        for (const childNode of node.children) {
                            childNode.isSelected = false;
                            changeChildSelected(childNode);
                        }
                    }
                };

                for (const item of this.sectionsIndustry) {
                    item.isOpen = false;
                }
            }
        } else {
            activity.lvl = 4;
            this.selectedIndustryVal.push(activity);
            this.sectionsIndustryForRequest[4].ids.push(activity.id);
        }
    }

    removeItemFromRequestQuery(item) {
        const index = this.sectionsIndustryForRequest[item.lvl].ids.indexOf(item.id);
        if (index !== -1) {
            this.sectionsIndustryForRequest[item.lvl].ids.splice(index, 1);
        }
    }
}
export default new CompanyStore();
