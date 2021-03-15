import React from 'react';
import injectSheet from 'react-jss';
import {
    useTokens,
    useTheme
} from '../../context';
import stylesheet from './stylesheet';

const Button = ({
    wrap = "no-wrap",
    buttonColor,
    className,
    classes,
    onClick,
    color,
    style,
    value,
    ...props
}) => {
    const [tokens, setTokens] = useTokens();
    const [theme, setTheme] = useTheme();

    const {
        radiuses,
        spaces
    } = tokens;
    const {
        colors
    } = theme;

    return <button
        onClick={() => onClick ? onClick() : null}
        className={[
            classes.container,
            className
        ].join(" ")}
        style={{
            alignSelf: wrap === "no-wrap" ? "stretch" : wrap === "wrap" ? "baseline" : null,
            backgroundColor: buttonColor ? buttonColor : colors.primary,
            paddingBottom: spaces.content * 1.5,
            color: color ? color : colors.contrastBody,
            paddingRight: spaces.content * 2,
            paddingTop: spaces.content * 1.5,
            paddingLeft: spaces.content * 2,
            borderRadius: radiuses.card,
            ...style
        }}
        {...props}
    >
        {value}
    </button>;
};
export default injectSheet(stylesheet)(Button);