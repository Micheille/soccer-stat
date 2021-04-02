import React from "react";

const FormDates = () => {
    return <form className="form-dates">
        <p>Search Dates:</p>

        <label htmlFor="dateFrom" >Date From: </label>
        <input type="date" id="dateFrom" name="dateFrom" required />

        <label htmlFor="dateTo">Date To: </label>
        <input type="date" id="dateTo" name="dateTo" required />

        <button type="submit">Search</button>
    </form>
}

export default FormDates;