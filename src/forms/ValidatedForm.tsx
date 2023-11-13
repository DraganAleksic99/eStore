import React, { useState } from "react";
import { ValidationError } from './ValidationError';
import { getMessages } from './ValidationMessages';

type ModelItem = {
    label: string
    name?: string
    attrs?: {}
}

type ValidatedFormProps = {
    formModel: ModelItem[]
    defaultAttrs: {
        type: string
        required: boolean
    }
    submitCallback: (formData: {}) => void
    cancelCallback: () => void
    submitText: string
    cancelText: string
}

export const ValidatedForm: React.FC<ValidatedFormProps> = (props) => {
    const {formModel, defaultAttrs, submitCallback, cancelCallback, submitText, cancelText} = props;

    const [validationErrors, setvalidationErrors] = useState<{[key: string]: any}>({});
    const formElements: {[key: string]: any} = {};

    const handleSubmit = () => {
        const newState: {[key: string]: any} = {};
        Object.values(formElements).forEach((element: any) => {
            if (!element.checkValidity()) {
                newState[element.name] = getMessages(element);
            }
        })
        setvalidationErrors(newState);

        if (Object.keys(validationErrors).length === 0) {
            const arr = [...Object.entries(formElements).map((e: any) => ({
                [e[0]]: e[1].value
            }))];
            const data = Object.assign(arr)
            submitCallback(data);
        }
    }
    const registerRef = (element: any) => {
        if (element !== null) {
            formElements[element.name] = element;
        }
    }
    const renderElement = (modelItem: ModelItem) => {
        const name = modelItem.name || modelItem.label.toLowerCase();

        return <div className="form-group" key={ modelItem.label }>
                <label>{ modelItem.label }</label>
                <ValidationError errors={ validationErrors[name] } />
                <input className="form-control" name={ name } ref={ registerRef }
                { ...defaultAttrs } { ...modelItem.attrs } />
            </div>
    }
    return <>
            { formModel.map(m => renderElement(m))}
            <div className="text-center">
                <button className="btn btn-secondary m-1" onClick={ cancelCallback }>
                    { cancelText || "Cancel" }
                </button>
                <button className="btn btn-primary m-1" onClick={ handleSubmit }>
                    { submitText || "Submit"}
                </button>
            </div>
        </>
}