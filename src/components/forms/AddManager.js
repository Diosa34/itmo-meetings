
import React, {useRef, useState} from "react";
import { useFormik } from 'formik';
import { InputTextarea } from 'primereact/inputtextarea';
import { Button } from 'primereact/button';
import { classNames } from 'primereact/utils';
import { Toast } from 'primereact/toast';
import {InputText} from "primereact/inputtext";
import {InputNumber} from "primereact/inputnumber";
import {Calendar} from "primereact/calendar";

export default function AddManagerForm() {
    const [isu, setIsu] = useState(111111);
    const [surname, setSurname] = useState("");
    const [name, setName] = useState("");
    const [patronymic, setPatronymic] = useState("");
    const toast = useRef(null);

    const show = () => {
        toast.current.show({ severity: 'success', summary: 'Form Submitted', detail: formik.values.description  });
    };

    const formik = useFormik({
        initialValues: {
            description: ''
        },
        validate: (data) => {
            let errors = {};

            if (!data.description) {
                errors.description = 'Description is required.';
            }

            return errors;
        },
        onSubmit: (data) => {
            data && show();
            formik.resetForm();
        }
    });

    const isFormFieldInvalid = (name) => !!(formik.touched[name] && formik.errors[name]);

    const getFormErrorMessage = (name) => {
        return isFormFieldInvalid(name) ? <small className="p-error">{formik.errors[name]}</small> : <small className="p-error">&nbsp;</small>;
    };

    return (
        <div className="card flex justify-content-center p-5 shadow-2 border-round">
            <form onSubmit={formik.handleSubmit} className="flex flex-column gap-2">
                <label>Добавление менеджера</label>
                <span className="p-float-label">
                    <InputNumber id="isu" value={isu} onChange={(e) => setIsu(e.value)} useGrouping={false} placeholder="Ису"/>
                    <label htmlFor="isu">Ису</label>
                </span>
                <span className="p-float-label">
                    <InputText id="surname" value={surname} onChange={(e) => setSurname(e.target.value)} />
                    <label htmlFor="surname">Фамилия</label>
                </span>
                <span className="p-float-label">
                    <InputText id="name" value={name} onChange={(e) => setName(e.target.value)} />
                    <label htmlFor="name">Имя</label>
                </span>
                <span className="p-float-label">
                    <InputText id="patronymic" value={patronymic} onChange={(e) => setPatronymic(e.target.value)} />
                    <label htmlFor="patronymic">Отчество (при наличии)</label>
                </span>
                <span className="p-float-label">
                    <Toast ref={toast} />
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
                <Button label="Добавить" type="submit" icon="pi pi-check" />
            </form>
        </div>
    )
}
