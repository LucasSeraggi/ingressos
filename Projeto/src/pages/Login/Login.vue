<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar>
        <q-btn
          flat
          dense
          round
          icon="menu"
          aria-label="Menu"
        />

        <q-toolbar-title>
          Ingressos
        </q-toolbar-title>

      </q-toolbar>
    </q-header>

    <q-page class="row flex-center body">
    <q-page class="column fle-center">
    <h4 style="margin-top: 150px">Realize o Login</h4>
       <q-input style="margin-top: 10px" rounded outlined v-model="name" label="Nome" />
        <q-input style="margin-top: 10px" rounded outlined :type="isPwd ? 'password' : 'text'" v-model="password" label="Senha">
          <template v-slot:append>
            <q-icon
              :name="isPwd ? 'visibility_off' : 'visibility'"
              class="cursor-pointer"
              @click="isPwd = !isPwd"
            />
          </template>
        </q-input>
        <q-btn style="margin-top: 10px; width: 100px; margin-left: 66px" color="primary" label="Login" @click="SignIn" />
    </q-page>
    </q-page>
  </q-layout>
</template>

<script>
import { defineComponent, ref } from 'vue'


export default defineComponent({
  name: 'LoginPage',

  data() {
    return {
      isPwd: true,
      password: '',
      name: '',
    }
  },

  methods: {
    SignIn() {
      this.$router.push("main");
      /*if (this.name !== '' && this.password !== '') {
        // verifica os dados, se correto avança, senão manda mensagem de erro
      }*/
    },
  },

})
</script>
