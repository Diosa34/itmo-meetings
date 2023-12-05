import React, {useState} from "react";

import '../style/MainPage.css';
import { InputText } from "primereact/inputtext";
import {Outlet, Route, Routes} from "react-router-dom";
import RegForm from "./forms/RegForm";
import Event from "./Event";
import Header from "./Header";

function MainPage() {

    return (
        <>
            <span className="p-input-icon-left">
                <i className="pi pi-search" />
                <InputText placeholder="Поиск мероприятия" />
            </span>
            {/*<EventCards />*/}
        </>
    )

}

export default MainPage;