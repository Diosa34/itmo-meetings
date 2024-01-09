import React, {useEffect, useState} from "react";

import '../../style/MainPage.css';
import NewCardsContainer from "../EventsContainer";
import AddEvent from "../forms/AddEvent";
import EventsContainer from "../EventsContainer";
import {useNavigate} from "react-router-dom";
import CreateChannelForm from "../forms/CreateChannelForm";
import HOST from "../../host";


function MainPage() {
    const [events, setEvents] = useState();
    const navigate = useNavigate();

    useEffect(() => {
        const token = 'Bearer ' + localStorage.getItem('token')
        fetch(`${HOST}/meeting/list/`,
            {
                method: 'GET',
                headers: {
                    'Accept': 'application/json',
                    'Access-Control-Allow-Origin': HOST,
                    'Access-Control-Allow-Credentials': 'true',
                    'Authorization': token != null ? token : "",
                }
            }
        ).then(response => {
                if (response.ok) {
                    const data = response.json();
                    data.then(value => {
                        setEvents(value.sort((elem1, elem2) => elem1.start_datetime > elem2.start_datetime ? 1 : -1))
                    });
                } else if (response.status === 401) {
                    navigate('/login')
                } else if (response.status === 422) {
                } else if (response.status === 500) {
                }
            }
        )
    }, [navigate]);


    return (
        <div className='globalContainer'>
            <div className="container">
                <div className="box-1">
                    <h1>Главная</h1>
                </div>
                <div className="box-2">
                    <AddEvent />
                </div>
            </div>
            <EventsContainer events={events}/>
        </div>
    )

}

export default MainPage;