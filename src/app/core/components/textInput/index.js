import React from 'react';
import injectSheet from 'react-jss';
import {
    useTokens,
    useTheme
} from '../../context';
import stylesheet from './stylesheet';

const TextInput = ({
    wrap = "no-wrap",
    type = "text",
    className,
    referance,
    onChange,
    classes,
    value,
    style,
    ...props
}) => {
    const [tokens, setTokens] = useTokens();
    const [theme, setTheme] = useTheme();

    const {
        radiuses,
        borders,
        spaces
    } = tokens;
    const {
        colors
    } = theme;

    return <input
        className={[
            classes.container,
            className
        ].join(" ")}
        onChange={e => onChange ? onChange(e.target.value) : null}
        value={value}
        type={type}
        ref={referance}
        style={{
            alignSelf: wrap === "no-wrap" ? "stretch" : wrap === "wrap" ? "baseline" : null,
            paddingBottom: spaces.content * 1.25,
            paddingRight: spaces.content * 1.5,
            paddingLeft: spaces.content * 1.5,
            paddingTop: spaces.content * 1.25,
            backgroundColor: colors.layer2,
            borderColor: colors.seperator,
            borderRadius: radiuses.card,
            borderWidth: borders.card,
            color: colors.body,
            ...style
        }}
        {...props}
    />;
};
export default injectSheet(stylesheet)(TextInput);