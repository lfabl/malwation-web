const stylesheet = {
    container: {
        justifyContent: "center",
        display: "flex"
    },
    content: {
        borderStyle: "solid",
        width: "100%",
        maxWidth: 700
    },
    header: {
        justifyContent: "space-between",
        alignItems: "center",
        display: "flex"
    },
    backButton: {
        "&:hover": {
            cursor: "pointer"
        },
        "&:active": {
            transform: "translateY(2px)"
        }
    },
    pageContent: {
        justifyContent: "center",
        flexDirection: "column",
        alignItems: "center",
        display: "flex"
    },
    logo: {
    },
    title: {
        fontFamily: "'Exo 2', sans-serif",
        fontSize: 24
    }
};
export default stylesheet;