import React, {
    useState
} from 'react';
import injectSheet from 'react-jss';
import stylesheet from './stylesheet';
import {
    useTokens,
    useTheme
} from '../../../../core/context';
import {
    TextInput,
    Button,
    Icon
} from '../../../../core/components';
import {
    client
} from '../../../../api';
import {
    gql
} from '@apollo/client';

const Signup = ({
    classes
}) => {
    const [fullName, setFullName] = useState("");
    const [userName, setUserName] = useState("");
    const [password, setPassword] = useState("");

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

    const register = () => {
        client.mutate({
            mutation: gql`
                mutation signup(
                    $fullName: String!,
                    $userName: String!,
                    $password: String!
                ) {
                    signup(
                        fullName: $fullName,
                        userName: $userName,
                        password: $password
                    ) {
                        message,
                        code
                    }
                }
            `,
            variables: {
                fullName: fullName,
                userName: userName,
                password: password
            }
        }).then(e => {
            console.log(e);
        }).catch(e => {
            console.log(e.message);
        });
    };

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
                        window.location.href = "/dashboard/signin";
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
                    Signup
                </div>
                <TextInput
                    placeholder="Username"
                    value={userName}
                    onChange={e => setUserName(e)}
                    style={{
                        marginBottom: spaces.content * 1.5
                    }}
                />
                <TextInput
                    placeholder="Fullname"
                    value={fullName}
                    onChange={e => setFullName(e)}
                    style={{
                        marginBottom: spaces.content * 1.5
                    }}
                />
                <TextInput
                    placeholder="Password"
                    type="password"
                    value={password}
                    onChange={e => setPassword(e)}
                    style={{
                        marginBottom: spaces.content * 1.5
                    }}
                />
                <TextInput
                    placeholder="Re-Password"
                    type="password"
                    style={{
                        marginBottom: spaces.content * 1.5
                    }}
                />
                <Button
                    value="Signup"
                    onClick={() => register()}
                />
            </div>
        </div>
    </div>;
};
export default injectSheet(stylesheet)(Signup);