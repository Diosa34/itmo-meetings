import React, {useEffect, useRef, useState} from "react";

import '../../style/AuthForm.css';
import {InputText} from 'primereact/inputtext';
import {Password} from "primereact/password";
import {Button} from "primereact/button";
import {TabMenu} from "primereact/tabmenu";
import {useNavigate} from "react-router-dom";
import {useFormik} from "formik";
import {Toast} from "primereact/toast";
import {classNames} from "primereact/utils";
import showToast from "../toast";

function AuthForm() {
    const navigate = useNavigate();

    const [login, setLogin] = useState("");
    const [password, setPassword] = useState("");
    const [activeIndex, setActiveIndex] = useState(0);
    const items = [
        {label: 'Вход', link: "/login"},
        {label: 'Регистрация', link: "/register"}
    ];
    // const [userData, setUserData] = useState([]);

    // useEffect(() => {
    //     localStorage.setItem('user', JSON.stringify(userData));
    // }, [userData]);

    const successToast = useRef(null);
    const failToast = useRef(null);

    const formik = useFormik({
        initialValues: {
            login: '',
            password: ''
        },
        validate: (data) => {
            let errors = {};

            if (!data.login) {
                errors.login = 'Введите логин';
            }

            if (!data.password) {
                errors.password = 'Введите пароль';
            }

            return errors;
        },
        onSubmit: async (data) => {
            const details = {
                'username': formik.values.login,
                'password': formik.values.password,
            };

            let formBody = [];
            for (const property in details) {
                const encodedKey = encodeURIComponent(property);
                const encodedValue = encodeURIComponent(details[property]);
                formBody.push(encodedKey + "=" + encodedValue);
            }
            formBody = formBody.join("&");

            await fetch('http://localhost:8000/auth/token',
                {
                    method: 'POST',
                    headers: {
                        'Accept': 'application/json',
                        'Content-type': 'application/x-www-form-urlencoded',
                        'Access-Control-Allow-Origin': 'http://localhost:3000',
                        'Access-Control-Allow-Credentials': 'true',
                        'WWW-Authenticate': 'Bearer'
                    },
                    body: formBody
                }).then(async response => {
                    if (response.ok) {
                        const token = await response.json()
                        localStorage.setItem('token', token.access_token)
                        console.log(localStorage.getItem('token'))
                        navigate('/catalog')
                        showToast(successToast, 'success', 'Пользователь успешно авторизован');
                    } else if (response.status === 422) {
                        showToast(failToast, 'error', 'Пользователь не авторизован', 'Некорректный запрос');
                    } else if (response.status < 500 && response.status > 400) {
                        showToast(failToast, 'error', 'Пользователь не авторизован', 'Введены некорректные данные');
                    } else if (response.status === 500) {
                        showToast(failToast, 'error', 'Ошибка', 'Ошибка сервера, не принимайте на свой счёт');
                    }
                }
            )
            formik.resetForm();
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
            <form onSubmit={formik.handleSubmit} className="auth gap-4">
                <div>
                    <span className="p-float-label">
                        <InputText
                            inputid="login"
                            value={formik.values.login}
                            className={classNames({ 'p-invalid': isFormFieldInvalid('login') }, 'widthInput')}
                            onChange={(e) => {
                                formik.setFieldValue('login', e.target.value);
                                setLogin(e.target.value)
                            }
                            }
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
                        className={classNames({ 'p-invalid': isFormFieldInvalid('password') }, 'widthInput')}
                        onChange={(e) => {
                            formik.setFieldValue('password', e.target.value);
                            setPassword(e.target.value)
                        }}
                        toggleMask
                        feedback={false}
                    />
                    <label htmlFor="password">Пароль</label>
                </span>
                    {getFormErrorMessage('password')}
                </div>

                <Button type='submit'>Войти</Button>
            </form>
            <Toast ref={successToast} />
            <Toast ref={failToast} />
        </div>
    );
}

export default AuthForm;
