import { Divider } from 'primereact/divider';
import { Button } from 'primereact/button';
import '../../style/Event.css';
import FeedbackForm from "../forms/FeedbackForm";
import {useEffect, useRef, useState} from "react";
import {useNavigate, useParams} from "react-router-dom";


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

    useEffect(() => {
        const token = 'Bearer ' + localStorage.getItem('token')
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
    }, [navigate, params.id]);

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
                    <label className="first-col">Только для граждан РФ: {event.only_for_russians ? "да." : "нет."} руб.</label>
                </div>
                <div className="box-2">
                    <Button label="Отправить заявку"  icon="pi pi-plus" iconPos="right" text raised />
                </div>
                    <FeedbackForm setModalActive={setModalActive} isModalActive={isModalActive}/>
                        {/*<Button label="Оставить отзыв" onClick={() => setModalActive(true)} icon="pi pi-check" iconPos="right" text raised />*/}
            </div>
                <Divider />
            <p>
                {event.description}
            </p>
        </div>

    )
}

export default Event;