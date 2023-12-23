
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
    const cardToast = useRef(null);

    const getSeverity = (event) => {
        switch (event.inventoryStatus) {
            case 'INSTOCK':
                return 'success';

            case 'LOWSTOCK':
                return 'warning';

            case 'OUTOFSTOCK':
                return 'danger';

            default:
                return null;
        }
    };

    const listItem = (event) => {
        return (
            <div className="col-12">
                <div className="flex flex-column xl:flex-row xl:align-items-start p-4 gap-4">
                    {/*<img className="w-9 sm:w-16rem xl:w-10rem shadow-2 block xl:block mx-auto border-round" />*/}
                    <div className="flex flex-column sm:flex-row justify-content-between align-items-center xl:align-items-start flex-1 gap-4">
                        <div className="flex flex-column align-items-center sm:align-items-start gap-3">
                            <div className="text-2xl font-bold text-900">{event.title}</div>

                            <div className="flex gap-2 text-l font-light" >
                                <i className="pi pi-clock"></i>
                                {'Когда: ' + event.start_datetime}
                            </div>
                            <div className="flex gap-2 text-l font-light">
                                <i className="pi pi-map-marker"></i>
                                {'Где: ' + event.address}
                            </div>
                            {/*<Rating value={event.rating} readOnly cancel={false}></Rating>*/}
                            <div className="flex align-items-center gap-3">
                                <div className="text-l font-light">{event.description.split('.')[0] + '.'}</div>
                                {/*<span className="flex align-items-center gap-2">*/}
                                {/*    <i className="pi pi-tag"></i>*/}
                                {/*    <span className="font-semibold">{event.category}</span>*/}
                                {/*</span>*/}
                                {/*<Tag value={event.inventoryStatus} severity={getSeverity(event)}></Tag>*/}
                            </div>
                        </div>
                        {/*<Tag value={event.start_datetime} icon="pi pi-clock"></Tag>*/}
                        {/*<Tag value={event.address} icon="pi pi-map-marker"></Tag>*/}
                        <div className="flex sm:flex-column align-items-center sm:align-items-end gap-3 sm:gap-2">
                            <Button label="Подробнее" icon="pi pi-arrow-right" text size="small" iconPos="right" onClick={(e) => {
                                console.log(event.id)
                                navigate(`/catalog/${event.id}`)
                            }}/>
                            {/*<span className="text-2xl font-semibold">${event.price}</span>*/}
                            {/*<Button icon="pi pi-shopping-cart" className="p-button-rounded" disabled={event.inventoryStatus === 'OUTOFSTOCK'}></Button>*/}
                        </div>
                    </div>
                </div>
            </div>
        );
    };

    const gridItem = (event) => {
        return (
            <div className="col-12 sm:col-6 lg:col-12 xl:col-4 p-2">
                <div className="p-4 border-1 surface-border surface-card border-round">
                    <div className="flex flex-wrap align-items-center justify-content-between gap-2">
                        {/*<div className="flex align-items-center gap-2">*/}
                        {/*    <i className="pi pi-tag"></i>*/}
                        {/*    <span className="font-semibold">{event.category}</span>*/}
                        {/*</div>*/}
                        {/*<Tag value={event.inventoryStatus} severity={getSeverity(event)}></Tag>*/}
                    </div>
                    <div className="flex flex-column align-items-left gap-3 py-5">
                        <div className="text-2xl font-bold">{event.title}</div>
                        <div className="text-l font-light">{event.description.split('.')[0] + '.'}</div>
                        <div className="flex gap-2 text-l font-light" >
                            <i className="pi pi-clock"></i>
                            {'Когда: ' + event.start_datetime}
                        </div>
                        <div className="flex gap-2 text-l font-light">
                            <i className="pi pi-map-marker"></i>
                            {'Где: ' + event.address}
                        </div>
                        {/*<Rating value={event.rating} readOnly cancel={false}></Rating>*/}
                    </div>
                    <div className="flex align-items-center justify-content-between">
                        <Button label="Подробнее" icon="pi pi-arrow-right" text size="small" iconPos="right" onClick={(e) => {
                            navigate(`/catalog/${event.id}`)
                        }}/>
                        {/*<span className="text-2xl font-semibold">${event.price}</span>*/}
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
        