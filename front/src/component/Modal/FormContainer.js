import {Button, Modal} from "react-bootstrap";
import img from "../../img/addFiles.svg"
import "../editor/css/FormContainer.css"
import EditorForm from "../editor/EditorForm";
import GameForm from "../games/GameForm";

const {useState} = require("react");

function FormContainer(props) {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    let form
    if(props.component === "EditorForm") {
        form = <EditorForm handleClick={props.handleClick}/>
    } else if(props.component === "GameForm") {
        form = <GameForm handleClick={props.handleClick}/>
    }
    // TODO faire le component ajouter un jeu a un editeur ici aussi
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
                    <Modal.Title>{props.title}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {form}
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="primary" onClick={handleClose}>OK</Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default FormContainer
