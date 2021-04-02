import React from "react";
import YearLinksTeams from "./yearlinks/yearlinks_teams";
import TableTeams from "./tables/table_teams";

class Teams extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
          error: null,
          API_KEY: localStorage.getItem('apiKey'),
          isLoaded: false,
          teams: [],
          competition: null
        };
    }

    gettingTeams = async(e) => { //get data from API
        const id = this.props.match.params.id;
        const year = this.props.match.params.year;

        const id_param = `/${id}`;
        const year_param = year? `?season=${year}` : "";

        const url = new URL(`https://api.football-data.org/v2/competitions${id_param}/teams${year_param}`);
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
            teams: data.teams,
        });

        const url_competition = new URL(`https://api.football-data.org/v2/competitions${id_param}`); //to display competition name in any case
        const response_comp = await fetch(url_competition, {headers});
        const data_comp = await response_comp.json();

        if(response_comp.ok){
            this.setState ({
                competition: data_comp.name
             });
        }
    }

    componentDidMount() {
        this.gettingTeams();
    }

    render () {
        return <div>
            <YearLinksTeams id={this.props.match.params.id}/>
            <form>
                <label htmlFor="teams-search">Search the team: </label>
                <input type="search" id="teams-search" name="q" placeholder="Enter team name" />
                <button>Search</button>
            </form>
            {this.state.competition? <h2>{`${this.state.competition} Teams`}</h2> : null}
            <TableTeams state={this.state} search={this.props.location.search}/>
        </div>;
    }
}

export default Teams;