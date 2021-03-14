import React, {
    createContext,
    useReducer,
    useContext
} from 'react';
import {
    DEFAULT_TOKENS_STATE,
    DEFAULT_THEME_STATE
} from '../constants';

const ThemeContext = createContext(DEFAULT_THEME_STATE);
const ThemeContextDispatch = createContext(undefined);

const TokensContext = createContext(DEFAULT_TOKENS_STATE);
const TokensContextDispatch = createContext(undefined);

const Context = ({
    children
}) => {
    const [theme, setTheme] = useReducer((prev, next) => {
        return {
            ...prev,
            ...next
        };
    }, DEFAULT_THEME_STATE);
    const [tokens, setTokens] = useReducer((prev, next) => {
        return {
            ...prev,
            ...next
        };
    }, DEFAULT_TOKENS_STATE);

    return <ThemeContext.Provider
        value={theme}
    >
        <ThemeContextDispatch.Provider
            value={setTheme}
        >
            <TokensContext.Provider
                value={tokens}
            >
                <TokensContextDispatch.Provider
                    value={setTokens}
                >
                    {children}
                </TokensContextDispatch.Provider>
            </TokensContext.Provider>
        </ThemeContextDispatch.Provider>
    </ThemeContext.Provider>;
};

export const useTheme = () => [
    useContext(ThemeContext),
    useContext(ThemeContextDispatch)
];
export const useTokens = () => [
    useContext(TokensContext),
    useContext(TokensContextDispatch)
];
export default Context;