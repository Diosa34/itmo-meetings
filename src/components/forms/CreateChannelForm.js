
import React, {useRef, useState} from "react";
import { useFormik } from 'formik';
import { InputTextarea } from 'primereact/inputtextarea';
import { Button } from 'primereact/button';
import { classNames } from 'primereact/utils';
import { Toast } from 'primereact/toast';
import {InputText} from "primereact/inputtext";
import {Dialog} from "primereact/dialog";
import {Checkbox} from "primereact/checkbox";
import {useNavigate} from "react-router-dom";

export default function CreateChannelForm({defaultName='', defaultDescription='', defaultIsPublic=true, path=`http://localhost:8000/channel/`, method='POST', buttonTitle='Создать канал'}) {
    const [isModalActive, setModalActive] = useState(false);
    const toast = useRef(null);
    const navigate = useNavigate()
    const token = 'Bearer ' + localStorage.getItem('token')

    const show = (severity, summary, detail) => {
        toast.current.show({ severity: severity, summary: summary, detail: detail});
    };

    const formik = useFormik({
        initialValues: {
            name: defaultName,
            description: defaultDescription,
            is_public: defaultIsPublic
        },
        validate: (data) => {
            let errors = {};

            if (!data.name) {
                errors.name = 'Введите название канала.';
            }

            return errors;
        },
        onSubmit: (data) => {
            fetch(path,
                {
                    method: method,
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
                        show('success', 'Успешно', 'Канал успешно создан')
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
        <Dialog header="Новый канал" className="card flex justify-content-center shadow-2 border-round" visible={isModalActive} onHide={() => setModalActive(false)} style={{ width: '40%' }}>
            <form onSubmit={formik.handleSubmit} className="auth flex flex-column gap-4">
                <div>
                    <span className="p-float-label">
                    <InputText id="name"
                               value={formik.values.name}
                               onChange={(e) =>
                                   formik.setFieldValue('name', e.target.value)}/>
                    <label htmlFor="name">Название канала</label>
                </span>
                    {getFormErrorMessage('name')}
                </div>
                <div>
                    <span className="p-float-label">
                    <InputTextarea
                        id="description"
                        inputid="description"
                        name="description"
                        rows={4}
                        cols={30}
                        className={classNames({ 'p-invalid': isFormFieldInvalid('description') })}
                        value={formik.values.description}
                        onChange={(e) => {
                            formik.setFieldValue('description', e.target.value);
                        }}
                    />
                    <label htmlFor="description">Описание канала</label>
                </span>
                    {getFormErrorMessage('description')}
                </div>
                <div>
                   <span className="flex align-items-center">
                        <Checkbox
                            inputId="is_public"
                            name="is_public"
                            value={formik.values.is_public}
                            onChange={(e) => {
                                formik.setFieldValue('is_public', !formik.values.is_public);
                            }
                            }
                            checked={formik.values.is_public}
                        />
                        <label htmlFor="is_public" className="ml-2">Публичный канал (для вступления не требуется подтверждение администратора)</label>
                    </span>
                    {getFormErrorMessage('is_public')}
                </div>
                <Button className={'footer'} label={buttonTitle} type="submit" icon="pi pi-check" />
            </form>
        </Dialog>
        <Button label={buttonTitle} onClick={() => setModalActive(true)} icon="pi pi-plus" iconPos="right"  outlined  />
        <Toast ref={toast} />
        </div>
    )
}
