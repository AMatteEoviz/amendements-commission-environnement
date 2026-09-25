<script setup>

import { onMounted, ref } from 'vue';

import scenarioContainer from './components/ScenarioContainer.vue';
import Header from './components/header.vue';

// Gestion de la session
import { useAuth } from './composables/useAuth.js';
import SignIn from './components/auth/SignIn.vue'

const {
  session,
  loading,
  init
} = useAuth()

onMounted(async () => {

  await init()

})

</script>

<template>
  <Header />
  <div v-if="loading">
    <div class="spinner primary"></div>  
  </div>
  <div v-else-if="session">
    <scenarioContainer />
  </div>
  <div v-else>
    <SignIn />
  </div>

</template>