import React from "react";
import { BrowserRouter as Router, Switch, Route, NavLink, Redirect } from "react-router-dom";
import Competitions from "./competitions";
import Teams from "./teams";
import Team from "./team";
import Competition from "./competition";

class Container extends React.Component {
    render () {
        return <div className="container">
                <Router basename="/soccer-stat">
                    <div className="top clearfix">
                        <div className="form-api">
                            <label htmlFor="apikey" >API Token: </label>
                            <input type="text" id="apikey" name="apikey" 
                            defaultValue={localStorage.getItem('apiKey')} placeholder="Enter valid API Key" required />
                            <button onClick = {() => {
                                localStorage.clear();
                                localStorage.setItem('apiKey', document.getElementById("apikey").value);
                                document.location.reload();
                            }}>
                                Confirm
                            </button>
                        </div>

                        <nav>
                            <NavLink to="/сompetitions" className="link-home">All the competitions</NavLink>
                        </nav>                        
                    </div>                                        

                    <Switch>
                        <Route exact path="/" component={Competitions} />
                        <Route exact path="/сompetitions/:year?" component={Competitions} />

                        <Redirect exact from="/teams" to="/teams/2000" />
                        <Route path="/teams/:id?/:year?" component={Teams} />  

                        <Redirect exact from="/competition" to="/competition/2000" />
                        <Route path="/competition/:id?/:year?" component={Competition} />

                        <Route path="/team/:id" component={Team} />
                        <Redirect from="/team" to="/team/4" />

                        <Route children={()=><div>
                                <p>Page does not exist.</p>
                            </div>} />
                    </Switch>
                </Router>
        </div>
    }
}

export default Container;