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
        const textField = "Recherche par " + this.props.filter.french + "..."

        return (
            <Form>
                <FormControl
                    type="text"
                    placeholder={textField}
                    value={this.props.filterText}
                    onChange={this.handleFilterTextChange}
                />
            </Form>
        )
    }
}

export default SearchBar
