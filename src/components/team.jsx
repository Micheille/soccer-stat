import React from "react";
import YearLinksTeam from "./yearlinks/yearlinks_team";
import TableTeam from "./tables/table_team";
import FormDates from "./form_dates";

class Team extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
          error: null,
          API_KEY: localStorage.getItem('apiKey'),
          isLoaded: false,
          matches: [],
          name: null
        };
    }

    gettingMatches = async(e) => {
        const id = this.props.match.params.id;
        const id_param = `/${id}`;

        const search = this.props.location.search;

        const url = new URL(`https://api.football-data.org/v2/teams${id_param}/matches${search}`);
        const headers = {'X-Auth-Token': this.state.API_KEY};
        const response = await fetch(url, {headers});
        const data = await response.json();

        if(!response.ok){
            this.setState ({
                error: data.message
            });
        }

        else this.setState({
            error: null,
            isLoaded: true,
            matches: data.matches
        });

        const sorted = this.state.matches.sort((a,b) => { //sorting by start date
            let aDate = new Date(a.utcDate);
            let bDate = new Date(b.utcDate);
            
            return bDate - aDate;
        });
        this.setState({ matches: sorted });

        const url_team = new URL(`https://api.football-data.org/v2/teams${id_param}`); //to display team name in any case
        const response_team = await fetch(url_team, {headers});
        const data_team = await response_team.json();

        if(response_team.ok){
            this.setState ({
                name: data_team.name
             });
        }
    }

    componentDidMount() {
        this.gettingMatches();
    }

    render () {
        return <div>
            <YearLinksTeam id={this.props.match.params.id}/>
            <FormDates />
            {this.state.name? <h2>{`${this.state.name} Team Matches Calendar`}</h2> : null}
            <TableTeam state={this.state}/>
        </div>
    }
}

export default Team;