import React from 'react';
import {
    useGlobalState
} from '../../../../context';

const Main = ({
}) => {
    const [globalState, setGlobalState] = useGlobalState();

    return <div>
        Main page. {globalState.userData.login ? "true" : "false"}
    </div>;
};
export default Main;