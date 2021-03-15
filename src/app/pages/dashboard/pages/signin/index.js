import React from 'react';
import injectSheet from 'react-jss';
import stylesheet from './stylesheet';
import {
    useTokens,
    useTheme
} from '../../../../core/context';
import {
    TextInput,
    Button,
    Icon,
    Link
} from '../../../../core/components';

const Signin = ({
    classes,
    history
}) => {
    const [tokens, setTokens] = useTokens();
    const [theme, setTheme] = useTheme();

    const {
        colors
    } = theme;
    const {
        radiuses,
        borders,
        spaces
    } = tokens;

    return <div
        className={classes.container}
        style={{
            padding: spaces.container,
            margin: spaces.container
        }}
    >
        <div
            className={classes.content}
            style={{
                borderColor: colors.seperator,
                borderRadius: radiuses.card,
                borderWidth: borders.card
            }}
        >
            <div
                className={classes.header}
                style={{
                    padding: spaces.content
                }}
            >
                <Icon
                    className={classes.backButton}
                    color={colors.hideText}
                    name="chevron-left"
                    size={22}
                    style={{
                        padding: spaces.content
                    }}
                    onClick={() => {
                        window.location.href = "/";
                    }}
                />
            </div>
            <div
                className={classes.pageContent}
                style={{
                    padding: spaces.content * 2
                }}
            >
                <img
                    src="/assets/images/logo.png"
                    style={{
                        marginBottom: spaces.content * 2
                    }}
                />
                <div
                    className={classes.title}
                    style={{
                        marginBottom: spaces.content * 2
                    }}
                >
                    Signin
                </div>
                <TextInput
                    placeholder="Username"
                    style={{
                        marginBottom: spaces.content * 1.5
                    }}
                />
                <TextInput
                    placeholder="Password"
                    type="password"
                    style={{
                        marginBottom: spaces.content * 1.5
                    }}
                />
                <Button
                    value="Signin"
                    onClick={() => history.push("/dashboard/main")}
                />
                <Link
                    href="/dashboard/signup"
                    style={{
                        marginBottom: spaces.content,
                        marginTop: spaces.content
                    }}
                >
                    Kayıt Ol
                </Link>
            </div>
        </div>
    </div>;
};
export default injectSheet(stylesheet)(Signin);