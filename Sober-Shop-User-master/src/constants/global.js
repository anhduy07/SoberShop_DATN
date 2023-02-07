export const PRODUCT_CATEGORY = [
    {
        name: "Red Hoodie",
        sale: "10",
        sold: "76",
        price: "300000",
        finalPrice: "260000",
        img: "https://demo.uix.store/sober/wp-content/uploads/sites/2/2016/07/1-2-253x300.jpg",
        img2: "https://demo.uix.store/sober/wp-content/uploads/sites/2/2016/07/2-2-433x516.jpg",
        comment: "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.",
        des: "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat accusantium doloremque laudantium."
    },
    {
        name: "Red Hoodie",
        sale: "10",
        sold: "76",
        price: "300000",
        finalPrice: "260000",
        img: "https://demo.uix.store/sober/wp-content/uploads/sites/2/2016/07/1-2-253x300.jpg",
        img2: "https://demo.uix.store/sober/wp-content/uploads/sites/2/2016/07/2-2-433x516.jpg",
        comment: "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.",
        des: "A dress is a garment traditionally worn by women or girls consisting of a skirt with an attached bodice It consists of a top piece that covers the torso and hangs"
    },
    {
        name: "Red Hoodie",
        sale: "10",
        sold: "76",
        price: "300000",
        finalPrice: "260000",
        img: "https://demo.uix.store/sober/wp-content/uploads/sites/2/2016/07/1-2-253x300.jpg",
        img2: "https://demo.uix.store/sober/wp-content/uploads/sites/2/2016/07/2-2-433x516.jpg",
        comment: "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.",
        des: "A dress is a garment traditionally worn by women or girls consisting of a skirt with an attached bodice It consists of a top piece that covers the torso and hangs"
    },
    {
        name: "Red Hoodie",
        sale: "10",
        sold: "76",
        price: "300000",
        finalPrice: "260000",
        img: "https://demo.uix.store/sober/wp-content/uploads/sites/2/2016/07/1-2-253x300.jpg",
        img2: "https://demo.uix.store/sober/wp-content/uploads/sites/2/2016/07/2-2-433x516.jpg",
        comment: "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.",
        des: "A dress is a garment traditionally worn by women or girls consisting of a skirt with an attached bodice It consists of a top piece that covers the torso and hangs"
    },
    {
        name: "Red Hoodie",
        sale: "10",
        sold: "76",
        price: "300000",
        finalPrice: "260000",
        img: "https://demo.uix.store/sober/wp-content/uploads/sites/2/2016/07/1-2-253x300.jpg",
        img2: "https://demo.uix.store/sober/wp-content/uploads/sites/2/2016/07/2-2-433x516.jpg",
        comment: "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.",
        des: "A dress is a garment traditionally worn by women or girls consisting of a skirt with an attached bodice It consists of a top piece that covers the torso and hangs"
    },
];

export const ENDPOINT = {
    auth: {
        login: '/auth/login',
        register: '/auth/register',
        confirm: '/auth',
        updateInfor: '/auth',
        changePassword: '/auth/password',
        getAccessToken: '/auth/token',
        logout: '/auth/logout',
        forgetPassword: '/auth/forget-password',
        resetPassword: '/auth/reset-password', // /auth/reset-password/:resetToken
    },
    order: {
        addOrder: '/order',
        getOrderUser: '/order/user',
        getOrderAdmin: '/order/admin',
        getOrder: '/order', // /order/:id
    },
    cart: {
        add: '/cart',
        getAll: '/cart',
        getCount: '/cart/count',
        updateMany: '/cart',
        delete: '/cart'
    },
    favouriteProduct: {
        add: '/favouriteProduct',
        getAll: '/favouriteProduct',
        delete: '/favouriteProduct'
    },
    product: {
        show: '/product', // /product/:id,

    },

};

export const LOCAL_STORAGE = {
    accessToken: 'x-token',
    refreshToken: 'x-refresh-token',

};

export const DEFAULT_PAGE = 1;
export const LIMIT = 12;
export const CURRENCY = {
    USD: "USD"
}

export const PAYMENT_METHOD_TYPE = {
    onDelivery: "Payment on delivery",
    paypal: "Paypal"
}