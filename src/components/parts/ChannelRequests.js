import React, {useEffect, useRef, useState} from "react";
import HOST from "../../host";
import {useNavigate} from "react-router-dom";
import {Tag} from "primereact/tag";
import {Button} from "primereact/button";
import { DataView } from 'primereact/dataview';
import {ScrollPanel} from "primereact/scrollpanel";

export default function ChannelRequests({myChannels}) {
    const navigate = useNavigate();
    const [requests, setRequests] = useState([
        {
            user: "Klim Vad",
            channel_name: "Ценители музыки",
            channel_id: 5
        },
        {
            user: "Klim Vad",
            channel_name: "Ценители музыки",
            channel_id: 5
        },
        {
            user: "Klim Vad",
            channel_name: "Ценители музыки",
            channel_id: 5
        },
        {
            user: "Klim Vad",
            channel_name: "Ценители музыки",
            channel_id: 5
        },
        ])
    const token = 'Bearer ' + localStorage.getItem('token')

    // useEffect(() => {
    //     myChannels.forEach((elem) => {
    //         fetch(`${HOST}/channel/${params.id}/member/list/?roles=CONFIRM_WAITER`,
    //             {
    //                 method: 'GET',
    //                 headers: {
    //                     'Accept': 'application/json',
    //                     'Access-Control-Allow-Origin': HOST,
    //                     'Access-Control-Allow-Credentials': 'true',
    //                     'Authorization': token != null ? token : "",
    //                 }
    //             }
    //         ).then(response => {
    //                 if (response.ok) {
    //                     const data = response.json();
    //                     data.then(value => {
    //                         let ids = []
    //                         value.forEach((elem) => ids[ids.length] = elem.user_id)
    //                         setOwner_id(ids)
    //                         setOwner(value)
    //                     });
    //                 }
    //             }
    //         )
    //     })
    //
    // })

    const itemTemplate = (item) => {
        return (
            <div className="col-12 beige-color m-2 border-round-3xl">
                <div className="flex flex-column xl:flex-row xl:align-items-start p-3 gap-4">
                    <div className="flex flex-column align-items-center sm:align-items-start gap-3">
                        <div className="text-l font-light text-900">Новая заявка пользователя <b>{item.user}</b> на вступление в сообщество <b>{item.channel_name}</b></div>
                        <div className="flex flex-column sm:flex-row justify-content-between align-items-center xl:align-items-start flex-1 gap-4">
                            <div className="flex flex-column align-items-center sm:align-items-start gap-3">
                                <Button label="Принять" text raised size="small" onClick={(e) => {}}/>
                            </div>
                            <div className="flex sm:flex-column align-items-center sm:align-items-start gap-3 sm:gap-2">
                                <Button label="Отклонить" text raised size="small" onClick={(e) => {}}/>
                            </div>
                            <div className="flex sm:flex-column sm:align-items-end gap-3 sm:gap-2">
                                <Button label="Перейти в сообщество" icon="pi pi-arrow-right" text raised size="small" iconPos="right" onClick={(e) => {
                                    navigate(`/channels/${item.channel_id}`)
                                }}/>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    };

    return (
        <div className="p-4 m-0 shadow-2 border-round event-card lg:max-w-30rem">
            <h2>Мои заявки</h2>
            <div className="card">
                <ScrollPanel style={{ width: '100%', height: '400px' }} className="custombar1">
                    <DataView value={requests} itemTemplate={itemTemplate} rows={3} paginator/>
                </ScrollPanel>
            </div>
        </div>
    )
}

