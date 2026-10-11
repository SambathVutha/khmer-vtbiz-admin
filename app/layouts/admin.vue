<template>
  <div class="min-h-screen flex flex-col bg-slate-50 text-slate-900 font-sans">
    <!-- Top Royal Blue Navigation Bar -->
    <header class="sticky top-0 z-50 h-14 md:h-15 w-full bg-[#0d52bf] text-white flex items-center justify-between px-3.5 md:px-5 shadow-xs shrink-0">
      <!-- Left: Logo & Sidebar Toggle -->
      <div class="flex items-center gap-3.5 flex-1 min-w-0">
        <NuxtLink to="/dashboard" class="flex items-center gap-2.5 text-white no-underline shrink-0 transition-opacity hover:opacity-90" @click="expandedMenus = []">
          <img src="/logo.png" alt="Khmer VTBiz Logo" class="h-8 w-8 object-contain bg-[#121316] rounded-md p-0.5 shrink-0" />
          <span class="text-lg font-extrabold tracking-tight whitespace-nowrap">Khmer VTBiz</span>
        </NuxtLink>

        <button
          class="flex h-8 w-8 items-center justify-center rounded-md p-1 text-xl text-white hover:bg-white/15 transition shrink-0 cursor-pointer"
          @click="sidebarCollapsed = !sidebarCollapsed"
          title="Toggle Navigation"
        >
          <span>☰</span>
        </button>
      </div>

      <!-- Center: Universal Global Search Bar -->
      <div class="hidden md:flex flex-[1.5] justify-center px-4">
        <div class="relative w-full max-w-[480px] flex items-center">
          <span class="absolute left-3 text-[#94a3b8] text-sm pointer-events-none select-none">🔍</span>
          <input
            v-model="searchQuery"
            type="text"
            placeholder="Search Device / Customer / Product..."
            class="w-full h-[2.15rem] rounded-[6px] border-none bg-white/95 pl-[2.2rem] pr-[2.4rem] text-[0.82rem] text-[#0f172a] placeholder-[#94a3b8] outline-none transition focus:bg-white focus:ring-2 focus:ring-white/30"
          />
          <button
            type="button"
            class="absolute right-[0.3rem] flex h-[1.6rem] w-[1.6rem] items-center justify-center rounded-[4px] bg-[#1e40af] hover:bg-[#1d4ed8] text-white font-bold text-sm transition cursor-pointer"
            title="Search"
          >
            ›
          </button>
        </div>
      </div>

      <!-- Right: Action Icons & Super Admin Profile Dropdown -->
      <div class="flex items-center justify-end gap-3 flex-1 shrink-0">
        <!-- Quick Action Buttons -->
        <div class="flex items-center gap-1 shrink-0">
          <button class="relative flex h-8.5 w-8.5 items-center justify-center rounded-md text-base text-white hover:bg-white/15 transition cursor-pointer shrink-0" title="Full Screen" @click="toggleFullScreen">
            <span>⛶</span>
          </button>
          <button class="relative flex h-8.5 w-8.5 items-center justify-center rounded-md text-base text-white hover:bg-white/15 transition cursor-pointer shrink-0" title="Notifications">
            <span>🔔</span>
            <span class="absolute top-1 right-1 flex h-3.5 w-3.5 items-center justify-center rounded-full bg-red-500 text-[9px] font-bold text-white leading-none">3</span>
          </button>
        </div>

        <!-- User Profile Dropdown -->
        <div class="relative shrink-0" ref="profileDropdownRef">
          <button
            class="flex items-center gap-2 rounded-md px-2 py-1 text-white hover:bg-white/15 transition shrink-0 max-w-[220px] cursor-pointer"
            @click="toggleProfileMenu"
            :class="{ 'bg-white/20': isProfileOpen }"
            aria-haspopup="true"
            :aria-expanded="isProfileOpen"
          >
            <div class="h-8 w-8 rounded-full border-1.5 border-white overflow-hidden shrink-0">
              <img
                src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=120&auto=format&fit=crop"
                alt="Super Admin"
                class="h-full w-full object-cover"
              />
            </div>
            <div class="hidden sm:flex flex-col text-left leading-tight min-w-0">
              <span class="text-xs font-bold text-white truncate max-w-[120px]">{{ userDisplayName }}</span>
              <span class="text-[10px] text-white/80 truncate">Administrator</span>
            </div>
            <span class="text-xs text-white/80 transition-transform duration-200" :class="{ 'rotate-180': isProfileOpen }">▾</span>
          </button>

          <!-- Floating Dropdown Card -->
          <transition
            enter-active-class="transition duration-150 ease-out"
            enter-from-class="transform scale-95 opacity-0"
            enter-to-class="transform scale-100 opacity-100"
            leave-active-class="transition duration-100 ease-in"
            leave-from-class="transform scale-100 opacity-100"
            leave-to-class="transform scale-95 opacity-0"
          >
            <div v-if="isProfileOpen" class="absolute right-0 top-full mt-2 w-60 rounded-xl border border-slate-200 bg-white p-2 shadow-xl z-50 text-slate-800">
              <div class="flex items-center gap-3 p-2">
                <div class="h-10 w-10 rounded-full border border-slate-200 overflow-hidden shrink-0">
                  <img
                    src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=120&auto=format&fit=crop"
                    alt="Administrator"
                    class="h-full w-full object-cover"
                  />
                </div>
                <div class="flex flex-col min-w-0 text-left">
                  <strong class="text-xs font-bold text-slate-900 truncate">{{ userDisplayName }}</strong>
                  <span class="text-[11px] text-slate-500 truncate mb-1">{{ userEmail }}</span>
                  <span class="inline-flex self-start items-center px-1.5 py-0.5 rounded-full text-[9px] font-bold bg-blue-50 text-blue-700">
                    Super Administrator
                  </span>
                </div>
              </div>

              <div class="my-1 border-t border-slate-100"></div>

              <div class="flex flex-col py-0.5">
                <NuxtLink to="/profile" class="flex items-center gap-2.5 rounded-lg px-3 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-50 hover:text-blue-600 transition" @click="isProfileOpen = false">
                  <span class="text-sm">👤</span>
                  <span>My Profile</span>
                </NuxtLink>
                <NuxtLink to="/settings" class="flex items-center gap-2.5 rounded-lg px-3 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-50 hover:text-blue-600 transition" @click="isProfileOpen = false">
                  <span class="text-sm">⚙️</span>
                  <span>Account Settings</span>
                </NuxtLink>
                <NuxtLink to="/change-password" class="flex items-center gap-2.5 rounded-lg px-3 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-50 hover:text-blue-600 transition" @click="isProfileOpen = false">
                  <span class="text-sm">🔒</span>
                  <span>Change Password</span>
                </NuxtLink>
              </div>

              <div class="my-1 border-t border-slate-100"></div>

              <div class="p-1">
                <button class="w-full flex items-center gap-2.5 rounded-lg px-3 py-2 text-xs font-semibold text-red-600 hover:bg-red-50 transition cursor-pointer" @click="handleLogout">
                  <span class="text-sm">🚪</span>
                  <span>Log Out</span>
                </button>
              </div>
            </div>
          </transition>
        </div>
      </div>
    </header>

    <!-- Body Layout: Sidebar + Main Content Slot -->
    <div class="flex flex-1 relative">
      <!-- Mobile Backdrop Overlay when sidebar is open -->
      <div v-if="!sidebarCollapsed" class="fixed inset-0 top-14 bg-slate-900/40 backdrop-blur-xs z-40 md:hidden" @click="sidebarCollapsed = true"></div>

      <!-- Left Sidebar Navigation -->
      <aside
        class="bg-white border-r border-slate-200 flex flex-col justify-between shrink-0 transition-all duration-200 z-40 fixed top-14 bottom-0 left-0 md:static md:top-auto md:bottom-auto"
        :class="[
          sidebarCollapsed ? '-translate-x-full md:translate-x-0 md:w-16' : 'translate-x-0 w-60 md:w-56 shadow-xl md:shadow-none'
        ]"
      >
        <nav class="p-2 flex flex-col gap-1 overflow-y-auto max-h-[calc(100vh-7.5rem)]">
          <div
            v-for="item in navMenuItems"
            :key="item.id"
            class="flex flex-col"
          >
            <div
              class="flex items-center justify-between rounded-lg px-3 py-2 text-xs font-semibold transition cursor-pointer select-none"
              :class="[
                isItemActive(item) ? 'bg-blue-50 text-blue-600 font-bold' : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900',
                sidebarCollapsed ? 'justify-center px-1' : ''
              ]"
              @click="handleNavClick(item)"
            >
              <div class="flex items-center gap-2.5">
                <span class="text-base text-center w-5 shrink-0">{{ item.icon }}</span>
                <span v-if="!sidebarCollapsed" class="whitespace-nowrap">{{ item.label }}</span>
              </div>
              <span
                v-if="!sidebarCollapsed && item.hasChildren"
                class="text-xs transition-transform duration-200"
                :class="{ 'rotate-180': expandedMenus.includes(item.id) }"
              >▾</span>
            </div>

            <!-- Submenu Items -->
            <div
              v-if="!sidebarCollapsed && item.hasChildren && expandedMenus.includes(item.id)"
              class="ml-4 pl-3 border-l-2 border-slate-200 flex flex-col gap-1 my-1"
            >
              <div
                v-for="sub in item.children"
                :key="sub.id"
                class="flex items-center gap-2 rounded-md px-2.5 py-1.5 text-xs font-medium cursor-pointer transition whitespace-nowrap"
                :class="isSubActive(sub) ? 'bg-blue-50 text-blue-600 font-semibold' : 'text-slate-500 hover:bg-slate-100 hover:text-slate-900'"
                @click.stop="handleSubNavClick(sub)"
              >
                <span class="text-xs text-center w-4 shrink-0">{{ sub.icon }}</span>
                <span>{{ sub.label }}</span>
              </div>
            </div>
          </div>
        </nav>

        <!-- Sidebar Footer -->
        <div v-if="!sidebarCollapsed" class="p-3 border-t border-slate-200 shrink-0">
          <div class="flex items-center gap-2 text-xs text-slate-500">
            <img src="/logo.png" alt="Khmer VTBiz Logo" class="h-6 w-6 object-contain bg-[#121316] rounded-md p-0.5 shrink-0" />
            <div class="flex flex-col leading-tight flex-1">
              <strong class="font-bold text-slate-800">Khmer VTBiz</strong>
              <div class="flex items-center justify-between text-[10px] text-slate-400 mt-0.5">
                <span>© 2026</span>
                <span class="font-bold text-slate-600">V.1.0.1</span>
              </div>
            </div>
          </div>
        </div>
      </aside>

      <!-- Main Content Slot -->
      <main class="flex-1 p-3.5 md:p-5 overflow-y-auto max-h-[calc(100vh-3.5rem)] md:max-h-[calc(100vh-3.75rem)] min-w-0">
        <slot />
      </main>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch, onMounted, onUnmounted, computed } from 'vue'

