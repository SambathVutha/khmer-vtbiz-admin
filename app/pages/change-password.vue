<template>
  <div class="space-y-5 max-w-[1600px] mx-auto font-sans w-full">
    <!-- Breadcrumb & Page Header (Left-aligned like Dashboard and Profile) -->
    <div class="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
      <div>
        <div class="flex items-center gap-2 text-xs font-medium text-slate-500 mb-1">
          <NuxtLink to="/dashboard" class="hover:text-[#5016e0] transition-colors">Dashboard</NuxtLink>
          <span>/</span>
          <span class="text-slate-800 font-semibold">Change Password</span>
        </div>
        <div class="flex items-center gap-3">
          <h1 class="text-2xl font-extrabold tracking-tight text-slate-900">Change Password</h1>
          <span class="inline-flex items-center gap-1.5 rounded-full bg-purple-100 px-2.5 py-0.5 text-xs font-bold text-purple-900">
            <span class="h-1.5 w-1.5 rounded-full bg-[#5016e0]"></span>
            Super Administrator
          </span>
        </div>
      </div>
    </div>

    <!-- Main Card -->
    <div class="rounded-2xl border border-slate-200 bg-white p-6 sm:p-8 shadow-xs">
      <!-- User Info Header Banner -->
      <div class="mb-8 flex flex-col gap-4 rounded-xl border border-indigo-100 bg-indigo-50/60 p-4 sm:flex-row sm:items-center sm:justify-between">
        <div class="flex items-center gap-3.5">
          <div class="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#5016e0] text-lg font-bold text-white shadow-sm">
            🔒
          </div>
          <div>
            <h2 class="text-sm font-bold text-slate-900">Account Security</h2>
            <p class="text-xs text-slate-600">
              Logged in as <span class="font-semibold text-slate-900">{{ userEmail }}</span> (Super Administrator)
            </p>
          </div>
        </div>
        <span class="inline-flex shrink-0 items-center gap-1.5 self-start rounded-full bg-emerald-100 px-3 py-1 text-xs font-semibold text-emerald-800 sm:self-auto">
          <span class="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
          Active Supabase Session
        </span>
      </div>

      <!-- Success Alert Banner -->
      <div
        v-if="successMessage"
        class="mb-6 flex items-start gap-3 rounded-xl border border-emerald-200 bg-emerald-50 p-4 text-sm text-emerald-800 animate-in fade-in duration-200"
      >
        <svg class="h-5 w-5 shrink-0 text-emerald-600 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        <div class="flex-1">
          <p class="font-bold text-emerald-900">Password Changed Successfully</p>
          <p class="mt-0.5 text-xs text-emerald-700">{{ successMessage }}</p>
        </div>
        <button
          type="button"
          @click="successMessage = null"
          class="text-emerald-500 hover:text-emerald-700 p-0.5 cursor-pointer"
        >
          ✕
        </button>
      </div>

      <!-- Error Alert Banner -->
      <div
        v-if="errorMessage"
        class="mb-6 flex items-start gap-3 rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-800 animate-in fade-in duration-200"
      >
        <svg class="h-5 w-5 shrink-0 text-red-600 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
        </svg>
        <div class="flex-1">
          <p class="font-bold text-red-900">Failed to Update Password</p>
          <p class="mt-0.5 text-xs text-red-700">{{ errorMessage }}</p>
        </div>
        <button
          type="button"
          @click="errorMessage = null"
          class="text-red-500 hover:text-red-700 p-0.5 cursor-pointer"
        >
          ✕
        </button>
      </div>

      <!-- Password Change Form -->
      <form @submit.prevent="handlePasswordUpdate" class="space-y-6 max-w-xl">
        <!-- Current Password -->
        <div class="space-y-1.5">
          <label for="currentPassword" class="block text-xs font-bold uppercase tracking-wider text-slate-700">
            Current Password <span class="text-slate-400 font-normal">(Optional Verification)</span>
          </label>
          <div class="relative flex items-center">
            <input
              id="currentPassword"
              v-model="currentPassword"
              :type="showCurrent ? 'text' : 'password'"
              placeholder="Enter current password"
              :disabled="loading"
              class="w-full rounded-lg border border-slate-300 bg-slate-50/50 px-3.5 py-2.5 pr-10 text-sm text-slate-900 placeholder-slate-400 outline-none transition focus:border-[#5016e0] focus:bg-white focus:ring-2 focus:ring-[#5016e0]/20 disabled:opacity-60"
            />
            <button
              type="button"
              class="absolute right-3 p-1 text-slate-400 hover:text-slate-700 transition cursor-pointer"
              @click="showCurrent = !showCurrent"
              :title="showCurrent ? 'Hide' : 'Show'"
            >
              <svg v-if="showCurrent" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
              </svg>
              <svg v-else class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l18 18" />
              </svg>
            </button>
          </div>
        </div>

        <!-- New Password -->
        <div class="space-y-1.5">
          <label for="newPassword" class="block text-xs font-bold uppercase tracking-wider text-slate-700">
            New Password <span class="text-red-500">*</span>
          </label>
          <div class="relative flex items-center">
            <input
              id="newPassword"
              v-model="newPassword"
              :type="showNew ? 'text' : 'password'"
              required
              minlength="6"
              placeholder="Enter new password (min. 6 characters)"
              :disabled="loading"
              class="w-full rounded-lg border border-slate-300 bg-slate-50/50 px-3.5 py-2.5 pr-10 text-sm text-slate-900 placeholder-slate-400 outline-none transition focus:border-[#5016e0] focus:bg-white focus:ring-2 focus:ring-[#5016e0]/20 disabled:opacity-60"
            />
            <button
              type="button"
              class="absolute right-3 p-1 text-slate-400 hover:text-slate-700 transition cursor-pointer"
              @click="showNew = !showNew"
              :title="showNew ? 'Hide' : 'Show'"
            >
              <svg v-if="showNew" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
              </svg>
              <svg v-else class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l18 18" />
              </svg>
            </button>
          </div>

          <!-- Password Strength Meter -->
          <div v-if="newPassword.length > 0" class="pt-1.5 space-y-1">
            <div class="flex items-center justify-between text-xs">
              <span class="text-slate-500 font-medium">Strength:</span>
              <span :class="strengthTextColor" class="font-bold">{{ strengthLabel }}</span>
            </div>
            <div class="h-1.5 w-full bg-slate-200 rounded-full overflow-hidden">
              <div
                class="h-full transition-all duration-300 rounded-full"
                :class="strengthBarColor"
                :style="{ width: `${strengthPercentage}%` }"
              ></div>
            </div>
          </div>
        </div>

        <!-- Confirm New Password -->
        <div class="space-y-1.5">
          <label for="confirmPassword" class="block text-xs font-bold uppercase tracking-wider text-slate-700">
            Confirm New Password <span class="text-red-500">*</span>
          </label>
          <div class="relative flex items-center">
            <input
              id="confirmPassword"
              v-model="confirmPassword"
              :type="showConfirm ? 'text' : 'password'"
              required
              minlength="6"
              placeholder="Re-enter new password"
              :disabled="loading"
              class="w-full rounded-lg border border-slate-300 bg-slate-50/50 px-3.5 py-2.5 pr-10 text-sm text-slate-900 placeholder-slate-400 outline-none transition focus:border-[#5016e0] focus:bg-white focus:ring-2 focus:ring-[#5016e0]/20 disabled:opacity-60"
            />
            <button
              type="button"
              class="absolute right-3 p-1 text-slate-400 hover:text-slate-700 transition cursor-pointer"
              @click="showConfirm = !showConfirm"
              :title="showConfirm ? 'Hide' : 'Show'"
            >
              <svg v-if="showConfirm" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
              </svg>
              <svg v-else class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l18 18" />
              </svg>
            </button>
          </div>

          <!-- Matching check -->
          <div v-if="confirmPassword.length > 0" class="text-xs pt-1">
            <span v-if="passwordsMatch" class="text-emerald-600 font-semibold flex items-center gap-1">
              ✓ Passwords match
            </span>
            <span v-else class="text-red-600 font-semibold flex items-center gap-1">
              ✕ Passwords do not match
            </span>
          </div>
        </div>

        <!-- Security Guidelines -->
        <div class="rounded-xl bg-slate-50 p-4 border border-slate-200/80 text-xs text-slate-600 space-y-1.5">
          <p class="font-bold text-slate-800">Password Requirements:</p>
          <ul class="list-disc list-inside space-y-1 text-slate-500">
            <li>Minimum 6 characters in length</li>
            <li>Use a mixture of uppercase letters, numbers, and symbols for high security</li>
            <li>Do not reuse passwords from other services</li>
          </ul>
        </div>

        <!-- Submit & Actions -->
        <div class="flex flex-wrap items-center gap-3 pt-2">
          <button
            type="submit"
            :disabled="loading || !canSubmit"
            class="min-w-[160px] px-6 py-2.5 bg-[#5016e0] hover:bg-[#430ec4] text-white font-bold text-sm rounded-lg shadow-md shadow-[#5016e0]/30 transition cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            <span v-if="!loading">Save New Password</span>
            <span v-else class="flex items-center gap-2">
              <svg class="h-4 w-4 animate-spin text-white" viewBox="0 0 24 24" fill="none">
                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"></path>
              </svg>
              Updating...
            </span>
          </button>

          <NuxtLink
            to="/dashboard"
            class="px-5 py-2.5 rounded-lg border border-slate-300 text-sm font-semibold text-slate-700 hover:bg-slate-50 transition"
          >
            Cancel
          </NuxtLink>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'

