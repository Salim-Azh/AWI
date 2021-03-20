function Bill(props) {
    return (
        <tr id={props._id}>
            <td>{props.name}</td>
            <td>{props.contact}</td>
            <td><input type={"button"} onClick={props.deleteBill} name={props._id} value={"🗑"}/></td>
        </tr>
    )
}

export default Bill
