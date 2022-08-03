<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar class="bg-purple text-white shadow-2 rounded-borders">
        <q-avatar >
          <img src="../../assets/ticket.png" />
        </q-avatar>
        <q-toolbar-title>
          Ingressos
        </q-toolbar-title>

      </q-toolbar>
    </q-header>

    <q-page class="row flex-center body">
    <q-page class="column flex-center">
    <!--<h4 style="margin-top: 150px">Realize o Login</h4>-->
    <img src="../../assets/ticket.png" style="margin-top: 10px">
    <h4 style="margin-top: 5px">Login</h4>
       <q-input style="margin-top: 5px; width: 230px;" rounded outlined v-model="email" type="email" label="Email" />
        <q-input style="margin-top: 20px; width: 230px;" rounded outlined :type="isPwd ? 'password' : 'text'" v-model="password" label="Senha">
          <template v-slot:append>
            <q-icon
              :name="isPwd ? 'visibility_off' : 'visibility'"
              class="cursor-pointer"
              @click="isPwd = !isPwd"
            />
          </template>
        </q-input>
        <div class="row" style="padding-top: 20px" >
        <q-btn style="margin-top: 10px; width: 100px" color="green" label="Login" @click="SignIn" />
         <q-btn outline style="margin-top: 10px; width: 100px; margin-left: 33px" color="purple" label="Cadastrar" @click="Register" />
    </div>
    </q-page>
    </q-page>
  </q-layout>
</template>

<script>
import { defineComponent, ref } from 'vue'
import LoginApi from 'src/services/LoginApi'
import Notify from '../Notify'

export default defineComponent({
  name: 'LoginPage',

  data() {
    return {
      isPwd: true,
      password: '',
      email: '',
    }
  },

  methods: {
    async SignIn() {
      if (this.email === '') {
        Notify.Error('Deve colocar o email!')
        return
      }
      if (this.password === '') {
        Notify.Error('Deve colocar a senha!')
        return
      }

      try {
        const LoginForm = {
          email: this.email,
          password: this.password
        }

        await LoginApi.loginUser(LoginForm);
        this.$router.push('main');
      } catch (err) {
        Notify.Error('Algo deu errado no login!')
        console.log(err)
      }
    },

    Register() {
      this.$router.push("register")
    },
  },

})
</script>
