import {Component} from "react";
import {Button, Nav} from "react-bootstrap"

class Exhibitor extends Component {

    constructor(props) {
        super(props)

        this.handleAddReservation = this.handleAddReservation.bind(this)
    }

    handleAddReservation(event) {
        this.props.addReservation({exhibitor: event.target.name})
    }

    render() {
        return (
            <tr id={this.props._id}>
                <td><Nav.Link href={"/nav/editeur/" + this.props._id}>{this.props.name}</Nav.Link></td>
                <td>{this.props.contacts[0]}</td>
                <td><Button variant={"primary"} onClick={this.handleAddReservation} name={this.props._id}>Créer une réservation</Button></td>
            </tr>
        )
    }
}

export default Exhibitor