const route = useRoute()
const sidebarCollapsed = useState('sidebarCollapsed', () => false)
const searchQuery = ref('')
const toggleFullScreen = () => {
  if (!document.fullscreenElement) {
    document.documentElement.requestFullscreen().catch(() => {})
  } else {
    document.exitFullscreen().catch(() => {})
  }
}

// User Profile Dropdown Logic
const isProfileOpen = ref(false)
const profileDropdownRef = ref<HTMLElement | null>(null)

const toggleProfileMenu = (e: MouseEvent) => {
  e.stopPropagation()
  isProfileOpen.value = !isProfileOpen.value
}

// Global Reactive Action Trigger for same-page and cross-page menu dispatches
export interface MenuActionTrigger {
  id: string
  path: string
  action?: string
  tab?: string
  timestamp: number
}

const menuActionTrigger = useState<MenuActionTrigger>('menuActionTrigger', () => ({
  id: '',
  path: '',
  action: '',
  tab: '',
  timestamp: 0
}))

const handleClickOutside = (e: MouseEvent) => {
  if (profileDropdownRef.value && !profileDropdownRef.value.contains(e.target as Node)) {
    isProfileOpen.value = false
  }
}

const auth = useAuth()

const userEmail = computed(() => auth.user.value?.email || 'admin@khmervtbiz.com')
const userDisplayName = computed(() => {
  const metadataName = auth.user.value?.user_metadata?.full_name || auth.user.value?.user_metadata?.name
  if (metadataName) return metadataName
  if (auth.user.value?.email) {
    const prefix = auth.user.value.email.split('@')[0] ?? ''
    if (!prefix) return 'Super Admin'
    return prefix.charAt(0).toUpperCase() + prefix.slice(1)
  }
  return 'Super Admin'
})

