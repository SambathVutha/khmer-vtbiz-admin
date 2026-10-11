<template>
  <div class="h-screen w-screen overflow-hidden bg-white font-sans">
    <div class="relative flex h-screen w-full overflow-hidden bg-white">
      <!-- Left Panel: 3/4 Image Slider (changes every 5 seconds) -->
      <div class="relative hidden h-screen w-3/4 overflow-hidden bg-slate-300 lg:block">
        <div class="relative h-full w-full">
          <div
            v-for="(image, index) in slides"
            :key="index"
            class="absolute inset-0 bg-cover bg-center transition-all duration-[1200ms] ease-in-out transform"
            :class="currentIndex === index ? 'opacity-100 scale-100 z-10' : 'opacity-0 scale-105 pointer-events-none z-0'"
            :style="{ backgroundImage: `url(${image.url})` }"
          >
            <!-- Slide Gradient Overlay -->
            <div class="absolute inset-0 flex items-end bg-gradient-to-t from-slate-950/80 via-slate-900/30 to-black/10 p-12">
              <div class="text-white drop-shadow-md pb-6 transition-all duration-700 ease-out">
                <h3 class="text-2xl font-bold tracking-tight mb-2 sm:text-3xl">{{ image.title }}</h3>
                <p class="text-base text-slate-200 leading-relaxed max-w-xl">{{ image.description }}</p>
              </div>
            </div>
          </div>

          <!-- Carousel Indicator Dots -->
          <div class="absolute bottom-8 left-10 z-20 flex items-center gap-2.5">
            <button
              v-for="(_, index) in slides"
              :key="index"
              type="button"
              class="h-2.5 rounded-full transition-all duration-300 cursor-pointer p-0 border-0"
              :class="currentIndex === index ? 'w-8 bg-white' : 'w-2.5 bg-white/40 hover:bg-white/70'"
              @click="setCurrentIndex(index)"
              :aria-label="`Go to slide ${index + 1}`"
            />
          </div>
        </div>
      </div>

      <!-- Right Panel: 1/4 Login Form -->
      <div class="relative z-10 flex h-screen w-full flex-col justify-between overflow-y-auto bg-white p-8 sm:p-10 shadow-[-4px_0_16px_rgba(0,0,0,0.05)] lg:w-1/4 lg:min-w-[340px] xl:min-w-[380px]">
        <!-- Top Brand Header -->
        <div class="flex items-center mb-6">
          <NuxtLink to="/" class="inline-flex items-center gap-3 transition-opacity hover:opacity-85">
            <img src="/logo.png" alt="Khmer VTBiz Logo" class="h-10 w-10 shrink-0 rounded-lg bg-[#121316] object-contain p-0.5 shadow-md" />
            <span class="text-xl font-extrabold tracking-tight text-slate-900 whitespace-nowrap">Khmer VTBiz</span>
          </NuxtLink>
        </div>

        <!-- Form Content -->
        <div class="w-full max-w-[320px] mx-auto my-auto">
          <h1 class="text-3xl font-extrabold tracking-tight text-slate-900 mb-6">Log In</h1>

          <!-- Error Alert Banner -->
          <div
            v-if="errorMessage"
            class="mb-5 flex items-start gap-2.5 rounded-lg border border-red-200 bg-red-50 p-3 text-sm text-red-700 animate-in fade-in duration-200"
          >
            <svg class="h-5 w-5 shrink-0 text-red-500 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"/>
            </svg>
            <div class="flex-1 text-xs leading-relaxed">
              <p class="font-semibold text-red-800">Authentication Failed</p>
              <p class="mt-0.5 text-red-600">{{ errorMessage }}</p>
            </div>
            <button
              type="button"
              @click="errorMessage = null"
              class="text-red-400 hover:text-red-600 transition-colors p-0.5 cursor-pointer"
              aria-label="Dismiss error"
            >
              <svg class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          
          <form @submit.prevent="handleLogin" class="flex flex-col gap-5">
            <!-- Username / Email -->
            <div class="flex flex-col gap-1.5">
              <label for="username" class="text-sm font-bold text-slate-900">
                Username or Email <span class="text-red-500">*</span>
              </label>
              <input
                id="username"
                v-model="username"
                type="text"
                required
                :disabled="loading"
                placeholder="Enter username or email"
                class="w-full rounded bg-slate-200 px-3.5 py-2.5 text-sm text-slate-800 placeholder-slate-400 outline-none transition-all border border-transparent focus:border-[#5016e0] focus:bg-white focus:ring-2 focus:ring-[#5016e0]/20 disabled:opacity-60"
              />
            </div>

            <!-- Password -->
            <div class="flex flex-col gap-1.5">
              <label for="password" class="text-sm font-bold text-slate-900">
                Password <span class="text-red-500">*</span>
              </label>
              <div class="relative flex items-center">
                <input
                  id="password"
                  v-model="password"
                  :type="showPassword ? 'text' : 'password'"
                  required
                  :disabled="loading"
                  placeholder="Enter your password"
                  class="w-full rounded bg-slate-200 px-3.5 py-2.5 pr-10 text-sm text-slate-800 placeholder-slate-400 outline-none transition-all border border-transparent focus:border-[#5016e0] focus:bg-white focus:ring-2 focus:ring-[#5016e0]/20 disabled:opacity-60"
                />
                <button
                  type="button"
                  class="absolute right-3 p-1 text-slate-500 hover:text-slate-800 transition-colors cursor-pointer"
                  @click="showPassword = !showPassword"
                  :title="showPassword ? 'Hide password' : 'Show password'"
                  :aria-label="showPassword ? 'Hide password' : 'Show password'"
                >
                  <!-- Eye Open / Eye Slash SVG -->
                  <svg v-if="showPassword" xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path stroke-linecap="round" stroke-linejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                  </svg>
                  <svg v-else xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l18 18" />
                  </svg>
                </button>
              </div>
            </div>

            <!-- Remember Me & Forgot Password -->
            <div class="flex items-center justify-between text-xs sm:text-sm mt-0.5">
              <label class="flex items-center gap-2 text-slate-600 font-medium cursor-pointer select-none">
                <input
                  type="checkbox"
                  v-model="rememberMe"
                  :disabled="loading"
                  class="h-4 w-4 rounded border-slate-300 accent-[#5016e0] cursor-pointer"
                />
                <span>Remember Me</span>
              </label>

              <NuxtLink to="/forgot-password" class="font-medium text-slate-900 hover:text-[#5016e0] hover:underline transition-colors">
                Forgot password?
              </NuxtLink>
            </div>

            <!-- Log In Button -->
            <div class="mt-2">
              <button
                type="submit"
                class="w-full py-2.5 px-6 bg-[#5016e0] hover:bg-[#430ec4] text-white font-bold text-sm rounded-lg shadow-lg shadow-[#5016e0]/30 active:translate-y-0.5 transition-all cursor-pointer disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                :disabled="loading"
              >
                <span v-if="!loading">Log In</span>
                <span v-else class="flex items-center gap-2">
                  <svg class="h-4 w-4 animate-spin text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                    <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"></path>
                  </svg>
                  Signing in...
                </span>
              </button>
            </div>
          </form>
        </div>

        <!-- Version Footer -->
        <div class="self-end text-xs font-medium text-slate-900 pt-6 mt-auto">
          <span>V.1.0.1</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'

