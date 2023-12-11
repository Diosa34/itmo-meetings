import React from "react";

import '../../style/MainPage.css';
import NewCardsContainer from "../EventsContainer";
import AddEvent from "../forms/AddEvent";


function MainPage() {


    return (
        <>
            <div className='globalContainer'>
                <AddEvent />
                <NewCardsContainer />
            </div>
        </>
    )

}

export default MainPage;