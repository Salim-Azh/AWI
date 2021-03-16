function Editor(props) {
    return (
        <tr id={props._id}>
            <td>{props.name}</td>
            <td>{props.address}</td>
        </tr>
    )
}

export default Editor
