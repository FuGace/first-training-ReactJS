import React, {Component} from 'react'
import classes from './Drawer.css'
import Backdrop from "../../UI/Backdrop/Backdrop";
import {NavLink} from "react-router-dom";

const links = [
    {label: 'Список', to: '/', exact: true},
    {label: 'Авторизация', to: '/auth', exact: false},
    {label: 'Создать тест', to: '/quiz-creator', exact: false}
]; // навигационные ссылки

class Drawer extends Component {
    renderLinks() {
        return links.map((link, index) => {
            return (
                <li key={index}>
                    <NavLink
                        to={link.to}
                        exact={link.exact}
                        activeClassName={classes.active}
                        onClick={this.props.onClose}>{link.label}</NavLink>
                </li>
            )
        })
    }

    render() {
        const cls = [
            classes.Drawer,
            this.props.isOpen ? '' : classes.close
        ];
        return (
            // React.Fragment
            <>
                <nav className={cls.join(' ')}>
                    <ul>
                        {this.renderLinks()}
                    </ul>
                </nav>
                {this.props.isOpen ? <Backdrop onClick={this.props.onClose}/> : null}
            </>
        );
    }
}

export default Drawer;
