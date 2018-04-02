import React from "react";
import "./OverviewCompany.css";

import moment from "moment";

const OverviewCompany = ({ selectCompany }) => (
    <div className="aside-cont">
        <div className="table-title flexbox">{selectCompany.fullName ? selectCompany.fullName : ""}</div>
        <div className="table-box">
            <div className="table-head">Company Profile</div>
            <div className="table-body">
            {selectCompany.fullName ? 
                <div className="table-row">
                    <div className="table-dh">Full Name</div>
                    <div className="table-dd align-right">
                        {selectCompany.fullName ? selectCompany.fullName : ""}
                    </div>
                </div>
                :
                null
            }
            {selectCompany.registrationNumber ?

            <div className="table-row">
                <div className="table-dh">Registration Number</div>
                <div className="table-dd align-right">
                    {selectCompany.registrationNumber ? selectCompany.registrationNumber : ""}
                </div>
            </div>
            :
            null
            }
            {selectCompany.formerName ?

                <div className="table-row">
                    <div className="table-dh">Former Name</div>
                    <div className="table-dd align-right">
                        {selectCompany.formerName ? selectCompany.formerName : ""}
                    </div>
                </div>
                :
                null
            }
            {selectCompany.registrationIncorporationDate ?

                <div className="table-row">
                    <div className="table-dh">Incorporation Date</div>
                    <div className="table-dd align-right">
                        {selectCompany.registrationIncorporationDate
                            ? moment(selectCompany.registrationIncorporationDate).format("D MMM YYYY")
                            : ""}
                    </div>
                </div>
                :
                null
            }

            <div className="table-row">
                <div className="table-dh">Address</div>
                <div className="table-dd align-right">
                    {/* {selectCompany.address ? selectCompany.address : ""} */}
                    {selectCompany.addressBuilding ? (selectCompany.addressBuilding + ' ,') : ''}
                    {selectCompany.addressBlock ? (selectCompany.addressBlock + ' ') : ''}
                    {selectCompany.addressStreet ? (selectCompany.addressStreet + ' ,') : ''}
                    {selectCompany.addressLevel ?  ('#' + selectCompany.addressLevel) : ''}
                    {selectCompany.addressUnit ?  ("-" + selectCompany.addressUnit + ' , ') : ''}
                    {selectCompany.postalCode ? (selectCompany.postalCode + ' ') : ''}
                    {selectCompany.countryId ? selectCompany.countryId.countryName : ''}
                    

                </div>
            </div>
         
            {selectCompany.entityT && selectCompany.entityT.entityDescription ?
                <div className="table-row">
                    <div className="table-dh">Entity Type</div>
                    <div className="table-dd align-right">
                        {selectCompany.entityT && selectCompany.entityT.entityDescription
                            ? selectCompany.entityT.entityDescription
                            : ""}
                    </div>
                </div>
                :
                null
            }
            {selectCompany.businessActivity?

            
                <div className="table-row">
                    <div className="table-dh">Business Activity</div>
                    <div className="table-dd align-right">
                        {selectCompany.businessActivity? selectCompany.businessActivity
                        : ""}
                    </div>
                </div>
                :
                null
            }
            {selectCompany.primarySsicCode?

            
                <div className="table-row">
                    <div className="table-dh">Primary SSIC Code</div>
                    <div className="table-dd align-right">
                        {selectCompany.primarySsicCode? selectCompany.primarySsicCode
                        : ""}
                    </div>
                </div>
                :
                null
            }
            {selectCompany.primarySsicDescription?

    
                <div className="table-row">
                    <div className="table-dh">Primary SSIC Description</div>
                    <div className="table-dd align-right">
                        {selectCompany.primarySsicDescription? selectCompany.primarySsicDescription
                        : ""}
                    </div>
                </div>
                :
                null
            }

            
                {/* <div className="table-row">
                    <div className="table-dh">Address Others 1</div>
                    <div className="table-dd align-right">
                        {selectCompany.addressOthers1 ? selectCompany.addressOthers1 : ""}
                    </div>
                </div>
                <div className="table-row">
                    <div className="table-dh">Address Others 2</div>
                    <div className="table-dd align-right">
                        {selectCompany.addressOthers2 ? selectCompany.addressOthers2 : ""}
                    </div>
                </div>
                <div className="table-row">
                    <div className="table-dh">Postal Code</div>
                    <div className="table-dd align-right">
                        {selectCompany.postalCode ? selectCompany.postalCode : ""}
                    </div>
                </div> */}
                {selectCompany.secondarySsicCode  ?
                <div className="table-row">
                    <div className="table-dh">Secondary SSIC Code</div>
                    <div className="table-dd align-right">
                        {selectCompany.secondarySsicCode 
                            ? selectCompany.secondarySsicCode
                            : ""}
                    </div>
                </div>
                :
                null }

                {selectCompany.seondarySsicDescription  ?
                <div className="table-row">
                    <div className="table-dh">Secondary SSIC Description</div>
                    <div className="table-dd align-right">
                        {selectCompany.seondarySsicDescription 
                            ? selectCompany.seondarySsicDescription
                            : ""}
                    </div>
                </div>
                :
                null }
            
                { selectCompany.noOfCharge ? 

                    <div className="table-row">
                        <div className="table-dh">Number of Charges</div>
                        <div className="table-dd align-right">
                            {selectCompany.noOfCharge ? selectCompany.noOfCharge : ""}
                        </div>
                    </div>
                    :
                    null
                }
                { selectCompany.officersNumber ? 

                    <div className="table-row">
                        <div className="table-dh">Number of Officers</div>
                        <div className="table-dd align-right">
                            {selectCompany.officersNumber ? selectCompany.officersNumber : ""}
                        </div>
                    </div>
                    :
                    null
                }
                {selectCompany.paidupCapitalOrdinaryShares ? 
                    <div className="table-row">
                        <div className="table-dh">Paid Up Capital (Ordinary Shares)</div>
                        {selectCompany.paidupCapitalOrdinaryShares.map((ordinaryShare,i) => {
                            return (
                                <div key={i} className="table-dd align-right">
                                    {`${ordinaryShare.currency} ${ordinaryShare.ordinary.replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,")}`}
                                </div>
                            )
                        })}
                       
                    </div>
                    :
                    null
                }
                {selectCompany.paidupCapitalPreferenceShares ? 
                    <div className="table-row">
                        <div className="table-dh">Paid Up Capital (Preference Shares)</div>
                        {selectCompany.paidupCapitalPreferenceShares.map((preferenceShare,i) => {
                            return (
                                <div key={i} className="table-dd align-right">
                                    {`${preferenceShare.currency} ${preferenceShare.preference.replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,")}`}
                                </div>
                            )
                        })}
                    </div>
                    :
                    null
                }
                {selectCompany.paidUpCapitalOthersShares ? 
                    <div className="table-row">
                        <div className="table-dh">Paid Up Capital (Others)</div>
                        {selectCompany.paidUpCapitalOthersShares.map((othersShare,i) => {
                            return (
                                <div key={i} className="table-dd align-right">
                                    {`${othersShare.currency} ${othersShare.others.replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,")}`}
                                </div>
                            )
                        })}
                    </div>
                    :
                    null
                }
                    
            </div>
        </div>
    </div>
);

export default OverviewCompany;
