import React, {Component} from 'react'
import classes from './Quiz.css'
import ActiveQuiz from '../components/ActiveQuiz/ActiveQuiz';
import FinishedQuiz from '../components/FinishedQuiz/FinishedQuiz';

class Quiz extends Component {

    state = {
        activeQuestionCounter: 0, // текущий вопрос
        answerState: null, // сосрояние ответа
        results: {}, // состояния выбранных вариантов ответа для вывода в финальном слайде
        isFinished: false, // опрос окончен?
        quiz: [
            {
                id: 1, // id вопроса
                question: 'Какая компания разработала React JS?',
                rightAnswerId: 2, // правильный ответ
                answers: [
                    {text: 'KFS', id: 1},
                    {text: 'Facebook', id: 2},
                    {text: 'Google', id: 3},
                    {text: 'Та самая компания', id: 4}
                ]
            },
            {
                id: 2,
                question: 'Какой метод отвечает за вывод информации?',
                rightAnswerId: 3,
                answers: [
                    {text: 'rend', id: 1},
                    {text: 'ReactDOM', id: 2},
                    {text: 'render', id: 3},
                    {text: 'renderer', id: 4}
                ]
            }
        ]
    }

    /**
     * Обработка нажатия по строке с вариантами ответа на вопрос
     * @param answerId - id ответа
     */
    onClickAnswer = (answerId) => {
        if (this.state.answerState) {
            const key = Object.keys(this.state.answerState)[0];
            if (this.state.answerState[key] === 'right') {
                // для ограничения нажатия несколько раз на правльный выриант ответа до переключения на следующий вопрос
                return;
            }
        }
        const question = this.state.quiz[this.state.activeQuestionCounter];
        let results = this.state.results;
        if (question.rightAnswerId === answerId) {
            // правильный ответ
            if (!results[question.id]) {
                results[question.id] = 'right'
            }
            this.setState({
                answerState: {[answerId]: 'right'},
                results
            })
            const timer = window.setTimeout(() => {
                if (this.state.activeQuestionCounter + 1 === this.state.quiz.length) {
                    // опрос окончен
                    this.setState({
                        isFinished: true
                    });
                } else {
                    // очищаем стейт вопроса и переключаемся на следующий вопрос
                    this.setState({
                        activeQuestionCounter: this.state.activeQuestionCounter + 1,
                        answerState: null
                    })
                }
                window.clearTimeout(timer);
            }, 1000)
        } else {
            results[question.id] = 'error'
            this.setState({
                answerState: {[answerId]: 'error'},
                results
            })
        }

    }

    retryHandler = () => {
        this.setState({
            activeQuestionCounter: 0,
            answerState: null,
            results: {},
            isFinished: false
        })
    }

    render() {
        return (
            <div className={classes.Quiz}>

                <div className={classes.QuizWrapper}>
                    <h1>Ответьте на все вопросы</h1>
                    {
                        this.state.isFinished ?
                            <FinishedQuiz
                                quiz={this.state.quiz}
                                results={this.state.results}
                                onRetry={this.retryHandler}
                            />
                            : <ActiveQuiz
                                answers={this.state.quiz[this.state.activeQuestionCounter].answers}
                                question={this.state.quiz[this.state.activeQuestionCounter].question}
                                onClickAnswer={this.onClickAnswer}
                                quizLength={this.state.quiz.length}
                                activeQuestionCounter={this.state.activeQuestionCounter + 1}
                                answerState={this.state.answerState}
                            />
                    }
                </div>
            </div>
        )
    }
}

export default Quiz;
