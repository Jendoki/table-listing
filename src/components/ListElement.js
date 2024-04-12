function ListElement(props) {
    const values = Object.values(props.element);

    return (
        <>
            {values.map((value, index) => <td key={index}>{value}</td>)}
        </>
    );
}

export default ListElement;
