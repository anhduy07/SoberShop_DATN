import { ENDPOINT } from 'constants/global';
import axiosClient from './axiosClient';

const authApi = {
    confirm: () => {

        return axiosClient.get(ENDPOINT.auth.confirm);
    },
    getAccessToken: (userForm) => {

        return axiosClient.post(ENDPOINT.auth.getAccessToken, userForm);
    },
    login: (userForm) => {

        return axiosClient.post(ENDPOINT.auth.login, userForm);
    },
    register: (userForm) => {

        return axiosClient.post(ENDPOINT.auth.register, userForm);
    },
    updateInfor: (userForm) => {

        return axiosClient.put(ENDPOINT.auth.updateInfor, userForm);
    },
    changePassword: (userForm) => {

        return axiosClient.put(ENDPOINT.auth.changePassword, userForm);
    },
    logout: () => {
        
        return axiosClient.get(ENDPOINT.auth.logout);
    },
    forgetPassword: (userForm) => {

        return axiosClient.post(ENDPOINT.auth.forgetPassword, userForm);
    },
    resetPassword: (resetToken, userForm) => {
        const url = `${ENDPOINT.auth.resetPassword}/${resetToken}`;

        return axiosClient.put(url, userForm);
    }
    
};

export default authApi;
