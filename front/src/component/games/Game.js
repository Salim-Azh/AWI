function Game(props) {
    return (
        <tr id={props._id}>
            <td>{props.name}</td>
            <td>{props.category}</td>
            <td>{props.zone}</td>
            <td>{props.countPlayer}</td>
            <td>{props.placed}</td>
            <td>{props.recieved}</td>
            <td>{props.need_volunteer}</td>
            <td>{props.date}</td>
            <td><button onClick={props.handleDelete}/></td>
        </tr>
    )
}

export default Game
