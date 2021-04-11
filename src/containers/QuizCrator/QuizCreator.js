import React, {Component} from 'react';
import classes from './QuizCreator.css';
import Button from "../../components/UI/Button/Button";
import {createControl} from "../../form/FormFraemork";
import Input from "../../components/UI/Input/Input";
import Auxiliary from "../../hoc/Auxiliary";
import Select from "../../components/UI/Select/Select";

class QuizCreator extends Component {

    state = {
        quiz: [],
        formControls: this.createFormControls(),
        rightAnswerId: 1
    }

    createFormControls() {
        return {
            question: createControl({
                label: 'Введите вопрос',
                errorMessage: 'Вопрос не может быть пустым',
            }, {
                required: true
            }),
            option1: this.createOptionControl(1),
            option2: this.createOptionControl(2),
            option3: this.createOptionControl(3),
            option4: this.createOptionControl(4),
        }
    }

    createOptionControl(number) {
        return createControl({
            id: number,
            label: `Вариант ${number}`,
            errorMessage: 'Значение не может быть пустым',
        }, {
            required: true
        })
    }

    renderControls() {
        return Object.keys(this.state.formControls).map((controlName, index) => {
            const formControl = this.state.formControls[controlName];
            return (
                <Auxiliary key={controlName + index}>
                    <Input value={formControl.value}
                           valid={formControl.valid}
                           touched={formControl.touched}
                           label={formControl.label}
                           shouldValidate={!!formControl.validation}
                           errorMessage={formControl.errorMessage}
                           onChange={event => this.onChangeHandler(event.target.value, controlName)}/>
                    {index === 0 ? <hr/> : null}
                </Auxiliary>
            )
        })
    }

    onChangeHandler = (value, controlName) => {

    }

    onSubmitHandler = event => {
        event.preventDefault();
    }

    addQuestion() {

    }

    addQuiz() {

    }

    selectChangeHandler = event => {
       this.setState({
           rightAnswerId: Number(event.target.value)
       })
    }

    render() {
        return (
            <div className={classes.QuizCreator}>
                <div>
                    <h1>Создание теста</h1>
                    <form onSubmit={this.onSubmitHandler}>
                        {this.renderControls()}
                        <Select label="Выберите правильный ответ"
                                value={this.state.formControls.rightAnswerId}
                                onChange={this.selectChangeHandler}
                                options={[
                                    {id: 1, value: 1},
                                    {id: 2, value: 2},
                                    {id: 3, value: 3},
                                    {id: 4, value: 4}
                                ]}/>
                        <Button type="primary"
                                onClick={this.addQuestion}>Добавить вопрос</Button>
                        <Button type="success"
                                onClick={this.addQuiz}>Добавить тест</Button>
                    </form>
                </div>
            </div>
        );
    }
}

export default QuizCreator;
