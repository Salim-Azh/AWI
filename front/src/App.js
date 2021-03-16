import './App.css';

import 'bootstrap/dist/css/bootstrap.min.css';

import {Navbar, Nav} from "react-bootstrap";
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";


import FilteredGamesTable from "./component/games/FilteredGamesTable"
import FormSignIn from "./component/signIn/FormSignIn";
import FilterableEditorsTable from "./component/editor/FilteredEditorsTable";


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
                <Nav.Link href="/festivals">Festivals</Nav.Link>
                <Nav.Link href="/jeux">Jeux</Nav.Link>

                <Nav.Link href="/editeur">Éditeur</Nav.Link>

                <Nav.Link href="/zones">Zones</Nav.Link>
                <Nav.Link href="/tables">Tables</Nav.Link>
                <Nav.Link href="/reservations">Réservations</Nav.Link>
                <Nav.Link href="/factures">Factures</Nav.Link>
              </Nav>
              <Nav>

                <Nav.Link href="/connexion">Connexion</Nav.Link>
                <Nav.Link href="/inscription">Inscription</Nav.Link>

              </Nav>
            </Navbar.Collapse>
          </Navbar>

          <Switch>
            <Route path="/festivals">

            </Route>
            <Route path="/editeur">
              <FilterableEditorsTable/>
            </Route>
            <Route path="/jeux">
              <FilteredGamesTable/>
            </Route>
            <Route path="/table">

            </Route>
            <Route path="/zones">

            </Route>

            <Route path="/reservations">

            </Route>

            <Route path="/factures">

            </Route>

            <Route path="/connexion">

            </Route>
            <Route path="/inscription">
              <FormSignIn/>
            </Route>

          </Switch>

        </div>
      </Router>
  );
}

export default App;
