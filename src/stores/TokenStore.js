import {defineStore} from "pinia";

export const useTokenStore = defineStore('token',{
    state: () => ({ accessToken: '' }),
    getters: {
        accessToken: (state) => state.accessToken(),
    },
    actions: {
        setAccessToken(value) {
            this.accessToken = value;
        },
    }
})