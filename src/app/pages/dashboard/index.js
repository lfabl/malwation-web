import React, {
    useEffect 
} from 'react';
import {
    DashboardNavigation
} from '../../navigation';
import {
    useGlobalState
} from '../../context';
import {
    setClient,
    client
} from '../../api';
import {
    createHttpLink,
    InMemoryCache,
    ApolloClient,
    gql
} from '@apollo/client';
import {
    setContext
} from '@apollo/client/link/context';
import {
    API_URL 
} from '../../constants/url';

const Dashboard = ({
    history
}) => {
    const [globalState, setGlobalState] = useGlobalState();

    useEffect(() => {
        const token = localStorage.getItem('token');
        if(token) {
            client.query({
                query: gql`
                    query tokenControl(
                        $token: String!
                    ) {
                        tokenControl(
                            token: $token
                        ) {
                            message,
                            code,
                            userName
                        }
                    }
                `,
                variables: {
                    token: token
                },
                fetchPolicy: "no-cache"
            }).then(e => {
                const response = e.data.tokenControl;
                if(response.code === 200) {
                    const authLink = setContext((_, {
                        headers 
                    }) => {
                        return {
                            headers: {
                                ...headers,
                                authorization: token
                            }
                        };
                    });
                    const httpLink = createHttpLink({
                        uri: API_URL
                    });
                    setClient(new ApolloClient({
                        link: authLink.concat(httpLink),
                        cache: new InMemoryCache()
                    }));
                    setGlobalState({
                        userData: {
                            login: true,
                            userName: response.userName,
                            token: token,
                            reLogin: true
                        }
                    });
                } else {
                    alert(response.message);
                    setGlobalState({
                        userData: {
                            login: false,
                            userName: null,
                            token: null,
                            reLogin: false
                        }
                    });
                }
            }).catch(e => {
                if(e.message) {
                    alert(e.message);
                    setGlobalState({
                        userData: {
                            login: false,
                            userName: null,
                            token: null,
                            reLogin: false
                        }
                    });
                } else {
                    alert(e);
                    setGlobalState({
                        userData: {
                            login: false,
                            userName: null,
                            token: null,
                            reLogin: false
                        }
                    });
                }
            });
        }
    }, []);

    useEffect(() => {
        if(globalState.userData && globalState.userData.login) {
            history.push("/dashboard/main");
        } else if(window.location.pathname.indexOf("/signup") === -1) {
            history.push("/dashboard/signin");
            localStorage.removeItem('token');
        }
    }, [globalState.userData]);

    return <DashboardNavigation/>;
};
export default Dashboard;