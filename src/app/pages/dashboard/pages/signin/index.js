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
    Icon,
    Link
} from '../../../../core/components';
import {
    USER_NAME_REGEX
} from '../../../../constants';
import {
    client
} from '../../../../api';
import {
    gql
} from '@apollo/client';
import md5 from 'md5';

const Signin = ({
    classes,
    history
}) => {
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

    const login = () => {
        const _userName = JSON.parse(JSON.stringify(userName));
        const _password = JSON.parse(JSON.stringify(password));

        if(_password.trim() === "") {
            alert("Parola boş olamaz.");
            return false;
        }

        if(_userName.trim() === "") {
            alert("Kullanıcı adı boş olamaz.");
            return false;
        }

        if(_password.trim().length > 80 || _password.trim().length < 8) {
            alert("Parola uzunluğu 8 ile 80 arasında olmalıdır.");
            return false;
        }

        if(_userName.trim().length > 50 || _userName.trim().length < 8) {
            alert("Kullanıcı adı uzunluğu 8 ile 50 arasında olmalıdır.");
            return false;
        }

        if(!USER_NAME_REGEX.test(_userName.trim())) {
            alert("Kullanıcı adı bir kullanıcı adı olma şartlarını taşımıyor.");
            return false;
        }

        client.query({
            query: gql`
                query signin(
                    $userName: String!,
                    $password: String!
                ) {
                    signin(
                        userName: $userName,
                        password: $password
                    ) {
                        message,
                        code,
                        token
                    }
                }
            `,
            variables: {
                userName: _userName,
                password: md5(_password)
            },
            fetchPolicy: "no-cache"
        }).then(e => {
            const response = e.data.signin;
            if(response.code === 200) {
                alert(response.message);
                history.push("/dashboard/main");
            } else {
                alert(response.message);
            }
        }).catch(e => {
            if(e.message) {
                alert(e.message);
            } else {
                alert(e);
            }
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
                    value={userName}
                    onChange={e => setUserName(e)}
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
                <Button
                    value="Signin"
                    onClick={() => login()}
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