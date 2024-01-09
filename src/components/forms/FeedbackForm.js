import React, {useRef, useState} from "react";
import { Button } from 'primereact/button';
import {Rating} from "primereact/rating";
import {Dialog} from "primereact/dialog";
import showToast from "../toast";
import {Toast} from "primereact/toast";
import somePost from "../getFetcher";
import HOST from "../../host";

function FeedbackForm({setModalActive, isModalActive, isRatingExists, actualRating=0, meeting_id}) {
    const [rating, setRating] = useState(actualRating);
    const toast = useRef(null);
    const token = 'Bearer ' + localStorage.getItem('token')

    const show = (actualToast, severity, summary, detail) => {
        actualToast.current.show({ severity: severity, summary: summary, detail: detail});
    };

    const createFeedback = async () => {
        await fetch(`${HOST}/meeting/${meeting_id}/feedback/`,
            {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Access-Control-Allow-Origin': HOST,
                    'Content-type': 'application/json',
                    'Access-Control-Allow-Credentials': 'true',
                    'Authorization': token != null ? token : "",
                },
                body: JSON.stringify(
                    {
                        rate: rating
                    }
                )
            })
            .then(async response => {
                if (response.ok) {
                    setModalActive(false)
                    show(toast, 'success', 'Успешно', 'Ваш отзыв записан.');
                } else if (response.status === 422) {
                    show(toast, 'error', 'Отзыв не отправлен', 'Некорректный запрос');
                } else if (response.status === 409) {
                    showToast(toast, 'error', 'Отзыв не отправлен', 'Конфликт');
                } else if (response.status === 500) {
                    showToast(toast, 'error', 'Ошибка', 'Ошибка сервера, не принимайте на свой счёт');
                }
            }
        )
    }

    const editFeedback = async () => {
        await fetch(`${HOST}/meeting/${meeting_id}/feedback/`,
            {
                method: 'PUT',
                headers: {
                    'Accept': 'application/json',
                    'Access-Control-Allow-Origin': HOST,
                    'Access-Control-Allow-Credentials': 'true',
                    'Authorization': token != null ? token : "",
                },
                body: JSON.stringify(
                    {
                        rate: rating
                    }
                )
            }).then(async response => {
                if (response.ok) {
                    setModalActive(false)
                    show(toast, 'success', 'Успешно', 'Ваш отзыв изменён.');
                } else if (response.status === 422) {
                    show(toast, 'error', 'Отзыв не отправлен', 'Некорректный запрос');
                } else if (response.status === 409) {
                    showToast(toast, 'error', 'Отзыв не отправлен', 'Конфликт');
                } else if (response.status === 500) {
                    showToast(toast, 'error', 'Ошибка', 'Ошибка сервера, не принимайте на свой счёт');
                }
            }
        )
    }

    const deleteFeedback = async () => {
        await fetch(`${HOST}/meeting/${meeting_id}/feedback/`,
            {
                method: 'DELETE',
                headers: {
                    'Accept': 'application/json',
                    'Access-Control-Allow-Origin': HOST,
                    'Access-Control-Allow-Credentials': 'true',
                    'Authorization': token != null ? token : "",
                },
                body: JSON.stringify({rate: rating})
            }).then(async response => {
                if (response.ok) {
                    setModalActive(false)
                    show(toast, 'success', 'Удалён', 'Ваш отзыв удалён.');
                } else if (response.status === 422) {
                    show(toast, 'error', 'Отзыв не отправлен', 'Некорректный запрос');
                } else if (response.status === 409) {
                    showToast(toast, 'error', 'Отзыв не отправлен', 'Конфликт');
                } else if (response.status === 500) {
                    showToast(toast, 'error', 'Ошибка', 'Ошибка сервера, не принимайте на свой счёт');
                }
            }
        )
    }

    const footerContent = (
        <div>
            <Button visible={isRatingExists} label="Изменить отзыв" type="submit" icon="pi pi-pencil" onClick={editFeedback}/>
            <Button visible={!isRatingExists} label="Отправить отзыв" type="submit" icon="pi pi-check" onClick={createFeedback}/>
            <Button visible={isRatingExists} label="Удалить отзыв" className="p-button-error" type="submit" icon="pi pi-times" onClick={deleteFeedback}/>
        </div>
    );

    return (
            <Dialog header="Отзыв о мероприятии" visible={isModalActive} onHide={() => setModalActive(false)} footer={footerContent}>
                <form className="flex flex-column gap-5">
                    <label htmlFor="rating">Оцените меропритятие</label>
                    <Rating className="card flex justify-content-center" name="rating" value={rating} onChange={(e) => setRating(e.value)} cancel={false} />
                </form>
                <Toast ref={toast} />
            </Dialog>
    )
}

export default FeedbackForm;