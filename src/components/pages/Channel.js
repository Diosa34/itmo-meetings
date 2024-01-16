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
import CreateChannelForm from "../forms/CreateChannelForm";
import MemberRoleForm from "../forms/MemberRoleForm";
import HOST from "../../host";
import ChannelMembers from "../ChannelMembers";

export default function Channel() {
    const params = useParams();
    const navigate = useNavigate();
    const [members, setMembers] = useState();
    const [users, setUsers] = useState([]);
    const [me, setMe] = useState()
    const [channel, setChannel] = useState();
    const [myChannels, setMyChannels] = useState();
    const [events, setEvents] = useState();
    const [requestError, setRequestError] = useState()
    const [visibleRight, setVisibleRight] = useState(false);
    const [waitModal, setWaitModal] = useState(false)
    const token = 'Bearer ' + localStorage.getItem('token')
    
    useEffect(() => {
        fetch(`${HOST}/channel/${params.id}/`,
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
                        setChannel(value)
                    });
                } else if (response.status === 401) {
                    navigate('/login')
                    // showToast(profileToast, 'error', 'Страница недоступна', 'Пользователь не авторизован');
                } else if (response.status === 422) {
                    setRequestError({code: response.status,
                        title: 'Информация о сообществе не была загружена',
                        message: 'Сломанный запрос'})
                    // showToast(cardToast, 'error', 'Страница недоступна', 'Сломанный запрос');
                } else if (response.status === 500) {
                    setRequestError({code: response.status,
                        title: 'Информация о сообществе не была загружена',
                        message: 'Ошибка сервера, не принимайте на свой счёт'})
                    // showToast(cardToast, 'error', 'Ошибка', 'Ошибка сервера, не принимайте на свой счёт');
                } else if (response.status === 403) {
                    setRequestError({code: response.status,
                        title: 'Информация о сообществе не была загружена',
                        message: 'Доступ к сообществу ограничен для данного пользователя'})
                    // showToast(cardToast, 'error', 'Ошибка', 'Ошибка сервера, не принимайте на свой счёт');
                }
            }
        )
    }, [navigate, params.id, token]);
    // Зачем юзеры, если есть участники канала? Ответ: потому что в участнике канала нет данных пользователя
    function getUser(id) {
        fetch(`${HOST}/user/${id}/`,
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
                            const newUser = [value]
                            if (!users.includes(value)) {
                                setUsers([...users, ...newUser])
                            }
                        }
                    );
                } else if (response.status === 401) {
                    navigate('/login')
                }
            }
        )
    }

    useEffect(() => {
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
                        const filteredEvents = value.filter((elem) => elem.channel_id == params.id)
                        const sortedEvents = filteredEvents.sort((elem1, elem2) => elem1.start_datetime > elem2.start_datetime ? 1 : -1);
                        setEvents(sortedEvents)
                    });
                } else if (response.status === 401) {
                    navigate('/login')
                    // showToast(profileToast, 'error', 'Страница недоступна', 'Пользователь не авторизован');
                } else if (response.status === 422) {
                    setRequestError({code: response.status,
                        title: 'Список мероприятий сообщества не был загружен',
                        message: 'Сломанный запрос'})
                    // showToast(cardToast, 'error', 'Страница недоступна', 'Сломанный запрос');
                } else if (response.status === 500) {
                    setRequestError({code: response.status,
                        title: 'Список мероприятий сообщества не был загружен',
                        message: 'Ошибка сервера, не принимайте на свой счёт'})
                    // showToast(cardToast, 'error', 'Ошибка', 'Ошибка сервера, не принимайте на свой счёт');
                }
            }
        )

        fetch(`${HOST}/channel/${params.id}/member/list/`,
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
                        setMembers(value)
                        value.forEach((elem) => getUser(elem.user_id))
                    });
                } else if (response.status === 401) {
                    navigate('/login')
                    // showToast(profileToast, 'error', 'Страница недоступна', 'Пользователь не авторизован');
                } else if (response.status === 422) {
                    setRequestError({code: response.status,
                        title: 'Список мероприятий сообщества не был загружен',
                        message: 'Сломанный запрос'})
                    // showToast(cardToast, 'error', 'Страница недоступна', 'Сломанный запрос');
                } else if (response.status === 500) {
                    setRequestError({code: response.status,
                        title: 'Список мероприятий сообщества не был загружен',
                        message: 'Ошибка сервера, не принимайте на свой счёт'})
                    // showToast(cardToast, 'error', 'Ошибка', 'Ошибка сервера, не принимайте на свой счёт');
                }
            }
        )

        fetch(`${HOST}/user/me/`,
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
                        setMe(value)
                    });
                } else if (response.status === 401) {
                    navigate('/login')
                    // showToast(profileToast, 'error', 'Страница недоступна', 'Пользователь не авторизован');
                } else if (response.status === 422) {
                    setRequestError({code: response.status,
                        title: 'Список мероприятий сообщества не был загружен',
                        message: 'Сломанный запрос'})
                    // showToast(cardToast, 'error', 'Страница недоступна', 'Сломанный запрос');
                } else if (response.status === 500) {
                    setRequestError({code: response.status,
                        title: 'Список мероприятий сообщества не был загружен',
                        message: 'Ошибка сервера, не принимайте на свой счёт'})
                    // showToast(cardToast, 'error', 'Ошибка', 'Ошибка сервера, не принимайте на свой счёт');
                }
            }
        )

        fetch(`${HOST}/user/me/channels/`,
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
                        setMyChannels(value)
                    });
                } else if (response.status === 401) {
                    navigate('/login')
                    // showToast(profileToast, 'error', 'Страница недоступна', 'Пользователь не авторизован');
                } else if (response.status === 422) {
                    setRequestError({code: response.status,
                        title: 'Список моих сообществ не был загружен',
                        message: 'Сломанный запрос'})
                    // showToast(cardToast, 'error', 'Страница недоступна', 'Сломанный запрос');
                } else if (response.status === 500) {
                    setRequestError({code: response.status,
                        title: 'Список моих сообществ не был загружен',
                        message: 'Ошибка сервера, не принимайте на свой счёт'})
                    // showToast(cardToast, 'error', 'Ошибка', 'Ошибка сервера, не принимайте на свой счёт');
                }
            }
        )

    }, [navigate, params.id, token]);

    const failToast = useRef();

    const deleteChannel = () => {
        fetch(`${HOST}/channel/${params.id}/`,
            {
                method: 'DELETE',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': HOST,
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
                        title: 'Список мероприятий сообщества не был загружен',
                        message: 'Сломанный запрос'})
                    // showToast(cardToast, 'error', 'Страница недоступна', 'Сломанный запрос');
                } else if (response.status === 500) {
                    setRequestError({code: response.status,
                        title: 'Список мероприятий сообщества не был загружен',
                        message: 'Ошибка сервера, не принимайте на свой счёт'})
                    // showToast(cardToast, 'error', 'Ошибка', 'Ошибка сервера, не принимайте на свой счёт');
                }
            }
        )
    }

    const leaveChannel = () => {
        fetch(`${HOST}/channel/${params.id}/subscribe/`,
            {
                method: 'DELETE',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': HOST,
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
                        title: 'Список мероприятий сообщества не был загружен',
                        message: 'Сломанный запрос'})
                    // showToast(cardToast, 'error', 'Страница недоступна', 'Сломанный запрос');
                } else if (response.status === 500) {
                    setRequestError({code: response.status,
                        title: 'Список мероприятий сообщества не был загружен',
                        message: 'Ошибка сервера, не принимайте на свой счёт'})
                    // showToast(cardToast, 'error', 'Ошибка', 'Ошибка сервера, не принимайте на свой счёт');
                }
            }
        )
    }

    const joinToChannel = () => {
        fetch(`${HOST}/channel/${params.id}/subscribe/`,
            {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': HOST,
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
                        title: 'Список мероприятий сообщества не был загружен',
                        message: 'Сломанный запрос'})
                    // showToast(cardToast, 'error', 'Страница недоступна', 'Сломанный запрос');
                } else if (response.status === 500) {
                    setRequestError({code: response.status,
                        title: 'Список мероприятий сообщества не был загружен',
                        message: 'Ошибка сервера, не принимайте на свой счёт'})
                    // showToast(cardToast, 'error', 'Ошибка', 'Ошибка сервера, не принимайте на свой счёт');
                }
            }
        )
    }

    if (requestError) {
        return (
            <ErrorPage title={requestError.title} message={requestError.message}/>
        )
    } else {
        return (

            <div className="channelContainer">
                {!(typeof channel === "undefined") && !(typeof events === "undefined") ?
                    <>
                    <div className="left-area gap-5 p-5">
                        <div className="container">
                            <div className="box-1">
                                <h1>{channel.name}</h1>
                            </div>
                            <div className="box-2">
                                <AddEvent />
                            </div>
                        </div>
                        <p className="text-xl">{channel.description}</p>
                        <EventsContainer events={events}/>
                    </div>
                            {!(typeof members === "undefined") ?
                        <div className="p-5 right-area">
                            <ChannelMembers members={members}/>
                            <div className="flex gap-2 justify-content-center">
                                <Button icon="pi pi-cog" onClick={() => setVisibleRight(true)} />
                            </div>
                            <Sidebar visible={visibleRight && (members.filter((elem) => {
                                return elem.user_id === me.id}).length === 0)} position="right" onHide={() => setVisibleRight(false)}>
                                <div>
                                    <h2>Добро пожаловать!</h2>
                                    <p>
                                        Вы можете стать участником сообщества.
                                    </p>
                                    <Button label="Вступить в сообщество"  icon="pi pi-plus" iconPos="right" outlined onClick={joinToChannel}/>
                                </div>
                            </Sidebar>
                            <Sidebar visible={visibleRight && (members.filter((elem) => {return elem.user_id === me.id && elem.permissions === 0}).length !== 0)} position="right" onHide={() => setVisibleRight(false)}>
                                <div>
                                    <h2>Добро пожаловать!</h2>
                                    <p>
                                        Ваша заявка на добавление в сообщество на рассмотрении.
                                    </p>
                                </div>
                            </Sidebar>
                            <Sidebar visible={visibleRight && (members.filter((elem) => (elem.user_id === me.id && elem.is_owner)).length !== 0)} position="right" onHide={() => setVisibleRight(false)}>
                                <div className="gap-5">
                                    <h2>Добро пожаловать!</h2>
                                    <p>
                                        Вы являетесь владельцем сообщества.
                                    </p>
                                    <Button label="Удалить сообщество"  icon="pi pi-times" iconPos="right" outlined onClick={deleteChannel}/>
                                    <p></p>
                                    <CreateChannelForm defaultName={channel.name} defaultDescription={channel.description} defaultIsPublic={channel.is_public} path={`${HOST}/channel/${channel.id}/`} method='PUT' buttonTitle='Редактировать сообщество' />
                                    <p></p>
                                    <Button label="Заявки на вступление"  icon="pi pi-user" iconPos="right" outlined onClick={setWaitModal}/>
                                    <WaitModal isModalActive={waitModal} setModalActive={setWaitModal} channel_id={params.id} users={members}/>
                                    <p></p>
                                    <MemberRoleForm channel_id={channel.id} my_id={me.id} members={members} users={users.filter((elem) => elem.id !== me.id)}/>
                                </div>
                            </Sidebar>
                            <Sidebar visible={visibleRight && (members.filter((elem) => {return elem.user_id === me.id && elem.permissions !== 0 && !elem.is_owner}).length !== 0)} position="right" onHide={() => setVisibleRight(false)}>
                                <div>
                                    <h2>Добро пожаловать!</h2>
                                    <p>
                                        Вы являетесь участником сообщества.
                                    </p>
                                    <Button label="Отписаться" icon="pi pi-minus" iconPos="right" outlined onClick={leaveChannel}/>
                                </div>
                            </Sidebar>
                        </div>
                        : null }
                    </>
                : null }
                <Toast ref={failToast} />
            </div>
        )
    }

}