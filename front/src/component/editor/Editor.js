function Editor(props) {
    return (
        <tr id={props._id}>
            <td>{props.name}</td>
            <td>{props.contact}</td>
            <td><input type={"button"} onClick={props.deleteEditor} name={props._id} value={"🗑"}/></td>
        </tr>
    )
}

export default Editor
