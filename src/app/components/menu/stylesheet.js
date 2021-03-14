const stylesheet = {
    container: {
        fontFamily: "'Exo 2', sans-serif",
        alignItems: "center",
        display: "flex",
        fontSize: 20
    },
    item: {
        "&:hover": {
            cursor: "pointer"
        },
        "&:active": {
            transform: "translateY(2px)"
        }
    }
};
export default stylesheet;