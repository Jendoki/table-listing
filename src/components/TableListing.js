import React, { useState, useEffect } from "react";
import ListElement from "./ListElement";

function TableListing(props) {
    const fullListElements = props.listElements;
    const [currentListElements, setCurrentListElements] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [entriesNumber, setEntriesNumber] = useState("10");
    const [currentPage, setCurrentPage] = useState(1);

    useEffect(() => {
        filterListElements(searchTerm, currentPage);
    }, [searchTerm, currentPage]);

    function filterListElements(searchTerm, page) {
        let filteredList = fullListElements;

        if (searchTerm !== "") {
            filteredList = fullListElements.filter(element => {
                const values = Object.values(element);
                return values.some(value =>
                    value.toString().toLowerCase().includes(searchTerm.toLowerCase())
                );
            });
        }

        const startIndex = (page - 1) * parseInt(entriesNumber, 10);
        const endIndex = startIndex + parseInt(entriesNumber, 10);
        setCurrentListElements(filteredList.slice(startIndex, endIndex));
    }

    function onPageChange(page) {
        setCurrentPage(page);
    }

    function onFormSubmit(e) {
        e.preventDefault();
    }

    return (
        <div className="list-container">
            {props.listTitle && <h2>{props.listTitle}</h2>}
            <div className="row-container">
                <div className="entries-container">
                    <p>Show </p>
                    <form className="entries-form" onSubmit={onFormSubmit}>
                        <select id="entries" name="entries" onChange={(e) => setEntriesNumber(e.target.value)}>
                            <option value="5" selected={entriesNumber === "5"}>5</option>
                            <option value="10" selected={entriesNumber === "10"}>10</option>
                            <option value="20" selected={entriesNumber === "20"}>20</option>
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
            <table className="list-table">
                <thead>
                    <tr className="list-table-titles">
                        {props.listTitles && props.listTitles.length > 0 ? props.listTitles.map(title => <th key={title}>{title}</th>) : console.warn("Please provide a list of titles to TableListing with the listTitles props.")}
                    </tr>
                </thead>
                <tbody>
                    {currentListElements && currentListElements.length > 0 ? currentListElements.map((element, index) => <ListElement key={index} element={element} />) : console.warn("Please provide a list of elements to TableListing with the listElements props.")}
                </tbody>
            </table>
            <div className="pagination">
                <button onClick={() => onPageChange(currentPage - 1)} disabled={currentPage === 1}>Previous</button>
                <span>{currentPage}</span>
                <button onClick={() => onPageChange(currentPage + 1)} disabled={currentListElements.length < parseInt(entriesNumber, 10)}>Next</button>
            </div>
        </div>
    )
}

export default TableListing;
