import React, {useState} from "react";
import {useNavigate} from "react-router-dom";
import {TabMenu} from "primereact/tabmenu";

function RegHeaders() {
    const [activeIndex, setActiveIndex] = useState(0);
    const items = [
        {label: 'Регистрация', icon: 'pi pi-fw pi-home', link: "register"},
        {label: 'Вход', icon: 'pi pi-fw pi-home', link: "login"},
    ];
    // const [sidebarVisible, setSidebarVisible] = useState(false);

    const navigate = useNavigate();

    return (
        <>
            <TabMenu className='menu' model={items} activeIndex={activeIndex} onTabChange={(e) => {
                navigate(e.value['link'], { replace: false })
                setActiveIndex(e.index)
                    }
                }
            />
        </>
    )
}

export default RegHeaders;