definePageMeta({
  layout: 'admin'
})

useHead({
  title: 'Change Password - Khmer VTBiz',
  meta: [
    { name: 'description', content: 'Change Super Administrator password for Khmer VTBiz.' }
  ]
})

const auth = useAuth()
const supabase = useSupabase()

const userEmail = computed(() => auth.user.value?.email || 'admin@khmervtbiz.com')

const currentPassword = ref('')
const newPassword = ref('')
const confirmPassword = ref('')

const showCurrent = ref(false)
const showNew = ref(false)
const showConfirm = ref(false)

const loading = ref(false)
const successMessage = ref<string | null>(null)
const errorMessage = ref<string | null>(null)

// Password Matching
const passwordsMatch = computed(() => {
  return newPassword.value.length > 0 && newPassword.value === confirmPassword.value
})

const canSubmit = computed(() => {
  return newPassword.value.length >= 6 && passwordsMatch.value
})

// Password Strength
const strengthScore = computed(() => {
  const p = newPassword.value
  if (!p) return 0
  let score = 0
  if (p.length >= 6) score += 1
  if (p.length >= 10) score += 1
  if (/[0-9]/.test(p)) score += 1
  if (/[A-Z]/.test(p)) score += 1
  if (/[^A-Za-z0-9]/.test(p)) score += 1
  return score // 0 to 5
})

