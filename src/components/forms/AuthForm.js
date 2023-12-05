import React, {useState} from "react";

import '../../style/AuthForm.css';
import {InputText} from 'primereact/inputtext';
import {Password} from "primereact/password";
import {Button} from "primereact/button";

function AuthForm() {

    const [login, setLogin] = useState("");
    const [password, setPassword] = useState("");

    return(
        <form className="p-5 shadow-2 border-round">
            <span className="p-float-label">
                <InputText id="login" value={login} onChange={(e) => setLogin(e.target.value)}/>
                <label htmlFor="login">Логин</label>
            </span>
            <span className="p-float-label">
                <Password id="password" value={password} onChange={(e) => setPassword(e.target.value)} toggleMask/>
                <label htmlFor="password">Пароль</label>
            </span>
            <Button onClick={() => alert('Введены не все данные')}>Войти</Button>
        </form>
    );
}

export default AuthForm;
