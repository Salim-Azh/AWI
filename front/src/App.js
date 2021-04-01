import './App.css';

import 'bootstrap/dist/css/bootstrap.min.css';

import {Navbar, Nav} from "react-bootstrap";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from "react-router-dom";


import FormSignIn from "./component/signIn/FormSignIn"
import FilteredFestivalsTable from "./component/festivals/FilteredFestivalsTable"
import FilteredBillsTable from "./component/bills/FilteredBillsTable"
import EditorTabs from "./component/editor/EditorTabs"
import TabsReservations from "./component/reservations/TabsReservations";
import EditorDetail from "./component/editor/EditorDetail";
import GameDetail from "./component/games/GameDetail";
import ReservationDetail from "./component/reservations/ReservationDetail";
import TabsGames from "./component/games/TabsGames";
import FilteredZonesTable from "./component/zone/FilteredZonesTable";
import ZoneDetail from "./component/zone/ZoneDetail";

function App() {
  return (
      <Router>
        <div className="App">
          <Route path="/nav">
            <Navbar expand="lg" bg="dark" variant="dark">
              <Navbar.Brand href="/nav/festivals">Le festival des jeux</Navbar.Brand>
              <Navbar.Toggle aria-controls="responsive-navbar-nav"/>
              <Navbar.Collapse id="responsive-navbar-nav">
                <Nav className="mr-auto">
                  <Nav.Link href="/nav/festivals">Festivals</Nav.Link>
                  <Nav.Link href="/nav/jeux">Jeux</Nav.Link>
                  <Nav.Link href="/nav/editeurs">Éditeur</Nav.Link>
                  <Nav.Link href="/nav/reservations">Réservations</Nav.Link>
                  <Nav.Link href="/nav/zones">Zones</Nav.Link>
                  <Nav.Link href="/nav/factures">Factures</Nav.Link>
                </Nav>
                <Nav>
                  <Nav.Link href="/deconnexion">Deconnexion</Nav.Link>
                </Nav>
              </Navbar.Collapse>
            </Navbar>
          </Route>
          <Switch>
            <Route exact path="/">
              <Redirect to= "/login"/>
            </Route>
            <Route path="/login" component={FormSignIn}/>

            <Route path="/nav/festivals">
              <FilteredFestivalsTable/>
            </Route>

            <Route path="/nav/editeurs">
              <EditorTabs/>
            </Route>

            <Route path="/nav/editeur/:id">
              <EditorDetail/>
            </Route>

            <Route path="/nav/jeux">
              <TabsGames/>
            </Route>

            <Route path="/nav/jeu/:id">
              <GameDetail/>
            </Route>

            <Route path="/nav/reservations">
              <TabsReservations/>
            </Route>

            <Route path="/nav/reservation/:id">
              <ReservationDetail/>
            </Route>

            <Route path="/nav/zones">
              <FilteredZonesTable/>
            </Route>

            <Route path="/nav/zone/:id">
              <ZoneDetail/>
            </Route>

            <Route path="/nav/factures">
              <FilteredBillsTable/>
            </Route>
          </Switch>
        </div>
      </Router>
  );
}

export default App;
