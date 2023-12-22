import '../../style/Profile.css'

import { Avatar } from 'primereact/avatar';
import React, {useEffect, useRef, useState} from "react";
import {Inplace, InplaceContent, InplaceDisplay} from "primereact/inplace";
import {InputText} from "primereact/inputtext";
import {useNavigate} from "react-router-dom";
import {Toast} from "primereact/toast";
import showToast from "../toast";
import {Button} from "primereact/button";

function Profile() {
    const [username, setUserame] = useState("Elison");
    const [name, setName] = useState("Elison");
    const [surname, setSurname] = useState("Argent");
    const [patronymic, setPatronymic] = useState(null);
    const [telephone, setTelephone] = useState("+79001234567");
    const [email, setEmail] = useState("elison@example.com");
    const [gender, setGender] = useState("male");
    const [date_of_birth, setDate_of_birth] = useState("2000-01-01");
    const [user_id, setUser_id] = useState("");
    const token = 'Bearer ' + localStorage.getItem('token')
    const navigate = useNavigate();

    const profileToast = useRef(null);

    useEffect(() => {
        fetch('http://localhost:8000/user/me/',
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
                        response.json().then(data => {
                            setName(data.firstname);
                            setUserame(data.username);
                            setSurname(data.surname);
                            setPatronymic(data.patronymic);
                            setTelephone(data.telephone);
                            setEmail(data.email);
                            setGender(data.gender);
                            setDate_of_birth(data.date_of_birth);
                            setUser_id(data.id);
                            }
                        );
                    } else if (response.status === 401) {
                        navigate('/login')
                        // showToast(profileToast, 'error', 'Страница недоступна', 'Пользователь не авторизован');
                    } else if (response.status === 422) {
                        showToast(profileToast, 'error', 'Страница недоступна', 'Сломанный запрос');
                    } else if (response.status === 500) {
                        showToast(profileToast, 'error', 'Ошибка', 'Ошибка сервера, не принимайте на свой счёт');
                    }
                }
            )
    }, [navigate, profileToast]);

    const editProfile = () => {
        fetch(`http://localhost:8000/user/${user_id}/`,
            {
                method: 'PUT',
                headers: {
                    'Accept': 'application/json',
                    'Access-Control-Allow-Origin': 'http://localhost:3000',
                    'Access-Control-Allow-Credentials': 'true',
                    'Authorization': token != null ? token : "",
                },
                body: JSON.stringify(
                    {
                        username: username,
                        telephone: telephone,
                        email: email,
                        firstname: name,
                        patronymic: null,
                        surname: surname,
                        other_names: null,
                        gender: gender,
                        date_of_birth: date_of_birth
                    }
                )
            }
        ).then(response => {
                if (response.ok) {
                    response.json().then(data => {
                            setName(data.firstname);
                            setSurname(data.surname);
                            setPatronymic(data.patronymic);
                            setTelephone(data.telephone);
                            setEmail(data.email);
                            setGender(data.gender);
                            setDate_of_birth(data.date_of_birth);
                        }
                    );
                } else if (response.status === 401) {
                    navigate('/login')
                    // showToast(profileToast, 'error', 'Страница недоступна', 'Пользователь не авторизован');
                } else if (response.status === 422) {
                    showToast(profileToast, 'error', 'Страница недоступна', 'Сломанный запрос');
                } else if (response.status === 500) {
                    showToast(profileToast, 'error', 'Ошибка', 'Ошибка сервера, не принимайте на свой счёт');
                }
            }
        )
    }

    const deleteAccount = () => {
        fetch(`http://localhost:8000/user/me/`,
            {
                method: 'DELETE',
                headers: {
                    'Accept': 'application/json',
                    'Access-Control-Allow-Origin': 'http://localhost:3000',
                    'Access-Control-Allow-Credentials': 'true',
                    'Authorization': token != null ? token : "",
                }
            }
        ).then(response => {
                if (response.ok) {
                } else if (response.status === 401) {
                    navigate('/login')
                    // showToast(profileToast, 'error', 'Страница недоступна', 'Пользователь не авторизован');
                } else if (response.status === 422) {
                    showToast(profileToast, 'error', 'Страница недоступна', 'Сломанный запрос');
                } else if (response.status === 500) {
                    showToast(profileToast, 'error', 'Ошибка', 'Ошибка сервера, не принимайте на свой счёт');
                }
            }
        )
    }

    return (
        <div>
            <div className="content">
                <h1 className="title">Мой профиль</h1>
                <div className="left">
                    <Avatar className={'avatar'} icon="pi pi-user" size="xlarge" shape="circle" />
                    <Inplace closable className="child"  onClose={editProfile}>
                        <InplaceDisplay>{surname || 'Введите значение'}</InplaceDisplay>
                        <InplaceContent>
                            <InputText
                                value={surname}
                                onChange={(e) => {
                                    setSurname(e.target.value);
                                    editProfile()
                                }
                            }
                            />
                        </InplaceContent>
                    </Inplace>
                    <Inplace closable onClose={editProfile}>
                        <InplaceDisplay>{name || 'Введите значение'}</InplaceDisplay>
                        <InplaceContent>
                            <InputText value={name} onChange={(e) => {
                                setName(e.target.value)
                                editProfile()
                            }} autoFocus />
                        </InplaceContent>
                    </Inplace>
                    <Inplace closable onClose={editProfile}>
                        <InplaceDisplay>{patronymic || 'Введите значение'}</InplaceDisplay>
                        <InplaceContent>
                            <InputText value={patronymic} onChange={(e) => {
                                setPatronymic(e.target.value)
                                editProfile()
                            }
                            } autoFocus />
                        </InplaceContent>
                    </Inplace>
                    <Inplace closable onClose={editProfile}>
                        <InplaceDisplay>{gender || 'Введите значение'}</InplaceDisplay>
                        <InplaceContent>
                            <InputText value={gender} onChange={(e) => {
                                setGender(e.target.value)
                            }} autoFocus />
                        </InplaceContent>
                    </Inplace>
                    <Inplace closable onClose={editProfile}>
                        <InplaceDisplay>{telephone || 'Введите значение'}</InplaceDisplay>
                            <InplaceContent>
                                <InputText value={telephone} onChange={(e) => {
                                    setTelephone(e.target.value)
                                    editProfile()
                                }} autoFocus />
                            </InplaceContent>
                    </Inplace>
                    <Inplace closable onClose={editProfile}>
                        <InplaceDisplay>{email || 'Введите значение'}</InplaceDisplay>
                            <InplaceContent>
                                <InputText value={email} onChange={(e) => {
                                    setEmail(e.target.value)
                                    editProfile()
                                }} autoFocus />
                            </InplaceContent>
                    </Inplace>
                    <Inplace closable onClose={editProfile}>
                        <InplaceDisplay>{date_of_birth || 'Введите значение'}</InplaceDisplay>
                            <InplaceContent>
                                <InputText value={date_of_birth} onChange={(e) => {
                                    setDate_of_birth(e.target.value)
                                    editProfile()
                                }} autoFocus />
                            </InplaceContent>
                    </Inplace>
                    <Button label="Выйти" severity="warning" outlined onClick={navigate('/login')}/>
                    <Button label="Удалить профиль" severity="danger" outlined onClick={deleteAccount}/>
                </div>
                <div className="middle">
                    <h2>Доп. информация</h2>
                </div>

            </div>
            <Toast ref={profileToast} />
        </div>
    )

}

export default Profile;