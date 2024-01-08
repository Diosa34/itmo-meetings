import React, {useRef, useState} from "react";

import '../../style/AuthForm.css';
import {InputText} from 'primereact/inputtext';
import {Button} from "primereact/button";
import {Calendar} from "primereact/calendar";
import {Password} from "primereact/password";
import { Divider } from 'primereact/divider';
import {useNavigate} from "react-router-dom";
import {TabMenu} from "primereact/tabmenu";
import {useFormik} from "formik";
import {classNames} from "primereact/utils";
import {RadioButton} from "primereact/radiobutton";
import request from "../rest";
import ShowError from "../ShowError";
import {Toast} from "primereact/toast";
import showToast from "../toast";
import validate from "../../validation/register";
import HOST from "../../host";

function RegForm() {

    const [birthDay: Date, setBirthDay] = useState();
    const [gender, setGender] = useState();

    const [activeIndex, setActiveIndex] = useState(1);
    const items = [
        {label: 'Вход', link: "/login"},
        {label: 'Регистрация', link: "/register"}
    ];

    const navigate = useNavigate();

    const header = <div className="font-bold mb-3">Выберите пароль, не содержащий кириллические символы</div>;
    const footer = (
        <>
            <Divider />
            <p className="mt-2">Пароль должен содержать:</p>
            <ul className="pl-2 ml-2 mt-0 line-height-3">
                <li>Одну букву в нижнем регистре</li>
                <li>Одну букву в верхнем регистре</li>
                <li>Одну цифру</li>
                <li>Минимум 8 символов</li>
            </ul>
        </>
    );

    const radioBtns = [
        {
            id: 'male',
            name: 'male',
            value: 'Муж',
            inputId: 'male'
        },
        {
            id: 'female',
            name: 'female',
            value: 'Жен',
            inputId: 'female'
        }
    ]

    const successToast = useRef(null);
    const failToast = useRef(null);

    const formik = useFormik({
        initialValues: {
            surname: '',
            name: '',
            patronymic: null,
            gender: '',
            birthDay: '',
            telephone: '',
            email: '',
            login: '',
            password: '',
            password2: ''
        },
        validate: (data) => {return validate(data, birthDay)},
        onSubmit: (data) => {
            request(
                `${HOST}/user/`,
                'POST',
                'application/json',
                {
                    username: formik.values.login,
                    telephone: formik.values.telephone,
                    email: formik.values.email,
                    firstname: formik.values.name,
                    patronymic: formik.values.patronymic,
                    surname: formik.values.surname,
                    other_names: null,
                    gender: gender,
                    date_of_birth: formik.values.birthDay,
                    password: formik.values.password
                }
            ).then(response => {
                    if (response.ok) {
                        navigate('/login')
                        showToast(successToast, 'success', 'Пользователь успешно зарегистрирован');
                    } else if (response.status === 422) {
                        showToast(failToast, 'error', 'Неверные данные', 'Такой пользователь уже существует или введены некорректные данные');
                    } else if (response.status === 500) {
                        showToast(failToast, 'error', 'Ошибка', 'Ошибка сервера, не принимайте на свой счёт');
                    }
                }
            )
        }
    });


    const isFormFieldInvalid = (name) => !!(formik.touched[name] && formik.errors[name]);

    const getFormErrorMessage = (name) => {
        return isFormFieldInvalid(name)
            ? <small className="p-error">{formik.errors[name]}</small>
            : <small style={{display: "none"}} className="p-error">&nbsp;</small>;
    };

    return(
        <div className="p-5 shadow-2 border-round auth-card">
            <TabMenu className='menu' model={items} activeIndex={activeIndex} onTabChange={(e) => {
                        navigate(e.value['link'])
                        setActiveIndex(e.index)
                    }
                }
            />
            <form className="auth gap-4" onSubmit={formik.handleSubmit}>
                <div>
                    <span className="p-float-label">
                    <InputText
                        inputid="surname"
                        value={formik.values.surname}
                        className={classNames({ 'p-invalid': isFormFieldInvalid('surname') })}
                        onChange={(e) => {
                            formik.setFieldValue('surname', e.target.value.charAt(0).toUpperCase() + e.target.value.slice(1).toLowerCase());
                        }}
                    />
                    <label className="required" htmlFor="surname">Фамилия</label>
                    </span>
                        {getFormErrorMessage('surname')}
                </div>
                <div>
                    <span className="p-float-label">
                    <InputText
                        inputid="name"
                        value={formik.values.name}
                        className={classNames({ 'p-invalid': isFormFieldInvalid('name') })}
                        onChange={(e) => {
                            formik.setFieldValue('name', formik.values.name.charAt(0).toUpperCase() + formik.values.name.slice(1).toLowerCase());
                        }}
                    />
                    <label className="required" htmlFor="name">Имя</label>
                    </span>
                        {getFormErrorMessage('name')}
                </div>
                <div>
                    <span className="p-float-label">
                    <InputText
                        inputid="patronymic"
                        value={formik.values.patronymic}
                        className={classNames({ 'p-invalid': isFormFieldInvalid('patronymic') })}
                        onChange={(e) => {
                            formik.setFieldValue('patronymic', e.target.value.charAt(0).toUpperCase() + e.target.value.slice(1).toLowerCase());
                        }}
                    />
                    <label htmlFor="patronymic">Отчество (при наличии)</label>
                </span>
                    {getFormErrorMessage('patronymic')}
                </div>
                <div>
                    <span className="flex">
                        {radioBtns.map((btn, i) => {
                            return (
                                <div key={i} className="flex align-items-center mr-3">
                                    <RadioButton
                                        {...btn}
                                        checked={formik.values.gender === btn.inputId}
                                        onChange={(e) => {
                                            let actualValue = (e.value === 'Муж') ? 'male' : 'female';
                                            formik.setFieldValue('gender', actualValue);
                                            setGender(actualValue)
                                        }}
                                    />
                                    <label htmlFor={btn.inputId} className="ml-1">
                                        {btn.value}
                                    </label>
                                </div>
                            );
                        })}
                    </span>
                    {getFormErrorMessage('gender')}
                </div>
                <div>
                    <span className="p-float-label">
                        <Calendar
                            yearRange="1900:2007"
                            inputid="birth_date"
                            value={birthDay}
                            className={classNames({ 'p-invalid': isFormFieldInvalid('birthDay') }, 'minWidth')}
                            onChange={(e) => {
                                setBirthDay(e.target.value)
                                let actualBirthDay = e.target.value.toISOString().slice(0, 10);
                                formik.setFieldValue('birthDay', actualBirthDay);
                            }}
                            dateFormat="dd.mm.yy"
                            placeholder={"чч.мм.гггг"}
                        />
                        <label  className="required" htmlFor="birth_date">Дата рождения</label>
                    </span>
                    {getFormErrorMessage('birthDay')}
                </div>
                <div>
                    <span className="p-float-label">
                    <InputText
                        inputid="telephone"
                        value={formik.values.telephone}
                        className={classNames({ 'p-invalid': isFormFieldInvalid('telephone') })}
                        onChange={(e) => {
                            let actualPhone = e.target.value.replace(/^8/, "+7")
                            formik.setFieldValue('telephone', actualPhone);
                        }}
                        mask="8 (999) 999-9999"
                    />
                    <label  className="required" htmlFor="telephone">Телефон</label>
                </span>
                    {getFormErrorMessage('telephone')}
                </div>
                <div>
                    <span className="p-float-label">
                    <InputText
                        inputid="email"
                        value={formik.values.email}
                        className={classNames({ 'p-invalid': isFormFieldInvalid('email') })}
                        onChange={(e) => {
                            formik.setFieldValue('email', e.target.value);
                        }}
                        keyfilter="email"
                    />
                    <label className="required" htmlFor="email">Электронная почта</label>
                </span>
                    {getFormErrorMessage('email')}
                </div>
                <div>
                    <span className="p-float-label">
                    <InputText
                        inputid="login"
                        value={formik.values.login}
                        className={classNames({ 'p-invalid': isFormFieldInvalid('login') })}
                        onChange={(e) => {
                            formik.setFieldValue('login', e.target.value);
                        }}
                    />
                    <label className="required" htmlFor="login">Логин</label>
                </span>
                    {getFormErrorMessage('login')}
                </div>
                <div>
                    <span className="p-float-label">
                    <Password
                        inputid="password"
                        value={formik.values.password}
                        className={classNames({ 'p-invalid': isFormFieldInvalid('password') })}
                        onChange={(e) => {
                            formik.setFieldValue('password', e.target.value);
                        }}
                        header={header}
                        footer={footer}
                        toggleMask
                        promptLabel="Введите пароль" weakLabel="Слабый" mediumLabel="Средний" strongLabel="Надёжный"
                    />
                    <label  className="required" htmlFor="password">Пароль</label>
                </span>
                    {getFormErrorMessage('password')}
                </div>
                <div>
                    <span className="p-float-label">
                    <Password
                        inputid="password2"
                        value={formik.values.password2}
                        className={classNames({ 'p-invalid': isFormFieldInvalid('password2') })}
                        onChange={(e) => {
                            formik.setFieldValue('password2', e.target.value);
                        }}
                        feedback={false}
                        toggleMask/>
                    <label className="required" htmlFor="password2">Пароль ещё раз</label>
                </span>
                    {getFormErrorMessage('password2')}
                </div>
                <Button type='submit'>Зарегистрироваться</Button>
            </form>
            <Toast ref={successToast} />
            <Toast ref={failToast} />
        </div>
    );
}

export default RegForm;
