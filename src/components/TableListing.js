import React, { useState, useEffect, useCallback } from "react";
import ListElement from "./ListElement";

function TableListing(props) {
    // State variables
    const fullListElements = props.listElements;
    const [currentListElements, setCurrentListElements] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [entriesNumber, setEntriesNumber] = useState("10");
    const [currentPage, setCurrentPage] = useState(1);
    const [sortColumn, setSortColumn] = useState(null);
    const [sortDirection, setSortDirection] = useState("asc");

    // Effect hook to trigger filtering and sorting of list elements when search term, current page, entries number, 
    // sort column, or sort direction changes.
    useEffect(() => {
        filterListElements(searchTerm, currentPage);
    }, [searchTerm, currentPage, entriesNumber, fullListElements, sortColumn, sortDirection]);


    // Filter list elements based on search term, current page, and sort options
    const filterListElements = useCallback((searchTerm, page) => {
        let filteredList = fullListElements;

        // Filter based on search term
        if (searchTerm !== "") {
            filteredList = fullListElements.filter(element => {
                const values = Object.values(element);
                return values.some(value =>
                    value.toString().toLowerCase().includes(searchTerm.toLowerCase())
                );
            });
        }

        // Sort based on sort options
        if (sortColumn) {
            filteredList = filteredList.slice().sort((a, b) => {
                const valueA = a[sortColumn];
                const valueB = b[sortColumn];

                // Perform sorting based on column type
                switch (getColumnType(sortColumn)) {
                    case 'string':
                        return sortDirection === 'asc' ? valueA.localeCompare(valueB) : valueB.localeCompare(valueA);
                    case 'number':
                        return sortDirection === 'asc' ? valueA - valueB : valueB - valueA;
                    case 'date':
                        return sortDirection === 'asc' ? new Date(valueA) - new Date(valueB) : new Date(valueB) - new Date(valueA);
                    default:
                        return 0;
                }
            });
        }

        // Pagination
        const startIndex = (page - 1) * parseInt(entriesNumber, 10);
        const endIndex = startIndex + parseInt(entriesNumber, 10);
        setCurrentListElements(filteredList.slice(startIndex, endIndex));
    }, [fullListElements, searchTerm, sortColumn, sortDirection, entriesNumber]);

    // Handle column sorting
    const handleColumnSort = useCallback((column) => {
        if (column === sortColumn) {
            setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
        } else {
            setSortColumn(column);
            setSortDirection('asc');
        }
    }, [sortColumn, sortDirection]);

    // Handle page change
    const onPageChange = useCallback((page) => {
        setCurrentPage(page);
    }, []);

    // Get the type of a column from the list titles
    function getColumnType(column) {
        const titleObj = props.listTitles.find(title => title.elementLabel === column);
        return titleObj ? titleObj.type : null;
    }

    function onFormSubmit(e) {
        e.preventDefault();
    }

    // Calculate the start and end index of the displayed entries
    const startIndex = (currentPage - 1) * parseInt(entriesNumber, 10) + 1;
    const endIndex = Math.min(currentPage * parseInt(entriesNumber, 10), fullListElements.length);

    // Render the table listing component
    return (
        <div className="list-container">
            {/* Render the list title if provided */}
            {props.listTitle && <h2>{props.listTitle}</h2>}
            {/* Render filtering options (entries per page and search) */}
            <div className="row-container">
                <div className="entries-container">
                    <p>Show </p>
                    <form className="entries-form" onSubmit={onFormSubmit}>
                        <select id="entries" name="entries" value={entriesNumber} onChange={(e) => setEntriesNumber(e.target.value)}>
                            {[5, 10, 20].map(value => (
                                <option key={value} value={value}>{value}</option>
                            ))}
                        </select>
                    </form>
                    <p> entries</p>
                </div>
                <div>
                    <form className="search-form" onSubmit={onFormSubmit}>
                        <label htmlFor="search">Search:</label>
                        <input type="text" id="search" name="search" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
                    </form>
                </div>
            </div>
            {/* Render the table headers */}
            <table className="list-table">
                <thead>
                    <tr className="list-table-titles">
                        {/* Render each table header based on the list titles */}
                        {props.listTitles && props.listTitles.length > 0 ? props.listTitles.map((titleObj, index) => (
                            <th key={index} onClick={() => handleColumnSort(titleObj.elementLabel)}>
                                {titleObj.label} {sortColumn === titleObj.elementLabel && (
                                    sortDirection === 'asc' ? '▲' : '▼'
                                )}
                            </th>
                        )) : null}
                    </tr>
                </thead>
                {/* Render the table body with list elements */}
                <tbody>
                    {currentListElements && currentListElements.length > 0 ? currentListElements.map((element, index) => <ListElement key={index} element={element} />) : null}
                </tbody>
            </table>
            {/* Render pagination and entry counter */}
            <div className="pagi-and-counter-container">
                <div className="pagination">
                    <button onClick={() => onPageChange(currentPage - 1)} disabled={currentPage === 1}>Previous</button>
                    <span>{currentPage}</span>
                    <button onClick={() => onPageChange(currentPage + 1)} disabled={currentListElements.length < parseInt(entriesNumber, 10)}>Next</button>
                </div>
                <div className="counter">
                    Showing {startIndex} to {endIndex} out of {fullListElements.length} entries
                </div>
            </div>
        </div>
    )
}

export default TableListing;
