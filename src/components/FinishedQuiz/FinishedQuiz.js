import React from 'react';
import classes from './FinishedQuiz.css'
import Button from "../UI/Button/Button";
import {Link} from "react-router-dom";

const FinishedQuiz = props => {
    const successTotal = Object.keys(props.results).reduce((total, key) => {
        if (props.results[key] === 'right') {
            total++;
        }
        return total;
    }, 0);
    return (
        <div className={classes.FinishedQuiz}>
            <ul>
                {props.quiz.map((item, index) => {
                    const cls = [
                        'fa',
                        props.results[item.id] === 'error' ? 'fa-times' : 'fa-check',
                        classes[props.results[item.id]]
                    ];
                    return (
                        <li key={index}>
                            <strong>{index + 1}</strong>.&nbsp;
                            {item.question}
                            <i className={cls.join(' ')}/>
                        </li>
                    )
                })}
            </ul>
            <p>Правильно {successTotal} из {props.quiz.length}</p>
            <Button onClick={props.onRetry}
                    type="primary">Повторить</Button>
            <Link to='/'>
                <Button type="success">Перейти к списку тестов</Button>
            </Link>
        </div>
    )
}

export default FinishedQuiz;
