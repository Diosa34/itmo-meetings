import {Button} from "primereact/button";
import React, {useState} from "react";
import {useFormik} from "formik";
import {InputText} from "primereact/inputtext";
import {classNames} from "primereact/utils";
import {Dialog} from "primereact/dialog";
import {InputTextarea} from "primereact/inputtextarea";
import {Checkbox} from "primereact/checkbox";
import {Calendar} from "primereact/calendar";

export default function AddEvent() {
    const [isModalActive, setModalActive] = useState(false);

    const footerContent = (
        <div >
            <Button className={'footer'} label="Создать мероприятие" type="submit" icon="pi pi-check" />
        </div>
    );

    const formik = useFormik({
        initialValues: {
            title: "",
            description: "",
            start_datetime: "",
            duration_in_minutes: "", // просто число
            address: "",
            capacity: 500, // просто число
            price: 0,
            minimum_age: 0,
            maximum_age: 150,
            only_for_itmo_students: false,
            only_for_russians: false,
            channel_id: 0,
        },
        validate: (data) => {
            let errors = {};

            if (!data.description) {
                errors.description = 'Description is required.';
            }

            if (!data.description) {
                errors.description = 'Description is required.';
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
        <>
            <Dialog header="Новое мероприятие" visible={isModalActive} onHide={() => setModalActive(false)} style={{ width: '50vw' }} footer={footerContent}>
                <form onSubmit={formik.handleSubmit} className="flex flex-column gap-2">
                    <span className="p-float-label">
                        <InputText
                            inputid="title"
                            value={formik.values.title}
                            className={classNames({ 'p-invalid': isFormFieldInvalid('title') })}
                            onChange={(e) => {
                                formik.setFieldValue('title', e.target.value);
                                }
                            }
                        />
                        <label htmlFor="title">Название мероприятия</label>
                    </span>
                    {getFormErrorMessage('title')}
                    <span className="p-float-label">
                        <InputTextarea
                            inputid="description"
                            value={formik.values.description}
                            className={classNames({ 'p-invalid': isFormFieldInvalid('description') })}
                            onChange={(e) => {
                                formik.setFieldValue('description', e.target.value);
                                }
                            }
                        />
                        <label htmlFor="description">Описание мероприятия</label>
                    </span>
                    {getFormErrorMessage('description')}
                    <span className="p-float-label">
                        <Calendar
                            showTime hourFormat="24"
                            inputid="start_datetime"
                            value={formik.values.start_datetime}
                            className={classNames({ 'p-invalid': isFormFieldInvalid('start_datetime') })}
                            onChange={(e) => {
                                formik.setFieldValue('start_datetime', e.target.value);
                                }
                            }
                        />
                        <label htmlFor="start_datetime">Начало мероприятия</label>
                    </span>
                    {getFormErrorMessage('start_datetime')}
                    <span className="p-float-label">
                        <InputText
                            inputid="duration_in_minutes"
                            value={formik.values.duration_in_minutes}
                            className={classNames({ 'p-invalid': isFormFieldInvalid('duration_in_minutes') })}
                            onChange={(e) => {
                                formik.setFieldValue('duration_in_minutes', e.target.value);
                            }
                            }
                        />
                        <label htmlFor="duration_in_minutes">Длительность мероприятия</label>
                    </span>
                    {getFormErrorMessage('duration_in_minutes')}
                    <span className="p-float-label">
                        <InputText
                            inputid="address"
                            value={formik.values.address}
                            className={classNames({ 'p-invalid': isFormFieldInvalid('address') })}
                            onChange={(e) => {
                                formik.setFieldValue('address', e.target.value);
                            }
                            }
                        />
                        <label htmlFor="address">Адрес проведения</label>
                    </span>
                    {getFormErrorMessage('address')}
                    <span className="p-float-label">
                        <InputText
                            inputid="capacity"
                            value={formik.values.capacity}
                            className={classNames({ 'p-invalid': isFormFieldInvalid('capacity') })}
                            onChange={(e) => {
                                formik.setFieldValue('capacity', e.target.value);
                            }
                            }
                        />
                        <label htmlFor="capacity">Максимальное количество участников (если есть)</label>
                    </span>
                    {getFormErrorMessage('capacity')}
                    <span className="p-float-label">
                        <InputText
                            inputid="price"
                            value={formik.values.price}
                            className={classNames({ 'p-invalid': isFormFieldInvalid('price') })}
                            onChange={(e) => {
                                formik.setFieldValue('price', e.target.value);
                            }
                            }
                        />
                        <label htmlFor="price">Цена</label>
                    </span>
                    {getFormErrorMessage('price')}
                    <span className="p-float-label">
                        <InputText
                            inputid="minimum_age"
                            value={formik.values.minimum_age}
                            className={classNames({ 'p-invalid': isFormFieldInvalid('minimum_age') })}
                            onChange={(e) => {
                                formik.setFieldValue('minimum_age', e.target.value);
                            }
                            }
                        />
                        <label htmlFor="minimum_age">Минимальный возраст участников (если есть)</label>
                    </span>
                    {getFormErrorMessage('minimum_age')}
                    <span className="p-float-label">
                        <InputText
                            inputid="maximum_age"
                            value={formik.values.maximum_age}
                            className={classNames({ 'p-invalid': isFormFieldInvalid('maximum_age') })}
                            onChange={(e) => {
                                formik.setFieldValue('maximum_age', e.target.value);
                            }
                            }
                        />
                        <label htmlFor="maximum_age">Максимальный возраст участников (если есть)</label>
                    </span>
                    {getFormErrorMessage('maximum_age')}
                    <span className="flex align-items-center">
                        <Checkbox
                            inputId="only_for_itmo_students"
                            name="only_for_itmo_students"
                            value={formik.values.only_for_itmo_students}
                            onChange={(e) => {
                                    formik.setFieldValue('only_for_itmo_students', !formik.values.only_for_itmo_students);
                                }
                            }
                            checked={formik.values.only_for_itmo_students}
                        />
                        <label htmlFor="only_for_itmo_students" className="ml-2">Только для студентов ИТМО</label>
                    </span>
                    {getFormErrorMessage('only_for_itmo_students')}
                    <span className="flex align-items-center">
                        <Checkbox
                            inputId="only_for_russians"
                            name="only_for_russians"
                            value={formik.values.only_for_russians}
                            onChange={(e) => {
                                formik.setFieldValue('only_for_russians', !formik.values.only_for_russians);
                            }
                            }
                            checked={formik.values.only_for_russians}
                        />
                        <label htmlFor="only_for_russians" className="ml-2">Только для граждан РФ</label>
                    </span>
                    {getFormErrorMessage('only_for_russians')}
                    {/*<Button label="Отправить отзыв" type="submit" icon="pi pi-check" />*/}
                </form>
            </Dialog>
            <Button label="Создать мероприятие" onClick={() => setModalActive(true)} icon="pi pi-plus" iconPos="right" text raised />
        </>
    )
}