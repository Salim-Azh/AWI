import {Form, FormControl} from "react-bootstrap";
import {Component} from "react"

class SearchBar extends Component {
    constructor(props) {
        super(props)
        this.handleFilterTextChange = this.handleFilterTextChange.bind(this)
    }

    handleFilterTextChange(e) {
        this.props.onFilterTextChange(e.target.value)
    }

    render() {
        return (
            <Form>
                <FormControl
                    type="text"
                    placeholder="Search..."
                    value={this.props.filterText}
                    onChange={this.handleFilterTextChange}
                />
            </Form>
        )
    }
}

export default SearchBar
