import React, { Component } from 'react';
import 'semantic-ui-css/components/modal.min.css';
import { Button, Modal } from 'semantic-ui-react';
import { inject, observer } from "mobx-react";
import $ from 'jquery';


@inject("store")
@observer
class FilterModal extends Component {
    state = { inputValue: ''};
    constructor(props) {
        super(props);
        this.addFilter = this.addFilter.bind(this);
        this.state = {
            filterSelectors : [
                {id: 1,name: 'Keywords'},
            
                {id: 3, name: 'Industry'},
                {id: 4, name: 'Status'},
                {id: 5, name: 'Location'},
                {id: 6, name: 'Company Type'}
            ],
            selectedFilters: []
        }
    }
    closeModal = () => {

        this.props.onClose();
     
    }
    filterSelection = (id) => {
        const {filtersCollection} =  this.props.store.companyStore;

        let selectedFilters = filtersCollection.filter( item => {
            return item.id === id
        });
        if (selectedFilters && selectedFilters.length ===  1) {
            this.addFilter(selectedFilters[0]);
        }
        else {
            this.setState({selectedFilters});
        }
        
    }
    componentDidMount() {
        let props = this.props;
        $(document).on("click touchstart", function (event) {
          if ($(event.target).hasClass('dimmed')){
            
            props.onClose();
          }
  
        });
    }
    addFilter(addedFilter) {
    
        let newFilterCollection = this.props.store.companyStore.filtersCollection.filter((filter) => {
            return filter.filterType !== addedFilter.filterType
        });
        this.props.addFilter(addedFilter);
        this.setState({ selectedFilters: [] }, () =>  this.props.store.companyStore.updateFilterCollection(newFilterCollection));
    }
 
    render() {
        const hrefStyle = { cursor: 'pointer' };
        const { filterSelectors,selectedFilters } = this.state;
        
        return (
            <Modal open={this.props.open}  closeOnDimmerClick = { true }   style={{ maxWidth: '35rem', left:'64%' }}>
                <section className="modal-tabbeds">
                    <div className="modal-tabbeds__headers">
                        <div className="modal-tabbeds__btns" style={{outline:'none'}}>
                            <span id="tab1-description">Add Filters</span>
                        </div>
                        <a className="modal-tabbeds__close" id="js_modal-close"  onClick={() =>this.closeModal()} style={hrefStyle}>close</a>
                    </div>
                    <div className="flexbox-container">
                        <div className="filters-selectors">
                            {filterSelectors.map((filterSelector) => {
                                return(
                                    <div key={filterSelector.id} tabIndex="0" className="selector-div" onClick={() => this.filterSelection(filterSelector.id)}>
                                        <a className="selector-a">{filterSelector.name}
                                            <span className="selector-a-span clearfix">
                                                <i className="selector-chevron fa fa-chevron-right"></i>
                                            </span>
                                        </a>
                                    </div>
                                )
                            })}
                        </div>
                        <div className ="filters-selected">
                            {selectedFilters.map((filter,index) => {
                                return (
                                    <div key={index} className="selected-div">
                                        <a className="selector-a" onClick={() => this.addFilter(filter)}>{filter.name} </a>
                                    </div>
                                )
                            })}
                            
                        </div>
                    </div>
           
                </section>
                                                
            </Modal> );
    }
}

export default FilterModal;