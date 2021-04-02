import React from "react";

const YearLinksCompetition = (props) => {
    const Links = [];
    const basename="/soccer-stat";
    Links.push(<li key="all"><a href={`${basename}/competition/${props.id}`}>Current Season</a></li>);
    for (let i = 2021; i > 2014; i--)
        Links.push(<li key={i}><a href={`${basename}/competition/${props.id}/${i}`}>{i}</a></li>);
    Links.push(<li key="earlier"><a href={`${basename}/competition/${props.id}?dateFrom=2010-01-01&dateTo=2014-12-31`}>Under 2014</a></li>);

    return <ul className="year-links">{Links}</ul>;
}

export default YearLinksCompetition;