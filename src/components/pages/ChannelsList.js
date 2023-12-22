import React, {useEffect, useState} from "react";

import '../../style/MainPage.css';
import {useNavigate} from "react-router-dom";
import {Tag} from "primereact/tag";
import {Button} from "primereact/button";
import { DataView } from 'primereact/dataview';
import {TabPanel, TabView} from "primereact/tabview";
import CreateChannelForm from "../forms/CreateChannelForm";


function Channels() {
    const [allChannels, setAllChannels] = useState([
      {
        "name": "My super channel name",
        "description": "Here plain text",
        "is_public": false,
        "id": 0,
        "members_cnt": 0,
        "rating": 0,
        "is_personal": false,
        "is_active": true
      }
    ]);
    const [myChannels, setMyChannels] = useState([
          {
            "notify_about_meeting": false,
            "user_id": 0,
            "channel_id": 0,
            "permissions": 0,
            "is_owner": true,
            "date_of_join": "2023-12-20T15:27:53.446Z",
            "channel": {
              "name": "My super channel name",
              "description": "Here plain text",
              "is_public": false,
              "id": 0,
              "members_cnt": 0,
              "rating": 0,
              "is_personal": false,
              "is_active": true
            }
          }
        ]);

    const [activeIndex, setActiveIndex] = useState(0);

    const navigate = useNavigate();

    useEffect( () => {
        const token = 'Bearer ' + localStorage.getItem('token')
        fetch('http://localhost:8000/user/me/channels',
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
                    setMyChannels(value)
                    console.log(value)
                });
            } else if (response.status === 401) {
                navigate('/login')
                // showToast(profileToast, 'error', 'Страница недоступна', 'Пользователь не авторизован');
            } else if (response.status === 422) {
                // showToast(cardToast, 'error', 'Страница недоступна', 'Сломанный запрос');
            } else if (response.status === 500) {
                // showToast(cardToast, 'error', 'Ошибка', 'Ошибка сервера, не принимайте на свой счёт');
            }
        })
    }, [navigate])


    useEffect( () => {
        const token = 'Bearer ' + localStorage.getItem('token')
        fetch('http://localhost:8000/channel/list',
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
                        setAllChannels(value)
                        console.log(value)
                    });
                } else if (response.status === 401) {
                    navigate('/login')
                    // showToast(profileToast, 'error', 'Страница недоступна', 'Пользователь не авторизован');
                } else if (response.status === 422) {
                    // showToast(cardToast, 'error', 'Страница недоступна', 'Сломанный запрос');
                } else if (response.status === 500) {
                    // showToast(cardToast, 'error', 'Ошибка', 'Ошибка сервера, не принимайте на свой счёт');
                }
            }
        )
    }, [navigate])

    // permissions: Literal['OWNER', 'ADMIN', 'EDITOR', 'MEMBER', 'BLOCKED']
    const role = (id) => {
        if (activeIndex === 1) {
            return
        }

        const member = myChannels.filter((elem) => elem.channel.id === id)[0]
        if (member.is_owner) {
            return "Владелец"
        } else if (member.permissions === 0) {
            return "В ожидании"
        } else if (member.permissions !== 0 && !member.is_owner) {
            return "Участник"
        }
    }

    const itemTemplate = (channel) => {
        return (
            <div className="col-12">
                <div className="flex flex-column xl:flex-row xl:align-items-start p-4 gap-4">
                    <div className="flex flex-column sm:flex-row justify-content-between align-items-center xl:align-items-start flex-1 gap-4">
                        <div className="flex flex-column align-items-center sm:align-items-start gap-3">
                            <div className="grid gap-3">
                                <div className="text-2xl font-bold text-900">{channel.name}</div>
                                <Tag visible={activeIndex === 0} value={role(channel.id)} severity='warning'></Tag>
                            </div>
                            <div className="text-xl font-light text-900">{channel.description}</div>
                            <div className="text-xl font-light text-900">Количество участников: {channel.members_cnt}</div>
                        </div>
                        <div className="flex sm:flex-column align-items-center sm:align-items-end gap-3 sm:gap-2">
                            <Button visible={!channel.is_personal} label="Перейти в канал" icon="pi pi-arrow-right" text raised size="small" iconPos="right" onClick={(e) => {
                                navigate(`/channels/${channel.id}`)
                            }}/>
                        </div>
                    </div>
                </div>
            </div>
        );
    };

    return (
        <div className="p-8">
            <div className="container">
                <div className="box-1">
                    <h1>Каналы</h1>
                </div>
                <div className="box-2">
                    <CreateChannelForm />
                </div>
            </div>

            <TabView activeIndex={activeIndex} onTabChange={(e) => setActiveIndex(e.index)}>
                <TabPanel header="Мои каналы">
                    <DataView value={myChannels.map((elem) => elem.channel).filter((elem) => !elem.is_personal)} itemTemplate={itemTemplate} />
                </TabPanel>
                <TabPanel header="Все каналы">
                    <DataView value={allChannels.filter((elem) => !elem.is_personal)} itemTemplate={itemTemplate} />
                </TabPanel>
            </TabView>
        </div>
    )

}

export default Channels;