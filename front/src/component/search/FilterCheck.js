import {Component} from "react";
import {Form, FormControl} from "react-bootstrap";

class FilterCheck extends Component {
    constructor(props) {
        super(props);

        this.handleCheckChange = this.handleCheckChange.bind(this)

        this.state = {
            listFilter: this.props.filters.map(filter =>
                <td key={filter.english}>
                    <Form.Check name={filter.english} label={filter.french}
                                onChange={this.handleCheckChange}
                    />
                </td>
            )
        }
    }

    handleCheckChange(e) {
        this.props.onChecked(e.target.name, e.target.checked)
        // toggle les autres
    }

    render() {
        return (
            <>
                {this.state.listFilter}
            </>
        )
    }
}

export default FilterCheck
