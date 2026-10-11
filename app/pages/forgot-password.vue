<template>
  <div class="flex min-h-screen items-center justify-center bg-slate-100 p-4 font-sans">
    <div class="w-full max-w-md rounded-2xl bg-white p-8 shadow-xl">
      <div class="mb-6 flex items-center justify-center gap-3">
        <img src="/logo.png" alt="Logo" class="h-10 w-10 rounded-lg bg-[#121316] p-0.5" />
        <h1 class="text-xl font-extrabold text-slate-900">Reset Password</h1>
      </div>

      <p class="mb-6 text-center text-sm text-slate-600">
        Enter your account email address and we'll send you instructions to reset your password.
      </p>

      <form @submit.prevent="handleReset" class="space-y-4">
        <div>
          <label class="block text-xs font-bold uppercase tracking-wider text-slate-700">Email Address</label>
          <input
            v-model="email"
            type="email"
            required
            placeholder="admin@khmervtbiz.com"
            class="mt-1 w-full rounded-lg border border-slate-300 px-3.5 py-2.5 text-sm text-slate-900 outline-none focus:border-[#5016e0] focus:ring-2 focus:ring-[#5016e0]/20"
          />
        </div>

        <div v-if="message" class="rounded-lg bg-green-50 p-3 text-xs text-green-700 border border-green-200">
          {{ message }}
        </div>

        <button
          type="submit"
          :disabled="loading"
          class="w-full rounded-lg bg-[#5016e0] py-2.5 text-sm font-bold text-white transition hover:bg-[#430ec4] disabled:opacity-50"
        >
          {{ loading ? 'Sending...' : 'Send Reset Link' }}
        </button>
      </form>

      <div class="mt-6 text-center">
        <NuxtLink to="/login" class="text-xs font-semibold text-[#5016e0] hover:underline">
          &larr; Back to Login
        </NuxtLink>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

definePageMeta({
  layout: false
})

const email = ref('')
const loading = ref(false)
const message = ref('')

const handleReset = async () => {
  loading.value = true
  const supabase = useSupabase()
  const { error } = await supabase.auth.resetPasswordForEmail(email.value, {
    redirectTo: `${window.location.origin}/reset-password`
  })
  loading.value = false
  if (error) {
    message.value = error.message
  } else {
    message.value = 'Password reset instructions sent! Please check your inbox.'
  }
}
</script>
