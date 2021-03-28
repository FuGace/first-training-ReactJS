import React, {Component} from 'react'
import classes from './Layout.css'
import MenuToggle from "../../components/Navigation/MenuToggle/MenuToggle";
import Drawer from "../../components/Navigation/Drawer/Drawer";

export class Layout extends Component {

    state = {
        isOpen: false // меню открыто?
    }

    /**
     * Переключатель открытия бокового меню
     */
    toggleMenuHandler = () => {
        this.setState({
            isOpen: !this.state.isOpen
        })
    }

    /**
     * Закрытие меню по клику за пределами меню
     */
    menuCloseHandler = () => {
        this.setState({
            isOpen: false
        })
    }

    render() {
        return (
            <div className={classes.Layout}>
                <Drawer isOpen={this.state.isOpen}
                        onClose={this.menuCloseHandler}/>
                <MenuToggle isOpen={this.state.isOpen}
                            onToggle={this.toggleMenuHandler}/>
                <main>
                    {this.props.children}
                </main>
            </div>
        )
    }
}
