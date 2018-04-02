import React from "react";
import "./NewsByCompany.css";

import moment from "moment";

const NewsByCompany = ({ newsByCompany }) => (
    <div className="wrapper-news-by-company-component">
        <div className="wrapper-news">
            {newsByCompany.length
                ? newsByCompany.map((el, i) => {
                      return (
                          <div key={i} className="wrapper-new-item">
                              <div className="wrapper-new-item-img">
                                  <img src={el.image ? el.image : null} alt="" />
                              </div>
                              <div className="wrapper-new-item-content">
                                  <a href={el.url ? el.url : null} target="_blank" className="new-title">
                                      {el.title ? el.title : null}
                                  </a>
                                  <p className="new-text">{el.content ? el.content : null}</p>
                              </div>
                          </div>
                      );
                  })
                : null}
        </div>
    </div>
);

export default NewsByCompany;
