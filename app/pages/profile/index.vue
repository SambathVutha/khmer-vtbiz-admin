<template>
  <div class="space-y-5 max-w-[1600px] mx-auto font-sans w-full">
    <!-- Breadcrumb & Page Header (Left-aligned like other pages) -->
    <div class="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
      <div>
        <div class="flex items-center gap-2 text-xs font-medium text-slate-500 mb-1">
          <NuxtLink to="/dashboard" class="hover:text-[#5016e0] transition-colors">Dashboard</NuxtLink>
          <span>/</span>
          <span class="text-slate-800 font-semibold">User Profile</span>
        </div>
        <div class="flex items-center gap-3">
          <h1 class="text-2xl font-extrabold tracking-tight text-slate-900">User Profile</h1>
          <span class="inline-flex items-center gap-1.5 rounded-full bg-purple-100 px-2.5 py-0.5 text-xs font-bold text-purple-900">
            <span class="h-1.5 w-1.5 rounded-full bg-[#5016e0]"></span>
            Super Administrator
          </span>
        </div>
      </div>

      <!-- Action Buttons on Right -->
      <div class="flex flex-wrap items-center gap-2 pt-2 sm:pt-0">
        <NuxtLink
          to="/change-password"
          class="inline-flex items-center gap-1.5 rounded-lg border border-slate-300 bg-white px-3.5 py-2 text-xs font-semibold text-slate-700 shadow-xs hover:bg-slate-50 transition-colors whitespace-nowrap"
        >
          <span>🔒</span>
          <span>Change Password</span>
        </NuxtLink>
        <button
          @click="auth.logout()"
          class="inline-flex items-center gap-1.5 rounded-lg border border-red-200 bg-red-50 px-3.5 py-2 text-xs font-semibold text-red-700 hover:bg-red-100 transition-colors cursor-pointer whitespace-nowrap"
        >
          <span>🚪</span>
          <span>Log Out</span>
        </button>
      </div>
    </div>

    <!-- User Info Header Banner (Left-aligned, consistent with Change Password page) -->
    <div class="rounded-2xl border border-slate-200 bg-white p-5 shadow-xs">
      <div class="flex flex-col gap-4 rounded-xl border border-indigo-100 bg-indigo-50/60 p-4 sm:flex-row sm:items-center sm:justify-between">
        <div class="flex items-center gap-3.5 text-left">
          <!-- Monogram Avatar -->
          <div class="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-gradient-to-tr from-[#5016e0] to-indigo-600 text-lg font-bold text-white shadow-sm ring-2 ring-purple-100">
            {{ userInitials }}
          </div>
          <div class="text-left">
            <div class="flex flex-wrap items-center gap-2">
              <h2 class="text-base font-bold text-slate-900 leading-normal">{{ fullName || 'Super Admin' }}</h2>
              <span class="rounded bg-purple-100 px-2 py-0.5 text-[11px] font-bold text-purple-800">
                Super Administrator
              </span>
            </div>
            <p class="text-xs text-slate-600 mt-0.5 flex flex-wrap items-center gap-2">
              <span class="font-semibold text-slate-900">{{ userEmail }}</span>
              <span class="text-slate-300">•</span>
              <span>📍 {{ address || 'Phnom Penh, Cambodia' }}</span>
              <span class="text-slate-300">•</span>
              <span class="text-slate-500">Asia/Phnom_Penh</span>
            </p>
          </div>
        </div>

        <span class="inline-flex shrink-0 items-center gap-1.5 self-start rounded-full bg-emerald-100 px-3 py-1 text-xs font-semibold text-emerald-800 sm:self-auto">
          <span class="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
          Active Supabase Session
        </span>
      </div>
    </div>

    <!-- Alert Notifications -->
    <div
      v-if="saveSuccess"
      class="flex items-center justify-between rounded-xl border border-emerald-200 bg-emerald-50 p-4 text-sm text-emerald-800 animate-in fade-in"
    >
      <div class="flex items-center gap-2.5">
        <span class="text-lg">✓</span>
        <span class="font-semibold">Profile updated successfully in Supabase!</span>
      </div>
      <button @click="saveSuccess = false" class="text-emerald-600 hover:text-emerald-800 cursor-pointer text-xs font-bold">
        Dismiss
      </button>
    </div>

    <div
      v-if="saveError"
      class="flex items-center justify-between rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-800 animate-in fade-in"
    >
      <div class="flex items-center gap-2.5">
        <span class="text-lg">✕</span>
        <span>{{ saveError }}</span>
      </div>
      <button @click="saveError = null" class="text-red-600 hover:text-red-800 cursor-pointer text-xs font-bold">
        Dismiss
      </button>
    </div>

    <!-- Layout Grid: Left Tabs & Right Content -->
    <div class="grid grid-cols-1 lg:grid-cols-4 gap-6">
      <!-- Left Column: Navigation Sidebar Tabs -->
      <div class="lg:col-span-1 space-y-4">
        <div class="rounded-2xl border border-slate-200 bg-white p-3 shadow-xs space-y-1">
          <button
            type="button"
            @click="activeTab = 'general'"
            class="w-full flex items-center justify-between rounded-xl px-4 py-3 text-xs font-bold transition-all cursor-pointer text-left"
            :class="activeTab === 'general' ? 'bg-[#5016e0] text-white shadow-sm' : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'"
          >
            <div class="flex items-center gap-3">
              <span class="text-base">👤</span>
              <span>General Details</span>
            </div>
            <span v-if="activeTab === 'general'">›</span>
          </button>

          <button
            type="button"
            @click="activeTab = 'security'"
            class="w-full flex items-center justify-between rounded-xl px-4 py-3 text-xs font-bold transition-all cursor-pointer text-left"
            :class="activeTab === 'security' ? 'bg-[#5016e0] text-white shadow-sm' : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'"
          >
            <div class="flex items-center gap-3">
              <span class="text-base">🔒</span>
              <span>Security & Session</span>
            </div>
            <span v-if="activeTab === 'security'">›</span>
          </button>

          <button
            type="button"
            @click="activeTab = 'permissions'"
            class="w-full flex items-center justify-between rounded-xl px-4 py-3 text-xs font-bold transition-all cursor-pointer text-left"
            :class="activeTab === 'permissions' ? 'bg-[#5016e0] text-white shadow-sm' : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'"
          >
            <div class="flex items-center gap-3">
              <span class="text-base">🛡️</span>
              <span>Role & Permissions</span>
            </div>
            <span v-if="activeTab === 'permissions'">›</span>
          </button>
        </div>

        <!-- Quick Summary Box -->
        <div class="rounded-2xl border border-slate-200 bg-white p-5 shadow-xs space-y-3">
          <h3 class="text-xs font-bold uppercase tracking-wider text-slate-400">Account Summary</h3>
          <div class="space-y-2.5 text-xs">
            <div class="flex justify-between items-center py-1 border-b border-slate-100">
              <span class="text-slate-500">System Role</span>
              <span class="font-bold text-slate-800">Super Administrator</span>
            </div>
            <div class="flex justify-between items-center py-1 border-b border-slate-100">
              <span class="text-slate-500">Address</span>
              <span class="font-bold text-slate-800">{{ address || 'Phnom Penh, Cambodia' }}</span>
            </div>
            <div class="flex justify-between items-center py-1 border-b border-slate-100">
              <span class="text-slate-500">Auth Engine</span>
              <span class="font-bold text-[#5016e0]">Supabase GoTrue</span>
            </div>
            <div class="flex justify-between items-center py-1">
              <span class="text-slate-500">Platform</span>
              <span class="font-bold text-slate-800">Khmer VTBiz</span>
            </div>
          </div>
        </div>
      </div>

      <!-- Right Column: Tab Content Panels -->
      <div class="lg:col-span-3">
        <!-- TAB 1: General Details -->
        <div v-if="activeTab === 'general'" class="rounded-2xl border border-slate-200 bg-white p-6 sm:p-8 shadow-xs space-y-6">
          <div class="border-b border-slate-100 pb-4">
            <h3 class="text-lg font-bold text-slate-900">Personal & Organization Details</h3>
            <p class="text-xs text-slate-500 mt-0.5">Manage your identity information and enterprise preferences.</p>
          </div>

          <form @submit.prevent="handleSaveProfile" class="space-y-5">
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <!-- Full Name -->
              <div class="space-y-1.5">
                <label for="fullName" class="block text-xs font-bold text-slate-700">
                  Full Name <span class="text-red-500">*</span>
                </label>
                <input
                  id="fullName"
                  v-model="fullName"
                  type="text"
                  required
                  placeholder="Super Admin"
                  class="w-full rounded-lg border border-slate-300 px-3.5 py-2.5 text-sm text-slate-900 outline-none transition focus:border-[#5016e0] focus:ring-2 focus:ring-[#5016e0]/20"
                />
              </div>

              <!-- Username / Handle -->
              <div class="space-y-1.5">
                <label for="username" class="block text-xs font-bold text-slate-700">
                  Username
                </label>
                <input
                  id="username"
                  v-model="username"
                  type="text"
                  placeholder="admin"
                  class="w-full rounded-lg border border-slate-300 px-3.5 py-2.5 text-sm text-slate-900 outline-none transition focus:border-[#5016e0] focus:ring-2 focus:ring-[#5016e0]/20"
                />
              </div>

              <!-- Email (Read-only Supabase Auth ID) -->
              <div class="space-y-1.5">
                <div class="flex items-center justify-between">
                  <label for="email" class="block text-xs font-bold text-slate-700">
                    Email Address
                  </label>
                  <span class="text-[10px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                    Verified
                  </span>
                </div>
                <input
                  id="email"
                  :value="userEmail"
                  type="email"
                  disabled
                  class="w-full rounded-lg border border-slate-200 bg-slate-100 px-3.5 py-2.5 text-sm text-slate-500 cursor-not-allowed outline-none"
                />
                <span class="text-[10px] text-slate-400">Primary Supabase authentication identifier</span>
              </div>

              <!-- Phone Number -->
              <div class="space-y-1.5">
                <label for="phoneNumber" class="block text-xs font-bold text-slate-700">
                  Phone Number
                </label>
                <input
                  id="phoneNumber"
                  v-model="phoneNumber"
                  type="tel"
                  placeholder="+855 12 345 678"
                  class="w-full rounded-lg border border-slate-300 px-3.5 py-2.5 text-sm text-slate-900 outline-none transition focus:border-[#5016e0] focus:ring-2 focus:ring-[#5016e0]/20"
                />
              </div>

              <!-- Address -->
              <div class="space-y-1.5">
                <label for="address" class="block text-xs font-bold text-slate-700">
                  Address
                </label>
                <input
                  id="address"
                  v-model="address"
                  type="text"
                  placeholder="e.g. Phnom Penh, Cambodia"
                  class="w-full rounded-lg border border-slate-300 px-3.5 py-2.5 text-sm text-slate-900 outline-none transition focus:border-[#5016e0] focus:ring-2 focus:ring-[#5016e0]/20"
                />
              </div>

              <!-- Timezone -->
              <div class="space-y-1.5">
                <label for="timezone" class="block text-xs font-bold text-slate-700">
                  Timezone
                </label>
                <select
                  id="timezone"
                  v-model="timezone"
                  class="w-full rounded-lg border border-slate-300 bg-white px-3.5 py-2.5 text-sm text-slate-900 outline-none transition focus:border-[#5016e0] focus:ring-2 focus:ring-[#5016e0]/20"
                >
                  <option value="Asia/Phnom_Penh">Asia/Phnom_Penh (GMT+7)</option>
                  <option value="Asia/Bangkok">Asia/Bangkok (GMT+7)</option>
                  <option value="Asia/Singapore">Asia/Singapore (GMT+8)</option>
                </select>
              </div>
            </div>

            <!-- Action Buttons -->
            <div class="flex items-center gap-3 pt-4 border-t border-slate-100">
              <button
                type="submit"
                :disabled="saving"
                class="min-w-[140px] px-6 py-2.5 bg-[#5016e0] hover:bg-[#430ec4] text-white font-bold text-xs sm:text-sm rounded-lg shadow-md shadow-[#5016e0]/30 transition cursor-pointer disabled:opacity-60 flex items-center justify-center gap-2"
              >
                <span v-if="!saving">Save Changes</span>
                <span v-else class="flex items-center gap-2">
                  <svg class="h-4 w-4 animate-spin text-white" viewBox="0 0 24 24" fill="none">
                    <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                    <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"></path>
                  </svg>
                  Saving...
                </span>
              </button>

              <button
                type="button"
                @click="resetForm"
                class="px-4 py-2.5 rounded-lg border border-slate-300 text-xs sm:text-sm font-semibold text-slate-700 hover:bg-slate-50 transition"
              >
                Reset
              </button>
            </div>
          </form>
        </div>

        <!-- TAB 2: Security & Session -->
        <div v-else-if="activeTab === 'security'" class="space-y-6">
          <!-- Password Card -->
          <div class="rounded-2xl border border-slate-200 bg-white p-6 sm:p-8 shadow-xs">
            <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-slate-100 pb-5">
              <div class="space-y-1">
                <h3 class="text-lg font-bold text-slate-900">Account Password</h3>
                <p class="text-xs text-slate-500">Keep your Super Administrator credentials safe and protected.</p>
              </div>

              <NuxtLink
                to="/change-password"
                class="inline-flex items-center gap-1.5 rounded-lg bg-[#5016e0] px-4 py-2 text-xs font-bold text-white shadow-sm hover:bg-[#430ec4] transition"
              >
                <span>🔑</span>
                <span>Update Password</span>
              </NuxtLink>
            </div>

            <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-5 text-xs">
              <div class="rounded-xl bg-slate-50 p-4 border border-slate-200/80">
                <span class="text-slate-400 font-bold uppercase tracking-wider block mb-1">Password Status</span>
                <span class="font-bold text-slate-800 text-sm">•••••••••••• (Encrypted)</span>
                <p class="text-[11px] text-slate-500 mt-1">Stored securely via Blowfish / bcrypt in Supabase Auth.</p>
              </div>

              <div class="rounded-xl bg-slate-50 p-4 border border-slate-200/80">
                <span class="text-slate-400 font-bold uppercase tracking-wider block mb-1">Two-Factor Authentication</span>
                <span class="font-bold text-amber-600 text-sm">Optional / Configurable</span>
                <p class="text-[11px] text-slate-500 mt-1">Can be enabled in the Supabase Security Dashboard.</p>
              </div>
            </div>
          </div>

          <!-- Active JWT Session Card -->
          <div class="rounded-2xl border border-slate-200 bg-white p-6 sm:p-8 shadow-xs space-y-4">
            <div class="border-b border-slate-100 pb-4">
              <h3 class="text-lg font-bold text-slate-900">Active JWT Authentication Session</h3>
              <p class="text-xs text-slate-500 mt-0.5">Cryptographic token claims verified on every API request.</p>
            </div>

            <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div class="space-y-1 rounded-xl bg-slate-50 p-3.5 border border-slate-200/80">
                <span class="text-slate-400 font-semibold uppercase tracking-wider text-[10px]">Supabase User UUID</span>
                <p class="font-mono font-bold text-slate-800 truncate">{{ auth.user.value?.id || '623caede-da54-4208-9c78-95d8e089c88b' }}</p>
              </div>

              <div class="space-y-1 rounded-xl bg-slate-50 p-3.5 border border-slate-200/80">
                <span class="text-slate-400 font-semibold uppercase tracking-wider text-[10px]">Token Type</span>
                <p class="font-mono font-bold text-slate-800">Bearer (JWT ES256 / HS256)</p>
              </div>

              <div class="space-y-1 rounded-xl bg-slate-50 p-3.5 border border-slate-200/80">
                <span class="text-slate-400 font-semibold uppercase tracking-wider text-[10px]">Session Persistence</span>
                <p class="font-semibold text-emerald-600">Enabled (Auto-refresh active)</p>
              </div>

              <div class="space-y-1 rounded-xl bg-slate-50 p-3.5 border border-slate-200/80">
                <span class="text-slate-400 font-semibold uppercase tracking-wider text-[10px]">Project Endpoint</span>
                <p class="font-mono font-bold text-slate-800 truncate">ujyyycxbdldoxysawnyq.supabase.co</p>
              </div>
            </div>
          </div>
        </div>

        <!-- TAB 3: Role & Permissions -->
        <div v-else-if="activeTab === 'permissions'" class="rounded-2xl border border-slate-200 bg-white p-6 sm:p-8 shadow-xs space-y-6">
          <div class="border-b border-slate-100 pb-4">
            <h3 class="text-lg font-bold text-slate-900">Super Administrator Privileges</h3>
            <p class="text-xs text-slate-500 mt-0.5">Your account holds full unrestricted root access to the Khmer VTBiz enterprise ecosystem.</p>
          </div>

          <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div
              v-for="perm in permissions"
              :key="perm.title"
              class="flex items-start gap-3.5 rounded-xl border border-slate-200 bg-slate-50/60 p-4 transition hover:bg-white hover:border-[#5016e0]/30 hover:shadow-xs"
            >
              <div class="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-emerald-100 text-emerald-700 text-base font-bold">
                ✓
              </div>
              <div class="space-y-0.5">
                <h4 class="text-sm font-bold text-slate-900">{{ perm.title }}</h4>
                <p class="text-xs text-slate-500 leading-relaxed">{{ perm.desc }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'

definePageMeta({
  layout: 'admin'
})

useHead({
  title: 'My Profile - Khmer VTBiz',
  meta: [
    { name: 'description', content: 'Manage your Khmer VTBiz Super Administrator profile.' }
  ]
})

const auth = useAuth()
const supabase = useSupabase()

const activeTab = ref<'general' | 'security' | 'permissions'>('general')

const userEmail = computed(() => auth.user.value?.email || 'admin@khmervtbiz.com')

// Form Fields
const fullName = ref('Super Admin')
const username = ref('admin')
const phoneNumber = ref('+855 12 888 999')
const address = ref('Phnom Penh, Cambodia')
const timezone = ref('Asia/Phnom_Penh')

const saving = ref(false)
const saveSuccess = ref(false)
const saveError = ref<string | null>(null)

// Init form from user metadata
const initFormData = () => {
  const meta = auth.user.value?.user_metadata
  if (meta?.full_name) fullName.value = meta.full_name
  if (meta?.username) username.value = meta.username
  if (meta?.phone) phoneNumber.value = meta.phone
  if (meta?.address) address.value = meta.address
  else if (meta?.branch) address.value = meta.branch
  if (meta?.timezone) timezone.value = meta.timezone
}

onMounted(() => {
  initFormData()
})

const resetForm = () => {
  initFormData()
  saveSuccess.value = false
  saveError.value = null
}

const userInitials = computed(() => {
  const name = fullName.value.trim()
  if (!name) return 'SA'

  const parts = name.split(/\s+/).filter(Boolean)
  if (parts.length >= 2) {
    const firstInitial = parts[0]?.[0] ?? ''
    const secondInitial = parts[1]?.[0] ?? ''
    return (firstInitial + secondInitial).toUpperCase()
  }

  return name.slice(0, 2).toUpperCase()
})

// Save profile metadata to Supabase
const handleSaveProfile = async () => {
  saving.value = true
  saveSuccess.value = false
  saveError.value = null

  try {
    const { data, error } = await supabase.auth.updateUser({
      data: {
        full_name: fullName.value,
        username: username.value,
        phone: phoneNumber.value,
        address: address.value,
        timezone: timezone.value
      }
    })

    if (error) throw error

    if (data.user) {
      auth.user.value = data.user
    }

    saveSuccess.value = true
  } catch (err: any) {
    saveError.value = err?.message || 'Failed to update profile.'
  } finally {
    saving.value = false
  }
}

// System Privileges Matrix
const permissions = [
  {
    title: 'Multi-Branch Administration',
    desc: 'Unrestricted access to all branches, outlets, warehouses, and partner franchises.'
  },
  {
    title: 'Financial & Accounting Ledger',
    desc: 'Full visibility over sales, expenses, KHQR Bakong logs, cash flow, and tax reports.'
  },
  {
    title: 'POS Terminal Master Control',
    desc: 'Ability to configure checkout terminals, register balances, payment methods, and discounts.'
  },
  {
    title: 'User & Access Delegation',
    desc: 'Create, modify, and revoke access for managers, accountants, and cashiers.'
  },
  {
    title: 'Database & Cloud Integration',
    desc: 'Full read and write capabilities across Supabase cloud database tables and storage.'
  },
  {
    title: 'System Settings & Audit Logs',
    desc: 'Modify security policies, notification templates, and inspect platform audit logs.'
  }
]
</script>
