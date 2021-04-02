import React from "react";
import YearLinksCompetitions from "./yearlinks/yearlinks_competitions";
import TableCompetitions from "./tables/table_competitions";

class Competitions extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
          error: null,
          API_KEY: localStorage.getItem('apiKey'),
          isLoaded: false,
          competitions: []
        };
    }

    gettingCompetitions = async(e) => { //get data from API
        const url = new URL(`https://api.football-data.org/v2/competitions`);
        const headers = {'X-Auth-Token': this.state.API_KEY};
        const response = await fetch(url, {headers});
        const data = await response.json();

        if(!response.ok){
            this.setState ({
                error: data.message 
            });
        }
        else {
            this.setState({
                error: null,
                isLoaded: true,
                competitions: data.competitions
            });

            const sorted = this.state.competitions.sort((a,b) => { //sorting by start date
                let date = new Date('2000-01-01');
                let aDate, bDate;
                if (!a.currentSeason) aDate = date;
                else aDate = new Date(a.currentSeason.startDate);
                if (!b.currentSeason) bDate = date;
                else bDate = new Date(b.currentSeason.startDate);
                
                return bDate - aDate;
            });
            this.setState({ competitions: sorted });
        }        
    }

    componentDidMount() {
        this.gettingCompetitions();
    }

    render () {
        return <div>            
            <form>
                <label htmlFor="competitions-search">Search the competition: </label>
                <input type="search" id="competitions-search" name="q" placeholder="Enter competition name" />
                <button>Search</button>
            </form>
            <YearLinksCompetitions />
            <div>
                <h2>Competitions</h2>
                <TableCompetitions state={this.state} year={this.props.match.params.year} search={this.props.location.search} />
            </div>            
        </div>        
    }
}

export default Competitions;