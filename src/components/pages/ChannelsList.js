import React, {useEffect, useState} from "react";

import '../../style/MainPage.css';
import {useNavigate} from "react-router-dom";
import {Tag} from "primereact/tag";
import {Button} from "primereact/button";
import { DataView } from 'primereact/dataview';
import {TabPanel, TabView} from "primereact/tabview";
import CreateChannelForm from "../forms/CreateChannelForm";
import HOST from "../../host";
import {InputText} from "primereact/inputtext";


function Channels() {
    const [allChannels, setAllChannels] = useState();
    const [myChannels, setMyChannels] = useState();

    const [activeIndex, setActiveIndex] = useState(0);

    const navigate = useNavigate();

    const [channelFilterValue, setChannelFilterValue] = useState('');

    useEffect( () => {
        const token = 'Bearer ' + localStorage.getItem('token')
        fetch(`${HOST}/user/me/channels`,
            {
                method: 'GET',
                headers: {
                    'Accept': 'application/json',
                    'Access-Control-Allow-Origin': HOST,
                    'Access-Control-Allow-Credentials': 'true',
                    'Authorization': token != null ? token : "",
                }
            }
        ).then(response => {
            if (response.ok) {
                const data = response.json();
                data.then(value => {
                    setMyChannels(value)
                });
            } else if (response.status === 401) {
                navigate('/login')
            } else if (response.status === 500) {
            }
        })
    }, [navigate])


    useEffect( () => {
        const token = 'Bearer ' + localStorage.getItem('token')
        fetch(`${HOST}/channel/list`,
            {
                method: 'GET',
                headers: {
                    'Accept': 'application/json',
                    'Access-Control-Allow-Origin': HOST,
                    'Access-Control-Allow-Credentials': 'true',
                    'Authorization': token != null ? token : "",
                }
            }
        ).then(response => {
                if (response.ok) {
                    const data = response.json();
                    data.then(value => {
                        setAllChannels(value)
                    });
                } else if (response.status === 401) {
                    navigate('/login')
                } else if (response.status === 500) {
                }
            }
        )
    }, [navigate])

    // permissions: Literal['OWNER', 'ADMIN', 'EDITOR', 'MEMBER', 'BLOCKED']
    const role = (id) => {
        if (activeIndex === 1) {
            return
        }

        const channels = myChannels.filter((elem) => elem.channel.id === id)
        if (channels.length !== 0) {
            const member = channels[0]
            if (member.is_owner) {
                return "Владелец"
            } else if (member.permissions === 0) {
                return "В ожидании"
            } else if (member.permissions !== 0 && !member.is_owner) {
                return "Участник"
            }
        } else {
            return
        }
    }

    const itemTemplate = (channel) => {
        return (
            <div className="col-12 beige-color m-2">
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
                            <Button visible={!channel.is_personal} label="Перейти в сообщество" icon="pi pi-arrow-right" text raised size="small" iconPos="right" onClick={(e) => {
                                navigate(`/channels/${channel.id}`)
                            }}/>
                        </div>
                    </div>
                </div>
            </div>
        );
    };

    return (
        <div className="m-7">
            <div className="container">
                <div className="box-1">
                    <h1>Сообщества</h1>
                    <p className="text-xl font-light text-900">
                        Сообщества нужны, чтобы люди могли объединяться и создавать мероприятия от имени сообщества.
                    </p>
                    <span className="p-input-icon-left ml-10 mr-auto">
                        <i className="pi pi-search" />
                        <InputText
                            className="max-w-full"
                            value={channelFilterValue}
                            onChange={(e) => {setChannelFilterValue(e.target.value)}}
                            placeholder="Поиск сообществ" />
                    </span>
                </div>
                <div className="box-2">
                    <CreateChannelForm />
                </div>
            </div>
            {!(typeof myChannels === "undefined") && !(typeof allChannels === "undefined") ?
                <TabView activeIndex={activeIndex} onTabChange={(e) => setActiveIndex(e.index)}>
                    <TabPanel header="Мои сообщества">
                        <DataView  value={myChannels.map((elem) => elem.channel).filter((elem) => (!elem.is_personal &&
                            ((elem.name.toLowerCase()).includes(channelFilterValue.toLowerCase()) || (elem.description.toLowerCase()).includes(channelFilterValue.toLowerCase()))))
                        } itemTemplate={itemTemplate} />
                    </TabPanel>
                    <TabPanel header="Все сообщества">
                        <DataView value={allChannels.filter((elem) => (!elem.is_personal &&
                            ((elem.name.toLowerCase()).includes(channelFilterValue.toLowerCase()) || (elem.description.toLowerCase()).includes(channelFilterValue.toLowerCase())))
                        )} itemTemplate={itemTemplate} />
                    </TabPanel>
                </TabView>
            : null}
        </div>
    )
}

export default Channels;