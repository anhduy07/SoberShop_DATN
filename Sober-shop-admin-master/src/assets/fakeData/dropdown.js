import { Logout, Person, Settings, Shop, Warning } from "@mui/icons-material";

export const user_menu = [
    {
        icon: <Settings />,
        content: "Profile",
        route: "/profile"
    },
    {
        icon: <Logout />,
        content: "Logout",
        route: "/login"
    },
]

export const notice_menu = [
    {
        icon: <Warning />,
        content: "Curabitur id eros quis nunc suscipit blandit"
    },
    {
        icon: <Shop />,
        content: "Orders 2 products"
    },
    {
        icon: <Warning />,
        content: "In gravida mauris et nisi"
    },
    {
        icon: <Person />,
        content: "5 more new user"
    },
    
]