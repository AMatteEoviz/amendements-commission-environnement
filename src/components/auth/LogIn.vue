<script setup>
import { ref } from 'vue'
import { supabase } from '../../supabase'
import SignIn from './SignIn.vue'

const email = ref('')
const password = ref('')
const loading = ref(false)
const error = ref('')
const SignMod = ref(false)

async function logIn() {
  error.value = ''
  loading.value = true

  try {
    const { error: loginError } =
      await supabase.auth.signInWithPassword({
        email: email.value.trim(),
        password: password.value
      })

    if (loginError) {
      error.value = loginError.message
    }
  } finally {
    loading.value = false
  }
}
</script>

<template>

  <div v-show="!SignMod">
    <section class="auth-container">
        <h1>Connexion</h1>

      <form @submit.prevent="logIn">
        <div>
          <label for="email">Email</label>

          <input
            id="email"
            v-model="email"
            type="email"
            autocomplete="email"
            required
          />
        </div>

        <div>
          <label for="password">Mot de passe</label>

          <input
            id="password"
            v-model="password"
            type="password"
            autocomplete="current-password"
            required
          />
        </div>

        <p v-if="error" class="error">
          {{ error }}
        </p>

        <button
          type="submit"
          :disabled="loading"
        >
          {{ loading ? 'Connexion...' : 'Se connecter' }}
        </button>
      </form>
          <button @click.prevent="SignMod=true">Créer mon compte</button>

    </section>
  </div>

  <div v-show="SignMod">
      <SignIn @close="SignMod = false"/>
  </div>
</template>


<style scoped>
  .auth-container {
    width: min(150vw, 400px);
    aspect-ratio: 1 / 1;
    margin: 0 auto;
    padding: 2rem;
    box-sizing: border-box;
  }
</style>