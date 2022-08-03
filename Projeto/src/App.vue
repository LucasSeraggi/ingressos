<template>
  <router-view />
</template>

<script>
import { defineComponent } from 'vue';
// window.socket = new WebSocket("ws://localhost:3000/");
export default defineComponent({
  name: 'App',
})
</script>
