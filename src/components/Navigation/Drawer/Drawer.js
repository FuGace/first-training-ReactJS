import React, {Component} from 'react'
import classes from './Drawer.css'
import Backdrop from "../../UI/Backdrop/Backdrop";

const links = [1, 2, 3]; // ссылки на тесты

class Drawer extends Component {
    renderLinks() {
        return links.map((link, index) => {
            return (
                <li key={index}>
                    <a>Link {link}</a>
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
