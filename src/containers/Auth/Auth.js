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

    onChangeHandler(event, controlName) {
        console.log('event', event.target.value)
        console.log('controlName', controlName)
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
