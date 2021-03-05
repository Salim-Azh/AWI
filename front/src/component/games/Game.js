
function Game(props) {
    return (
        <tr id={props._id}>
            <td>{props.name}</td>
            <td>{props.category}</td>
        </tr>
    )
}

export default Game
