<script setup>
import { ref } from 'vue'
import { supabase } from '../../supabase.js'

const error = ref('')
const loadingAnon = ref(false)

async function anonVisit() {
  error.value = ''
  loadingAnon.value = true

  try {
    const {
      data: { session }
    } = await supabase.auth.getSession()

    if (session) {
      return
    }

    const { error: anonError } =
      await supabase.auth.signInAnonymously()

    if (anonError) {
      error.value = 'Impossible de continuer sans connexion.'
      return
    }

    router.push('/')
  } finally {
    loadingAnon.value = false
  }
}

</script>

<template>
  <section class="auth-container">
    <button class="SignAnon primary" @click="anonVisit">Voir les amendements</button>
  </section>
</template>


<style scoped>
  .auth-container {
    margin-top: 5%;
    width: 100%;
    display: flex;
    justify-content: center;
  }

  .SignAnon:hover {
    cursor: pointer;
    color: #4dabf7;
  }
</style>

