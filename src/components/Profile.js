import '../style/Profile.css'

import { Avatar } from 'primereact/avatar';

function Profile() {
    return (
        <div>
            <div className="content">
                <h1 className="title">Мой профиль</h1>
                <div className="left">
                    <Avatar icon="pi pi-user" size="xlarge" shape="circle" />
                    <p>
                        Ису
                    </p>
                    <p>
                        Фио
                    </p>
                </div>
                <div className="middle">
                    <h2>Доп. информация</h2>
                    <p>
                        Член клуба любителей искусства
                    </p>
                </div>
                <div className="right shadow-2 border-round">
                    <h2>Уведомления</h2>
                    <div className="notification shadow-2 border-round">
                        Ваша заявка на участие в мероприятии одобрена!
                    </div>
                </div>
            </div>
        </div>
    )

}

export default Profile;