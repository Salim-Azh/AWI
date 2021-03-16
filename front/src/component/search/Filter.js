import {Component} from "react"
import {Form, FormControl} from "react-bootstrap";

class Filter extends Component {
    constructor(props) {
        super(props)
        this.handleFilterChange = this.handleFilterChange.bind(this)
    }

    listFilter = this.props.filters.map(filter =>
        <option key={filter.english} value={filter.english + "," + filter.french}>{filter.french}</option>
    )

    handleFilterChange(e) {
        this.props.onFilterChange(e.target.value.split(",")[0], e.target.value.split(',')[1])
    }

    render() {
        return (
            <Form>
                <FormControl as={"select"} onChange={this.handleFilterChange}>
                    {this.listFilter}
                </FormControl>
            </Form>
        )
    }
}

export default Filter
