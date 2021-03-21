import React, {
    useEffect,
    useState
} from 'react';
import injectSheet from 'react-jss';
import stylesheet from './stylesheet';
import {
    useTokens,
    useTheme
} from '../../../../core/context';
import {
    client
} from '../../../../api';
import {
    gql
} from '@apollo/client';
import {
    Pie 
} from 'react-chartjs-2';
import {
    useGlobalState
} from '../../../../context';

const Main = ({
    classes
}) => {
    const [globalState, setGlobalState] = useGlobalState();
    
    const [loading, setLoading] = useState(true);
    const [transactions, setTransactions] = useState([]);
    const [coins, setCoins] = useState([]);
    const [chartData, setChartData] = useState([]);
    const [userData, setUserData] = useState({
    });

    const [theme, setTheme] = useTheme();
    const [tokens, setTokens] = useTokens();

    const {
        colors
    } = theme;
    const {
        radiuses,
        borders,
        spaces
    } = tokens;

    useEffect(() => {
        if(transactions && transactions.length && coins && coins.length) {
            setLoading(false);
        }
    }, [transactions, coins]);

    useEffect(() => {
        if(globalState && globalState.userData && globalState.userData.login) {
            setTimeout(() => {
                client.query({
                    query: gql`
                        query {
                            home {
                                message,
                                code,
                                data {
                                    userData {
                                        id,
                                        fullName
                                    },
                                    transactions {
                                        id,
                                        walletID,
                                        count,
                                        buy
                                    },
                                    coins {
                                        id,
                                        name,
                                        shortName,
                                        total,
                                        saled
                                    }
                                }
                            }
                        }
                    `,
                    fetchPolicy: "no-cache"
                }).then(e => {
                    const response = e.data.home;
                    if(response.code === 200) {
                        const data = response.data;
                        let _transactions = JSON.parse(JSON.stringify(data.transactions));
                        let originalTransactionsData = {
                            labels: [],
                            datasets: [{
                                label: 'My Wallet',
                                data: [],
                                backgroundColor: [
                                    'rgba(255, 99, 132, 0.5)',
                                    'rgba(54, 162, 235, 0.5)',
                                    'rgba(255, 205, 86, 0.5)',
                                    'rgba(15, 100, 100, 0.5)'
                                ],
                                hoverOffset: 4
                            }]
                        };
                        _transactions.forEach(item => {
                            originalTransactionsData.labels.push(item.buy);
                            originalTransactionsData.datasets[0].data.push(item.count);
                        });
                        setChartData(originalTransactionsData);
                        setTransactions(data.transactions);
                        setUserData(data.userData);
                        setCoins(data.coins);
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
            }, 400);
        }
    }, [globalState.userData]);

    const logout = () => {
        localStorage.removeItem('token');
        setGlobalState({
            userData: {
                login: false,
                reLogin: false,
                token: null
            }
        });
    };

    const render = () => {
        return <div
            className={classes.renderContainer}
        >
            <div
                className={classes.header}
                style={{
                    padding: spaces.content
                }}
            >
                <span
                    className={classes.welcome}
                >
                    Welcome, {userData.fullName}!
                </span>
                <a
                    className={classes.logout}
                    style={{
                        marginLeft: spaces.content,
                        color: colors.primary
                    }}
                    onClick={() => logout()}
                >
                    Logout
                </a>
            </div>
            <div
                className={classes.content}
            >
                <div
                    className={classes.leftContainer}
                >
                    <div
                        className={classes.leftTable}
                    >
                        <div
                            className={classes.leftTableCell}
                            style={{
                                padding: spaces.container
                            }}
                        >
                            {
                                transactions.map((item, index) => {
                                    return <div
                                        key={"transaction-" + index}
                                        className={classes.transaction}
                                        style={{
                                            borderColor: colors.seperator,
                                            marginBottom: spaces.content,
                                            borderRadius: radiuses.card,
                                            borderWidth: borders.card,
                                            padding: spaces.content
                                        }}
                                    >
                                        <p
                                            style={{
                                                color: colors.primary
                                            }}
                                        >
                                            {item.buy}
                                        </p>
                                        <span>{item.count}</span>
                                    </div>;
                                })
                            }
                        </div>
                    </div>
                </div>
                <div
                    className={classes.rightContainer}
                >
                    <div
                        className={classes.rightTable}
                    >
                        <div
                            className={classes.rightTableCell}
                        >
                            <span
                                className={classes.walletTitle}
                                style={{
                                    marginBottom: spaces.content
                                }}
                            >
                                My Wallet
                            </span>
                            <Pie
                                data={chartData}
                                width={300}
                                options={{
                                    maintainAspectRatio: true
                                }}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>;
    };

    return <div
        className={classes.container}
        style={{
            color: colors.body
        }}
    >
        {
            loading ?
                <div
                    className={classes.loadingContainer}
                    style={{
                        padding: spaces.container
                    }}
                >
                    Loading...
                </div>
                :
                render()
        }
    </div>;
};
export default injectSheet(stylesheet)(Main);