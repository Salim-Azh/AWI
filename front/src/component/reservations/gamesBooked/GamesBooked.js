function GamesBooked(props) {
    return (
        <tr id={props.game._id}>
            <td>{props.game.name}</td>
            <td>{props.total_qte}</td>
            <td>{props.exposed_qte}</td>
            <td>{props.proto}</td>
            <td>{props.zone}</td>
            <td>{props.state}</td>
            <td><input type={"button"} onClick={props.deleteGame} name={props.game._id} value={"🗑"}/></td>
        </tr>
    )
}

export default GamesBooked
/*
game: {
            type: String,
            required: true
        },
        total_qte: {
            type: Number,
            required: true
        },
        exposed_qte:{
            type: Number,
            required: true
        },
        proto: {
            type: Boolean,
            required: true
        },
        zone: {
            type: mongoose.Types.ObjectId
        },
        STATES CAN BE CALCULATED
        "place"//if zone exist in the document
        "a_place"//if zone doesn't exist in the document
state: {
    type: String,
enum: [

        "en attente de réception",//received=false;bring_by_exhibitor=false;
        "reçu",//received=true;bring_by_exhibitor=false;
        "apporté par exposant",//received=false;bring_by_exhibitor=true;
        "à renvoyer",//proto=true; received=true
        "renvoyé"//received=true;bring_by_exhibitor=false;proto=true;returned=true
    ]
 */
