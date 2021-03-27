import React from 'react'
import classes from './ActiveQuiz.css'
import AnswersList from "./AnswersList/AnswersList";

function ActiveQuiz(props) {
    return (
        <div className={classes.ActiveQuiz}>
            <p className={classes.Question}>
                <span>
                    <strong>{props.activeQuestionCounter}.</strong>&nbsp;
                    {props.question}
                </span>
                <small>{props.activeQuestionCounter} из {props.quizLength}</small>
            </p>
            <AnswersList
                answers={props.answers}
                onClickAnswer={props.onClickAnswer}
                answerState={props.answerState}/>
        </div>
    )
}

export default ActiveQuiz
