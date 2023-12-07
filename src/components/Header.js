import React, {useState} from "react";

import '../style/MainPage.css';
import {TabMenu} from "primereact/tabmenu";
import {Outlet, Route, Routes, useNavigate} from "react-router-dom";
import RegForm from "./forms/RegForm";
import MainPage from "./MainPage";
import Event from "./Event";
import AuthForm from "./forms/AuthForm";
import FeedbackForm from "./forms/FeedbackForm";
import Profile from "./Profile";
import CreateChannelForm from "./forms/CreateChannelForm";

function Header() {
    const [activeIndex, setActiveIndex] = useState(0);
    const items = [
        {label: 'Главная', icon: 'pi pi-fw pi-home', link: "/main"},
        {label: 'Вход', icon: 'pi pi-fw pi-home', link: "/login"},
        {label: 'Мои каналы', icon: 'pi pi-fw pi-sitemap', link: '/channels'},
        {label: 'Мои мероприятия', icon: 'pi pi-fw pi-megaphone', link: '/events'},
        {label: 'Мероприятие', icon: 'pi pi-fw pi-megaphone', link: '/event'},
        {icon: 'pi pi-fw pi-user', link: '/profile'}
    ];
    // const [sidebarVisible, setSidebarVisible] = useState(false);

    const navigate = useNavigate();

    return (
        <div className="panel">
            <div className='logo'>
                ITMO.MEETINGS
            </div>
            <TabMenu className='menu' model={items} activeIndex={activeIndex} onTabChange={(e) => {
                navigate(e.value['link'], { replace: false })
                setActiveIndex(e.index)
            }
            }/>
        </div>
    )

}

export default Header;