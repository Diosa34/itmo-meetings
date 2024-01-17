import React, {useState} from "react";

import '../../style/Header.css';
import {TabMenu} from "primereact/tabmenu";
import {useNavigate} from "react-router-dom";

function Header() {
    const [activeIndex, setActiveIndex] = useState(0);
    const items = [
        {label: 'Главная', icon: 'pi pi-fw pi-home', link: "/catalog"},
        {label: 'Мои мероприятия', icon: 'pi pi-calendar-times', link: '/myEvents'},
        {label: 'Сообщества', icon: 'pi pi-fw pi-sitemap', link: '/channels'},
        {icon: 'pi pi-fw pi-user', link: '/profile'}
    ];

    const navigate = useNavigate();

    return (
        <div className="panel">
            <div className='logo' onClick={(e) => {
                navigate("/catalog", { replace: false })
                setActiveIndex(0)
            }}>
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