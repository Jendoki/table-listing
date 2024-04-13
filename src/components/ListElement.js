import React from "react";

function ListElement(props) {
    const values = Object.values(props.element);

    return (
        <div>
            {values.map((value, index) => <td key={index}>{value}</td>)}
        </div>
    );
}

export default ListElement;
