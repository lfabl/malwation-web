import {
    active,
    hover 
} from "../../theme/helpers";

const stylesheet = {
    container: {
        fontFamily: "'Exo 2', sans-serif",
        textDecoration: "none",
        userSelect: "none",
        "&:hover": {
            ...hover
        },
        "&:active": {
            ...active
        }
    }
};
export default stylesheet;