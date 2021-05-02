import React, {Component} from 'react';
import classes from './QuizCreator.css';
import Button from "../../components/UI/Button/Button";
import {createControl, isControlValid, isFormValid} from "../../form/FormFraemork";
import Auxiliary from "../../hoc/Auxiliary";
import Select from "../../components/UI/Select/Select";
import Input from "../../components/UI/Input/Input";
import axios from "../../axios/axios-quiz";

class QuizCreator extends Component {

    state = {
        quiz: [],
        formControls: this.createFormControls(),
        rightAnswerId: 1,
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
                           shouldValidate={!!formControl.validations}
                           errorMessage={formControl.errorMessage}
                           onChange={event => this.onChangeHandler(event.target.value, controlName)}/>
                    {index === 0 ? <hr/> : null}
                </Auxiliary>
            )
        })
    }

    onChangeHandler = (value, controlName) => {
        const formControls = {...this.state.formControls};
        const formControl = formControls[controlName];

        formControl.value = value;
        formControl.touched = true;
        formControl.valid = isControlValid(formControl.value, formControl.validations);
        formControls[controlName] = formControl;

        this.setState({
            formControls,
            isFormValid: isFormValid(formControls)
        })
    }

    onSubmitHandler = event => {
        event.preventDefault();
    }

    addQuestion = event => {
        event.preventDefault();
        const quiz = [...this.state.quiz];
        const index = quiz.length + 1;
        const {question, option1, option2, option3, option4} = this.state.formControls;
        const questionItem = {
            question: question.value,
            id: index,
            rightAnswerId: this.state.rightAnswerId,
            answers: [
                {id: option1.id, value: option1.value},
                {id: option2.id, value: option2.value},
                {id: option3.id, value: option3.value},
                {id: option4.id, value: option4.value},
            ]
        };
        quiz.push(questionItem);
        this.setState({
            quiz,
            formControls: this.createFormControls(),
            rightAnswerId: 1,
        })
    }


    addQuiz = async event => {
        event.preventDefault();
        try {
            await axios.post('quizes.json', this.state.quiz);
            this.setState({
                quiz: [],
                formControls: this.createFormControls(),
                rightAnswerId: 1,
            })
        } catch (err) {
            console.error('err', err);
        }
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
                                disabled={!this.state.isFormValid}
                                onClick={this.addQuestion}>Добавить вопрос</Button>
                        <Button type="success"
                                disabled={!this.state.quiz.length}
                                onClick={this.addQuiz}>Добавить тест</Button>
                    </form>
                </div>
            </div>
        );
    }
}

export default QuizCreator;
