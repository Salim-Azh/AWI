import {Button, Modal} from "react-bootstrap";
import img from "../../img/addFiles.svg"
import "./css/FormContainer.css"
import EditorForm from "./TableForm";

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
                    <Modal.Title>Ajouter un éditeur/exposant</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <EditorForm handleClick={props.handleClick}/>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={handleClose}>OK</Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default FormContainer
