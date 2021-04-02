import React from "react";
import YearLinksCompetition from "./yearlinks/yearlinks_competition";
import TableCompetition from "./tables/table_competition";
import FormDates from "./form_dates";

class Competition extends React.Component {
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

    gettingMatches = async(e) => { //get data from API
        const id = this.props.match.params.id;
        const year = this.props.match.params.year;

        const id_param = `/${id}`;
        const year_param = year? `?season=${year}` : "";

        const search = this.props.location.search;
        
        const search_param = search? search : year_param;

        const url = new URL(`https://api.football-data.org/v2/competitions${id_param}/matches${search_param}`);
        const headers = {'X-Auth-Token': this.state.API_KEY};
        const response = await fetch(url, {headers});
        const data = await response.json();

        if(!response.ok){
            this.setState ({error: data.message });
        }

        else this.setState({
            error: null,
            isLoaded: true,
            matches: data.matches,
        });

        const sorted = this.state.matches.sort((a,b) => { //sorting by start date
            let aDate = new Date(a.utcDate);
            let bDate = new Date(b.utcDate);
            
            return bDate - aDate;
        });
        this.setState({ matches: sorted });

        const url_competition = new URL(`https://api.football-data.org/v2/competitions${id_param}`); //to display competition name in any case
        const response_comp = await fetch(url_competition, {headers});
        const data_comp = await response_comp.json();

        if(response_comp.ok){
            this.setState ({
                name: data_comp.name
             });
        }
    }

    componentDidMount() {
        this.gettingMatches();
    }

    render () {
        return <div>
            <YearLinksCompetition id={this.props.match.params.id}/>
            <FormDates />
            {this.state.name? <h2>{`${this.state.name} Matches Calendar`}</h2> : null}
            <TableCompetition state={this.state} />
        </div>
    }
}

export default Competition;