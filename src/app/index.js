import React from 'react';
import injectSheet from 'react-jss';
import stylesheet from './stylesheet';

import Core from './core';
import Header from './components/header';

import {
    MENU
} from './constants';
import Navigation from './navigation';
import {
    useGlobalState 
} from './context';

function App({
    classes
}) {
    const [globalState, setGlobalState] = useGlobalState();

    return <Core>
        <div
            className={classes.container}
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
        </div>
    </Core>;
}
export default injectSheet(stylesheet)(App);
