import React from "react";
import { NavLink } from "react-router-dom";

const YearLinksCompetitions = () => {
    const Links = [];
    const basename="/soccer-stat";
    Links.push(<li key="all"><NavLink to={`/сompetitions`}>All seasons</NavLink></li>);
    for (let i = 2021; i > 2014; i--)
        Links.push(<li key={i}><NavLink to={`/сompetitions/${i}`}>{i}</NavLink></li>);
    Links.push(<li key="earlier"><NavLink to={`/сompetitions/earlier`} key="earlier">Until 2014</NavLink></li>);

    return <ul className="year-links">{Links}</ul>;
}

export default YearLinksCompetitions;