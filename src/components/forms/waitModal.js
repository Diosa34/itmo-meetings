import React, {useState} from "react";
import {Dialog} from "primereact/dialog";
import {Rating} from "primereact/rating";
import {Toast} from "primereact/toast";
import {DataTable} from "primereact/datatable";
import {Column} from "primereact/column";
import {Button} from "primereact/button";
import {useNavigate} from "react-router-dom";
import HOST from "../../host";

export default function WaitModal({setModalActive, isModalActive, users, channel_id}) {
    const [selectedMembers: [], setSelectedMembers] = useState([]);
    const [rowClick, setRowClick] = useState(true);
    const token = 'Bearer ' + localStorage.getItem('token')
    const navigate = useNavigate()

    const confirm = (member_id) => {
        fetch(`${HOST}/channel/${channel_id}/member/${member_id}/confirm/`,
            {
                method: 'PATCH',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': HOST,
                    'Access-Control-Allow-Credentials': 'true',
                    'Authorization': token != null ? token : "",
                }
            }
        ).then(response => {
                if (response.ok) {
                    const data = response.json();
                } else if (response.status === 401) {
                    navigate('/login')
                } else if (response.status === 422) {
                    // showToast(cardToast, 'error', 'Страница недоступна', 'Сломанный запрос');
                } else if (response.status === 500) {
                    // showToast(cardToast, 'error', 'Ошибка', 'Ошибка сервера, не принимайте на свой счёт');
                }
            }
        )
    }

    const footerContent = (
        <div>
            <Button label="Принять" type="submit" text icon="pi pi-check" onSubmit={() => {
                if (selectedMembers.length !== 0) {
                    selectedMembers.forEach((elem) => confirm(elem.id))
                }
            }}/>
        </div>
    );

    return (
        <Dialog header="Заявки на вступление" visible={isModalActive} onHide={() => setModalActive(false)} footer={footerContent}>
            <div className="text-l font-light text-900">
                Список тех, кто хочет стать участником данного сообщества.
            </div>
            <DataTable value={users} selection={selectedMembers} onSelectionChange={(e) => setSelectedMembers(e.value)} dataKey="id" tableStyle={{ minWidth: '50rem' }}>
                <Column selectionMode="multiple" headerStyle={{ width: '3rem' }}></Column>
                <Column field="surname" header="Фамилия"></Column>
                <Column field="firstname" header="Имя"></Column>
            </DataTable>
        </Dialog>
    )
}