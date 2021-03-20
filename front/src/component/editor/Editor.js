function Editor(props) {
    return (
        <tr id={props._id}>
            <td>{props.name}</td>
            <td>{props.contacts.map(contact =>
                <>{contact}, </>
            )}
            </td>
            <td><input type={"checkbox"} checked={props.isEditor}/></td>
            <td><input type={"checkbox"} checked={props.isExhibitor}/></td>
            <td><input type={"checkbox"} checked={props.isPotential}/></td>
            <td><input type={"button"} onClick={props.deleteEditor} name={props._id} value={"🗑"}/></td>
        </tr>
    )
}

export default Editor
