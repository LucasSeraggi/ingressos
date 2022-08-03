import { Notify } from "quasar";
import Api from "./Api";

export default {
    async registerNewUser(newUser) {
      try {
        const response = await Api().post('/register', newUser);
        const { token } = response.data;
  
        if (token) {
          localStorage.setItem('jwt', token);
          Notify.create({
            message: 'Usuário cadastrado com sucesso!',
            color: 'positive',
            icon: 'check'
          })
        }
      } catch (err) {
        console.log(err.message)
        Notify.create({
          message: 'Erro ao cadastrar usuário!',
          color: 'negative',
          icon: 'warning'
        })
      }
    },
  };