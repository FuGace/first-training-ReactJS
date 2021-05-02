import React, {Component} from 'react'
import classes from './Quiz.css'
import ActiveQuiz from '../../components/ActiveQuiz/ActiveQuiz';
import FinishedQuiz from '../../components/FinishedQuiz/FinishedQuiz';
import axios from "../../axios/axios-quiz";
import Loader from "../../components/UI/Loader/Loader";

class Quiz extends Component {

    state = {
        activeQuestionCounter: 0, // текущий вопрос
        answerState: null, // сосрояние ответа
        results: {}, // состояния выбранных вариантов ответа для вывода в финальном слайде
        isFinished: false, // опрос окончен?
        quiz: [],
        isLoading: true
    }

    async componentDidMount() {
        try {
            const quiz = (await axios.get(`quizes/${this.props.match.params.id}.json`)).data;
            this.setState({
                quiz,
                isLoading: false
            })
        } catch (e) {
            console.error('e', e)
        }
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
                    {this.state.isLoading ?
                        <Loader/> :
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
