import {
    focus
} from '../../theme/helpers';

const stylesheet = {
    container: {
        fontFamily: "'Exo 2', sans-serif",
        borderStyle: "solid",
        userSelect: "none",
        outline: "none",
        fontWeight: 400,
        fontSize: 20,
        "&:focus": {
            ...focus
        }
    }
};
export default stylesheet;