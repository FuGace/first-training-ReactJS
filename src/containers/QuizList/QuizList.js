import React, {Component} from 'react';
import classes from './QuizList.css'
import {NavLink} from "react-router-dom";
import axios from "../../axios/axios-quiz";
import Loader from "../../components/UI/Loader/Loader";

class QuizList extends Component {

    state = {
        quizes: [],
        isLoading: true,
    }

    renderQuizes() {
        return this.state.quizes.map(quiz => {
            return (
                <li key={quiz.id}>
                    <NavLink to={'/quiz/' + quiz.id}>Тест {quiz.name}</NavLink>
                </li>
            )
        })
    }

    async componentDidMount() {
        try {
            const quizes = [];
            const res = await axios.get('quizes.json')
            Object.keys(res.data).forEach((id, index) => {
                quizes.push({
                    id,
                    name: `Тест №${index + 1}`
                })
            })
            this.setState({
                quizes,
                isLoading: false
            })
        } catch (e) {
            console.error('e', e)
        }
    }

    render() {
        return (
            <div className={classes.QuizList}>
                <div>
                    <h1>Список тестов</h1>
                    {this.state.isLoading ?
                        <Loader/> :
                        <ul>
                            {this.renderQuizes()}
                        </ul>
                    }
                </div>
            </div>
        );
    }
}

export default QuizList;
