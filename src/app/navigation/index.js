import React from 'react';
import {
    Switch,
    Route
} from 'react-router-dom';

import Home from '../pages/home';
import Dashboard from '../pages/dashboard';
import Main from '../pages/dashboard/pages/main';
import Signin from '../pages/dashboard/pages/signin';
import Signup from '../pages/dashboard/pages/signup';
import {
    useTheme 
} from '../core/context';

export const DashboardNavigation = () => {
    const [theme, setTheme] = useTheme();

    const {
        colors
    } = theme;

    return <main
        style={{
            backgroundColor: colors.background
        }}
    >
        <Switch>
            <Route
                component={Signin}
                path="/dashboard/signin"
            />
            <Route
                component={Signup}
                path="/dashboard/signup"
            />
            <Route
                component={Main}
                path="/dashboard/main"
            />
        </Switch>
    </main>;
};

const Navigation = () => {
    return <main>
        <Switch>
            <Route
                component={Home}
                path="/"
                exact
            />
            <Route
                component={Dashboard}
                path="/dashboard"
            />
        </Switch>
    </main>;
};
export default Navigation;