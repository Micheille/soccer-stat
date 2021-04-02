import React from "react"
import { NavLink } from "react-router-dom";

const TableTeams = (props) => {
    let filtered = props.state.teams.slice();
    const isLoaded = props.state.isLoaded;
    const error = props.state.error;
    const params = new URLSearchParams(props.search);
    const q = params.get('q');

    if(q) {  // search query filtration
        filtered = props.state.teams.filter(team => team.name.includes(q));
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
                        <th>Venue</th>
                        <th>Website</th>
                    </tr>
                </thead>

                <tbody>
                    {filtered.map((team, index) => (
                        <tr key={index}>
                            <td>{index + 1}</td>
                            <td>{team.area.name}</td>
                            <td>
                                <span>{team.name}</span>
                                <br />
                                <NavLink to={`/team/${team.id}`}>Calendar</NavLink>
                            </td>
                            <td>{team.venue}</td>
                            <td>{team.website}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        );
    else return <div>No information with parameters given.</div>
}

export default TableTeams;