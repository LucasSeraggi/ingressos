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
   <q-page class="row flex-center padding-top">
     <div class="flex-row">
       <div class="flex-col" v-for="ticket in tickets" :key="ticket.id">
         <q-card class="card" @click="() => navigate(ticket)">
           <img :src="ticket.imgPath" class="img"/>
           <div class="column flex-center">
              <span>{{ticket.name}}</span>
           </div>
         </q-card>
       </div>
     </div>
   </q-page>
  </q-layout>

  <q-dialog v-model="showTicketDetails">
    <q-card style="width: 410px">
      <q-card-section horizontal>
        <img :src="ticketDetail.imgPath" class="img-details" />
        <div class="column padding-top2 q-gutter-y-md">
          <span>Nome: {{ticketDetail.name}}</span>
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

const TICKETS_ARRAY = [
  {
    id: 1,
    name: "Show de Rock",
    imgPath: "https://cdn.quasar.dev/img/mountains.jpg",
  },
  {
    id: 2,
    name: "Show de Jazz",
    imgPath: "https://cdn.quasar.dev/img/mountains.jpg",
  },
  {
    id: 3,
    name: "Show de Pop",
    imgPath: "https://cdn.quasar.dev/img/mountains.jpg",
  },
  {
    id: 4,
    name: "Festa",
    imgPath: "https://cdn.quasar.dev/img/mountains.jpg",
  },
  {
    id: 5,
    name: "Show de Metal",
    imgPath: "https://cdn.quasar.dev/img/mountains.jpg",
  },
  {
    id: 6,
    name: "Show de MPB",
    imgPath: "https://cdn.quasar.dev/img/mountains.jpg",
  },
]

export default defineComponent({
  name: 'MainPage',

  data() {
    return {
      showTicketDetails: false,
      ticketDetail: null,
    }
  },

  computed: {
    tickets() {
      return TICKETS_ARRAY;
    },
  },

  methods: {
    navigate(ticket) {
      //this.$router.push()
      this.ticketDetail = ticket
      this.showTicketDetails = true;
    },

    close() {
      this.showTicketDetails = false;
      this.ticketDetail = null;
    },
  },
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
.padding-top2
  margin: 30px 0 0 20px
</style>