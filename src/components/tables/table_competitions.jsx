import React from "react"
import { NavLink } from "react-router-dom";

const TableCompetitions = (props) => {
    let filtered = props.state.competitions.slice();
    const isLoaded = props.state.isLoaded;
    const error = props.state.error;
    const year = props.year;
    const params = new URLSearchParams(props.search);
    const q = params.get('q');

    if (year) { //year filtration
        if (year === 'earlier') {
            filtered = props.state.competitions.filter(competition => {
                const endDate = competition.currentSeason? new Date(competition.currentSeason.endDate) : new Date(2000);
                const endYear = endDate.getFullYear();

                return (endYear <= 2014);
            });   
        }
        else filtered = props.state.competitions.filter(competition => {
            const startDate = competition.currentSeason? new Date(competition.currentSeason.startDate) : new Date(2000);
            const endDate = competition.currentSeason? new Date(competition.currentSeason.endDate) : new Date(2000);
            const startYear = startDate.getFullYear();
            const endYear = endDate.getFullYear();

            return (year >= startYear && year <= endYear);
        });
    }

    if (q) { // search query filtration
        filtered = props.state.competitions.filter(competition => competition.name.includes(q));
    }

    if (error)
        return <div>{`An error occured: ${error}`}</div>;
    if (!isLoaded) {
        return <div>Loading...<br/>Try to reload in minute if stays. If doesn't work, check your API token.</div>;
    } else if (filtered.length) 
        return (
            <table cellSpacing="0" className="table">
                <thead>
                    <tr key="th-row">
                        <th>№</th>
                        <th>Area</th>
                        <th>Name</th>
                        <th>Start Date</th>
                        <th>End Date</th>
                    </tr>
                </thead>

                <tbody>
                    {filtered.map((competition, index) => (
                        <tr key={index}>
                            <td>{index + 1}</td>
                            <td>{competition.area.name}</td>
                            <td>
                                <span>{competition.name}</span>
                                <br/>
                                <NavLink to={`/teams/${competition.id}`}>Teams</NavLink>
                                <NavLink to={`/competition/${competition.id}`}>Calendar</NavLink>
                            </td>
                            <td>{competition.currentSeason?.startDate ?? "-"}</td>
                            <td>{competition.currentSeason?.endDate ?? "-"}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        );
    else return <div>No information with parameters given.</div>
}

export default TableCompetitions;