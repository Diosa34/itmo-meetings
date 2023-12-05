import { Divider } from 'primereact/divider';
import { Button } from 'primereact/button';
import '../style/Event.css';
import FeedbackForm from "./forms/FeedbackForm";
import {useRef, useState} from "react";


function Event() {
    const [isModalActive, setModalActive] = useState(false);

    return (
        <div className="p-5 surface-card shadow-2 border-round">
            <h1>Название</h1>
            <table className={'eventInfo'}>
                <tr>
                    <td className="first-col">Время:</td>
                    <td rowSpan={2} className="second-col">
                        <Button label="Отправить заявку"  icon="pi pi-plus" iconPos="right" text raised />
                    </td>
                </tr>
                <tr>
                    <td className="first-col">Место:</td>
                </tr>
                <tr>
                    <td className="first-col">Контакты:</td>
                    <td rowSpan={2} className="second-col">
                        <FeedbackForm setModalActive={setModalActive} isModalActive={isModalActive}/>
                        <Button label="Оставить отзыв" onClick={() => setModalActive(true)} icon="pi pi-check" iconPos="right" text raised />
                    </td>
                </tr>
                <tr>
                    <td className="first-col">Ссылка</td>
                </tr>
            </table>
            <Divider />
            <p>
                Здесь будет подробное описание нашего мероприятия.
            </p>
        </div>

    )
}

export default Event;