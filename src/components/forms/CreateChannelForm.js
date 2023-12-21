
import React, {useRef, useState} from "react";
import { useFormik } from 'formik';
import { InputTextarea } from 'primereact/inputtextarea';
import { Button } from 'primereact/button';
import { classNames } from 'primereact/utils';
import { Toast } from 'primereact/toast';
import {InputText} from "primereact/inputtext";
import {Dialog} from "primereact/dialog";

export default function CreateChannelForm() {
    const [title, setTitle] = useState("");
    const toast = useRef(null);
    const [isModalActive, setModalActive] = useState(false);

    const footerContent = (
        <div >
            <Button className={'footer'} label="Создать канал" type="submit" icon="pi pi-check" />
        </div>
    );

    const formik = useFormik({
        initialValues: {
            title: '',
            description: ''
        },
        validate: (data) => {
            let errors = {};

            if (!data.title) {
                errors.title = 'Введите название канала.';
            }

            return errors;
        },
        onSubmit: (data) => {
        }
    });

    const isFormFieldInvalid = (name) => !!(formik.touched[name] && formik.errors[name]);

    const getFormErrorMessage = (name) => {
        return isFormFieldInvalid(name) ? <small className="p-error">{formik.errors[name]}</small> : <small className="p-error">&nbsp;</small>;
    };

    return (
        <div>
        <Dialog header="Новый канал" className="card flex justify-content-center shadow-2 border-round" visible={isModalActive} onHide={() => setModalActive(false)} style={{ width: '40%' }} footer={footerContent}>
            <form onSubmit={formik.handleSubmit} className="flex flex-column gap-2">
                <span className="p-float-label">
                    <InputText id="title" value={formik.values.title} onChange={(e) => setTitle(e.target.value)}/>
                    <label htmlFor="title">Название канала</label>
                </span>
                {getFormErrorMessage('title')}
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
            </form>
        </Dialog>
        <Button label="Создать канал" onClick={() => setModalActive(true)} icon="pi pi-plus" iconPos="right" text raised />
        </div>
    )
}
