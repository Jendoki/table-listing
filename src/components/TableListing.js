import React, { useState } from "react";
import ListElement from "./ListElement";

function TableListing(props) {
    const [sortColumn, setSortColumn] = useState(null);
    const [sortDirection, setSortDirection] = useState('asc');

    const handleSort = (column) => {
        if (sortColumn === column) {
            setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
        } else {
            setSortColumn(column);
            setSortDirection('asc');
        }
    };

    const sortedListElements = [...props.listElements].sort((a, b) => {
        if (!sortColumn) return 0;

        const aValue = a[sortColumn];
        const bValue = b[sortColumn];

        if (aValue === undefined || bValue === undefined) return 0;

        if (aValue < bValue) {
            return sortDirection === 'asc' ? -1 : 1;
        }
        if (aValue > bValue) {
            return sortDirection === 'asc' ? 1 : -1;
        }
        return 0;
    });

    return (
        <div className="list-container">
            {props.listTitle && <h2>{props.listTitle}</h2>}
            <table className="list-table">
                <thead>
                    <tr className="list-table-titles">
                        {props.listTitles && props.listTitles.length > 0 ? props.listTitles.map(title =>
                            <th key={title} onClick={() => handleSort(title)}>
                                {title} {sortColumn === title && (
                                    sortDirection === 'asc' ? <p>&uarr;</p> : <p>&darr;</p>
                                )}
                            </th>
                        ) : console.warn("Please provide a list of titles to TableListing with the listTitles props.")}
                    </tr>
                </thead>
                <tbody>
                    {sortedListElements && sortedListElements.length > 0 ? sortedListElements.map((element, index) =>
                        <ListElement key={index} element={element} />
                    ) : console.warn("Please provide a list of elements to TableListing with the listElements props.")}
                </tbody>
            </table>
        </div>
    )
}

export default TableListing;
