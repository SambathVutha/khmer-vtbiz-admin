<template>
  <div class="space-y-5 max-w-[1600px] mx-auto font-sans w-full">
    <!-- Breadcrumb & Page Header -->
    <div class="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
      <div>
        <div class="flex items-center gap-2 text-xs font-medium text-slate-500 mb-1">
          <NuxtLink to="/dashboard" class="hover:text-[#5016e0] transition-colors">Dashboard</NuxtLink>
          <span>/</span>
          <span class="text-slate-800 font-semibold">Settings</span>
        </div>
        <div class="flex items-center gap-3">
          <h1 class="text-2xl font-extrabold tracking-tight text-slate-900">System Settings</h1>
          <span class="inline-flex items-center gap-1.5 rounded-full bg-blue-100 px-2.5 py-0.5 text-xs font-bold text-blue-900">
            <span class="h-1.5 w-1.5 rounded-full bg-blue-600"></span>
            Khmer VTBiz V.1.0.1
          </span>
        </div>
      </div>

      <!-- Action Buttons -->
      <div class="flex items-center gap-2 pt-2 sm:pt-0">
        <button
          type="button"
          @click="handleSave"
          :disabled="isSaving"
          class="inline-flex items-center gap-2 rounded-xl bg-[#5016e0] hover:bg-[#430ec4] px-4 py-2 text-xs font-bold text-white shadow-md shadow-[#5016e0]/20 transition cursor-pointer disabled:opacity-60"
        >
          <span v-if="!isSaving">💾 Save Changes</span>
          <span v-else class="flex items-center gap-1.5">
            <svg class="h-3.5 w-3.5 animate-spin text-white" viewBox="0 0 24 24" fill="none">
              <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
              <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"></path>
            </svg>
            Saving...
          </span>
        </button>
      </div>
    </div>

    <!-- Feedback Notification -->
    <div
      v-if="saveSuccess"
      class="flex items-center justify-between rounded-xl border border-emerald-200 bg-emerald-50 p-4 text-sm text-emerald-800 animate-in fade-in"
    >
      <div class="flex items-center gap-2.5">
        <span class="text-lg">✓</span>
        <span class="font-semibold">Settings updated successfully!</span>
      </div>
      <button @click="saveSuccess = false" class="text-emerald-600 hover:text-emerald-800 cursor-pointer text-xs font-bold">
        Dismiss
      </button>
    </div>

    <!-- Main Settings Layout: Left Tabs & Right Panel -->
    <div class="grid grid-cols-1 lg:grid-cols-4 gap-6">
      <!-- Left Column: Navigation Tabs -->
      <div class="lg:col-span-1 space-y-4">
        <div class="rounded-2xl border border-slate-200 bg-white p-3 shadow-xs space-y-1">
          <button
            type="button"
            @click="activeTab = 'general'"
            class="w-full flex items-center justify-between rounded-xl px-4 py-3 text-xs font-bold transition-all cursor-pointer text-left"
            :class="activeTab === 'general' ? 'bg-[#5016e0] text-white shadow-sm' : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'"
          >
            <div class="flex items-center gap-3">
              <span class="text-base">🏢</span>
              <span>General Store</span>
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
              <span>Security & Policies</span>
            </div>
            <span v-if="activeTab === 'security'">›</span>
          </button>

          <button
            type="button"
            @click="activeTab = 'notifications'"
            class="w-full flex items-center justify-between rounded-xl px-4 py-3 text-xs font-bold transition-all cursor-pointer text-left"
            :class="activeTab === 'notifications' ? 'bg-[#5016e0] text-white shadow-sm' : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'"
          >
            <div class="flex items-center gap-3">
              <span class="text-base">🔔</span>
              <span>Notification Templates</span>
            </div>
            <span v-if="activeTab === 'notifications'">›</span>
          </button>

          <button
            type="button"
            @click="activeTab = 'finance'"
            class="w-full flex items-center justify-between rounded-xl px-4 py-3 text-xs font-bold transition-all cursor-pointer text-left"
            :class="activeTab === 'finance' ? 'bg-[#5016e0] text-white shadow-sm' : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'"
          >
            <div class="flex items-center gap-3">
              <span class="text-base">💳</span>
              <span>Payment & Currency</span>
            </div>
            <span v-if="activeTab === 'finance'">›</span>
          </button>
        </div>

        <!-- Quick Info Box -->
        <div class="rounded-2xl border border-slate-200 bg-white p-5 shadow-xs space-y-3">
          <h3 class="text-xs font-bold uppercase tracking-wider text-slate-400">Environment</h3>
          <div class="space-y-2 text-xs">
            <div class="flex justify-between items-center py-1 border-b border-slate-100">
              <span class="text-slate-500">Framework</span>
              <span class="font-bold text-slate-800">Nuxt 4 + Tailwind</span>
            </div>
            <div class="flex justify-between items-center py-1 border-b border-slate-100">
              <span class="text-slate-500">Database</span>
              <span class="font-bold text-emerald-600">Supabase Cloud</span>
            </div>
            <div class="flex justify-between items-center py-1">
              <span class="text-slate-500">Timezone</span>
              <span class="font-semibold text-slate-700">Asia/Phnom_Penh</span>
            </div>
          </div>
        </div>
      </div>

      <!-- Right Column: Settings Content Panes -->
      <div class="lg:col-span-3 space-y-6">
        <!-- Tab 1: General Store Settings -->
        <div v-if="activeTab === 'general'" class="rounded-2xl border border-slate-200 bg-white p-6 shadow-xs space-y-6">
          <div class="border-b border-slate-100 pb-4">
            <h2 class="text-lg font-bold text-slate-900">General Store Information</h2>
            <p class="text-xs text-slate-500 mt-0.5">Configure your company identity, address, and default business parameters.</p>
          </div>

          <div class="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div class="space-y-1.5">
              <label class="block text-xs font-bold uppercase tracking-wider text-slate-700">Company / Store Name</label>
              <input
                v-model="generalSettings.companyName"
                type="text"
                class="w-full rounded-lg border border-slate-300 bg-white px-3.5 py-2.5 text-xs text-slate-900 outline-none transition focus:border-[#5016e0] focus:ring-2 focus:ring-[#5016e0]/15"
              />
            </div>

            <div class="space-y-1.5">
              <label class="block text-xs font-bold uppercase tracking-wider text-slate-700">Business Hotline</label>
              <input
                v-model="generalSettings.phone"
                type="text"
                class="w-full rounded-lg border border-slate-300 bg-white px-3.5 py-2.5 text-xs text-slate-900 outline-none transition focus:border-[#5016e0] focus:ring-2 focus:ring-[#5016e0]/15"
              />
            </div>

            <div class="space-y-1.5">
              <label class="block text-xs font-bold uppercase tracking-wider text-slate-700">Contact Email</label>
              <input
                v-model="generalSettings.email"
                type="email"
                class="w-full rounded-lg border border-slate-300 bg-white px-3.5 py-2.5 text-xs text-slate-900 outline-none transition focus:border-[#5016e0] focus:ring-2 focus:ring-[#5016e0]/15"
              />
            </div>

            <div class="space-y-1.5">
              <label class="block text-xs font-bold uppercase tracking-wider text-slate-700">Tax ID / VAT Number</label>
              <input
                v-model="generalSettings.taxId"
                type="text"
                class="w-full rounded-lg border border-slate-300 bg-white px-3.5 py-2.5 text-xs text-slate-900 outline-none transition focus:border-[#5016e0] focus:ring-2 focus:ring-[#5016e0]/15"
              />
            </div>

            <div class="sm:col-span-2 space-y-1.5">
              <label class="block text-xs font-bold uppercase tracking-wider text-slate-700">Headquarters Address</label>
              <input
                v-model="generalSettings.address"
                type="text"
                class="w-full rounded-lg border border-slate-300 bg-white px-3.5 py-2.5 text-xs text-slate-900 outline-none transition focus:border-[#5016e0] focus:ring-2 focus:ring-[#5016e0]/15"
              />
            </div>
          </div>
        </div>

        <!-- Tab 2: Security & Policies -->
        <div v-if="activeTab === 'security'" class="rounded-2xl border border-slate-200 bg-white p-6 shadow-xs space-y-6">
          <div class="border-b border-slate-100 pb-4">
            <h2 class="text-lg font-bold text-slate-900">Security & Access Policies</h2>
            <p class="text-xs text-slate-500 mt-0.5">Control session parameters, login enforcement, and authentication policies.</p>
          </div>

          <div class="space-y-4">
            <div class="flex items-center justify-between p-4 rounded-xl border border-slate-200 bg-slate-50/50">
              <div>
                <h4 class="text-xs font-bold text-slate-900">Two-Factor Authentication (2FA)</h4>
                <p class="text-[11px] text-slate-500 mt-0.5">Require an authenticator OTP code for Super Administrator accounts.</p>
              </div>
              <label class="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" v-model="securitySettings.twoFactor" class="sr-only peer" />
                <div class="w-11 h-6 bg-slate-300 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#5016e0]"></div>
              </label>
            </div>

            <div class="flex items-center justify-between p-4 rounded-xl border border-slate-200 bg-slate-50/50">
              <div>
                <h4 class="text-xs font-bold text-slate-900">Auto Session Inactivity Timeout</h4>
                <p class="text-[11px] text-slate-500 mt-0.5">Automatically log out inactive operators after 30 minutes of idle time.</p>
              </div>
              <label class="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" v-model="securitySettings.sessionTimeout" class="sr-only peer" />
                <div class="w-11 h-6 bg-slate-300 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#5016e0]"></div>
              </label>
            </div>

            <div class="flex items-center justify-between p-4 rounded-xl border border-slate-200 bg-slate-50/50">
              <div>
                <h4 class="text-xs font-bold text-slate-900">Enforce Strong Password Complexity</h4>
                <p class="text-[11px] text-slate-500 mt-0.5">Require digits, symbols, and mixed casing for all cashier & manager accounts.</p>
              </div>
              <label class="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" v-model="securitySettings.strongPassword" class="sr-only peer" />
                <div class="w-11 h-6 bg-slate-300 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#5016e0]"></div>
              </label>
            </div>
          </div>
        </div>

        <!-- Tab 3: Notification Templates -->
        <div v-if="activeTab === 'notifications'" class="rounded-2xl border border-slate-200 bg-white p-6 shadow-xs space-y-6">
          <div class="border-b border-slate-100 pb-4">
            <h2 class="text-lg font-bold text-slate-900">Notification & Alert Templates</h2>
            <p class="text-xs text-slate-500 mt-0.5">Configure alerts sent to Telegram bots, SMS gateways, and admin emails.</p>
          </div>

          <div class="space-y-4">
            <div class="p-4 rounded-xl border border-slate-200 bg-slate-50/50 space-y-3">
              <div class="flex items-center justify-between">
                <div>
                  <h4 class="text-xs font-bold text-slate-900">Telegram Bot Notifications</h4>
                  <p class="text-[11px] text-slate-500 mt-0.5">Send instant notifications on new sales, low-stock warnings, and shift closures.</p>
                </div>
                <label class="relative inline-flex items-center cursor-pointer">
                  <input type="checkbox" v-model="notificationSettings.telegramEnabled" class="sr-only peer" />
                  <div class="w-11 h-6 bg-slate-300 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#5016e0]"></div>
                </label>
              </div>

              <div v-if="notificationSettings.telegramEnabled" class="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                <input
                  v-model="notificationSettings.telegramBotToken"
                  type="text"
                  placeholder="Bot API Token (e.g. 123456:ABC-DEF)"
                  class="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-xs text-slate-900 outline-none focus:border-[#5016e0]"
                />
                <input
                  v-model="notificationSettings.telegramChatId"
                  type="text"
                  placeholder="Telegram Group / Channel Chat ID"
                  class="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-xs text-slate-900 outline-none focus:border-[#5016e0]"
                />
              </div>
            </div>

            <div class="flex items-center justify-between p-4 rounded-xl border border-slate-200 bg-slate-50/50">
              <div>
                <h4 class="text-xs font-bold text-slate-900">Low Stock Inventory Alerts</h4>
                <p class="text-[11px] text-slate-500 mt-0.5">Send alert when any product stock drops to or below alert threshold.</p>
              </div>
              <label class="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" v-model="notificationSettings.lowStockAlert" class="sr-only peer" />
                <div class="w-11 h-6 bg-slate-300 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#5016e0]"></div>
              </label>
            </div>
          </div>
        </div>

        <!-- Tab 4: Payment & Currency -->
        <div v-if="activeTab === 'finance'" class="rounded-2xl border border-slate-200 bg-white p-6 shadow-xs space-y-6">
          <div class="border-b border-slate-100 pb-4">
            <h2 class="text-lg font-bold text-slate-900">Payment & Currency Settings</h2>
            <p class="text-xs text-slate-500 mt-0.5">Manage exchange rate (USD to KHR), default currency, and Bakong KHQR integration.</p>
          </div>

          <div class="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div class="space-y-1.5">
              <label class="block text-xs font-bold uppercase tracking-wider text-slate-700">Primary Display Currency</label>
              <select
                v-model="financeSettings.primaryCurrency"
                class="w-full rounded-lg border border-slate-300 bg-white px-3.5 py-2.5 text-xs text-slate-900 outline-none transition focus:border-[#5016e0]"
              >
                <option value="USD">USD ($) - United States Dollar</option>
                <option value="KHR">KHR (៛) - Khmer Riel</option>
              </select>
            </div>

            <div class="space-y-1.5">
              <label class="block text-xs font-bold uppercase tracking-wider text-slate-700">Official Exchange Rate (1 USD = KHR)</label>
              <input
                v-model.number="financeSettings.exchangeRate"
                type="number"
                class="w-full rounded-lg border border-slate-300 bg-white px-3.5 py-2.5 text-xs text-slate-900 outline-none transition focus:border-[#5016e0]"
              />
            </div>

            <div class="space-y-1.5">
              <label class="block text-xs font-bold uppercase tracking-wider text-slate-700">Default Value Added Tax (VAT %)</label>
              <input
                v-model.number="financeSettings.defaultVatPercent"
                type="number"
                class="w-full rounded-lg border border-slate-300 bg-white px-3.5 py-2.5 text-xs text-slate-900 outline-none transition focus:border-[#5016e0]"
              />
            </div>

            <div class="space-y-1.5">
              <label class="block text-xs font-bold uppercase tracking-wider text-slate-700">Bakong KHQR Merchant ID</label>
              <input
                v-model="financeSettings.bakongMerchantId"
                type="text"
                placeholder="e.g. khmervtbiz@aclb"
                class="w-full rounded-lg border border-slate-300 bg-white px-3.5 py-2.5 text-xs text-slate-900 outline-none transition focus:border-[#5016e0]"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch, onMounted } from 'vue'

