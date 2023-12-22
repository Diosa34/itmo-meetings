import { Divider } from 'primereact/divider';
import { Button } from 'primereact/button';
import '../../style/Event.css';
import FeedbackForm from "../forms/FeedbackForm";
import React, {useEffect, useRef, useState} from "react";
import {useNavigate, useParams} from "react-router-dom";
import {Toast} from "primereact/toast";


function Event() {
    const params = useParams();
    const navigate = useNavigate();
    const [isModalActive, setModalActive] = useState(false);
    const [event, setEvent] = useState([
        {
            title: "Моя супер-вечеринка",
            description: "If you will come, you will have unreal emotions.",
            start_datetime: "2023-12-20T10:54:47.546Z",
            duration_in_minutes: 15,
            address: "string",
            capacity: 4,
            price: 0,
            minimum_age: 0,
            maximum_age: 150,
            only_for_itmo_students: false,
            only_for_russians: false,
            id: 0,
            channel_id: 0,
            rating: 0
        }])
    const [isMember, setIsMember] = useState(false)
    const [channel, setChannel] = useState({
        "name": "My super channel name",
        "description": "Here plain text",
        "is_public": false,
        "id": 0,
        "members_cnt": 0,
        "rating": 0,
        "is_personal": false,
        "is_active": true
    })
    const [feedback, setFeedback] = useState()
    const token = 'Bearer ' + localStorage.getItem('token')

    const toast = useRef(null);

    const show = (severity, summary, detail) => {
        toast.current.show({ severity: severity, summary: summary, detail: detail});
    };

    useEffect(() => {
        fetch(`http://localhost:8000/meeting/${params.id}`,
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
                        setEvent(value)
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

        fetch(`http://localhost:8000/channel/${event.channel_id}`,
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
                        console.log(event.channel_id)
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

        fetch(`http://localhost:8000/meeting/${event.id}/feedback/`,
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
                        setFeedback(value)
                    });
                } else if (response.status === 401) {
                    navigate('/login')
                    // showToast(profileToast, 'error', 'Страница недоступна', 'Пользователь не авторизован');
                } else if (response.status === 404) {
                    // showToast(cardToast, 'error', 'Страница недоступна', 'Сломанный запрос');
                } else if (response.status === 500) {
                    // showToast(cardToast, 'error', 'Ошибка', 'Ошибка сервера, не принимайте на свой счёт');
                }
            }
        )

        fetch(`http://localhost:8000/user/me/meetings/`,
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
                        setIsMember(!value.filter((i) => event.id === i.id).length === 0)
                    });
                } else if (response.status === 401) {
                    navigate('/login')
                    // showToast(profileToast, 'error', 'Страница недоступна', 'Пользователь не авторизован');
                } else if (response.status === 404) {
                    // showToast(cardToast, 'error', 'Страница недоступна', 'Сломанный запрос');
                } else if (response.status === 500) {
                    // showToast(cardToast, 'error', 'Ошибка', 'Ошибка сервера, не принимайте на свой счёт');
                }
            }
        )
    }, [event.channel_id, event.id, navigate, params.id, token]);

    const joinToMeeting = () => {
        fetch(`http://localhost:8000/meeting/${event.id}/member/`,
            {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Access-Control-Allow-Origin': 'http://localhost:3000',
                    'Access-Control-Allow-Credentials': 'true',
                    'Authorization': token != null ? token : "",
                }
            }
        ).then(response => {
                if (response.ok) {
                    setIsMember(true);
                    show('success', 'Успешно', 'Заявка на участие принята')
                } else if (response.status === 401) {
                    navigate('/login')
                } else if (response.status === 422) {
                    show('error', 'Заявка не отправлена', 'Некорректный завпрос запрос');
                } else if (response.status === 500) {
                    show('error', 'Ошибка', 'Ошибка сервера, не принимайте на свой счёт');
                }
            }
        )
    }

    const leftMeeting = () => {
        fetch(`http://localhost:8000/meeting/${event.id}/member/me/`,
            {
                method: 'DELETE',
                headers: {
                    'Accept': 'application/json',
                    'Access-Control-Allow-Origin': 'http://localhost:3000',
                    'Access-Control-Allow-Credentials': 'true',
                    'Authorization': token != null ? token : "",
                }
            }
        ).then(response => {
                if (response.ok) {
                    setIsMember(false);
                    show('warn', 'Успешно', 'Вы покинули мероприятие')
                } else if (response.status === 401) {
                    navigate('/login')
                } else if (response.status === 404) {
                    show('error', 'Ошибка', 'Вы не являетесь участником мероприятия');
                } else if (response.status === 500) {
                    show('error', 'Ошибка', 'Ошибка сервера, не принимайте на свой счёт');
                }
            }
        )
    }

    const age = () => {
        let restriction = `нет.`
        if (event.minimum_age !== 0) {
            restriction = `от ${event.minimum_age} `
        }
        if (event.maximum_age < 150) {
            restriction += `до ${event.maximum_age} лет.`
        }
        return restriction
    }

    return (
        <div className="p-6 shadow-2 border-round event-card">

            <div className="container">
                <div className="box-1 gap-2">
                    <h1>{event.title}</h1>
                    <label className="first-col">Время: {event.start_datetime}</label>
                    <label className="first-col">Место: {event.address}</label>
                    <label className="first-col">Длительность: {event.duration_in_minutes} мин.</label>
                    <label className="first-col">Цена: {event.price} руб.</label>
                    <label className="first-col">Возрастные ограничения: {age()}</label>
                    <label className="first-col">Только для студентов ИТМО: {event.only_for_itmo_students ? "да." : "нет."}</label>
                    <label className="first-col">Только для граждан РФ: {event.only_for_russians ? "да." : "нет."}</label>
                    <Button visible={!channel.is_personal} label="Перейти в канал" icon="pi pi-arrow-right" text raised size="small" iconPos="right" onClick={(e) => {
                        navigate(`/channels/${event.channel_id}`)
                    }}/>
                </div>
                <div className="box-2">
                    <Button visible={!isMember} label="Отправить заявку"  icon="pi pi-plus" iconPos="right" outlined onClick={joinToMeeting}/>
                    <Button visible={isMember} label="Покинуть мероприятие" icon="pi pi-times" iconPos="right" severity="danger" outlined onClick={leftMeeting}/>
                </div>
                    <FeedbackForm setModalActive={setModalActive} isModalActive={isModalActive} meeting_id={event.id} actualRating={feedback} isRatingExists={!feedback===undefined}/>
                    <Button visible={Date.parse(event.start_datetime) < new Date().getTime() && !feedback} label="Оставить отзыв" onClick={() => setModalActive(true)} icon="pi pi-check" iconPos="right" text raised />
                    <Button visible={Date.parse(event.start_datetime) < new Date().getTime() && feedback} label="Изменить мой отзыв" onClick={() => setModalActive(true)} icon="pi pi-check" iconPos="right" text raised />
            </div>
                <Divider />
            <p>
                {event.description}
            </p>
            <Toast ref={toast} />
        </div>

    )
}

export default Event;