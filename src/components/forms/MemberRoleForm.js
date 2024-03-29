
import React, {useRef, useState} from "react";
import { useFormik } from 'formik';
import { Button } from 'primereact/button';
import { Toast } from 'primereact/toast';
import {Dialog} from "primereact/dialog";
import {useNavigate} from "react-router-dom";
import {Dropdown} from "primereact/dropdown";
import HOST from "../../host";
import {InputText} from "primereact/inputtext";

export default function MemberRoleForm({channel_id, member}) {
    const [isModalActive, setModalActive] = useState(false);
    const [roles, setRoles] = useState([
        {role: 'OWNER', translation: 'Владелец'},
        {role: 'ADMIN', translation: 'Менеджер'},
        {role: 'EDITOR', translation: 'Редактор'},
        {role: 'MEMBER', translation: 'Участник'},
        {role: 'BLOCKED', translation: 'Заблокирован'}])
    const [selectedRole, setSelectedRole] = useState(); //
    const toast = useRef(null);
    const navigate = useNavigate()
    const token = 'Bearer ' + localStorage.getItem('token')

    const show = (severity, summary, detail) => {
        toast.current.show({ severity: severity, summary: summary, detail: detail});
    };

    const formik = useFormik({
        initialValues: {
            role: '',
        },
        validate: (data) => {
            let errors = {};

            if (!data.role) {
                errors.role = 'Выберите роль.';
            }

            return errors;
        },
        onSubmit: (data) => {
            fetch(`${HOST}/channel/${channel_id}/member/${member.id}/role/`,
                {
                    method: 'PATCH',
                    headers: {
                        'Accept': 'application/json',
                        'Content-type': 'application/json',
                        'Access-Control-Allow-Origin': HOST,
                        'Access-Control-Allow-Credentials': 'true',
                        'Authorization': token != null ? token : "",
                    },
                    body: JSON.stringify(
                        {
                            permissions: formik.values.role,
                        }
                    )
                }
            ).then(response => {
                    if (response.ok) {
                        const data = response.json();
                        show('success', 'Успешно', `Роль пользователя ${member.username} изменена на ${selectedRole.translation}`)
                        setModalActive(false)
                    } else if (response.status === 401) {
                        navigate('/login')
                    } else if (response.status === 422) {
                        show('error', 'Ошибка', 'Некорректный запрос')
                    } else if (response.status === 500) {
                        show('error', 'Ошибка', 'Ошибка сервера, не принимайте на свой счёт');
                    }
                }
            )
        }
    });

    const isFormFieldInvalid = (name) => !!(formik.touched[name] && formik.errors[name]);

    const getFormErrorMessage = (name) => {
        return isFormFieldInvalid(name) ? <small className="p-error">{formik.errors[name]}</small> : <small className="p-error">&nbsp;</small>;
    };

    return (
        <div>
            <Dialog header="Изменить роль" className="card flex justify-content-center shadow-2 border-round" visible={isModalActive} onHide={() => setModalActive(false)} style={{ width: '40%' }}>
                <form onSubmit={formik.handleSubmit} className="auth flex flex-column gap-4">
                    <div>
                        <span className="p-float-label">
                            <InputText value={member.username + " (" + member.surname + " " + member.firstname + ")"} />
                            <label htmlFor="Участник">Участник, роль которого хотите изменить</label>
                        </span>
                        {getFormErrorMessage('username')}
                    </div>
                    <div>
                        <span className="p-float-label">
                            <Dropdown
                                style={{ minWidth: '37vw' }}
                                inputId="Роль"
                                optionLabel="translation"
                                value={selectedRole}
                                options={roles}
                                onChange={(e) => {
                                    setSelectedRole(e.value)
                                    formik.setFieldValue('role', e.value.role)
                                }}
                            />
                            <label htmlFor="Роль">Выберите новую роль для участника</label>
                        </span>
                        {getFormErrorMessage('role')}
                    </div>
                    <Button className={'footer'} label='Изменить' type="submit" icon="pi pi-check" />
                </form>
            </Dialog>
            <Button text onClick={() => setModalActive(true)} icon="pi pi-pencil" iconPos="right" />
            <Toast ref={toast} />
        </div>
    )
}
