import { BsSearch } from "react-icons/bs";
import {Form, Button, FormControl} from "react-bootstrap";

//const {useHistory} = require("react-router-dom");

const SearchBar = ({searchQuery, setSearchQuery}) => {
/*
    const history = useHistory();
    const onSubmit = e => {
        history.push(`?s=${searchQuery}`)
        //e.preventDefault()
    };
 */

    return (
        <Form id={"formSearch"} inline action="/" method="get" autoComplete="off">

            <label htmlFor="header-search">
                <span className="visually-hidden">Recherche de jeux</span>
            </label>
            <FormControl
                value={searchQuery}
                onChange={e => { setSearchQuery(e.target.value); }}
                type="text"
                id="header-search"
                placeholder="Recherche de jeux"
                name="s"
            />
            <Button type={"submit"}><BsSearch /></Button>
        </Form>
    )
}

export default SearchBar;