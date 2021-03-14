import React, {
    useEffect
} from 'react';
import Context, {
    useTheme
} from './context';
import GenerateThemeColors from './theme/colors';

const CoreAutoPatcher = ({
    children
}) => {
    const [theme, setTheme] = useTheme();
    useEffect(() => {
        setTheme({
            colors: GenerateThemeColors(theme.value)
        });
    }, [theme.value]);

    return children;
};

const Core = ({
    children
}) => {
    return <Context>
        <CoreAutoPatcher>
            {children}
        </CoreAutoPatcher>
    </Context>;
};
export default Core;