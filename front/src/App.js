import './App.css';

import 'bootstrap/dist/css/bootstrap.min.css';

import {Navbar, Nav, NavDropdown} from "react-bootstrap";
import FilteredGamesTable from "./component/games/FilteredGamesTable"

import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";

function App() {

  /*
    const games = [
      {id: 0, name: "Jeu de l'oie", category: "enfant"},
      {id: 1, name: "l'autre jeu", category: "Adulte"},
      {id: 1, name: "animan", category: "Adulte"},
      {id: 1, name: "calcif", category: "Adulte"},
    ]
   */

  //const games = gameHandler.getGamesFromDB()

  return (
      <Router>
        <div className="App">
          <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
            <Navbar.Brand href="/home">L'olympiade des jeux</Navbar.Brand>
            <Navbar.Toggle aria-controls="responsive-navbar-nav"/>
            <Navbar.Collapse id="responsive-navbar-nav">
              <Nav className="mr-auto">
                <Nav.Link href="/jeux">Jeux</Nav.Link>
                <Nav.Link href="/tables">Tables</Nav.Link>

                <NavDropdown title="Éditeur" id="collasible-nav-dropdown">
                  <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
                  <NavDropdown.Item href="#action/3.2">Another action</NavDropdown.Item>
                  <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
                  <NavDropdown.Divider/>
                  <NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item>
                </NavDropdown>
              </Nav>
              <Nav>

                <Nav.Link to="/connexion">Connexion</Nav.Link>
                <Nav.Link to="/inscription">Inscription</Nav.Link>

              </Nav>
            </Navbar.Collapse>
          </Navbar>



          <Switch>
            <Route path="/jeux">
              <FilteredGamesTable/>
            </Route>
            <Route path="/table">

            </Route>
            <Route path="/connexion">

            </Route>
            <Route path={"/inscription"}>

            </Route>

          </Switch>

        </div>
      </Router>
  );
}

export default App;
