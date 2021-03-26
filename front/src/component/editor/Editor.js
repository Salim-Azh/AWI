import {Nav} from "react-bootstrap"

function Editor(props) {
    return (
        <tr id={props._id}>
            <td><Nav.Link href={"/nav/editeur/" + props._id}>{props.name}</Nav.Link></td>
            <td>{props.contacts[0]}</td>
            <td><input type={"checkbox"} checked={props.isEditor}
                       onChange={props.handleEditor} id={props._id} name={"isEditor"}/></td>
            <td><input type={"checkbox"} checked={props.isExhibitor}
                       onChange={props.handleEditor} id={props._id} name={"isExhibitor"}/></td>
            <td><input type={"checkbox"} checked={props.isPotential}
                       onChange={props.handleEditor} id={props._id} name={"isPotential"}/></td>
            <td><input type={"button"} onClick={props.deleteEditor} name={props._id} value={"🗑"}/></td>
        </tr>
    )
}

export default Editor
