import {
    active,
    hover
} from '../../../../core/theme/helpers';

const stylesheet = {
    "@global": {
        "main": {
            height: "100%",
            width: "100%"
        }
    },
    container: {
        height: "100%",
        width: "100%"
    },
    loadingContainer: {
        fontFamily: "'Exo 2', sans-serif",
        justifyContent: "center",
        alignItems: "center",
        userSelect: "none",
        display: "flex",
        fontSize: 22
    },
    content: {
        flexDirection: "row",
        display: "flex",
        height: "100%",
        width: "100%",
        "@media (max-width: 1000px)": {
            flexDirection: "column"
        },
    },
    leftContainer: {
        flexDirection: "column",
        overflow: "auto",
        display: "flex",
        height: "100%",
        width: "50%",
        "@media (max-width: 1000px)": {
            width: "100%"
        },
    },
    rightContainer: {
        justifyContent: "center",
        flexDirection: "column",
        alignItems: "center",
        display: "flex",
        height: "100%",
        width: "50%",
        "@media (max-width: 1000px)": {
            width: "100%"
        },
    },
    transaction: {
        fontFamily: "'Exo 2', sans-serif",
        justifyContent: "space-between",
        alignItems: "center",
        flexDirection: "row",
        borderStyle: "solid",
        userSelect: "none",
        display: "flex",
        fontSize: 18,
        "& span": {
            fontSize: 20
        }
    },
    walletTitle: {
        fontFamily: "'Exo 2', sans-serif",
        fontSize: 22
    },
    leftTable: {
        display: "table",
        height: "100%",
        width: "100%"
    },
    leftTableCell: {
        display: "table-cell",
        height: "100%",
        width: "100%"
    },
    rightTable: {
        display: "table",
        height: "100%",
        width: "100%"
    },
    rightTableCell: {
        justifyContent: "center",
        flexDirection: "column",
        alignItems: "center",
        display: "flex",
        height: "100%",
        width: "100%"
    },
    header: {

    },
    logout: {
        "&:hover": {
            ...hover
        },
        "&:active": {
            ...active
        }
    }
};
export default stylesheet;