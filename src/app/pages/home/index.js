import React from 'react';
import injectSheet from 'react-jss';
import stylesheet from './stylesheet';

import {
    useTokens
} from '../../core/context';

const Home = ({
    classes
}) => {
    const [tokens, setTokens] = useTokens();

    const {
        spaces
    } = tokens;

    return <div
        className={classes.container}
        style={{
            padding: spaces.container
        }}
    >
        Home page
    </div>;
};
export default injectSheet(stylesheet)(Home);