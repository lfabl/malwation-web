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
    Icon
} from '../../../../core/components';
import {
    client
} from '../../../../api';
import {
    gql
} from '@apollo/client';
import md5 from 'md5';
import {
    USER_NAME_REGEX
} from '../../../../constants';

const Signup = ({
    classes,
    history
}) => {
    const [fullName, setFullName] = useState("");
    const [userName, setUserName] = useState("");
    const [password, setPassword] = useState("");
    const [rePassword, setRePassword] = useState("");

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
    const fullNameRef = useRef();
    const passwordRef = useRef();
    const rePasswordRef = useRef();

    useEffect(() => {
        userNameRef.current.focus();
    }, []);

    const register = () => {
        const _fullName = JSON.parse(JSON.stringify(fullName));
        const _userName = JSON.parse(JSON.stringify(userName));
        const _password = JSON.parse(JSON.stringify(password));
        const _rePassword = JSON.parse(JSON.stringify(rePassword));

        if(_password.trim() === "") {
            alert("Parola boş olamaz.");
            return false;
        }

        if(_userName.trim() === "") {
            alert("Kullanıcı adı boş olamaz.");
            return false;
        }

        if(_fullName.trim() === "") {
            alert("Tam ad boş olamaz.");
            return false;
        }

        if(_password.trim() !== _rePassword.trim()) {
            alert("Lütfen parola tekrarı ile parolayı eşit giriniz.");
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

        if(_fullName.trim().length > 100 || _fullName.trim().length < 4) {
            alert("Tam ad uzunluğu 4 ile 100 arasındda olmalıdır.");
            return false;
        }

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
                fullName: _fullName,
                userName: _userName,
                password: md5(_password)
            },
            fetchPolicy: "no-cache"
        }).then(e => {
            const response = e.data.signup;
            if(response.code === 200) {
                alert(response.message);
                history.push("/dashboard/signin");
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
                        marginBottom: spaces.content * 2,
                        color: colors.body
                    }}
                >
                    Signup
                </div>
                <TextInput
                    placeholder="Username"
                    value={userName}
                    onChange={e => setUserName(e)}
                    referance={userNameRef}
                    onKeyUp={e => e.keyCode === 13 ? fullNameRef.current.focus() : null}
                    style={{
                        marginBottom: spaces.content * 1.5
                    }}
                />
                <TextInput
                    placeholder="Fullname"
                    value={fullName}
                    onChange={e => setFullName(e)}
                    referance={fullNameRef}
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
                    onKeyUp={e => e.keyCode === 13 ? rePasswordRef.current.focus() : null}
                    style={{
                        marginBottom: spaces.content * 1.5
                    }}
                />
                <TextInput
                    placeholder="Re-Password"
                    type="password"
                    value={rePassword}
                    referance={rePasswordRef}
                    onChange={e => setRePassword(e)}
                    onKeyUp={e => e.keyCode === 13 ? register() : null}
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