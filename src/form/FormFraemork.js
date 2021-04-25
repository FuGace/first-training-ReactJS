export function createControl(config, validations) {
    return {
        ...config,
        validations,
        valid: !validations,
        touched: false,
        value: ''
    }
}

export function isControlValid(value, validations) {
    if (!value) {
        return false;
    }
    let isValid = true;

    if (validations.required) {
        isValid = !!value.trim().length && isValid;
    }

    return isValid;
}

export function isFormValid(formControls) {
    let isFormValid = true;
    for (let control in formControls) {
        if (formControls.hasOwnProperty(control)) {
            isFormValid = formControls[control].valid && isFormValid;
        }
    }
    return isFormValid;
}
