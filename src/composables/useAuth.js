import { ref, readonly } from 'vue'
import { supabase } from '../supabase'

const session = ref(null)
const user = ref(null)
const loading = ref(true)

let initialized = false
let authSubscription = null

export function useAuth() {

  async function init() {
    // Évite d'initialiser plusieurs fois le listener
    if (initialized) {
      return
    }

    initialized = true

    // Récupération de la session existante
    const {
      data: { session: currentSession }
    } = await supabase.auth.getSession()

    session.value = currentSession
    user.value = currentSession?.user ?? null
    loading.value = false

    // Écoute des changements d'état d'authentification
    const {
      data: { subscription }
    } = supabase.auth.onAuthStateChange(
      (_event, newSession) => {
        session.value = newSession
        user.value = newSession?.user ?? null
      }
    )

    authSubscription = subscription
  }

  async function logout() {
    const { error } = await supabase.auth.signOut()

    if (error) {
      throw error
    }
  }

  return {
    session: readonly(session),
    user: readonly(user),
    loading: readonly(loading),

    init,
    logout
  }
}
