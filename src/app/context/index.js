import React, {
    createContext,
    useReducer,
    useContext
} from 'react';
import {
    DEFAULT_GLOBAL_STATE
} from '../constants';

const GlobalContext = createContext(DEFAULT_GLOBAL_STATE);
const GlobalDispatchContext = createContext(undefined);

const ProjectContext = ({
    children
}) => {
    const [state, setState] = useReducer((prev, next) => {
        return {
            ...prev,
            ...next
        };
    }, DEFAULT_GLOBAL_STATE);

    return <GlobalContext.Provider
        value={state}
    >
        <GlobalDispatchContext.Provider
            value={setState}
        >
            {children}
        </GlobalDispatchContext.Provider>
    </GlobalContext.Provider>;
};

export const useGlobalState = () => [
    useContext(GlobalContext),
    useContext(GlobalDispatchContext)
];
export default ProjectContext;