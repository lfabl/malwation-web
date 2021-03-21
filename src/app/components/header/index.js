import React from 'react';
import injectSheet from 'react-jss';
import stylesheet from './stylesheet';
import {
    useTokens,
    useTheme
} from '../../core/context';
import Menu from '../menu';

const Header = ({
    menuData,
    classes
}) => {
    const [theme, setTheme] = useTheme();
    const [tokens, setTokens] = useTokens();

    const {
        colors
    } = theme;
    const {
        spaces
    } = tokens;

    return <div
        className={classes.container}
        style={{
            backgroundColor: colors.panel,
            paddingRight: spaces.container * 2,
            paddingLeft: spaces.container * 2,
            paddingBottom: spaces.container,
            paddingTop: spaces.container
        }}
    >
        <span
            style={{
                color: colors.primary
            }}
        >
            Malwation Test
        </span>
        <div>
            <Menu
                data={menuData}
            />
        </div>
    </div>;
};
export default injectSheet(stylesheet)(Header);