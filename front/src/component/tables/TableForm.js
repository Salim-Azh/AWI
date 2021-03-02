import {Component} from "react";

class TableForm extends Component {

    constructor(props) {
        super(props)
        this.state = {newTable: ""}

        this.submit = this.submit.bind(this)
        this.handleChange = this.handleChange.bind(this)
    }

    handleChange(event) {
        this.setState({newTable: event.target.value})
    }

    submit() {
        this.props.handleClick(this.state.newTable)
        this.setState({newTable: ""})
    }

    render() {
        return (
            <form>
                <input type="text" value={this.state.newTable} placeholder="Table name" onChange={this.handleChange}/>
                <input type="button" value="add" onClick={this.submit}/>
            </form>
        )
    }
}

export default TableForm