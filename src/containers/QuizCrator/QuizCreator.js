import React, {Component} from 'react';
import classes from './QuizCreator.css';
import Button from "../../components/UI/Button/Button";

class QuizCreator extends Component {

    onSubmitHandler = event => {
        event.preventDefault();
    }

    addQuestion() {

    }

    addQuiz() {

    }

    render() {
        return (
            <div className={classes.QuizCreator}>
                <div>
                    <h1>Создание теста</h1>
                    <form onSubmit={this.onSubmitHandler}>
                        <input/>
                        <hr/>
                        <input/>
                        <input/>
                        <input/>
                        <input/>
                        <select></select>
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
