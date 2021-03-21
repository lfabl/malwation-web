import React from 'react';
import injectSheet from 'react-jss';
import stylesheet from './stylesheet';

import {
    useTokens,
    useTheme
} from '../../core/context';

const Home = ({
    classes
}) => {
    const [tokens, setTokens] = useTokens();
    const [theme, setTheme] = useTheme();

    const {
        spaces
    } = tokens;
    const {
        colors
    } = theme;

    return <div
        className={classes.container}
        style={{
            padding: spaces.container,
            color: colors.body
        }}
    >
        Welcome to home page.
    </div>;
};
export default injectSheet(stylesheet)(Home);