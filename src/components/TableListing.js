import React from "react";
import ListElement from "./ListElement";

function TableListing(props) {
    return (
        <div className="list-container">
            <h2>{props.listTitle}</h2>
            <table className="list-table">
                <thead>
                    <tr className="list-table-titles">
                        {props.listTitles.map(title => <th>{title}</th>)}
                    </tr>
                </thead>
                <tbody>
                    {props.listElement.map(element => <ListElement element={element} />)}
                </tbody>
            </table>
        </div>
    )
}

export default TableListing;