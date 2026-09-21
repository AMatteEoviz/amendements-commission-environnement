<script setup>

import { onMounted, ref } from 'vue';
import { getFromSupabase } from './supabase.js';

import scenarioContainer from './components/ScenarioContainer.vue';
import blablaDeGaucho from './components/blablaDeGaucho.vue';

// Gestion de la session
import { useAuth } from './composables/useAuth.js';
import LogIn from './components/auth/LogIn.vue'
import sessionManager from './components/auth/sessionManager.vue';

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
  <blablaDeGaucho />
  <div v-if="loading">
    <div class="spinner primary"></div>  
  </div>
  <div v-else-if="session">
    <scenarioContainer />
    <sessionManager />

  </div>
  <div v-else>
    <LogIn />
  </div>

</template>