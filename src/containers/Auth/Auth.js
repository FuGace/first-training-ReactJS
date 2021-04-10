import React, {Component} from 'react';
import classes from './Auth.css'
import Button from "../../components/UI/Button/Button";
import Input from "../../components/UI/Input/Input";

class Auth extends Component {

    state = {
        formControls: {
            email: {
                value: '',
                type: 'email',
                label: 'Email',
                errorMessage: 'Введите корректный email',
                valid: false,
                touched: false,
                validation: {
                    required: true,
                    email: true
                }
            },
            password: {
                value: '',
                type: 'password',
                label: 'Пароль',
                errorMessage: 'Введите корректный пароль',
                valid: false,
                touched: false,
                validation: {
                    required: true,
                    minLength: 6
                }
            }
        }
    }

    loginHandler() {

    }

    registerHandler() {

    }

    submitHandler = (event) => event.preventDefault();

    renderInputs() {
        return Object.keys(this.state.formControls).map((controlName, index) => {
            const formControl = this.state.formControls[controlName]
            return (
                <Input key={controlName + index}
                       type={formControl.type}
                       value={formControl.value}
                       valid={formControl.valid}
                       touched={formControl.touched}
                       label={formControl.label}
                       shouldValidate={!!formControl.validation}
                       errorMessage={formControl.errorMessage}
                       onChange={event => this.onChangeHandler(event, controlName)}/>
            )
        })
    }

    /**
     * Обработка и валидация ввода значения в input поле
     */
    onChangeHandler(event, controlName) {
        const formControls = {...this.state.formControls};
        const currentFormControl = formControls[controlName];
        currentFormControl.value = event.target.value;
        currentFormControl.touched = true;
        currentFormControl.valid = this.validateFormControl(currentFormControl.value, currentFormControl.validation)
        this.setState({
            formControls
        })
    }

    validateFormControl(value, validations) {
        if (!value) {
            return false;
        }
        let isValid = true;

        if (validations.required) {
            isValid = value.trim().length && isValid;
        }
        if (validations.email) {
            const emailRegExp = /.+@.+\..+/i;
            isValid = emailRegExp.test(value) && isValid;
        }
        if (validations.minLength) {
            isValid = value.length >= validations.minLength && isValid;
        }
        return isValid;
    }

    render() {
        return (
            <div className={classes.Auth}>
                <div>
                    <h1>Авторизация</h1>
                    <form onSubmit={this.submitHandler}
                          className={classes.AuthForm}>
                        {this.renderInputs()}
                        <Button type='success'
                                onClick={this.loginHandler}>Войти
                        </Button>
                        <Button type='primary'
                                onClick={this.registerHandler}>Зарегистрироваться
                        </Button>
                    </form>
                </div>
            </div>
        );
    }
}

export default Auth;
