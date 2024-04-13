import React from "react";
import ListElement from "./ListElement";

function TableListing(props) {
    console.log("props in TableListing", props)

    return (
        <div className="list-container">
            {props.listTitle && <h2>{props.listTitle}</h2>}
            <table className="list-table">
                <thead>
                    <tr className="list-table-titles">
                        {props.listTitles > 0 ? props.listTitles.map(title => <th>{title}</th>) : console.warn("Please provide a list of titles to TableListing with the listTitles props.")}
                    </tr>
                </thead>
                <tbody>
                    {props.listElements > 0 ? props.listElements.map(element => <ListElement element={element} />) : console.warn("Please provide a list of elements to TableListing with the listElements props.")}
                </tbody>
            </table>
        </div>
    )
}

export default TableListing;