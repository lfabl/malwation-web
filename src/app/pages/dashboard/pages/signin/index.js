import React, {
    useEffect,
    useState,
    useRef
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
import {
    useGlobalState
} from '../../../../context';

const Signin = ({
    classes
}) => {
    const [userName, setUserName] = useState("");
    const [password, setPassword] = useState("");
    const [rememberMe, setRememberMe] = useState(false);

    const [globalState, setGlobalState] = useGlobalState();

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

    const userNameRef = useRef();
    const passwordRef = useRef();

    useEffect(() => {
        userNameRef.current.focus();
    }, []);

    const login = () => {
        const _userName = JSON.parse(JSON.stringify(userName));
        const _password = JSON.parse(JSON.stringify(password));
        const _rememberMe = JSON.parse(JSON.stringify(rememberMe));

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

        let variables = {
            userName: _userName,
            password: md5(_password)
        };

        if(_rememberMe) variables.rememberMe = true;

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
            variables,
            fetchPolicy: "no-cache"
        }).then(e => {
            const response = e.data.signin;
            if(response.code === 200) {
                alert(response.message);
                setGlobalState({
                    userData: {
                        login: true,
                        token: response.token
                    }
                });
                if(_rememberMe) localStorage.setItem('token', response.token);
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
                    referance={userNameRef}
                    onChange={e => setUserName(e)}
                    onKeyUp={e => e.keyCode === 13 ? passwordRef.current.focus() : null}
                    style={{
                        marginBottom: spaces.content * 1.5
                    }}
                />
                <TextInput
                    placeholder="Password"
                    type="password"
                    value={password}
                    referance={passwordRef}
                    onChange={e => setPassword(e)}
                    onKeyUp={e => e.keyCode === 13 ? login() : null}
                    style={{
                        marginBottom: spaces.content * 1.5
                    }}
                />
                <div
                    className={classes.rememberMeContainer}
                    onClick={() => setRememberMe(!rememberMe)}
                    style={{
                        marginBottom: spaces.content * 1.5
                    }}
                >
                    <input
                        type="checkbox"
                        checked={rememberMe}
                    />
                    <span
                        style={{
                            marginLeft: spaces.content
                        }}
                    >
                        Beni hatırla.
                    </span>
                </div>
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