const handleLogout = async () => {
  isProfileOpen.value = false
  await auth.logout()
}

// Sidebar Menus (closed by default)
const expandedMenus = ref<string[]>([])

interface NavMenuItem {
  id: string
  label: string
  icon: string
  hasChildren: boolean
  path?: string
  children?: NavMenuItem[]
}

const navMenuItems = ref<NavMenuItem[]>([
  { id: 'dashboard', label: 'Dashboard', icon: '⊞', hasChildren: false, path: '/dashboard' },
  { id: 'notification-templates', label: 'Notification Templates', icon: '🔔', hasChildren: false, path: '/settings?tab=security' },
  { id: 'settings', label: 'Settings', icon: '⚙️', hasChildren: false, path: '/settings' }
])

const handleResize = () => {
  if (window.innerWidth <= 768 && !sidebarCollapsed.value) {
    sidebarCollapsed.value = true
  }
}

onMounted(() => {
  window.addEventListener('click', handleClickOutside)
  if (window.innerWidth <= 768) {
    sidebarCollapsed.value = true
  }
  window.addEventListener('resize', handleResize)
})

onUnmounted(() => {
  window.removeEventListener('click', handleClickOutside)
  window.removeEventListener('resize', handleResize)
})

const isItemActive = (item: NavMenuItem) => {
  if (item.path && (route.path === item.path || route.path.startsWith(item.path))) return true
  if (item.children && item.children.length > 0) {
    return item.children.some((sub: NavMenuItem) => {
      if (!sub.path) return false
      const [subBase = ''] = sub.path.split('?')
      return route.path === subBase || route.path.startsWith(subBase)
    })
  }
  return false
}

