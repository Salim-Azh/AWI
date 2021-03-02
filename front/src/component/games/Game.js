
function Game(props) {
    return (
        <div id={props.id}>
            <h2>{props.name}</h2>
            <div>{props.category}</div>
        </div>
    )
}

export default Game