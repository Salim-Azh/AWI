function Editor(props) {
    return (
        <tr id={props._id}>
            <td>{props.name}</td>
            <td>{props.contact}</td>
            <td><input type={"button"} onClick={props.deleteGame} name={props._id}/></td>
        </tr>
    )
}

export default Editor
