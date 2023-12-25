
import React, {useRef, useState} from "react";
import { useFormik } from 'formik';
import { Button } from 'primereact/button';
import { Toast } from 'primereact/toast';
import {Dialog} from "primereact/dialog";
import {useNavigate} from "react-router-dom";
import {Dropdown} from "primereact/dropdown";

export default function MemberRoleForm({channel_id, my_id, members, users}) {
    const [isModalActive, setModalActive] = useState(false);
    // const [members, setMembers] = useState();
    // const [users, setUsers] = useState();
    const [selectedUser, setSelectedUser] = useState();
    const [roles, setRoles] = useState([{role: 'OWNER'}, {role: 'ADMIN'}, {role: 'EDITOR'}, {role: 'MEMBER'}, {role: 'BLOCKED'}])
    const [selectedRole, setSelectedRole] = useState(); //
    const toast = useRef(null);
    const navigate = useNavigate()
    const token = 'Bearer ' + localStorage.getItem('token')

    const show = (severity, summary, detail) => {
        toast.current.show({ severity: severity, summary: summary, detail: detail});
    };

    const formik = useFormik({
        initialValues: {
            username: '',
            role: '',
        },
        validate: (data) => {
            let errors = {};

            if (!data.username) {
                errors.username = 'Выберите участника.';
            }

            if (!data.role) {
                errors.role = 'Выберите роль.';
            }

            return errors;
        },
        onSubmit: (data) => {
            fetch(`http://localhost:8000/channel/${channel_id}/member/${selectedUser.id}/role/`,
                {
                    method: 'PATCH',
                    headers: {
                        'Accept': 'application/json',
                        'Content-type': 'application/json',
                        'Access-Control-Allow-Origin': 'http://localhost:3000',
                        'Access-Control-Allow-Credentials': 'true',
                        'Authorization': token != null ? token : "",
                    },
                    body: JSON.stringify(
                        {
                            name: formik.values.name,
                            description: formik.values.description,
                            is_public: formik.values.is_public,
                        }
                    )
                }
            ).then(response => {
                    if (response.ok) {
                        const data = response.json();
                        show('success', 'Успешно', `Роль пользователя ${selectedUser.username} изменена`)
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
                <form onSubmit={formik.handleSubmit} className="flex flex-column gap-4">
                    <div>
                        <span className="p-float-label">
                            <Dropdown
                                style={{ minWidth: '37vw' }}
                                inputId="Участник"
                                optionLabel="username"
                                value={selectedUser}
                                options={users}
                                onChange={(e) => {
                                    setSelectedUser(e.value)
                                    formik.setFieldValue('username', e.value.username)
                                }}
                            />
                            <label htmlFor="Участник">Выберите участника, роль которого хотите изменить</label>
                        </span>
                        {getFormErrorMessage('username')}
                    </div>
                    <div>
                        <span className="p-float-label">
                            <Dropdown
                                style={{ minWidth: '37vw' }}
                                inputId="Роль"
                                optionLabel="role"
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
            <Button label='Изменить роль участника' onClick={() => setModalActive(true)} icon="pi pi-pencil" iconPos="right"  outlined  />
            <Toast ref={toast} />
        </div>
    )
}