definePageMeta({
  layout: 'admin'
})

useHead({
  title: 'Settings - Khmer VTBiz',
  meta: [
    { name: 'description', content: 'Configure system settings for Khmer VTBiz ERP & POS.' }
  ]
})

const route = useRoute()

type TabKey = 'general' | 'security' | 'notifications' | 'finance'
const activeTab = ref<TabKey>('general')

// Initialize tab based on query params
onMounted(() => {
  if (route.query.tab === 'security') {
    activeTab.value = 'security'
  } else if (route.query.tab === 'notifications') {
    activeTab.value = 'notifications'
  } else if (route.query.tab === 'finance') {
    activeTab.value = 'finance'
  }
})

watch(
  () => route.query.tab,
  (newTab) => {
    if (newTab === 'security' || newTab === 'notifications' || newTab === 'finance' || newTab === 'general') {
      activeTab.value = newTab as TabKey
    }
  }
)

const isSaving = ref(false)
const saveSuccess = ref(false)

const generalSettings = ref({
  companyName: 'Khmer VTBiz Enterprise',
  phone: '+855 12 888 999',
  email: 'contact@khmervtbiz.com',
  taxId: 'K008-882194',
  address: 'No. 128, Street 2004, Phnom Penh, Cambodia'
})

const securitySettings = ref({
  twoFactor: false,
  sessionTimeout: true,
  strongPassword: true
})

const notificationSettings = ref({
  telegramEnabled: true,
  telegramBotToken: '682194821:AAHZx8-sampleTokenKey',
  telegramChatId: '-10088921448',
  lowStockAlert: true
})

const financeSettings = ref({
  primaryCurrency: 'USD',
  exchangeRate: 4100,
  defaultVatPercent: 10,
  bakongMerchantId: 'khmervtbiz@aclb'
})

const handleSave = () => {
  isSaving.value = true
  saveSuccess.value = false

  setTimeout(() => {
    isSaving.value = false
    saveSuccess.value = true
  }, 400)
}
</script>