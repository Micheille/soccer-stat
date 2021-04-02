import React from "react";

const YearLinksTeam = (props) => {
    const Links = [];
    const basename="/soccer-stat";
    Links.push(<li key="current"><a href={`${basename}/team/${props.id}`}>Current Season</a></li>);
    for (let i = 2021; i >= 1990; i--)
        Links.push(<li key={i}><a href={`${basename}/team/${props.id}?dateFrom=${i}-01-01&dateTo=${i}-12-31`}>{i}</a></li>);

    return <ul className="year-links">{Links}</ul>;
}

export default YearLinksTeam;