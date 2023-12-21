import React, {useEffect, useState} from "react";

import '../../style/MainPage.css';
import AddEvent from "../forms/AddEvent";
import {TabMenu} from "primereact/tabmenu";
import {useNavigate} from "react-router-dom";
import {Rating} from "primereact/rating";
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
    const items = [
        {label: 'Мои каналы'},
        {label: 'Все каналы'}
    ];

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

    const itemTemplate = (channel) => {
        return (
            <div className="col-12">
                <div className="flex flex-column xl:flex-row xl:align-items-start p-4 gap-4">
                    {/*<img className="w-9 sm:w-16rem xl:w-10rem shadow-2 block xl:block mx-auto border-round" />*/}
                    <div className="flex flex-column sm:flex-row justify-content-between align-items-center xl:align-items-start flex-1 gap-4">
                        <div className="flex flex-column align-items-center sm:align-items-start gap-3">
                            <div className="text-2xl font-bold text-900">{channel.name}</div>
                            <div className="text-xl font-light text-900">{channel.description}</div>
                            <Rating value={channel.rating} readOnly cancel={false}></Rating>
                            <div className="flex align-items-center gap-3">
                                <span className="flex align-items-center gap-2">
                                    <i className="pi pi-tag"></i>
                                    <span className="font-semibold">{channel.category}</span>
                                </span>
                                {/*<Tag value={channel.inventoryStatus} severity={getSeverity(channel)}></Tag>*/}
                            </div>
                        </div>
                        <div className="flex sm:flex-column align-items-center sm:align-items-end gap-3 sm:gap-2">
                            <span className="text-2xl font-semibold">${channel.price}</span>
                            <Button icon="pi pi-shopping-cart" className="p-button-rounded" disabled={channel.inventoryStatus === 'OUTOFSTOCK'}></Button>
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

            <TabView>
                <TabPanel header="Мои каналы">
                    <DataView value={myChannels.map((elem) => elem.channel)} itemTemplate={itemTemplate} />
                </TabPanel>
                <TabPanel header="Все каналы">
                    <DataView value={allChannels} itemTemplate={itemTemplate} />
                </TabPanel>
            </TabView>
        </div>
    )

}

export default Channels;