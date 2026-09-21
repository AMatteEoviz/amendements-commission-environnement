<script setup>
import { ref } from 'vue'
import { supabase } from '../../supabase.js'

const email = ref('')
const password = ref('')
const loading = ref(false)
const error = ref('')
const success = ref(false)

async function signIn() {
  error.value = ''
  success.value = false

  if (!email.value || !password.value) {
    error.value = 'Veuillez renseigner votre email et votre mot de passe.'
    return
  }

  loading.value = true

  try {
    const { error: signUpError } = await supabase.auth.signUp({
      email: email.value.trim(),
      password: password.value,
      options: {
        emailRedirectTo: window.location.origin
      }
    })

    if (signUpError) {
      error.value = signUpError.message
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
    <h1>Créer un compte</h1>

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

      <div>
        <label for="password">Mot de passe</label>

        <input
          id="password"
          v-model="password"
          type="password"
          autocomplete="new-password"
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
        {{ loading ? 'Création...' : 'Créer mon compte' }}
      </button>
    </form>
  </section>
</template>