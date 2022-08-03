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
       <div class="flex-col" v-for="ticket in tickets" :key="ticket.id">
         <q-card class="card" @click="() => navigate(ticket)">
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
      icon="event_available"
      @click="myTickets"
    >
      <q-tooltip anchor="center right" self="center left">
        <strong>Meus Tickets</strong>
      </q-tooltip>
    </q-btn>
   </q-page-sticky>

   <q-page-sticky position="bottom-right" :offset="[18, 18]">
    <q-btn
      outline
      round
      color="purple"
      icon="add"
      @click="openNewTicket"
    >
      <q-tooltip anchor="center left" self="center right">
        <strong>Adicionar Ticket</strong>
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

          <span>Ingressos restantes: {{ticketDetail.quantity}}</span>
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
        <q-btn
          flat
          round
          size="20px"
          color="positive"
          icon="confirmation_number"
          @click="openReservation()"
        >
        <q-tooltip anchor="top middle">Reservar</q-tooltip>
        </q-btn>
      </q-card-actions>
    </q-card>
  </q-dialog>

  <q-dialog v-model="showReservation">
    <q-card style="width: 410px">
      <q-card-section >
        <div class="column padding-top2 q-gutter-y-md">
          <span>Quantidade de ingressos desejada:</span>

          <q-input type="number" flat v-model.number="text" />
        </div>
      </q-card-section>
      <q-card-actions align="around">
        <q-btn
          flat
          round
          size="20px"
          color="negative"
          icon="arrow_back"
          @click="backToDialog"
        />
        <q-btn
          :disable="isSendable"
          :loading="loading"
          flat
          round
          size="20px"
          color="positive"
          icon="book_online"
          @click="updateTicket(ticketDetail)"
        >
        <q-tooltip anchor="top middle">Reservar</q-tooltip>
        </q-btn>
      </q-card-actions>
    </q-card>
  </q-dialog>

<q-dialog v-model="showNewTicket">
    <q-card style="width: 410px">
      <q-card-section >
        <div class="column padding-top4 q-gutter-y-md">
          <span>Novo Evento:</span>
          <q-input outlined v-model="TicketForm.name" label="Nome" />

          <q-input outlined type="number" label="Quantidade de ingressos" flat v-model.number="TicketForm.quantity" />
        </div>
      </q-card-section>
      <q-card-actions align="around">
        <q-btn
          flat
          round
          size="20px"
          color="negative"
          icon="arrow_back"
          @click="closeNewTicket"
        />
        <q-btn
          flat
          round
          size="20px"
          color="positive"
          icon="add_circle"
          @click="newTicket()"
        >
        <q-tooltip anchor="top middle">Adicionar</q-tooltip>
        </q-btn>
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>
<script>

import { computed, defineComponent, ref } from 'vue'
import VueJwtDecode from 'vue-jwt-decode';
import TicketApi from 'src/services/TicketApi';
import Notify from '../Notify';
import ApiT from 'src/services/ApiT';

const RockImg = require('src/assets/rock.png')
const JazzImg = require('src/assets/jazz.png')
const SertanejoImg = require('src/assets/sertanejo.png')
const PopImg = require('src/assets/pop.png')
const PartyImg = require('src/assets/party.png')
const MPBImg = require('src/assets/mpb.png')
// import { api } from '../api';
// import axios from "axios"

const TICKETS_ARRAY = [
  {
    id: 1,
    name: "Show de Rock",
    quantity: 50,
    imgPath: RockImg,
  },
  {
    id: 2,
    name: "Show de Jazz",
    quantity: 35,
    imgPath: JazzImg,
  },
  {
    id: 3,
    name: "Show de Pop",
    quantity: 42,
    imgPath: PopImg,
  },
  {
    id: 4,
    name: "Festa",
    quantity: 33,
    imgPath: PartyImg,
  },
  {
    id: 5,
    name: "Show de MPB",
    quantity: 19,
    imgPath: MPBImg,
  },
  {
    id: 6,
    name: "Show de Sertanejo",
    quantity: 27,
    imgPath: SertanejoImg,
  },
]

export default defineComponent({
  name: 'MainPage',

  data() {
    return {
      tickets: {},
      showTicketDetails: false,
      showReservation: false,
      showNewTicket: false,
      ticketDetail: null,
      user: {},
      text: 0,
      TicketForm: {
        name: '',
        quantity: 0,
        status: 'available',
        imgPath: ''
      },
      loading: false,
      isSendable: true
    }
  },

  async created() {
    this.getUser();
    this.tickets = await TicketApi.getAll();
    // console.log(this.tickets)
  },

  methods: {
    navigate(ticket) {
      //this.$router.push()
      this.ticketDetail = ticket
      this.showTicketDetails = true;
    },

    async updateTicket(ticket) {
      if (ticket.quantity - Number(this.text) < 0) {
        Notify.Error('Quantidade selecionada de tickets maior que o disponível')
        return
      }
      this.loading = true
      await TicketApi.bookTicket(ticket, { quant :Number(this.text) }, { user: this.user });
      this.loading = false
      this.reload();
      this.showReservation = false;
      this.close();
      this.text = 0;
    },

    async reload() {
      this.tickets = await TicketApi.getAll();
    },

    close() {
      this.showTicketDetails = false;
      this.ticketDetail = null;
    },

    backToDialog() {
      this.text = 0
      this.showReservation = false;
      this.showTicketDetails = true;
    },

    openReservation() {
      this.showTicketDetails = false;
      this.showReservation = true;
    },

    getUser() {
      const token = localStorage.getItem('jwt');
      const tokenDecoded = VueJwtDecode.decode(token);
      this.user = tokenDecoded;
    },

    async newTicket() {
      console.log(this.TicketForm)
      await TicketApi.createNewTicket(this.TicketForm);
      this.reload();
      this.closeNewTicket();
    },

    openNewTicket() {
      this.showNewTicket = true
    },

    closeNewTicket() {
      this.showNewTicket = false
      this.TicketForm.name = ''
      this.TicketForm.quantity = 0
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

    myTickets() {
      this.$router.push("/mytickets");
    },

    logOut() {
      localStorage.removeItem('jwt');
      this.$router.push("/");
      Notify.Success('Sessão encerrada!')
    },
  },

  watch: {
    text: function(newValue, oldValue) {
      if(newValue !== 0 && newValue > 0 && typeof newValue == 'number') {
        this.isSendable = false
      } else {
        this.isSendable = true
      }
    }
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
.padding-top4
  margin: 30px 0 0 0px
</style>