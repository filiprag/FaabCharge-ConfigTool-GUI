import logo from './logo.svg';

import CreateItem from './components/pages/Items/CreateItem.js'
import AllItems from './components/pages/Items/AllItems'
import UpdateItem from "./components/pages/Items/UpdateItem";
import CompareItems from "./components/pages/Items/CompareItems";

import CreateComponent from './components/pages/Components/CreateComponent.js'
import AllComponents from './components/pages/Components/AllComponents.js'
import UpdateComponent from './components/pages/Components/UpdateComponent.js'

import CreateConfiguration from './components/pages/Configurations/CreateConfiguration.js'
import AllConfigurations from './components/pages/Configurations/AllConfigurations.js'
import UpdateConfiguration from './components/pages/Configurations/UpdateConfiguration.js'
import CompareConfigurations from "./components/pages/Configurations/CompareConfigurations";

import Login from './components/pages/Login/Login.js'

import { BrowserRouter as Router, Link, Switch, Route, Redirect } from 'react-router-dom'
import Navbar from './components/shared/navbar.js'
import Footer from './components/shared/footer'
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css'

function App() {

  function ProtectedRoute({children, ...rest}){

    return(
      <Route {...rest} render={() => {

        return localStorage.getItem('isAuth')? children: <Redirect to='/Login' />
      }} />
    )
  }

  return (
    <div className="App ">
      <Router>
        <Navbar />
        <div className="body">
          <div className="p-5 ">
            <Switch>
              <ProtectedRoute exact path="/CreateConfiguration">
                <CreateConfiguration element="Configuration" />
              </ProtectedRoute>
              <ProtectedRoute exact path="/AllConfigurations">
                <AllConfigurations element="Configuration" />
              </ProtectedRoute>
              <ProtectedRoute
                exact
                path="/UpdateConfiguration"
                component={UpdateConfiguration}
                id={null}
              ></ProtectedRoute>
              <ProtectedRoute exact path="/CompareConfigurations">
                <CompareConfigurations />
              </ProtectedRoute>

              <ProtectedRoute exact path="/CreateItem">
                <CreateItem element="Item" />
              </ProtectedRoute>
              <ProtectedRoute
                exact
                path="/UpdateItem"
                component={UpdateItem}
                id={null}
              ></ProtectedRoute>
              <ProtectedRoute exact path="/AllItems">
                <AllItems />
              </ProtectedRoute>
              <ProtectedRoute exact path="/CompareItems">
                <CompareItems />
              </ProtectedRoute>

              <ProtectedRoute exact path="/CreateComponent">
                <CreateComponent props element="Component" />
              </ProtectedRoute>
              <ProtectedRoute
                exact
                path="/UpdateComponent"
                component={UpdateComponent}
                id={null}
              ></ProtectedRoute>
              <ProtectedRoute exact path="/AllComponents">
                <AllComponents />
              </ProtectedRoute>

              <Route path="/Login">
                <Login />
              </Route>
            </Switch>
          </div>
        </div>
        <Footer />
      </Router>
    </div>
  );
}

export default App;
