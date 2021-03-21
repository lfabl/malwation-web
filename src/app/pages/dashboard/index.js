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
    client
} from '../../api';
import {
    gql
} from '@apollo/client';

const Dashboard = ({
    history
}) => {
    const [globalState, setGlobalState] = useGlobalState();

    useEffect(() => {
        const token = localStorage.getItem('token');
        if(token && !globalState.userData.login) {
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
                    token
                },
                fetchPolicy: "no-cache"
            }).then(e => {
                const response = e.data.tokenControl;
                if(response.code === 200) {
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
                    history.push("/dashboard/signin");
                    localStorage.removeItem('token');
                }
            }).catch(e => {
                if(e.message) {
                    alert(e.message);
                    history.push("/dashboard/signin");
                } else {
                    alert(e);
                    history.push("/dashboard/signin");
                }
                localStorage.removeItem('token');
            });
        } else {
            if(globalState.userData && globalState.userData.login) {
                history.push("/dashboard/main");
            } else if(window.location.pathname.indexOf("/signup") === -1) {
                history.push("/dashboard/signin");
            }
        }
    }, [globalState.userData]);

    return <DashboardNavigation/>;
};
export default Dashboard;