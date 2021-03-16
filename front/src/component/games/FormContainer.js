import {Button, Modal} from "react-bootstrap";
import GameForm from "./GameForm";
import img from "../../img/addFiles.svg"
import "./css/FormContainer.css"

const {useState} = require("react");

function FormContainer(props) {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    // TODO faire en sorte d'appeler le submit du GameForm dans le bouton ajouter
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
                    <Modal.Title>Ajouter un jeu</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <GameForm handleClick={props.handleClick}/>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={handleClose}>Ajouter</Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default FormContainer
