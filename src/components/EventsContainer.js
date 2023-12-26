
import React, {useState, useEffect, useRef} from 'react';
import { Button } from 'primereact/button';
import { DataView, DataViewLayoutOptions } from 'primereact/dataview';
import { Rating } from 'primereact/rating';
import { Tag } from 'primereact/tag';
import {useNavigate} from "react-router-dom";
import showToast from "./toast";

export default function EventsContainer({events}) {
    const [layout, setLayout] = useState('grid');
    const navigate = useNavigate();
    const backgrounds = ['i1', 'i2', 'i3']
    let backgroundIndex = 0;


    const listItem = (event) => {
        return (
            <div className="col-12 m-2 brown-color">
                <div className="flex flex-column xl:flex-row xl:align-items-start p-4 gap-4">
                    <div className="flex flex-column sm:flex-row justify-content-between align-items-center xl:align-items-start flex-1 gap-4">
                        <div className="flex flex-column align-items-center sm:align-items-start gap-3">
                            <div className="text-2xl font-bold text-900">{event.title}</div>

                            <div className="flex gap-2 text-l font-light" >
                                <i className="pi pi-clock"></i>
                                {`Когда: ${event.start_datetime.slice(8,10)}.${event.start_datetime.slice(5,7)}.${event.start_datetime.slice(0,4)} ${event.start_datetime.slice(11,16)}`}
                            </div>
                            <div className="flex gap-2 text-l font-light">
                                <i className="pi pi-map-marker"></i>
                                {'Где: ' + event.address}
                            </div>
                            <div className="flex align-items-center gap-3">
                                <div className="text-l font-light">{event.description.split('.')[0] + '.'}</div>
                            </div>
                        </div>
                        <div className="flex sm:flex-column align-items-center sm:align-items-end gap-3 sm:gap-2">
                            <Button label="Подробнее" icon="pi pi-arrow-right" text size="small" iconPos="right" onClick={(e) => {
                                console.log(event.id)
                                navigate(`/catalog/${event.id}`)
                            }}/>
                        </div>
                    </div>
                </div>
            </div>
        );
    };

    const gridItem = (event) => {
        return (
            <div className="col-12 sm:col-6 lg:col-12 xl:col-4 p-2">
                <div className={backgrounds[backgroundIndex % backgrounds.length] + " p-4 border-1 surface-border surface-card border-round shadow-4"}>
                    <div style={{display: "none"}}>{backgroundIndex++}</div>
                    <div className="flex flex-wrap align-items-center justify-content-between gap-2">
                    </div>
                    <div className="flex flex-column align-items-left gap-3 py-5">
                        <div className="text-2xl font-bold">{event.title}</div>
                        <div className="text-l font-regular">{event.description.split('.')[0] + '.'}</div>
                        <div className="flex gap-2 text-l font-regular" >
                            <i className="pi pi-clock"></i>
                            {`Когда: ${event.start_datetime.slice(8,10)}.${event.start_datetime.slice(5,7)}.${event.start_datetime.slice(0,4)} ${event.start_datetime.slice(11,16)}`}
                        </div>
                        <div className="flex gap-2 text-l font-regular">
                            <i className="pi pi-map-marker"></i>
                            {'Где: ' + event.address}
                        </div>
                    </div>
                    <div className="flex align-items-center justify-content-between">
                        <Button label="Подробнее" icon="pi pi-arrow-right" text size="small" iconPos="right" onClick={(e) => {
                            navigate(`/catalog/${event.id}`)
                        }}/>
                    </div>
                </div>
            </div>
        );
    };

    const itemTemplate = (event, layout) => {
        if (!event) {
            return;
        }

        if (layout === 'list') return listItem(event);
        else if (layout === 'grid') return gridItem(event);
    };

    const header = () => {
        return (
            <div className="flex justify-content-end">
                <DataViewLayoutOptions layout={layout} onChange={(e) => setLayout(e.value)} />
            </div>
        );
    };

    return (
        <div className="card">
            <DataView value={events} itemTemplate={itemTemplate} layout={layout} header={header()} />
        </div>
    )
}
        