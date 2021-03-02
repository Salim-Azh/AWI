import './App.css';

import 'bootstrap/dist/css/bootstrap.min.css';

import {Navbar, Nav, NavDropdown} from "react-bootstrap";

//import TableList from "./component/tables/TableList"
import GameList from "./component/games/GameList";
import getGamesFromDB from "./component/games/GetGamesFromDB"
import filterGames from "./component/search/filterGames"
import {useState} from "react";
import SearchBar from "./component/search/Search";

function App() {

  const { search } = window.location;
  const query = new URLSearchParams(search).get('s');
  let games = getGamesFromDB

  let [searchQuery, setSearchQuery] = useState(query || '');

  const filteredGames = filterGames(games, query);

  return (
      <div className="App">
        <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
          <Navbar.Brand href="#home">L'olympiade des jeux</Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav"/>
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="mr-auto">
              <Nav.Link href="#jeux">Jeux</Nav.Link>
              <Nav.Link href="#tables">Tables</Nav.Link>
              <NavDropdown title="Éditeur" id="collasible-nav-dropdown">
                <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
                <NavDropdown.Item href="#action/3.2">Another action</NavDropdown.Item>
                <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
                <NavDropdown.Divider/>
                <NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item>
              </NavDropdown>

              <SearchBar searchQuery={searchQuery}
                        setSearchQuery={setSearchQuery}/>

            </Nav>
            <Nav>
              <Nav.Link href="#deets">Connexion</Nav.Link>
              <Nav.Link eventKey={2} href="#memes">
                Dank memes
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Navbar>

        <GameList id={"jeux"} games={filteredGames} query={query}/>

      </div>
  );
}

export default App;

//        <TableList id={"tables"} name={"Les tables du sud"} tables={["La table de l'enfer", "L'autre table"]}/>