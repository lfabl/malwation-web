import React, {
    useEffect 
} from 'react';
import {
    DashboardNavigation
} from '../../navigation';
import {
    useGlobalState
} from '../../context';

const Dashboard = ({
    history
}) => {
    const [globalState, setGlobalState] = useGlobalState();

    useEffect(() => {
        if(globalState.userData && globalState.userData.login) {
            history.push("/dashboard/main");
        } else {
            history.push("/dashboard/signin");
        }
    }, [globalState.userData]);

    return <DashboardNavigation/>;
};
export default Dashboard;