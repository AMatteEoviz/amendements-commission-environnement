<script setup>
import { ref } from 'vue'
import { supabase } from '../../supabase.js'

const email = ref('')
const loading = ref(false)
const error = ref('')
const success = ref(false)

async function signIn() {
  error.value = ''
  success.value = false

  if (!email.value) {
    error.value = 'Veuillez renseigner votre adresse email.'
    return
  }

  loading.value = true

  try {
    const { error: otpError } = await supabase.auth.signInWithOtp({
      email: email.value.trim(),
      options: {
        emailRedirectTo: window.location.origin
      }
    })

    if (otpError) {
      error.value = otpError.message
      return
    }

    success.value = true
  } finally {
    loading.value = false
  }
}

</script>

<template>
  <section class="auth-container">
    <h1>Se connecter</h1>

    <form @submit.prevent="signIn">
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

      <p v-if="error" class="error" style="color:red">
        {{ error }}
      </p>

      <p v-if="success" class="success">
        Un email de confirmation vient de vous être envoyé.
      </p>

      <button
        type="submit"
        :disabled="loading"
      >
        {{ loading ? 'Création...' : 'Recevoir le lien de confirmation' }}
      </button>
    </form>
  </section>
</template>


<style scoped>
  .auth-container {
    max-width: 30%;
    margin: 0 auto;
  }
</style>