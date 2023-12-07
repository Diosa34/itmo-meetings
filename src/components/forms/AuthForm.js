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
import {Divider} from "primereact/divider";

function AuthForm() {
    const navigate = useNavigate();

    const [login, setLogin] = useState("");
    const [password, setPassword] = useState("");
    const [activeIndex, setActiveIndex] = useState(0);
    const items = [
        {label: 'Вход', link: "/login"},
        {label: 'Регистрация', link: "/register"}
    ];
    const [userData, setUserData] = useState([]);

    useEffect(() => {
        localStorage.setItem('user', JSON.stringify(userData));
    }, [userData]);

    const toast = useRef(null);

    const show = () => {
        toast.current.show({ severity: 'success', summary: 'Выполнен вход'});
    };

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
        onSubmit: (data) => {
            formik.resetForm();
            navigate('/main')
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
            <form onSubmit={formik.handleSubmit} className="auth">
                <span className="p-float-label">
                    {/*<Toast ref={toast} />*/}
                    <div className={'widthInput'}>
                        <InputText
                            inputid="login"
                            value={formik.values.login}
                            className={classNames({ 'p-invalid': isFormFieldInvalid('login') })}
                            onChange={(e) => {
                                formik.setFieldValue('login', e.target.value);
                                setLogin(e.target.value)
                                }
                            }
                        />
                    </div>
                    <label htmlFor="login">Логин</label>
                </span>
                {getFormErrorMessage('login')}
                <span className="p-float-label">
                    <Toast ref={toast} />
                    <div className={'widthInput'}>
                        <Password
                            inputid="password"
                            value={formik.values.password}
                            className={classNames({ 'p-invalid': isFormFieldInvalid('password') })}
                            onChange={(e) => {
                                formik.setFieldValue('password', e.target.value);
                                setPassword(e.target.value)
                            }}
                            toggleMask
                            feedback={false}
                        />
                    </div>
                    <label htmlFor="password">Пароль</label>
                </span>
                {getFormErrorMessage('password')}
                <Button type='submit'>Войти</Button>
            </form>
        </div>
    );
}

export default AuthForm;
