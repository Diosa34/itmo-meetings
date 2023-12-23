import {Button} from "primereact/button";
import React, {useRef, useState} from "react";
import {useFormik} from "formik";
import {InputText} from "primereact/inputtext";
import {classNames} from "primereact/utils";
import {Dialog} from "primereact/dialog";
import {InputTextarea} from "primereact/inputtextarea";
import {Checkbox} from "primereact/checkbox";
import {Calendar} from "primereact/calendar";
import {useNavigate} from "react-router-dom";
import {AutoComplete} from "primereact/autocomplete";
import {Dropdown} from "primereact/dropdown";
import ErrorPage from "../pages/ErrorPage";
import {Toast} from "primereact/toast";

export default function AddEvent() {
    const [isModalActive, setModalActive] = useState(false);
    const [myChannels, setMyChannels] = useState();
    const [selectedChannel, setSelectedChannel] = useState();
    const [error, setError] = useState({
        code: 500,
        title: 'Каналы пользователя не были загружены',
        message: 'Доступ к каналу ограничен для данного пользователя'})
    const navigate = useNavigate()

    const footerContent = (
        <div >
            <Button className={'footer'} label="Создать мероприятие" type="submit" icon="pi pi-check" />
        </div>
    );

    const formik = useFormik({
        initialValues: {
            title: "",
            description: "",
            start_datetime: "",
            duration_in_minutes: 0, // просто число
            address: "",
            capacity: 500, // просто число
            price: 0,
            minimum_age: 0,
            maximum_age: 150,
            only_for_itmo_students: false,
            only_for_russians: false,
            channel_id: "",
        },
        validate: (data) => {
            let errors = {};

            if (!data.title) {
                errors.title = 'Введите название мероприятия.';
            }

            if (!data.start_datetime) {
                errors.start_datetime = 'Выберите дату и время начала мероприятия.';
            } else if (data.start_datetime.getTime() < new Date().getTime()) {
                errors.start_datetime = 'Некорректная дата, этот день уже в прошлом.';
            }

            if (!data.address) {
                errors.address = 'Выберите место проведения мероприятия.';
            }

            if (data.duration_in_minutes <= 0) {
                errors.duration_in_minutes = 'Введите предполагаемую длительность.';
            }

            if (!data.capacity) {
                errors.capacity = 'Максиимальное количество участников должно быть больше 0.';
            }

            if (!data.channel_id) {
                errors.channel_id = 'Выберите автора.';
            }

            return errors;
        },
        onSubmit: (data) => {
            const token = 'Bearer ' + localStorage.getItem('token')
            fetch(`http://localhost:8000/meeting/`,
            {
                    method: 'POST',
                    headers: {
                        'Accept': 'application/json',
                        'Content-type': 'application/json',
                        'Access-Control-Allow-Origin': 'http://localhost:3000',
                        'Access-Control-Allow-Credentials': 'true',
                        'Authorization': token != null ? token : "",
                    },
                    body: JSON.stringify(
                        {
                            title: formik.values.title,
                            description: formik.values.description,
                            start_datetime: formik.values.start_datetime,
                            duration_in_minutes: formik.values.duration_in_minutes,
                            address: formik.values.address,
                            capacity: formik.values.capacity,
                            price: formik.values.price,
                            minimum_age: formik.values.minimum_age,
                            maximum_age: formik.values.maximum_age,
                            only_for_itmo_students: formik.values.only_for_itmo_students,
                            only_for_russians: formik.values.only_for_russians,
                            channel_id: formik.values.channel_id,
                        }
                    )
                }
            ).then(response => {
                    if (response.ok) {
                        const data = response.json();
                        data.then(value => {
                            console.log(value)
                            showSuccess()
                        });
                        setModalActive(false)
                    } else if (response.status === 401) {
                        navigate('/login')
                        // showToast(profileToast, 'error', 'Страница недоступна', 'Пользователь не авторизован');
                    } else if (response.status === 422) {
                        setError({code: response.status,
                            title: 'Мероприятие не создано',
                            message: 'Сломанный запрос'})
                            showError()
                        // showToast(cardToast, 'error', 'Страница недоступна', 'Сломанный запрос');
                    } else if (response.status === 500) {
                        setError({code: response.status,
                            title: 'Мероприятие не создано',
                            message: 'Ошибка сервера, не принимайте на свой счёт'})
                            showError()
                        // showToast(cardToast, 'error', 'Ошибка', 'Ошибка сервера, не принимайте на свой счёт');
                    } else if (response.status === 403) {
                        setError({
                            code: response.status,
                            title: 'Мероприятие не создано',
                            message: 'Доступ ограничен для данного пользователя'})
                            showError()
                        // showToast(cardToast, 'error', 'Ошибка', 'Участники канала недоступны');
                    }
                }
            )
        }
    });

    const isFormFieldInvalid = (name) => !!(formik.touched[name] && formik.errors[name]);

    const getFormErrorMessage = (name) => {
        return isFormFieldInvalid(name) ? <small className="p-error">{formik.errors[name]}</small> : <small className="p-error">&nbsp;</small>;
    };

    function getMyChannels() {
        const token = 'Bearer ' + localStorage.getItem('token')
        fetch(`http://localhost:8000/user/me/channels`,
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
                        setMyChannels(value.map((elem) => {
                            if (elem.channel.is_personal) {
                                elem.channel.name = 'От своего имени'
                            }
                            return elem.channel
                        }).filter((elem) => elem.permissions !== 0))
                        }
                    );
                } else if (response.status === 401) {
                    navigate('/login')
                    // showToast(profileToast, 'error', 'Страница недоступна', 'Пользователь не авторизован');
                } else if (response.status === 422) {
                    setError({code: response.status,
                        title: 'Каналы пользователя не были загружены',
                        message: 'Сломанный запрос'})
                    // showToast(cardToast, 'error', 'Страница недоступна', 'Сломанный запрос');
                } else if (response.status === 500) {
                    setError({code: response.status,
                        title: 'Каналы пользователя не были загружены',
                        message: 'Ошибка сервера, не принимайте на свой счёт'})
                    // showToast(cardToast, 'error', 'Ошибка', 'Ошибка сервера, не принимайте на свой счёт');
                } else if (response.status === 403) {
                    setError({
                        code: response.status,
                        title: 'Каналы пользователя не были загружены',
                        message: 'Доступ к каналу ограничен для данного пользователя'})
                    // showToast(cardToast, 'error', 'Ошибка', 'Участники канала недоступны');
                }
            }
        )
    }

    const toast = useRef(null);
    function showSuccess() {
        toast.current.show({severity:'success', summary: 'Успешно', detail: 'Мероприиятие успешно создано', life: 3000});
    }
    function showError() {
        toast.current.show({severity:'error', summary: error.title, detail: error.message, life: 3000});
    }

    return (
        <div>
            <Dialog className="auth-card" header="Новое мероприятие" visible={isModalActive} onHide={() => setModalActive(false)} style={{ width: '50vw' }} >
                <form onSubmit={formik.handleSubmit} className="p-4 field flex flex-column gap-4">
                    <div>
                        <span className="p-float-label">
                            <InputText
                                inputid="title"
                                value={formik.values.title}
                                className={classNames({ 'p-invalid': isFormFieldInvalid('title') })}
                                onChange={(e) => {
                                    formik.setFieldValue('title', e.target.value);
                                }
                                }
                            />
                            <label htmlFor="title">Название мероприятия</label>
                        </span>
                        {getFormErrorMessage('title')}
                    </div>
                    <div>
                        <span className="p-float-label">
                            <InputTextarea
                                inputid="description"
                                value={formik.values.description}
                                className={classNames({ 'p-invalid': isFormFieldInvalid('description') })}
                                onChange={(e) => {
                                    formik.setFieldValue('description', e.target.value);
                                    }
                                }
                            />
                            <label htmlFor="description">Описание мероприятия</label>
                        </span>
                        {getFormErrorMessage('description')}
                    </div>
                    <div>
                        <span className="p-float-label">
                            <Calendar
                                showTime hourFormat="24"
                                inputid="start_datetime"
                                value={formik.values.start_datetime}
                                className={classNames({ 'p-invalid': isFormFieldInvalid('start_datetime') })}
                                onChange={(e) => {
                                    formik.setFieldValue('start_datetime', e.target.value);
                                    }
                                }
                            />
                            <label htmlFor="start_datetime">Начало мероприятия</label>
                        </span>
                        {getFormErrorMessage('start_datetime')}
                    </div>
                    <div>
                        <span className="p-float-label">
                            <InputText
                                inputid="duration_in_minutes"
                                value={formik.values.duration_in_minutes}
                                className={classNames({ 'p-invalid': isFormFieldInvalid('duration_in_minutes') })}
                                onChange={(e) => {
                                    formik.setFieldValue('duration_in_minutes', e.target.value);
                                }
                                }
                            />
                            <label htmlFor="duration_in_minutes">Длительность мероприятия (в мин)</label>
                        </span>
                        {getFormErrorMessage('duration_in_minutes')}
                    </div>
                    <div>
                        <span className="p-float-label">
                            <InputText
                                inputid="address"
                                value={formik.values.address}
                                className={classNames({ 'p-invalid': isFormFieldInvalid('address') })}
                                onChange={(e) => {
                                    formik.setFieldValue('address', e.target.value);
                                }
                                }
                            />
                            <label htmlFor="address">Адрес проведения</label>
                        </span>
                        {getFormErrorMessage('address')}
                    </div>
                    <div>
                        <span className="p-float-label">
                            <InputText
                                inputid="capacity"
                                value={formik.values.capacity}
                                className={classNames({ 'p-invalid': isFormFieldInvalid('capacity') })}
                                onChange={(e) => {
                                    formik.setFieldValue('capacity', e.target.value);
                                }
                                }
                            />
                            <label htmlFor="capacity">Максимальное количество участников (если есть)</label>
                        </span>
                        {getFormErrorMessage('capacity')}
                    </div>
                    <div>
                        <span className="p-float-label">
                            <InputText
                                inputid="price"
                                value={formik.values.price}
                                className={classNames({ 'p-invalid': isFormFieldInvalid('price') })}
                                onChange={(e) => {
                                    formik.setFieldValue('price', e.target.value);
                                }
                                }
                            />
                            <label htmlFor="price">Цена</label>
                        </span>
                        {getFormErrorMessage('price')}
                    </div>
                    <div>
                        <span className="p-float-label">
                            <InputText
                                inputid="minimum_age"
                                value={formik.values.minimum_age}
                                className={classNames({ 'p-invalid': isFormFieldInvalid('minimum_age') })}
                                onChange={(e) => {
                                    formik.setFieldValue('minimum_age', e.target.value);
                                }
                                }
                            />
                            <label htmlFor="minimum_age">Минимальный возраст участников (если есть)</label>
                        </span>
                        {getFormErrorMessage('minimum_age')}
                    </div>
                    <div>
                        <span className="p-float-label">
                            <InputText
                                inputid="maximum_age"
                                value={formik.values.maximum_age}
                                className={classNames({ 'p-invalid': isFormFieldInvalid('maximum_age') })}
                                onChange={(e) => {
                                    formik.setFieldValue('maximum_age', e.target.value);
                                }
                                }
                            />
                            <label htmlFor="maximum_age">Максимальный возраст участников (если есть)</label>
                        </span>
                        {getFormErrorMessage('maximum_age')}
                    </div>
                    <div>
                        <span className="flex align-items-center">
                            <Checkbox
                                inputId="only_for_itmo_students"
                                name="only_for_itmo_students"
                                value={formik.values.only_for_itmo_students}
                                onChange={(e) => {
                                        formik.setFieldValue('only_for_itmo_students', !formik.values.only_for_itmo_students);
                                    }
                                }
                                checked={formik.values.only_for_itmo_students}
                            />
                            <label htmlFor="only_for_itmo_students" className="ml-2">Только для студентов ИТМО</label>
                        </span>
                        {getFormErrorMessage('only_for_itmo_students')}
                    </div>
                    <div>
                        <span className="flex align-items-center">
                            <Checkbox
                                inputId="only_for_russians"
                                name="only_for_russians"
                                value={formik.values.only_for_russians}
                                onChange={(e) => {
                                    formik.setFieldValue('only_for_russians', !formik.values.only_for_russians);
                                }
                                }
                                checked={formik.values.only_for_russians}
                            />
                            <label htmlFor="only_for_russians" className="ml-2">Только для граждан РФ</label>
                        </span>
                        {getFormErrorMessage('only_for_russians')}
                    </div>
                    <div>
                        <span className="p-float-label">
                            <Dropdown
                                style={{ minWidth: '40vw' }}
                                inputId="Канал"
                                optionLabel="name"
                                value={selectedChannel}
                                options={myChannels}
                                onChange={(e) => {
                                    setSelectedChannel(e.value)
                                    formik.setFieldValue('channel_id', e.value.id)
                                }}
                                // placeholder="Выберите от чьего имени создадите мероприятие"
                            />
                            <label htmlFor="Канал">Выберите от чьего имени создадите мероприятие</label>
                        </span>
                        {getFormErrorMessage('channel_id')}
                    </div>
                    <Button className={'footer'} label="Создать мероприятие" type="submit" icon="pi pi-check" />
                </form>
            </Dialog>
            <Toast ref={toast} />
            <Button label="Создать мероприятие" onClick={() => {
                    setModalActive(true)
                    getMyChannels()
                }
            } icon="pi pi-plus" iconPos="right" text raised />
        </div>
    )
}
