function Game(props) {
    return (
        <tr id={props._id}>
            <td>{props.name}</td>
            <td>{props.category}</td>
        </tr>
    )
}
/*
            <td>{props.duree}</td>
            <td>{props.editor.name}</td>
            <td>{props.nbjoueur}</td>
            <td>{props.zone}</td>
            <td>{props.proto}</td>
            <td>{props.exposant.name}</td>
            <td>{props.avant_1ere}</td>
            <td>{props.qté}</td>
            <td>{props.tables}</td>
            <td>{props.placé?}</td>
            <td>{props.recu?}</td>
            <td>{props.benevoles?}</td>
            <td>{props.dateSaisie}</td>
 */

export default Game
