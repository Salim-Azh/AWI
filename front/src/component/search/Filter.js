import {Component} from "react"
import {Form, FormControl} from "react-bootstrap";

class Filter extends Component {
    constructor(props) {
        super(props)
        this.handleFilterChange = this.handleFilterChange.bind(this)
    }

    handleFilterChange(e) {
        this.props.onFilterChange(e.target.value)
    }

    render() {
        return (
            <Form>
                <FormControl as={"select"} onChange={this.handleFilterChange}>
                    {this.props.filters.map(filter => {
                        <option name={filter.english}></option>
                    })}
                </FormControl>
            </Form>
        )
    }
}

export default Filter
