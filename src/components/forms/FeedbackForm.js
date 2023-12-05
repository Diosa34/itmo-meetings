import React, {forwardRef, useImperativeHandle, useRef, useState} from "react";
import { useFormik } from 'formik';
import { InputTextarea } from 'primereact/inputtextarea';
import { Button } from 'primereact/button';
import { classNames } from 'primereact/utils';
import { Toast } from 'primereact/toast';
import {Rating} from "@mui/material";
import {Dialog} from "primereact/dialog";

function FeedbackForm({setModalActive, isModalActive}) {
    const [rating, setRating] = useState(null);
    const toast = useRef(null);

    const footerContent = (
        <div>
            <Button label="Отправить отзыв" type="submit" icon="pi pi-check" />
        </div>
    );

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
            <Dialog header="Header" visible={isModalActive} onHide={() => setModalActive(false)} style={{ width: '50vw' }} footer={footerContent}>
                <form onSubmit={formik.handleSubmit} className="flex flex-column gap-2">
                    <label htmlFor="rating">Оцените меропритятие</label>
                    <Rating className="card flex justify-content-center" name="rating" value={rating} onChange={(e) => setRating(e.value)} cancel={false} />
                    <span className="p-float-label">
                        <Toast ref={toast} />
                        <InputTextarea
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
                        <label htmlFor="description">Расскажите организатору о ваших впечатлениях</label>
                    </span>
                        {getFormErrorMessage('description')}
                    {/*<Button label="Отправить отзыв" type="submit" icon="pi pi-check" />*/}
                </form>
            </Dialog>
        </div>
    )
}

export default FeedbackForm;