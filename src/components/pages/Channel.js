import {useNavigate, useParams} from "react-router-dom";
import React, {useEffect, useRef, useState} from "react";
import EventsContainer from "../EventsContainer";
import '../../style/Channel.css';
import {Toast} from "primereact/toast";
import ErrorPage from "./ErrorPage";
import AddEvent from "../forms/AddEvent";
import {Button} from "primereact/button";
import {Sidebar} from "primereact/sidebar";
import WaitModal from "../forms/waitModal";

export default function Channel() {
    const params = useParams();
    const navigate = useNavigate();
    const [members: [], setMembers] = useState();
    const [me, setMe] = useState({
        "username": "elison98",
        "telephone": "+79001234567",
        "email": "elison@example.com",
        "firstname": "Elison",
        "patronymic": null,
        "surname": "Argent",
        "other_names": null,
        "gender": "male",
        "date_of_birth": "2000-01-01",
        "id": 0,
        "referrer_id": 0,
        "confidentiality": 76,
        "is_staff": false
    })
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
    const [events, setEvents] = useState();
    const [requestError, setRequestError] = useState()
    const [visibleRight, setVisibleRight] = useState(false);
    const [waitModal, setWaitModal] = useState(false)
    const token = 'Bearer ' + localStorage.getItem('token')
    
    useEffect(() => {
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
    }, [navigate, params.id, token]);

    useEffect(() => {
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
                        setEvents(value.filter((elem) => elem.channel_id === channel.id))
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

        fetch(`http://localhost:8000/user/me/`,
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
                        setMe(value)
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
    }, [channel.id, navigate, token]);

    const failToast = useRef();

    const deleteChannel = () => {
        fetch(`http://localhost:8000/channel/${params.id}`,
            {
                method: 'DELETE',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': 'http://localhost:3000',
                    'Access-Control-Allow-Credentials': 'true',
                    'Authorization': token != null ? token : "",
                }
            }
        ).then(response => {
                if (response.ok) {
                    const data = response.json();
                } else if (response.status === 401) {
                    navigate('/login')
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
    }

    const leaveChannel = () => {
        fetch(`http://localhost:8000/channel/${params.id}/subscribe/`,
            {
                method: 'DELETE',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': 'http://localhost:3000',
                    'Access-Control-Allow-Credentials': 'true',
                    'Authorization': token != null ? token : "",
                }
            }
        ).then(response => {
                if (response.ok) {
                    const data = response.json();
                } else if (response.status === 401) {
                    navigate('/login')
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
    }

    const joinToChannel = () => {
        fetch(`http://localhost:8000/channel/${channel.id}/subscribe/`,
            {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': 'http://localhost:3000',
                    'Access-Control-Allow-Credentials': 'true',
                    'Authorization': token != null ? token : "",
                },
                body: JSON.stringify({
                    notify_about_meeting: false
                })
            }
        ).then(response => {
                if (response.ok) {
                    const data = response.json();
                } else if (response.status === 401) {
                    navigate('/login')
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
    }

    if (requestError) {
        return (
            <ErrorPage code={requestError.code} title={requestError.title} message={requestError.message}/>
        )
    } else {
        return (
            <div className="channelContainer">
                <div className="left-area gap-5 p-5">
                    <div className="container">
                        <div className="box-1">
                            <h1>{channel.name}</h1>
                        </div>
                        <div className="box-2">
                        </div>
                    </div>
                    <p className="text-xl">{channel.description}</p>
                    <EventsContainer events={events}/>
                </div>
                <div className="p-5 right-area">
                    <div className="flex gap-2 justify-content-center">
                        <Button icon="pi pi-arrow-left" onClick={() => setVisibleRight(true)} />
                    </div>
                    <Sidebar visible={visibleRight && (members.filter((elem) => {
                        return elem.user_id === me.id}).length === 0)} position="right" onHide={() => setVisibleRight(false)}>
                        <div>
                            <h2>Добро пожаловать!</h2>
                            <p>
                                Вы можете стать участником канала.
                            </p>
                            <Button label="Вступить в канал"  icon="pi pi-plus" iconPos="right" outlined onClick={joinToChannel}/>
                        </div>
                    </Sidebar>
                    <Sidebar visible={visibleRight && (members.filter((elem) => {return elem.user_id === me.id && elem.permissions === 0}).length !== 0)} position="right" onHide={() => setVisibleRight(false)}>
                        <div>
                            <h2>Добро пожаловать!</h2>
                            <p>
                                Ваша заявка на добавление в канал на рассмотрении.
                            </p>
                        </div>
                    </Sidebar>
                    <Sidebar visible={visibleRight && (members.filter((elem) => (elem.user_id === me.id && elem.is_owner)).length !== 0)} position="right" onHide={() => setVisibleRight(false)}>
                        <div className="gap-5">
                            <h2>Добро пожаловать!</h2>
                            <p>
                                Вы являетесь владельцем канала.
                            </p>
                            <Button label="Удалить канал"  icon="pi pi-times" iconPos="right" outlined onClick={deleteChannel}/>
                            <p></p>
                            <Button label="Заявки на вступление"  icon="pi pi-user" iconPos="right" outlined onClick={setWaitModal}/>
                            <WaitModal isModalActive={waitModal} setModalActive={setWaitModal} channel_id={params.id} users={members}/>
                        </div>
                    </Sidebar>
                    <Sidebar visible={visibleRight && (members.filter((elem) => {return elem.user_id === me.id && elem.permissions !== 0 && !elem.is_owner}).length !== 0)} position="right" onHide={() => setVisibleRight(false)}>
                        <div>
                            <h2>Добро пожаловать!</h2>
                            <p>
                                Вы являетесь участником канала.
                            </p>
                            <Button label="Отписаться" icon="pi pi-minus" iconPos="right" outlined onClick={leaveChannel}/>
                        </div>
                    </Sidebar>
                </div>
                <Toast ref={failToast} />
            </div>
        )
    }

}