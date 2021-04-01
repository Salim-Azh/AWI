import {Button, Modal} from "react-bootstrap";
import img from "../../public/img/addFiles.svg"
import "../editor/css/FormContainer.css"
import EditorForm from "../editor/EditorForm";
import GameForm from "../games/GameForm";
import FestivalForm from "../festivals/FestivalForm";
import ReservationForm from "../reservations/ReservationForm";
import GamesBookedForm from "../reservations/gamesBooked/GamesBookedForm";
import GamesBookedTable from "../reservations/gamesBooked/GamesBookedTable";
import ZoneForm from "../zone/ZoneForm";

const {useState} = require("react");

function FormContainer(props) {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    let form
    if(props.component === "EditorForm") {
        form = <EditorForm handleClick={props.handleClick}/>

    } else if(props.component === "GameForm") {
        form = <GameForm
            handleClick={props.handleClick}
            editorId={props.editorId}
            editorName={props.editorName}
        />

    } else if(props.component === "FestivalForm") {
        form = <FestivalForm handleClick={props.handleClick}/>

    } else if(props.component === "ReservationForm") {
        form = <ReservationForm exhibitors={props.exhibitors} handleClick={props.handleClick}/>

    } else if(props.component === "GamesBookedForm") {
        form = <GamesBookedForm
            reservationId={props.reservationId}
            handleClick={props.handleClick}
        />
    } else if(props.component === "ZoneForm") {
        form = <ZoneForm
            handleClick={props.handleClick}
        />
    }

    return (
        <>
            <Button onClick={handleShow} variant={"success"}>
                <img src={img} alt={"Ajouter"}/>
            </Button>

            <Modal
                show={show}
                onHide={handleClose}
                backdrop="static"
                keyboard={false}
            >
                <Modal.Header closeButton>
                    <Modal.Title>{props.title}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {form}
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="primary" onClick={handleClose}>Retour</Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default FormContainer
