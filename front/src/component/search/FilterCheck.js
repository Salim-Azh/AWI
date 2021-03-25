import {Component} from "react";
import {Form} from "react-bootstrap";

class FilterCheck extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <>
                <td>
                    <Form.Label>
                        Besoins de bénévoles ?
                    <Form.Check name={"need_volunteer"}
                                onChange={this.props.onChecked} checked={this.props.need_volunteer}
                    />
                    </Form.Label>
                </td>
                <td>
                    <Form.Label>
                        Editeur présent ?
                    <Form.Check name={"isEditorHere"}
                                onChange={this.props.onChecked} checked={this.props.isEditorHere}
                    />
                    </Form.Label>
                </td>
                <td>
                    <Form.Label>
                        CR envoyé ?
                    <Form.Check name={"reportSent"}
                                onChange={this.props.onChecked} checked={this.props.reportSent}
                    />
                    </Form.Label>
                </td>
            </>
        )
    }
}

export default FilterCheck
