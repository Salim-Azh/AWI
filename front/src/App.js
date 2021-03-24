import './App.css';

import 'bootstrap/dist/css/bootstrap.min.css';

import {Navbar, Nav, NavItem} from "react-bootstrap";
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";


import FilteredGamesTable from "./component/games/FilteredGamesTable"
import FormSignIn from "./component/signIn/FormSignIn"
import FilteredFestivalsTable from "./component/festivals/FilteredFestivalsTable"
import FilteredBillsTable from "./component/bills/FilteredBillsTable"
import EditorTabs from "./component/editor/EditorTabs"
import TabsReservations from "./component/reservations/TabsReservations";
import EditorDetail from "./component/editor/EditorDetail";
import GameDetail from "./component/games/GameDetail";

function App() {
  return (
      <Router>
        <div className="App">
          <Navbar expand="lg" bg="dark" variant="dark">
            <Navbar.Brand href="/festivals">Le festival des jeux</Navbar.Brand>
            <Navbar.Toggle aria-controls="responsive-navbar-nav"/>
            <Navbar.Collapse id="responsive-navbar-nav">
              <Nav className="mr-auto">
                <Nav.Link href="/festivals">Festivals</Nav.Link>
                <Nav.Link href="/jeux">Jeux</Nav.Link>

                <Nav.Link href="/editeurs">Éditeur</Nav.Link>
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
              <FilteredFestivalsTable/>
            </Route>
            <Route path="/editeurs">
              <EditorTabs/>
            </Route>
            <Route path="/editeur/:id">
              <EditorDetail/>
            </Route>

            <Route path="/jeux">
              <FilteredGamesTable/>
            </Route>

            <Route path="/jeu/:id">
              <GameDetail/>
            </Route>

            <Route path="/reservations">
              <TabsReservations/>
            </Route>

            <Route path="/factures">
              <FilteredBillsTable/>
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
