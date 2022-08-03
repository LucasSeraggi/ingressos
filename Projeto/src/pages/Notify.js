import { Notify } from "quasar";

export default {
    async Success(message) {
        Notify.create({
          message: message,
          color: 'positive',
          icon: 'check'
        })
    },

    async Error(message) {
        Notify.create({
          message: message,
          color: 'negative',
          icon: 'warning'
        })
    },
};