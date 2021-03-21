import React from 'react';
import injectSheet from 'react-jss';
import stylesheet from './stylesheet';

import Core from './core';
import Header from './components/header';

import {
    MENU
} from './constants';
import Navigation from './navigation';
import Context, {
    useGlobalState 
} from './context';
import {
    useTheme
} from './core/context';

const ContextAPI = ({
    classes
}) => {
    const [globalState, setGlobalState] = useGlobalState();

    const [theme, setTheme] = useTheme();

    const {
        colors
    } = theme;

    return <div
        className={classes.container}
        style={{
            backgroundColor: colors.background
        }}
    >
        {
            globalState.userData.login ?
                null
                :
                <Header
                    menuData={MENU}
                />
        }
        <Navigation/>
    </div>;
};

function App({
    classes
}) {
    return <Core>
        <Context>
            <ContextAPI
                classes={classes}
            />
        </Context>
    </Core>;
}
export default injectSheet(stylesheet)(App);