const strengthPercentage = computed(() => {
  return Math.min(100, Math.round((strengthScore.value / 5) * 100))
})

const strengthLabel = computed(() => {
  if (strengthScore.value <= 1) return 'Weak'
  if (strengthScore.value <= 3) return 'Medium'
  return 'Strong'
})

const strengthTextColor = computed(() => {
  if (strengthScore.value <= 1) return 'text-red-500'
  if (strengthScore.value <= 3) return 'text-amber-500'
  return 'text-emerald-600'
})

const strengthBarColor = computed(() => {
  if (strengthScore.value <= 1) return 'bg-red-500'
  if (strengthScore.value <= 3) return 'bg-amber-500'
  return 'bg-emerald-500'
})

// Handle Password Update via Supabase
const handlePasswordUpdate = async () => {
  if (!canSubmit.value) return

  errorMessage.value = null
  successMessage.value = null
  loading.value = true

  try {
    // If current password provided, optionally verify it first
    if (currentPassword.value.trim().length > 0) {
      const { error: verifyError } = await supabase.auth.signInWithPassword({
        email: userEmail.value,
        password: currentPassword.value
      })

      if (verifyError) {
        throw new Error('Current password does not match. Please verify and try again.')
      }
    }

    // Update password in Supabase Auth
    const { error: updateError } = await supabase.auth.updateUser({
      password: newPassword.value
    })

    if (updateError) {
      throw updateError
    }

    successMessage.value = 'Your password has been changed successfully in your Supabase account.'
    currentPassword.value = ''
    newPassword.value = ''
    confirmPassword.value = ''
  } catch (err: any) {
    errorMessage.value = err?.message || 'Failed to update password. Please try again.'
  } finally {
    loading.value = false
  }
}
</script>
