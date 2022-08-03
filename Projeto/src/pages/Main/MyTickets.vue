<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar class="bg-purple text-white shadow-2 rounded-borders">
        <q-avatar >
          <img src="../../assets/ticket.png" />
        </q-avatar>
        <q-toolbar-title>
          Meus Ingressos
        </q-toolbar-title>

        <q-btn
          flat
          dense
          round
          icon="logout"
          aria-label="logout"
          @click="logOut"
        />
      </q-toolbar>
    </q-header>
   <q-page class="row flex-center padding-top">
     <div class="flex-row">
       <div class="flex-col" v-for="(ticket, index) in tickets" :key="ticket.id">
         <q-card class="card" @click="() => navigate(ticket, index)">
           <img :src="parseImg(ticket.imgPath)" class="img"/>
           <div class="column flex-center padding-top3">
              <span>{{ticket.name}}</span>
           </div>
         </q-card>
       </div>
     </div>
   </q-page>

   <q-page-sticky position="bottom-left" :offset="[18, 18]">
    <q-btn
      outline
      round
      color="purple"
      icon="undo"
      @click="goBack"
    >
      <q-tooltip anchor="right" self="right">
        <strong>Voltar</strong>
      </q-tooltip>
    </q-btn>
   </q-page-sticky>
  </q-layout>

  <q-dialog v-model="showTicketDetails">
    <q-card style="width: 410px">
      <q-card-section horizontal>
        <img :src="parseImg(ticketDetail.imgPath)" class="img-details" />
        <div class="column padding-top2 q-gutter-y-md">
          <span>Nome: {{ticketDetail.name}}</span>

          <span>Quantidade adquirida: {{reservationsDetail.quant}}</span>
        </div>
      </q-card-section>
      <q-card-actions align="around">
        <q-btn
          flat
          round
          size="20px"
          color="negative"
          icon="arrow_back"
          @click="close"
        />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>
<script>

import { computed, defineComponent, ref } from 'vue'
import VueJwtDecode from 'vue-jwt-decode';
import TicketApi from 'src/services/TicketApi';
import Notify from '../Notify';

const RockImg = require('src/assets/rock.png')
const JazzImg = require('src/assets/jazz.png')
const SertanejoImg = require('src/assets/sertanejo.png')
const PopImg = require('src/assets/pop.png')
const PartyImg = require('src/assets/party.png')
const MPBImg = require('src/assets/mpb.png')

export default defineComponent({
  name: 'MyTickets',

  data() {
    return {
      tickets: {},
      reservations: {},
      showTicketDetails: false,
      ticketDetail: null,
      reservationsDetail: null,
      user: {},
      // connection: '',
      loading: false,
    }
  },

  async created() {
    this.getUser();
  },

  methods: {
    navigate(ticket, index) {
      //this.$router.push()
      this.reservationsDetail = this.reservations[index]
      this.ticketDetail = ticket
      this.showTicketDetails = true;
    },

    async reload() {
      this.tickets = await TicketApi.getAll();
    },

    close() {
      this.showTicketDetails = false;
      this.ticketDetail = null;
    },

    async getUser() {
      const token = localStorage.getItem('jwt');
      const tokenDecoded = VueJwtDecode.decode(token);
      this.user = tokenDecoded;
      const teste = await TicketApi.getMyTickets(this.user._id);
      this.tickets = teste.tickets;
      this.reservations = teste.reservations
      console.log(this.tickets)
    },

    goBack() {
      this.$router.push("/main");
    },

    parseImg(ImgPath) {
      if (ImgPath === 'rock') {
        return RockImg
      }
      if (ImgPath === 'jazz') {
        return JazzImg
      }
      if (ImgPath === 'sertanejo') {
        return SertanejoImg
      }
      if (ImgPath === 'pop') {
        return PopImg
      }
      if (ImgPath === 'party') {
        return PartyImg
      }
      if (ImgPath === 'mpb') {
        return MPBImg
      }
      return 'https://cdn.quasar.dev/img/mountains.jpg'
    },

    logOut() {
      localStorage.removeItem('jwt');
      this.$router.push("/");
      Notify.Success('Sessão encerrada!')
    },
  },

  watch: {
  }
})
</script>

<style lang="sass" scoped>
.flex
  flex: 1
.flex-row
  display: flex
  flex-direction: row
  flex-wrap: wrap
  justify-content: center
  gap: 20px 80px
.flex-col
  display: flex
  flex-direction: column
  align-items: center
  cursor: pointer
.card
  width: 200px
  height: 200px
  margin: 10px 0 15px 0
.img
  height: 150px
  width: 200px
  object-fit: cover
.img-details
  width: 200px
  height: 200px
  margin: 10px 10px 10px 10px
.padding-top
  margin: 80px 0 0 0
.padding-top3
  margin: 15px 0 0 0
.padding-top2
  margin: 30px 0 0 20px
</style>