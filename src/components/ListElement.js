import React from "react";

function ListElement(props) {
    const values = Object.values(props.element);

    return (
        <tr>
            {values.map((value, index) => <td key={index}>{value}</td>)}
        </tr>
    );
}

export default ListElement;