definePageMeta({
  layout: false
})

useHead({
  title: 'Log In - Khmer VTBiz',
  meta: [
    { name: 'description', content: 'Sign in to access your Khmer VTBiz account.' }
  ]
})

const auth = useAuth()

const username = ref('')
const password = ref('')
const rememberMe = ref(false)
const showPassword = ref(false)
const loading = ref(false)
const errorMessage = ref<string | null>(null)

// Carousel Slides configuration (changes every 5 seconds)
const slides = ref([
  {
    url: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=1200&auto=format&fit=crop',
    title: 'Modern Business Solutions',
    description: 'Empowering Cambodian enterprises with cloud-first technology.'
  },
  {
    url: 'https://images.unsplash.com/photo-1551836022-d5d88e9218df?q=80&w=1200&auto=format&fit=crop',
    title: 'Seamless Collaboration',
    description: 'Connect teams, operations, and branches across Phnom Penh and provinces.'
  },
  {
    url: 'https://images.unsplash.com/photo-1559526324-4b87b5e36e44?q=80&w=1200&auto=format&fit=crop',
    title: 'Fintech & KHQR Integration',
    description: 'Speed up transactions with automated Bakong KHQR workflows.'
  },
  {
    url: 'https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=1200&auto=format&fit=crop',
    title: 'Enterprise Scalability',
    description: 'Reliable, secure, and ready for your continuous business expansion.'
  }
])

const currentIndex = ref(0)
let timer: ReturnType<typeof setInterval> | null = null

const startCarousel = () => {
  stopCarousel()
  timer = setInterval(() => {
    currentIndex.value = (currentIndex.value + 1) % slides.value.length
  }, 5000) // 5 seconds interval
}

const stopCarousel = () => {
  if (timer) {
    clearInterval(timer)
    timer = null
  }
}

const setCurrentIndex = (index: number) => {
  currentIndex.value = index
  startCarousel()
}

onMounted(() => {
  startCarousel()
})

onUnmounted(() => {
  stopCarousel()
})

const handleLogin = async () => {
  if (!username.value || !password.value) return
  errorMessage.value = null
  loading.value = true
  try {
    const res = await auth.login(username.value, password.value)
    if (!res.success) {
      errorMessage.value = res.error || 'Failed to sign in. Please check your credentials.'
    }
  } catch (err: any) {
    errorMessage.value = err?.message || 'An unexpected error occurred.'
  } finally {
    loading.value = false
  }
}
</script>
