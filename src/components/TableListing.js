import React from "react";
import ListElement from "./ListElement";
import { useState, useEffect } from "react";

// TODO
// - add search function
// - add pagination

function TableListing(props) {
    const fullListElements = props.listElements
    const [currentListElements, setCurrentListElements] = useState(fullListElements)
    const [searchTerm, setSearchTerm] = useState("")
    const [entriesNumber, setEntriesNumber] = useState("10")
    let filteredList = []

    function filterListElements(searchTerm) {
        if (searchTerm === "") {
            setCurrentListElements(fullListElements)
        } else {
            filteredList = fullListElements.filter(element => {
                const values = Object.values(element);
                return values.some(value =>
                    value.toString().toLowerCase().includes(searchTerm.toLowerCase())
                );
            });
            setCurrentListElements(filteredList);
        }
        console.log("filtered list", currentListElements)
    }

    useEffect(() => {
        filterListElements(searchTerm);
    }, [searchTerm]);

    return (
        <div className="list-container">
            {props.listTitle && <h2>{props.listTitle}</h2>}
            <div className="">
                <div>
                    <p>Show {entriesNumber} entries</p>
                </div>
                <div>
                    <form className="search-form">
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
        </div>
    )
}

export default TableListing;