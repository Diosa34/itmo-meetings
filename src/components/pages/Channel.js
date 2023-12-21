import {useNavigate, useParams} from "react-router-dom";
import React, {useEffect, useRef, useState} from "react";
import EventsContainer from "../EventsContainer";
import '../../style/Channel.css';
import {AccordionTab} from "primereact/accordion";
import {Accordion} from "@mui/material";
import {OrderList} from "primereact/orderlist";
import {Toast} from "primereact/toast";
import showToast from "../toast";
import ErrorPage from "./ErrorPage";

export default function Channel() {
    const params = useParams();
    const navigate = useNavigate();
    const [channel, setChannel] = useState({
            name: "My super channel name",
            description: "Here plain text",
            is_public: false,
            id: 0,
            members_cnt: 0,
            rating: 0,
            is_personal: false,
            is_active: true
        }
    )

    const [members, setMembers] = useState();
    const [events, setEvents] = useState();
    const [requestError, setRequestError] = useState({
        code: 500,
        title: 'Ошибка',
        message: 'Ошибка сервера, не принимайте на свой счёт'
    })

    useEffect(() => {
        const token = 'Bearer ' + localStorage.getItem('token')
        fetch(`http://localhost:8000/channel/${params.id}/`,
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
                        setChannel(value)
                        console.log(value)
                    });
                } else if (response.status === 401) {
                    navigate('/login')
                    // showToast(profileToast, 'error', 'Страница недоступна', 'Пользователь не авторизован');
                } else if (response.status === 422) {
                    setRequestError({code: response.status,
                        title: 'Информация о канале не была загружена',
                        message: 'Сломанный запрос'})
                    // showToast(cardToast, 'error', 'Страница недоступна', 'Сломанный запрос');
                } else if (response.status === 500) {
                    setRequestError({code: response.status,
                        title: 'Информация о канале не была загружена',
                        message: 'Ошибка сервера, не принимайте на свой счёт'})
                    // showToast(cardToast, 'error', 'Ошибка', 'Ошибка сервера, не принимайте на свой счёт');
                } else if (response.status === 403) {
                    setRequestError({code: response.status,
                        title: 'Информация о канале не была загружена',
                        message: 'Доступ к каналу ограничен для данного пользователя'})
                    // showToast(cardToast, 'error', 'Ошибка', 'Ошибка сервера, не принимайте на свой счёт');
                }
            }
        )
    }, []);

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
                        // setEvents(value.filter((elem) => elem.channel_id === channel.id))
                        console.log(value)
                    });
                } else if (response.status === 401) {
                    navigate('/login')
                    // showToast(profileToast, 'error', 'Страница недоступна', 'Пользователь не авторизован');
                } else if (response.status === 422) {
                    setRequestError({code: response.status,
                        title: 'Список мероприятий канала не был загружен',
                        message: 'Сломанный запрос'})
                    // showToast(cardToast, 'error', 'Страница недоступна', 'Сломанный запрос');
                } else if (response.status === 500) {
                    setRequestError({code: response.status,
                        title: 'Список мероприятий канала не был загружен',
                        message: 'Ошибка сервера, не принимайте на свой счёт'})
                    // showToast(cardToast, 'error', 'Ошибка', 'Ошибка сервера, не принимайте на свой счёт');
                }
            }
        )
    }, [navigate]);

    useEffect(() => {
        const token = 'Bearer ' + localStorage.getItem('token')
        fetch(`http://localhost:8000/channel/${params.id}/member/list/`,
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
                        setMembers(value)
                        console.log(value)
                    });
                } else if (response.status === 401) {
                    navigate('/login')
                    // showToast(profileToast, 'error', 'Страница недоступна', 'Пользователь не авторизован');
                } else if (response.status === 422) {
                    setRequestError({code: response.status,
                        title: 'Список участников канала не был загружен',
                        message: 'Сломанный запрос'})
                    // showToast(cardToast, 'error', 'Страница недоступна', 'Сломанный запрос');
                } else if (response.status === 500) {
                    setRequestError({code: response.status,
                        title: 'Список участников канала не был загружен',
                        message: 'Ошибка сервера, не принимайте на свой счёт'})
                    // showToast(cardToast, 'error', 'Ошибка', 'Ошибка сервера, не принимайте на свой счёт');
                } else if (response.status === 403) {
                    setRequestError({
                        code: response.status,
                        title: 'Список участников канала не был загружен',
                        message: 'Доступ к каналу ограничен для данного пользователя'})
                    // showToast(cardToast, 'error', 'Ошибка', 'Участники канала недоступны');
                }
            }
        )
    }, [navigate, params.id]);

    const failToast = useRef();

    const itemTemplate = (member) => {
        return (
            <div className="flex flex-wrap p-2 align-items-center gap-3">
                <img className="w-4rem shadow-2 flex-shrink-0 border-round"/>
                <div className="flex-1 flex flex-column gap-2 xl:mr-8">
                    <span className="font-bold">{member.name}</span>
                    <div className="flex align-items-center gap-2">
                        <i className="pi pi-tag text-sm"></i>
                        <span>{member.category}</span>
                    </div>
                </div>
                <span className="font-bold text-900">${member.price}</span>
            </div>
        );
    };

    if (requestError) {
        return (
            <ErrorPage code={requestError.code} title={requestError.title} message={requestError.message}/>
        )
    } else {
        return (
            <div className=".channelContainer">
                <div className="left-area gap-2 p-6">
                    <h1>{channel.name}</h1>
                    <EventsContainer events={events}/>
                </div>
                <div className="right-area">
                    <Accordion activeIndex={0}>
                        <AccordionTab header="Участники канала">
                            <OrderList value={members}
                                // onChange={(e) => setMembers(e.value)}
                                       itemTemplate={itemTemplate}></OrderList>
                        </AccordionTab>
                        <AccordionTab header="Менеджеры канала">
                            <OrderList value={members}
                                // onChange={(e) => setMembers(e.value)}
                                       itemTemplate={itemTemplate}></OrderList>
                        </AccordionTab>
                    </Accordion>
                </div>
                <Toast ref={failToast} />
            </div>
        )
    }

}