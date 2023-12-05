import React, {useState} from "react";

import '../../style/RegForm.css';
import {InputText} from 'primereact/inputtext';
import {Button} from "primereact/button";
import {InputNumber} from "primereact/inputnumber";
import {Calendar} from "primereact/calendar";
import {Password} from "primereact/password";
import { Divider } from 'primereact/divider';
import { Dialog } from 'primereact/dialog';

function RegForm() {

    const [isu, setIsu] = useState(111111);
    const [surname, setSurname] = useState("");
    const [name, setName] = useState("");
    const [patronymic, setPatronymic] = useState("");
    const [birthDay, setBirthDay] = useState();
    const [login, setLogin] = useState("");
    const [password, setPassword] = useState("");
    const [password2, setPassword2] = useState("");
    const [phone, setPhone] = useState("");

    const validateName = name => {
        const regex = /[A-Za-z]{3,}/;

        return !regex.test(name)
            ? "The name must contain at least three letters. Numbers and special characters are not allowed."
            : "";
    };

    // const validatePassword

    const header = <div className="font-bold mb-3">Выберите пароль</div>;
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


    return (
        <div className="p-5 shadow-2 border-round">
            <form className="auth">
                <label>Регистрация</label>
                <span className="p-float-label">
                    <InputNumber id="isu" value={isu} onChange={(e) => setIsu(e.value)} useGrouping={false} placeholder="Ису"/>
                    <label htmlFor="isu">Ису</label>
                </span>
                <span className="p-float-label">
                    <InputText id="surname" value={surname} onChange={(e) => setSurname(e.target.value)} />
                    <label htmlFor="surname">Фамилия</label>
                </span>
                <span className="p-float-label">
                    <InputText id="name" value={name} onChange={(e) => setName(e.target.value)} />
                    <label htmlFor="name">Имя</label>
                </span>
                <span className="p-float-label">
                    <InputText id="patronymic" value={patronymic} onChange={(e) => setPatronymic(e.target.value)} />
                    <label htmlFor="patronymic">Отчество (при наличии)</label>
                </span>
                <span className="p-float-label">
                    <Calendar id="birthDay" value={birthDay} onChange={(e) => setBirthDay(e.value)} dateFormat="dd.mm.yy" />
                    <label htmlFor="birthDay">Дата рождения</label>
                </span>
                <span className="p-float-label">
                    <InputText id="login" value={login} onChange={(e) => setLogin(e.target.value)}/>
                    <label htmlFor="login">Логин</label>
                </span>
                <span className="p-float-label">
                    <Password id="password" value={password} onChange={(e) => setPassword(e.target.value)} header={header} footer={footer} toggleMask
                              promptLabel="Введите пароль" weakLabel="Слабый" mediumLabel="Средний" strongLabel="Надёжный" />
                    <label htmlFor="password">Пароль</label>
                </span>
                <span className="p-float-label">
                    <Password id="password2" value={password2} onChange={(e) => setPassword2(e.target.value)} feedback={false} toggleMask/>
                    <label htmlFor="password">Пароль ещё раз</label>
                </span>
                <span className="p-float-label">
                    <InputText id="phone" value={phone} onChange={(e) => setPhone(e.target.value)} mask="8 (999) 999-9999" placeholder="8 (999) 999-99-99"></InputText>
                    <label htmlFor="phone">Телефон</label>
                </span>
                <Button onClick={() => alert('Введены не все данные')}>Зарегистрироваться</Button>
            </form>
        </div>
    );
}

export default RegForm;
