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

function RegForm() {

    const [isu: number, setIsu] = useState();
    const [surname, setSurname] = useState("");
    const [name, setName] = useState("");
    const [patronymic, setPatronymic] = useState("");
    const [birthDay: Date, setBirthDay] = useState(new Date());
    const [gender, setGender] = useState();
    const [telephone, setTelephone] = useState("");
    const [email, setEmail] = useState("");
    const [login, setLogin] = useState("");
    const [password, setPassword] = useState("");
    const [password2, setPassword2] = useState("");
    const [response, setResponse] = useState("");


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
            username: '',
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
                'http://localhost:8000/user/',
                'POST',
                'application/json',
                {
                    username: formik.values.username,
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
                        setResponse(response.json());
                        navigate('/login')
                        // data &&
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
                        inputid="username"
                        value={formik.values.username}
                        className={classNames({ 'p-invalid': isFormFieldInvalid('username') })}
                        onChange={(e) => {
                            formik.setFieldValue('username', e.target.value);
                            setIsu(e.target.value)
                        }}
                    />
                    <label htmlFor="username">Ник</label>
                    </span>
                        {getFormErrorMessage('username')}
                </div>
                <div>
                    <span className="p-float-label">
                    <InputText
                        inputid="surname"
                        value={formik.values.surname}
                        className={classNames({ 'p-invalid': isFormFieldInvalid('surname') })}
                        onChange={(e) => {
                            formik.setFieldValue('surname', e.target.value);
                            setSurname(e.target.value)
                        }}
                    />
                    <label htmlFor="surname">Фамилия</label>
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
                            formik.setFieldValue('name', e.target.value);
                            setName(e.target.value)
                        }}
                    />
                    <label htmlFor="name">Имя</label>
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
                            formik.setFieldValue('patronymic', e.target.value);
                            setPatronymic(e.target.value)
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
                        dateFormat="yy.mm.dd"
                        placeholder={"Дата рождения"}
                    />
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
                            setTelephone(actualPhone)
                        }}
                        mask="8 (999) 999-9999"
                    />
                    <label htmlFor="telephone">Телефон</label>
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
                            setEmail(e.target.value)
                        }}
                        keyfilter="email"
                    />
                    <label htmlFor="email">Электронная почта</label>
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
                            setLogin(e.target.value)
                        }}
                    />
                    <label htmlFor="login">Логин</label>
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
                            setPassword(e.target.value)
                        }}
                        header={header}
                        footer={footer}
                        toggleMask
                        promptLabel="Введите пароль" weakLabel="Слабый" mediumLabel="Средний" strongLabel="Надёжный"
                    />
                    <label htmlFor="password">Пароль</label>
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
                            setPassword2(e.target.value)
                        }}
                        feedback={false}
                        toggleMask/>
                    <label htmlFor="password2">Пароль ещё раз</label>
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
