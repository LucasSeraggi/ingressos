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
    <q-page class="column">
    <h4 style="margin-top: 100px">Realize o Cadastro</h4>
       <q-input style="margin-top: 10px" rounded outlined v-model="name" label="Nome" />
       <!--<q-select
        label="Sexo"
        transition-show="jump-up"
        transition-hide="jump-up"
        rounded outlined
        v-model="gender"
        :options="options"
        style="margin-top: 10px"
      />-->
       <q-input style="margin-top: 10px" rounded outlined v-model="email" type="email" label="Email" />
       <!--<q-input style="margin-top: 10px" rounded outlined v-model="cpf" mask="###.###.###-##" label="CPF" />
       <q-input style="margin-top: 10px" rounded outlined v-model="tel" type="tel" mask="(###) ##### - ####" label="Telefone" />
       <q-input rounded outlined label="Data de Nascimento" v-model="date" mask="date" :rules="['date']" style="margin-top: 10px">
        <template v-slot:append>
         <q-icon name="event" class="cursor-pointer">
          <q-popup-proxy cover transition-show="scale" transition-hide="scale">
            <q-date v-model="date">
              <div class="row items-center justify-end">
                <q-btn v-close-popup label="Close" color="primary" flat />
              </div>
            </q-date>
           </q-popup-proxy>
          </q-icon>
         </template>
        </q-input>-->
        <q-input style="margin-top: 10px"  rounded outlined :type="isPwd ? 'password' : 'text'" v-model="password" label="Senha">
          <template v-slot:append>
            <q-icon
              :name="isPwd ? 'visibility_off' : 'visibility'"
              class="cursor-pointer"
              @click="isPwd = !isPwd"
            />
          </template>
        </q-input>
        <div class="row" style="padding-top: 15px">
        <q-btn outline style="margin-top: 10px; width: 100px" color="secondary" label="Voltar" @click="GoBack"/>
         <q-btn style="margin-top: 10px; width: 100px; margin-left: 88px" color="purple" label="Cadastrar" @click="RegisterB" />
     </div>
    </q-page>
    </q-page>
  </q-layout>
</template>

<script>
import { defineComponent, ref } from 'vue'
import RegisterApi from 'src/services/RegisterApi';
import Notify from '../Notify';

export default defineComponent({
  name: 'RegisterPage',

  data() {
    return {
      isPwd: true,
      password: '',
      name: '',
      email: '',
      /*cpf: null,
      tel: null,
      date: new Date,
      gender: null,
      options: [
        'Masculino', 'Feminino', 'Outro'
      ]*/
    }
  },

  methods: {
    async RegisterB() {
      // this.$router.push("main");
      if (this.name === '') {
        Notify.Error('Deve colocar o nome!')
        return
      }
      if (this.email === '') {
        Notify.Error('Deve colocar o nome!')
        return
      }
      if (this.password === '') {
        Notify.Error('Deve colocar o nome!')
        return
      }

      try {
        const RegisterForm = {
          name: this.name,
          email: this.email,
          password: this.password
        }

        await RegisterApi.registerNewUser(RegisterForm);
        this.$router.push('/');
      } catch (err) {
        Notify.Error('Algo deu errado no cadastro de usuário!')
        console.log(err)
      }
    },

    GoBack() {
      this.$router.push("/");
    }
  },

})
</script>
