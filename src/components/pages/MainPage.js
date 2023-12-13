import React from "react";

import '../../style/MainPage.css';
import NewCardsContainer from "../EventsContainer";
import AddEvent from "../forms/AddEvent";
import EventsContainer from "../EventsContainer";


function MainPage() {


    return (
        <>
            <div className='globalContainer'>
                <AddEvent />
                <EventsContainer />
            </div>
        </>
    )

}

export default MainPage;