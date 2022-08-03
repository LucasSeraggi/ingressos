import { Notify } from "quasar";
import Api from "./Api";

export default {
    async loginUser(user) {
      try {
       const response = await Api().post('/login', user);
       const { token } = response.data;

       localStorage.setItem('jwt', token);

       if (token) {
        Notify.create({
          message: 'Bem vindo!',
          color: 'positive',
          icon: 'check'
        })
       }
      } catch (err) {
        console.log(err.message)
        Notify.create({
          message: 'Erro ao fazer o login do usuário!',
          color: 'negative',
          icon: 'warning'
        })
      }
    },
  };