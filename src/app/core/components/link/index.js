import React from 'react';
import injectSheet from 'react-jss';
import stylesheet from './stylesheet';
import {
    useTokens,
    useTheme
} from '../../context';

const Link = ({
    size = 18,
    className,
    children,
    classes,
    style,
    color,
    href
}) => {
    const [tokens, setTokens] = useTokens();
    const [theme, setTheme] = useTheme();

    const {
        colors
    } = theme;
    const {
        spaces
    } = tokens;

    return <a
        className={[
            classes.container,
            className
        ].join(" ")}
        href={href}
        style={{
            color: color ? color : colors.body,
            padding: spaces.content,
            fontSize: size,
            ...style
        }}
    >
        {children}
    </a>;
};
export default injectSheet(stylesheet)(Link);