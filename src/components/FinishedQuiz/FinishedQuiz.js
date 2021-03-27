import React from 'react';
import classes from './FinishedQuiz.css'

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
            <div>
                <button onClick={props.onRetry}>Повторить</button>
            </div>
        </div>
    )
}

export default FinishedQuiz;
