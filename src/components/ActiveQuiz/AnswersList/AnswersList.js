import React from 'react'
import AnswerItem from "./AnswerItem/AnswerItem";
import classes from './AnswersList.css'

function AnswersList(props) {
    return (
        <ul className={classes.AnswersList}>
            {props.answers.map((answer, index) => {
                return (
                    <AnswerItem
                        answer={answer}
                        key={index}
                        onClickAnswer={props.onClickAnswer}
                        state={props.answerState ? props.answerState[answer.id] : null}/>
                )
            })}
        </ul>
    )
}

export default AnswersList
