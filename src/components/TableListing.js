import React from "react";
import ListElement from "./ListElement";

function TableListing(props) {
    const listTitles = props.listElements.length > 0
        ? Object.keys(props.listElements[0]).map(title => title.charAt(0).toUpperCase() + title.slice(1))
        : [];

    return (
        <div className="list-container">
            <h2>{props.listTitle}</h2>
            <table className="list-table">
                <tr className="list-table-titles">
                    {listTitles.map(title => <th>{title}</th>)}
                </tr>
                {props.listElement.map(element => <ListElement element={element} />)}
            </table>
        </div>
    )
}

export default TableListing;