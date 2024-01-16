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
import '../../style/FormBackground.css';
import HOST from "../../host";

export default function AddEvent() {
    const [isModalActive, setModalActive] = useState(false);
    const [myChannels, setMyChannels] = useState();
    const [selectedChannel, setSelectedChannel] = useState();
    const [selectedUnit, setSelectedUnit] = useState('мин.');
    const [error, setError] = useState({
        code: 500,
        title: 'Сообщества пользователя не были загружены',
        message: 'Доступ к сообществу ограничен для данного пользователя'})
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
            start_datetime: new Date(),
            duration_in_minutes: null, // просто число
            address: "",
            capacity: 4, // просто число
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
            } else if (data.start_datetime.getTime() <= new Date().getTime()) {
                errors.start_datetime = 'Некорректная дата, слишком позднее начало.';
            }

            if (!data.address) {
                errors.address = 'Выберите место проведения мероприятия.';
            }

            if (data.duration_in_minutes <= 0 && data.duration_in_minutes) {
                errors.duration_in_minutes = 'Длительность мероприятия должна быть больше 0.';
            }

            if (!data.capacity || data.capacity <= 0) {
                errors.capacity = 'Максиимальное количество участников должно быть больше 0.';
            }

            if (!(/\d+/.test(data.price))) {
                errors.price = 'Цена должна быть числом.';
            }

            if (!data.channel_id) {
                errors.channel_id = 'Выберите автора.';
            }

            if (data.minimum_age > data.maximum_age || !data.minimum_age || !data.maximum_age) {
                errors.minimum_age = 'Максимальный возраст должен быть больше минимального'
                errors.maximum_age = 'Максимальный возраст должен быть больше минимального'
            }

            return errors;
        },
        onSubmit: (data) => {
            const token = 'Bearer ' + localStorage.getItem('token')
            fetch(`${HOST}/meeting/`,
            {
                    method: 'POST',
                    headers: {
                        'Accept': 'application/json',
                        'Content-type': 'application/json',
                        'Access-Control-Allow-Origin': HOST,
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
                        // showToast(cardToast, 'error', 'Ошибка', 'Участники сообщества недоступны');
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
                        title: 'Сообщества пользователя не были загружены',
                        message: 'Сломанный запрос'})
                    // showToast(cardToast, 'error', 'Страница недоступна', 'Сломанный запрос');
                } else if (response.status === 500) {
                    setError({code: response.status,
                        title: 'Сообщества пользователя не были загружены',
                        message: 'Ошибка сервера, не принимайте на свой счёт'})
                    // showToast(cardToast, 'error', 'Ошибка', 'Ошибка сервера, не принимайте на свой счёт');
                } else if (response.status === 403) {
                    setError({
                        code: response.status,
                        title: 'Сообщества пользователя не были загружены',
                        message: 'Доступ к сообществу ограничен для данного пользователя'})
                    // showToast(cardToast, 'error', 'Ошибка', 'Участники сообщества недоступны');
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

    const calculateDuration = (value) => {
        if (selectedUnit === 'мин.') {
            return value
        } else if (selectedUnit === 'час.') {
            return value * 60
        } else if (selectedUnit === 'дн.') {
            return value * 60 * 24
        }
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
                            <label className="required" htmlFor="title">Название мероприятия</label>
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
                                rows={5} cols={40}
                            />
                            <label htmlFor="description">Описание мероприятия</label>
                        </span>
                        {getFormErrorMessage('description')}
                    </div>
                    <div>
                        <span className="p-float-label">
                            <Calendar
                                showIcon
                                showTime
                                hourFormat="24"
                                inputid="start_datetime"
                                value={formik.values.start_datetime}
                                className={classNames({ 'p-invalid': isFormFieldInvalid('start_datetime') })}
                                onChange={(e) => {
                                    formik.setFieldValue('start_datetime', e.target.value);
                                    }
                                }
                                dateFormat="dd.mm.yy"
                                showOnFocus={false}
                            />
                            <label className="required" htmlFor="start_datetime">Начало мероприятия</label>
                        </span>
                        {getFormErrorMessage('start_datetime')}
                    </div>
                    <div className="flex ">
                        <div className="flex-initial flex align-items-center justify-content-center border-round">
                            <span className="p-float-label">
                            <InputText
                                inputid="duration_in_minutes"
                                value={formik.values.duration_in_minutes}
                                className={classNames({ 'p-invalid': isFormFieldInvalid('duration_in_minutes') })}
                                onChange={(e) => {
                                    formik.setFieldValue('duration_in_minutes', calculateDuration(e.target.value));
                                }
                                }
                            />
                            <label htmlFor="duration_in_minutes">Длительность мероприятия</label>
                            </span>
                                {getFormErrorMessage('duration_in_minutes')}
                        </div>
                        <div className="flex-initial flex align-items-center justify-content-center border-round">
                            <Dropdown
                                value={selectedUnit}
                                options={['час.', 'мин.', 'дн.']}
                                onChange={(e) => {
                                    setSelectedUnit(e.value)
                                }}
                            />
                        </div>
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
                            <label className="required" htmlFor="address">Адрес проведения</label>
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
                            <label htmlFor="capacity">Максимальное количество участников</label>
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
                            <label htmlFor="price">Цена (в рублях)</label>
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
                            <label htmlFor="minimum_age">Минимальный возраст участников</label>
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
                            <label htmlFor="maximum_age">Максимальный возраст участников</label>
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
                                style={{ minWidth: '40vw', minHeight: '4vw'}}
                                inputId="Сообщество"
                                optionLabel="name"
                                value={selectedChannel}
                                options={myChannels}
                                onChange={(e) => {
                                    setSelectedChannel(e.value)
                                    formik.setFieldValue('channel_id', e.value.id)
                                }}
                                // placeholder="Выберите от чьего имени создадите мероприятие"
                            />
                            <label className="required" htmlFor="Сообщество">Выберите, создадите мероприятие от своего имени или одного из сообществ, вдаельцем котрого вы являетесь</label>
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
