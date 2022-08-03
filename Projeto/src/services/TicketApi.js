import { Notify } from "quasar";
import ApiT from "./ApiT";

export default {
    async getAll() {
      try {
       const response = await ApiT().get('/findall');
  
       return response.data.tickets
      } catch (err) {
        console.log(err.message)
        Notify.create({
            message: 'Erro ao encontrar os tickets!',
            color: 'negative',
            icon: 'warning'
          })
      }
    },

    async bookTicket(ticket, quant, user) {
        try {
         console.log('aqui', ticket, quant, user.user)
         await ApiT().put('/book', { ticket, quant: quant.quant, user: user.user });
    
         await ApiT().post('reservation/new', { ticket, quant: quant.quant, user: user.user });

         Notify.create({
            message: 'Ticket reservado com sucesso!',
            color: 'positive',
            icon: 'check'
          })
        } catch (err) {
          console.log(err.message)
          Notify.create({
            message: 'Erro ao reservar o ticket!',
            color: 'negative',
            icon: 'warning'
          })
        }
    },

    async getMyTickets(id) {
        try {
         console.log('id', id)
         const response = await ApiT().post('reservation/findmy', { id: id });

         return response.data
        } catch (err) {
          console.log(err)
          Notify.create({
            message: 'Erro ao encontrar os ticket!',
            color: 'negative',
            icon: 'warning'
          })
        }
    },
    
    async createNewTicket(newTicket) {
        try {
          console.log(newTicket)
          await ApiT().post('/new', newTicket);
    
          Notify.create({
            message: 'Evento criado com sucesso!',
            color: 'positive',
            icon: 'check'
          })
        } catch (err) {
          console.log(err.message)
          Notify.create({
            message: 'Erro ao criar evento!',
            color: 'negative',
            icon: 'warning'
          })
        }
      },
  };