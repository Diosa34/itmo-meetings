import React, {useRef, useState} from "react";

import '../../style/AuthForm.css';
import {InputText} from 'primereact/inputtext';
import {Button} from "primereact/button";
import {InputNumber} from "primereact/inputnumber";
import {Calendar} from "primereact/calendar";
import {Password} from "primereact/password";
import { Divider } from 'primereact/divider';
import { Dialog } from 'primereact/dialog';
import {useNavigate} from "react-router-dom";
import {TabMenu} from "primereact/tabmenu";
import {useFormik} from "formik";
import {classNames} from "primereact/utils";
import {RadioButton} from "primereact/radiobutton";

function RegForm() {

    const [isu: number, setIsu] = useState();
    const [surname, setSurname] = useState("");
    const [name, setName] = useState("");
    const [patronymic, setPatronymic] = useState("");
    const [birthDay, setBirthDay] = useState();
    const [gender, setGender] = useState();
    const [telephone, setTelephone] = useState("");
    const [email, setEmail] = useState("");
    const [login, setLogin] = useState("");
    const [password, setPassword] = useState("");
    const [password2, setPassword2] = useState("");


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

    const toast = useRef(null);

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

    const show = () => {
        toast.current.show({ severity: 'success', summary: 'Зарегистрирован новый пользователь'});
    };

    const formik = useFormik({
        initialValues: {
            isu: '',
            surname: '',
            name: '',
            patronymic: '',
            gender: '',
            birthDay: '',
            telephone: '',
            email: '',
            login: '',
            password: '',
            password2: ''
        },
        validate: (data) => {
            let errors = {};

            if (!data.isu) {
                errors.isu = 'Введите ису';
            } else if (String(isu).length !== 6) {
                errors.isu = 'Некорректное ису';
            }

            if (!data.surname) {
                errors.surname = 'Введите фамилию';
            }

            if (!data.name) {
                errors.name = 'Введите имя';
            }

            if (!data.gender) {
                errors.gender = 'Укажите пол';
            }

            if (!data.birthDay) {
                errors.birthDay = 'Введите дату рождения';
            } else if (data.birthDay > new Date()) {
                errors.birthDay = 'Некорректная дата рождения'
            }

            if (!data.telephone) {
                errors.telephone = 'Введите телефон';
            }

            if (!data.email) {
                errors.email = 'Введите адрес электронной почты';
            } else if (!(/.+@.+\..+/i.test(data.email))) {
                errors.email = 'Некорректный адрес электронной почты\''
            }

            if (!data.login) {
                errors.login = 'Введите логин';
            }

            if (!data.password) {
                errors.password = 'Введите пароль';
            }

            if (!data.password2 || data.password2 !== data.password) {
                errors.password2 = 'Пароли не совпадают';
            }

            return errors;
        },
        onSubmit: (data) => {
            formik.resetForm();
            navigate('/login')
            data && show();
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
            <form className="auth" onSubmit={formik.handleSubmit}>
                <span className="p-float-label">
                    <InputText
                        inputid="isu"
                        value={formik.values.isu}
                        className={classNames({ 'p-invalid': isFormFieldInvalid('isu') })}
                        onChange={(e) => {
                            formik.setFieldValue('isu', e.target.value);
                            setIsu(e.target.value)
                        }}
                        useGrouping={false}/>
                    <label htmlFor="isu">Ису</label>
                </span>
                {getFormErrorMessage('isu')}
                <span className="p-float-label">
                    <InputText
                        inputid="surname"
                        value={formik.values.surname}
                        className={classNames({ 'p-invalid': isFormFieldInvalid('surname') })}
                        onChange={(e) => {
                            formik.setFieldValue('surname', e.target.value);
                            setSurname(e.target.value)
                        }}
                        useGrouping={false}
                    />
                    <label htmlFor="surname">Фамилия</label>
                </span>
                {getFormErrorMessage('surname')}
                <span className="p-float-label">
                    <InputText
                        inputid="name"
                        value={formik.values.name}
                        className={classNames({ 'p-invalid': isFormFieldInvalid('name') })}
                        onChange={(e) => {
                            formik.setFieldValue('name', e.target.value);
                            setName(e.target.value)
                        }}
                        useGrouping={false}
                    />
                    <label htmlFor="name">Имя</label>
                </span>
                {getFormErrorMessage('name')}
                <span className="p-float-label">
                    <InputText
                        inputid="patronymic"
                        value={formik.values.patronymic}
                        className={classNames({ 'p-invalid': isFormFieldInvalid('patronymic') })}
                        onChange={(e) => {
                            formik.setFieldValue('patronymic', e.target.value);
                            setPatronymic(e.target.value)
                        }}
                        useGrouping={false}
                    />
                    <label htmlFor="patronymic">Отчество (при наличии)</label>
                </span>
                {getFormErrorMessage('patronymic')}
                <span className="flex">
                    {/*<Toast ref={toast} />*/}
                    {radioBtns.map((btn, i) => {
                        return (
                            <div key={i} className="flex align-items-center mr-3">
                                <RadioButton
                                    {...btn}
                                    checked={formik.values.gender === btn.value}
                                    onChange={(e) => {
                                        formik.setFieldValue('gender', e.value);
                                        setGender(e.target.value)
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
                {/*<span className="p-float-label" style={{paddingTop: 0}}>*/}
                    <Calendar
                        inputid="birthDay"
                        value={formik.values.birthDay}
                        className={classNames({ 'p-invalid': isFormFieldInvalid('birthDay') })}
                        onChange={(e) => {
                            formik.setFieldValue('birthDay', e.target.value);
                            setBirthDay(e.target.value)
                        }}
                        useGrouping={false}
                        dateFormat="dd.mm.yy"
                        placeholder={'Дата рождения'}
                    />
                    {/*<label htmlFor="birthDay">Дата рождения</label>*/}
                {/*</span>*/}
                {getFormErrorMessage('birthDay')}
                <span className="p-float-label">
                    <InputText
                        inputid="telephone"
                        value={formik.values.telephone}
                        className={classNames({ 'p-invalid': isFormFieldInvalid('telephone') })}
                        onChange={(e) => {
                            formik.setFieldValue('telephone', e.target.value);
                            setTelephone(e.target.value)
                        }}
                        useGrouping={false}
                        mask="8 (999) 999-9999"
                    />
                    <label htmlFor="telephone">Телефон</label>
                </span>
                {getFormErrorMessage('telephone')}
                <span className="p-float-label">
                    <InputText
                        inputid="email"
                        value={formik.values.email}
                        className={classNames({ 'p-invalid': isFormFieldInvalid('email') })}
                        onChange={(e) => {
                            formik.setFieldValue('email', e.target.value);
                            setEmail(e.target.value)
                        }}
                        useGrouping={false} 
                        keyfilter="email"
                    />
                    <label htmlFor="email">Электронная почта</label>
                </span>
                {getFormErrorMessage('email')}
                <span className="p-float-label">
                    <InputText
                        inputid="login"
                        value={formik.values.login}
                        className={classNames({ 'p-invalid': isFormFieldInvalid('login') })}
                        onChange={(e) => {
                            formik.setFieldValue('login', e.target.value);
                            setLogin(e.target.value)
                        }}
                        useGrouping={false}
                    />
                    <label htmlFor="login">Логин</label>
                </span>
                {getFormErrorMessage('login')}
                <span className="p-float-label">
                    <Password
                        inputid="password"
                        value={formik.values.password}
                        className={classNames({ 'p-invalid': isFormFieldInvalid('password') })}
                        onChange={(e) => {
                            formik.setFieldValue('password', e.target.value);
                            setPassword(e.target.value)
                        }}
                        useGrouping={false}
                        header={header}
                        footer={footer}
                        toggleMask
                        promptLabel="Введите пароль" weakLabel="Слабый" mediumLabel="Средний" strongLabel="Надёжный"
                    />
                    <label htmlFor="password">Пароль</label>
                </span>
                {getFormErrorMessage('password')}
                <span className="p-float-label">
                    <Password
                        inputid="password2"
                        value={formik.values.password2}
                        className={classNames({ 'p-invalid': isFormFieldInvalid('password2') })}
                        onChange={(e) => {
                            formik.setFieldValue('password2', e.target.value);
                            setPassword2(e.target.value)
                        }}
                        useGrouping={false}
                        feedback={false}
                        toggleMask/>
                    <label htmlFor="password2">Пароль ещё раз</label>
                </span>
                {getFormErrorMessage('password2')}
                <Button type='submit'>Зарегистрироваться</Button>
            </form>
        </div>
    );
}

export default RegForm;
