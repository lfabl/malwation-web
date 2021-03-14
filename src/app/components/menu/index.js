import React from 'react';
import injectSheet from 'react-jss';
import stylesheet from './stylesheet';

import {
    useTokens,
    useTheme
} from '../../core/context';

const Menu = ({
    direction = "row",
    classes,
    data,
    key
}) => {
    const [tokens, setTokens] = useTokens();
    const [theme, setTheme] = useTheme();

    const {
        colors
    } = theme;
    const {
        spaces
    } = tokens;

    return <div
        className={classes.container}
        style={{
            flexDirection: direction
        }}
    >
        {
            data && data.length ?
                data.map((item, index) => {
                    const currentPath = item.url === "/" ? item.url === window.location.pathname : window.location.pathname.indexOf(item.url) !== -1;

                    return <div
                        key={key ? key + "-" + index : "menu-" + index}
                        onClick={() => window.location.href = item.url}
                        className={classes.item}
                        style={{
                            color: currentPath ? colors.primary : colors.body,
                            fontWeight: currentPath ? 700 : 400,
                            paddingRight: spaces.content * 2,
                            paddingLeft: spaces.content * 2,
                            paddingBottom: spaces.content,
                            paddingTop: spaces.content
                        }}
                    >
                        {item.title}
                    </div>;
                })
                :
                null
        }
    </div>;
};
export default injectSheet(stylesheet)(Menu);