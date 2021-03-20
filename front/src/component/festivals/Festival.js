function Festival(props) {
    return (
        <tr id={props._id}>
            <td>{props.name}</td>
            <td>{props.contact}</td>
            <td><input type={"button"} onClick={props.deleteFestival} name={props._id} value={"🗑"}/></td>
        </tr>
    )
}

export default Festival
