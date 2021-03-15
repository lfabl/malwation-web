import {
    active,
    hover 
} from "../../theme/helpers";

const stylesheet = {
    container: {
        fontFamily: "'Exo 2', sans-serif",
        justifyContent: "center",
        alignItems: "center",
        userSelect: "none",
        display: "flex",
        outline: "none",
        border: "none",
        fontSize: 18,
        "&:hover": {
            ...hover
        },
        "&:active": {
            ...active
        }
    }
};
export default stylesheet;