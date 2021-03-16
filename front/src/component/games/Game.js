function Game(props) {
    return (
        <tr id={props._id}>
            <td>{props.name}</td>
            <td>{props.category}</td>
            <td>{props.duration}</td>
            <td>{props.zone}</td>
            <td>{props.countPlayer}</td>
            <td>{props.placed}</td>
            <td>{props.recieved}</td>
            <td>{props.need_volunteer}</td>
            <td>{props.date}</td>
            <td><input type={"button"} onClick={props.deleteGame} name={props._id}/></td>
        </tr>
    )
}

export default Game
