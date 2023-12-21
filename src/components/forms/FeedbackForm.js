import React, {useRef, useState} from "react";
import { useFormik } from 'formik';
import { InputTextarea } from 'primereact/inputtextarea';
import { Button } from 'primereact/button';
import { classNames } from 'primereact/utils';
import { Toast } from 'primereact/toast';
import {Rating} from "primereact/rating";
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
            <Dialog header="Отзыв о мероприятии" visible={isModalActive} onHide={() => setModalActive(false)} footer={footerContent}>
                <form onSubmit={formik.handleSubmit} className="flex flex-column gap-5">
                    <label htmlFor="rating">Оцените меропритятие</label>
                    <Rating className="card flex justify-content-center" name="rating" value={rating} onChange={(e) => setRating(e.value)} cancel={false} />
                    {/*<Button label="Отправить отзыв" type="submit" icon="pi pi-check" />*/}
                </form>
            </Dialog>
    )
}

export default FeedbackForm;