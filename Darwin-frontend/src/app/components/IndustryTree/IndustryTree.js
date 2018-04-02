import React from "react";
import "./IndustryTree.css";
import { request } from "http";

const IndustryTree = ({ sectionsIndustry, parentIndex, openChildren, currentLvl, path, checkNode }) => {
    const nextLvl = currentLvl + 1;

    const childrens = (children, parentIndexChild, currentLvlChild, currentPath) =>
        children.length ? (
            <IndustryTree
                openChildren={(index, parentI, lvl, path) => openChildren(index, parentI, lvl, path)}
                parentIndex={parentIndexChild}
                sectionsIndustry={children}
                currentLvl={currentLvlChild}
                path={currentPath}
                checkNode={(index, parentI, lvl, path) => checkNode(index, parentI, lvl, path)}
            />
        ) : null;

    return sectionsIndustry.length ? (
        <ul className="wrapper-industry-tree">
            {sectionsIndustry.map((el, i) => (
                <li key={el.id} className="industry-tree-item">
                    <div className="wrapper-industry-tree-item-content">
                        {/* <input type="checkbox" checked={el.isSelected} /> */}
                        <span onClick={() => checkNode(i, parentIndex, currentLvl, path)}>+</span>
                        {currentLvl <= 3 ? (
                            // <span
                            //     onClick={() => openChildren(i, parentIndex, currentLvl, path)}
                            //     className={el.isOpen ? "minus" : "plus"}
                            // >
                            //     >
                            // </span>
                            <img
                                onClick={() => openChildren(i, parentIndex, currentLvl, path)}
                                className={el.isOpen ? "minus" : "plus"}
                                src={require("../../../assets/images/icons/next.svg")}
                                alt=""
                            />
                        ) : null}
                        {el.sectionName}
                    </div>
                    {el.isOpen ? childrens(el.children, i, nextLvl, [...path, i]) : null}
                </li>
            ))}
        </ul>
    ) : null;
};

export default IndustryTree;
