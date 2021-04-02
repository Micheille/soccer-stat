import React from "react";

const YearLinksTeams = (props) => {
    const Links = [];
    const basename="/soccer-stat";
    Links.push(<li key="current"><a href={`${basename}/teams/${props.id}`}>Current Season</a></li>);
    for (let i = 2021; i >= 2014; i--)
        Links.push(<li key={i}><a href={`${basename}/teams/${props.id}/${i}`}>{i}</a></li>);

    return <ul className="year-links">{Links}</ul>;
}

export default YearLinksTeams;