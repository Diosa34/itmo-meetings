import React, {useRef} from "react";
import {Toast} from "primereact/toast";
import {Button} from "primereact/button";

export default function ShowError({message}) {
    const toastTopCenter = useRef(null);

    const showMessage = (message, ref, severity) => {

        ref.current.show({ severity: severity, summary: message});
    };

    return (
        <div className="card flex justify-content-center">
            <Toast ref={toastTopCenter} position="top-center" />
            <div className="flex flex-wrap gap-2">
                <Button label="Top Center" className="p-button-danger" onClick={(e) => showMessage(message, toastTopCenter, 'error')} />
            </div>
        </div>
    )
}