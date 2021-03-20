function Editor(props) {
    return (
        <tr id={props._id}>
            <td>{props.name}</td>
            <td>{props.contacts}</td>
            <td><input type={"checkbox"} checked={props.isEditor} readOnly/></td>
            <td><input type={"checkbox"} checked={props.isExhibitor} readOnly/></td>
            <td><input type={"checkbox"} checked={props.isPotential} readOnly/></td>
            <td><input type={"button"} onClick={props.deleteEditor} name={props._id} value={"🗑"}/></td>
        </tr>
    )
}

export default Editor

/*
<td>{props.contacts.map((contact, index) =>
                <div key={index}>{contact}, </div>
            )}
            </td>

 */
