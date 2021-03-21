export const MENU = [
    {
        "title": "Home",
        "url": "/"
    },
    {
        "title": "Dashboard",
        "url": "/dashboard"
    }
];

export const DEFAULT_GLOBAL_STATE = {
    userData: {
    }
};

export const USER_NAME_REGEX = /^(?=[a-zA-Z0-9._]{8,20}$)(?!.*[_.]{2})[^_.].*[^_.]$/;