const isSubActive = (sub: NavMenuItem) => {
  if (!sub.path) return false
  const [subBase = '', subQuery] = sub.path.split('?')

  if (subQuery) {
    return route.fullPath === sub.path
  }

  if (route.path !== subBase) return false

  if (route.query.tab || route.query.action) {
    return false
  }

  return true
}

const handleNavClick = (item: NavMenuItem) => {
  if (item.hasChildren) {
    if (expandedMenus.value.includes(item.id)) {
      expandedMenus.value = expandedMenus.value.filter(id => id !== item.id)
    } else {
      expandedMenus.value.push(item.id)
    }
  } else if (item.path) {
    if (item.id === 'dashboard' || item.path === '/dashboard') {
      expandedMenus.value = []
    }

    const [targetPath = '', queryString = ''] = item.path.split('?')
    const queryParams = new URLSearchParams(queryString)

    menuActionTrigger.value = {
      id: item.id,
      path: targetPath,
      action: queryParams.get('action') || '',
      tab: queryParams.get('tab') || '',
      timestamp: Date.now()
    }

    navigateTo(item.path)
  }
}

const handleSubNavClick = (sub: NavMenuItem) => {
  if (!sub.path) return

  const [targetPath = '', queryString = ''] = sub.path.split('?')
  const queryParams = new URLSearchParams(queryString)

  menuActionTrigger.value = {
    id: sub.id,
    path: targetPath,
    action: queryParams.get('action') || '',
    tab: queryParams.get('tab') || '',
    timestamp: Date.now()
  }

  navigateTo(sub.path)
}

watch(
  () => route.path,
  (currentPath) => {
    if (currentPath === '/dashboard' || currentPath === '/dashboard/') {
      expandedMenus.value = []
      return
    }

    navMenuItems.value.forEach((item) => {
      if (item.hasChildren && item.children) {
        const hasActiveChild = item.children.some((c: any) => {
          if (!c.path) return false
          const [base] = c.path.split('?')
          return currentPath === base || currentPath.startsWith(base)
        })
        if (hasActiveChild && !expandedMenus.value.includes(item.id)) {
          expandedMenus.value.push(item.id)
        }
      }
    })
  },
  { immediate: true }
)
</script>
