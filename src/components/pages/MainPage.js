import React, {useEffect, useState} from "react";

import '../../style/MainPage.css';
import NewCardsContainer from "../EventsContainer";
import AddEvent from "../forms/AddEvent";
import EventsContainer from "../EventsContainer";
import {useNavigate} from "react-router-dom";
import CreateChannelForm from "../forms/CreateChannelForm";


function MainPage() {
    const [events, setEvents] = useState();
    const navigate = useNavigate();

    useEffect(() => {
        const token = 'Bearer ' + localStorage.getItem('token')
        fetch('http://localhost:8000/meeting/list/',
            {
                method: 'GET',
                headers: {
                    'Accept': 'application/json',
                    'Access-Control-Allow-Origin': 'http://localhost:3000',
                    'Access-Control-Allow-Credentials': 'true',
                    'Authorization': token != null ? token : "",
                }
            }
        ).then(response => {
                if (response.ok) {
                    const data = response.json();
                    data.then(value => {
                        setEvents(value)
                        console.log(value)
                    });
                } else if (response.status === 401) {
                    navigate('/login')
                    // showToast(profileToast, 'error', 'Страница недоступна', 'Пользователь не авторизован');
                } else if (response.status === 422) {
                    // showToast(cardToast, 'error', 'Страница недоступна', 'Сломанный запрос');
                } else if (response.status === 500) {
                    // showToast(cardToast, 'error', 'Ошибка', 'Ошибка сервера, не принимайте на свой счёт');
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