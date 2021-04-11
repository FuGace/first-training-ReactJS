export function createControl(config, validations) {
    return {
        ...config,
        validations,
        valid: !validations,
        touched: false,
        value: ''
    }
}
