import React, {useEffect, useRef, useState} from "react";
import {useNavigate} from "react-router-dom";
import HOST from "../../host";
import AddEvent from "../forms/AddEvent";
import EventsContainer from "../parts/EventsContainer";

export default function MyEvents() {
    const [events, setEvents] = useState();
    const [myChannel, setMyChannel] = useState()
    const navigate = useNavigate();
    const token = 'Bearer ' + localStorage.getItem('token')

    useEffect(() => {
        fetch(`${HOST}/channel/my-personal-channel/`,
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
                    setMyChannel(value)
                });
            } else if (response.status === 401) {
                navigate('/login')
                // showToast(profileToast, 'error', 'Страница недоступна', 'Пользователь не авторизован');
            }
        })
    }, [navigate]);

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
                    <h1>Мои мероприятия</h1>
                </div>
                <div className="box-2">
                    <AddEvent />
                </div>
            </div>
            {!(typeof events === "undefined") && !(typeof myChannel === "undefined")?
                <EventsContainer events={events.filter((elem) => (elem.channel_id === myChannel.id))}/>
            : null}
        </div>
    )
}