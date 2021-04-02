import React from "react"
import { NavLink } from "react-router-dom";

const TableCompetition = (props) => {
    const matches = props.state.matches;
    const isLoaded = props.state.isLoaded;
    const error = props.state.error;

    if (error)
        return <div>{`An error occured: ${error}`}</div>;
    if (!isLoaded) {
        return <div>Loading...<br/>Try to reload in minute if stays. If doesn't work, check your API token.</div>;
    } else if (matches.length) 
        return (
            <table cellSpacing="0" className="table">
                <thead>
                    <tr key="th-row">
                        <th>№</th>
                        <th>Home Team</th>
                        <th>Away Team</th>
                        <th>Local Date</th>
                        <th>Status</th>
                        <th>Winner</th>
                    </tr>
                </thead>

                <tbody>
                    {matches.map((match, index) => {
                        const date = new Date(match.utcDate).toLocaleString();
                        return <tr key={index}>
                            <td>{index + 1}</td>
                            <td>
                                <span>{match.homeTeam.name}</span>
                                <br />
                                <NavLink to={`/team/${match.homeTeam.id}`}>Calendar</NavLink>
                            </td>
                            <td>
                                <span>{match.awayTeam.name}</span>
                                <br />
                                <NavLink to={`/team/${match.awayTeam.id}`}>Calendar</NavLink>
                            </td>
                            <td>{date}</td>
                            <td className="td-status">{match.status}</td>
                            <td className="td-winner">{match.score.winner? match.score.winner: "-"}</td>
                        </tr>
                    })}
                </tbody>
            </table>
        );
    else return <div>No information with parameters given.</div>
}

export default TableCompetition;