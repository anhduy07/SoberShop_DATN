export const ENDPOINT = {
    auth: {
        login: "/auth/login",
        register: "/auth/register",
        confirm: "/auth",
        updateInfo: "/auth",
        getAccessToken: "/auth/token",
    }
};

export const LOCAL_STORAGE = {
    accessToken: 'sober-admin-token',
    refreshToken: 'sober-admin-refresh-token',
};

export const ORDER_STATUS = [
    {
        value: "1",
        name: "Wait for confirmation"
    },
    {
        value: "2",
        name: "Confirmed"
    },
    {
        value: "3",
        name: "Delivering"
    },
    {
        value: "4",
        name: "Delivered"
    },
    {
        value: "0",
        name: "Cancel"
    },

]