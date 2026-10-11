<template>
  <div class="space-y-6 max-w-[1600px] mx-auto font-sans w-full">
    <!-- Top Breadcrumb & Welcome Greeting Row -->
    <div class="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
      <div>
        <!-- Breadcrumb -->
        <div class="flex items-center gap-2 text-xs font-medium text-slate-500 mb-1">
          <NuxtLink to="/dashboard" class="hover:text-[#5016e0] transition-colors">Dashboard</NuxtLink>
          <span class="text-slate-400">&gt;</span>
          <span class="text-slate-800 font-semibold">Overview</span>
        </div>
        <!-- Welcome Title -->
        <h1 class="text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-900 flex items-center gap-2">
          <span>Welcome back, {{ userName }}</span>
          <span class="text-2xl">👋</span>
        </h1>
      </div>

      <!-- Header Controls & Actions -->
      <div class="flex flex-wrap items-center gap-2.5">
        <!-- Time Filter Dropdown -->
        <div class="relative">
          <button
            type="button"
            class="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-3.5 py-2 text-xs font-semibold text-slate-700 shadow-2xs hover:bg-slate-50 transition cursor-pointer"
          >
            <span>Today</span>
            <span class="text-slate-400 text-[10px]">▼</span>
          </button>
        </div>

        <!-- Date Picker Button -->
        <button
          type="button"
          class="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-3.5 py-2 text-xs font-semibold text-slate-700 shadow-2xs hover:bg-slate-50 transition cursor-pointer"
        >
          <span>📅</span>
          <span>6 Jun 2026</span>
        </button>

        <!-- Export Button -->
        <button
          type="button"
          class="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-3.5 py-2 text-xs font-semibold text-slate-700 shadow-2xs hover:bg-slate-50 transition cursor-pointer"
        >
          <span>⤓</span>
          <span>Export</span>
        </button>

        <!-- New Product Primary Button -->
        <button
          type="button"
          class="inline-flex items-center gap-1.5 rounded-xl bg-[#4318ff] hover:bg-[#3813dc] px-4 py-2 text-xs font-bold text-white shadow-md shadow-[#4318ff]/20 transition cursor-pointer"
        >
          <span>+</span>
          <span>New Product</span>
        </button>
      </div>
    </div>

    <!-- 4 Top KPI Metric Cards Grid -->
    <div class="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4.5">
      <!-- Card 1: Total Revenue -->
      <div class="rounded-2xl border border-slate-200/90 bg-white p-5 shadow-2xs transition-all hover:shadow-md">
        <div class="flex items-center justify-between mb-3.5">
          <div class="flex items-center gap-3">
            <div class="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-50 text-[#4318ff] text-base font-bold">
              $
            </div>
            <span class="text-xs font-medium text-slate-500">Total Revenue</span>
          </div>
          <button type="button" class="text-slate-400 hover:text-slate-600 transition text-sm cursor-pointer" title="Options">•••</button>
        </div>
        <div class="text-2xl font-black text-slate-900 tracking-tight mb-2.5">
          $94,127
        </div>
        <div class="flex items-center gap-1.5 text-xs font-bold text-emerald-600">
          <span>↗</span>
          <span>9%</span>
          <span class="text-slate-400 font-normal">vs last month</span>
        </div>
      </div>

      <!-- Card 2: Total Orders -->
      <div class="rounded-2xl border border-slate-200/90 bg-white p-5 shadow-2xs transition-all hover:shadow-md">
        <div class="flex items-center justify-between mb-3.5">
          <div class="flex items-center gap-3">
            <div class="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600 text-base">
              🛒
            </div>
            <span class="text-xs font-medium text-slate-500">Total Orders</span>
          </div>
          <button type="button" class="text-slate-400 hover:text-slate-600 transition text-sm cursor-pointer" title="Options">•••</button>
        </div>
        <div class="text-2xl font-black text-slate-900 tracking-tight mb-2.5">
          9,654
        </div>
        <div class="flex items-center gap-1.5 text-xs font-bold text-emerald-600">
          <span>↗</span>
          <span>2.98%</span>
          <span class="text-slate-400 font-normal">vs last month</span>
        </div>
      </div>

      <!-- Card 3: New Customers -->
      <div class="rounded-2xl border border-slate-200/90 bg-white p-5 shadow-2xs transition-all hover:shadow-md">
        <div class="flex items-center justify-between mb-3.5">
          <div class="flex items-center gap-3">
            <div class="flex h-10 w-10 items-center justify-center rounded-xl bg-purple-50 text-purple-600 text-base">
              👥
            </div>
            <span class="text-xs font-medium text-slate-500">New Customers</span>
          </div>
          <button type="button" class="text-slate-400 hover:text-slate-600 transition text-sm cursor-pointer" title="Options">•••</button>
        </div>
        <div class="text-2xl font-black text-slate-900 tracking-tight mb-2.5">
          6,013
        </div>
        <div class="flex items-center gap-1.5 text-xs font-bold text-emerald-600">
          <span>↗</span>
          <span>1.65%</span>
          <span class="text-slate-400 font-normal">vs last month</span>
        </div>
      </div>

      <!-- Card 4: Avg. Order Value -->
      <div class="rounded-2xl border border-slate-200/90 bg-white p-5 shadow-2xs transition-all hover:shadow-md">
        <div class="flex items-center justify-between mb-3.5">
          <div class="flex items-center gap-3">
            <div class="flex h-10 w-10 items-center justify-center rounded-xl bg-teal-50 text-teal-600 text-base font-bold">
              %
            </div>
            <span class="text-xs font-medium text-slate-500">Avg. Order Value</span>
          </div>
          <button type="button" class="text-slate-400 hover:text-slate-600 transition text-sm cursor-pointer" title="Options">•••</button>
        </div>
        <div class="text-2xl font-black text-slate-900 tracking-tight mb-2.5">
          $992
        </div>
        <div class="flex items-center gap-1.5 text-xs font-bold text-rose-500">
          <span>↘</span>
          <span>3.5%</span>
          <span class="text-slate-400 font-normal">vs last month</span>
        </div>
      </div>
    </div>

    <!-- Middle Section: Sales Performance & Order Distribution -->
    <div class="grid grid-cols-1 lg:grid-cols-12 gap-5">
      <!-- Left: Sales Performance Chart (7 cols on lg) -->
      <div class="lg:col-span-8 rounded-2xl border border-slate-200/90 bg-white p-6 shadow-2xs flex flex-col justify-between">
        <!-- Chart Header & Filters -->
        <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-6">
          <div>
            <h2 class="text-base font-bold text-slate-900">Sales performance</h2>
          </div>

          <div class="flex items-center gap-2">
            <!-- View toggles (Bar / Line) -->
            <div class="flex items-center rounded-lg border border-slate-200 bg-slate-50 p-0.5">
              <button
                type="button"
                @click="chartView = 'bar'"
                :class="chartView === 'bar' ? 'bg-white text-slate-800 shadow-2xs' : 'text-slate-400 hover:text-slate-600'"
                class="rounded-md px-2 py-1 text-xs cursor-pointer transition"
                title="Bar Chart"
              >
                📊
              </button>
              <button
                type="button"
                @click="chartView = 'line'"
                :class="chartView === 'line' ? 'bg-white text-slate-800 shadow-2xs' : 'text-slate-400 hover:text-slate-600'"
                class="rounded-md px-2 py-1 text-xs cursor-pointer transition"
                title="Line Chart"
              >
                📈
              </button>
            </div>

            <!-- Time Range Pills -->
            <div class="flex items-center rounded-lg border border-slate-200 bg-slate-50 p-0.5 text-xs font-bold">
              <button
                v-for="period in ['1D', '7D', '1M', '1Y']"
                :key="period"
                type="button"
                @click="salesPeriod = period"
                :class="salesPeriod === period ? 'bg-white text-slate-900 shadow-2xs' : 'text-slate-400 hover:text-slate-700'"
                class="rounded-md px-2.5 py-1 cursor-pointer transition"
              >
                {{ period }}
              </button>
            </div>
          </div>
        </div>

        <!-- Subheader: Total Revenue & Legend -->
        <div class="flex flex-wrap items-end justify-between gap-4 mb-8">
          <div>
            <div class="text-xs font-medium text-slate-400">Total Revenue</div>
            <div class="text-3xl font-black text-slate-900 tracking-tight mt-0.5">$155k</div>
          </div>

          <div class="flex items-center gap-4 text-xs font-semibold">
            <div class="flex items-center gap-1.5 text-slate-700">
              <span class="h-2.5 w-2.5 rounded-xs bg-[#4318ff]"></span>
              <span>This year</span>
            </div>
            <div class="flex items-center gap-1.5 text-slate-400">
              <span class="h-2.5 w-2.5 rounded-xs bg-[#a5b4fc]"></span>
              <span>Last year</span>
            </div>
          </div>
        </div>

        <!-- 12-Month Bar Chart -->
        <div class="relative pt-12 pb-2">
          <!-- Monthly Columns Grid -->
          <div class="grid grid-cols-12 gap-1.5 sm:gap-3 items-end h-56">
            <div
              v-for="(item, idx) in monthlyPerformance"
              :key="item.month"
              class="relative flex flex-col items-center h-full justify-end group cursor-pointer"
            >
              <!-- Highlighted Month Active Hover/June Overlay -->
              <div
                v-if="item.highlighted"
                class="absolute inset-x-[-4px] sm:inset-x-[-8px] top-[-36px] bottom-[-24px] rounded-xl bg-indigo-50/50 -z-10 pointer-events-none"
              ></div>

              <!-- Floating Tooltip Card for June (or active hovered month) -->
              <div
                v-if="item.highlighted"
                class="absolute -top-12 left-1/2 -translate-x-1/2 z-20 rounded-xl border border-slate-200/80 bg-white px-3 py-2 shadow-lg min-w-[110px] pointer-events-none animate-in fade-in zoom-in duration-150"
              >
                <div class="text-[11px] font-extrabold text-slate-900 mb-1 border-b border-slate-100 pb-0.5">
                  {{ item.month }}
                </div>
                <div class="space-y-1 text-[10px]">
                  <div class="flex items-center justify-between gap-2">
                    <span class="flex items-center gap-1 text-slate-500">
                      <span class="h-1.5 w-1.5 rounded-full bg-[#a5b4fc]"></span>
                      <span>2025</span>
                    </span>
                    <span class="font-bold text-slate-800">{{ item.lastYearVal }}</span>
                  </div>
                  <div class="flex items-center justify-between gap-2">
                    <span class="flex items-center gap-1 text-slate-700">
                      <span class="h-1.5 w-1.5 rounded-full bg-[#4318ff]"></span>
                      <span>2026</span>
                    </span>
                    <span class="font-extrabold text-[#4318ff]">{{ item.thisYearVal }}</span>
                  </div>
                </div>
              </div>

              <!-- Dual Bars -->
              <div class="flex items-end gap-1 sm:gap-1.5 w-full justify-center h-full">
                <!-- Last Year Bar (Soft Purple/Blue) -->
                <div
                  class="w-2 sm:w-3 rounded-t-sm bg-[#a5b4fc] transition-all duration-300 group-hover:opacity-85"
                  :style="{ height: `${item.lastYearPct}%` }"
                  :title="`Last Year: ${item.lastYearVal}`"
                ></div>
                <!-- This Year Bar (Vibrant Indigo) -->
                <div
                  class="w-2 sm:w-3 rounded-t-sm bg-[#4318ff] transition-all duration-300 group-hover:brightness-110"
                  :style="{ height: `${item.thisYearPct}%` }"
                  :title="`This Year: ${item.thisYearVal}`"
                ></div>
              </div>

              <!-- Month Label -->
              <div class="mt-3 text-[10px] sm:text-xs font-semibold text-slate-400 group-hover:text-slate-800 transition">
                {{ item.month }}
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Right: Order Distribution (4 cols on lg) -->
      <div class="lg:col-span-4 rounded-2xl border border-slate-200/90 bg-white p-6 shadow-2xs flex flex-col justify-between">
        <div>
          <!-- Header & Toggles -->
          <div class="flex items-center justify-between gap-2 mb-6">
            <h2 class="text-base font-bold text-slate-900">Order distribution</h2>
            <div class="flex items-center rounded-lg border border-slate-200 bg-slate-50 p-0.5 text-xs font-bold">
              <button
                v-for="period in ['1D', '7D', '1M', '1Y']"
                :key="period"
                type="button"
                @click="distPeriod = period"
                :class="distPeriod === period ? 'bg-white text-slate-900 shadow-2xs' : 'text-slate-400 hover:text-slate-700'"
                class="rounded-md px-2 py-0.5 cursor-pointer transition text-[11px]"
              >
                {{ period }}
              </button>
            </div>
          </div>

          <!-- Total Order Count -->
          <div class="mb-5">
            <div class="text-xs font-medium text-slate-400">Total order</div>
            <div class="text-3xl font-black text-slate-900 tracking-tight mt-0.5">9,654</div>
          </div>

          <!-- Segmented Multi-Color Progress Bar -->
          <div class="mb-6">
            <div class="h-4 w-full flex gap-1.5 p-0.5 bg-slate-50 rounded-xl overflow-hidden">
              <!-- Pending: 52% Yellow -->
              <div class="bg-[#facc15] h-full rounded-lg transition-all" style="width: 52%;" title="Pending: 52%"></div>
              <!-- Processing: 28% Cyan -->
              <div class="bg-[#38bdf8] h-full rounded-lg transition-all" style="width: 28%;" title="Processing: 28%"></div>
              <!-- Delivered: 12% Green -->
              <div class="bg-[#22c55e] h-full rounded-lg transition-all" style="width: 12%;" title="Delivered: 12%"></div>
              <!-- Cancelled: 8% Red -->
              <div class="bg-[#f43f5e] h-full rounded-lg transition-all" style="width: 8%;" title="Cancelled: 8%"></div>
            </div>
          </div>

          <!-- Breakdown List -->
          <div class="space-y-3.5">
            <!-- Pending -->
            <div class="flex items-center justify-between py-1.5 border-b border-slate-100">
              <div class="flex items-center gap-2.5">
                <span class="flex h-5 w-5 items-center justify-center rounded-full bg-amber-50 text-amber-500 text-xs font-bold">
                  ☀️
                </span>
                <span class="text-xs font-bold text-slate-700">Pending</span>
              </div>
              <div class="flex items-center gap-3">
                <span class="text-xs font-extrabold text-slate-900">5,020</span>
                <span class="text-xs font-medium text-slate-400 min-w-[28px] text-right">52%</span>
              </div>
            </div>

            <!-- Processing -->
            <div class="flex items-center justify-between py-1.5 border-b border-slate-100">
              <div class="flex items-center gap-2.5">
                <span class="flex h-5 w-5 items-center justify-center rounded-full bg-sky-50 text-sky-500 text-xs font-bold">
                  ⌛
                </span>
                <span class="text-xs font-bold text-slate-700">Processing</span>
              </div>
              <div class="flex items-center gap-3">
                <span class="text-xs font-extrabold text-slate-900">2,703</span>
                <span class="text-xs font-medium text-slate-400 min-w-[28px] text-right">28%</span>
              </div>
            </div>

            <!-- Delivered -->
            <div class="flex items-center justify-between py-1.5 border-b border-slate-100">
              <div class="flex items-center gap-2.5">
                <span class="flex h-5 w-5 items-center justify-center rounded-full bg-emerald-50 text-emerald-600 text-xs font-bold">
                  ✓
                </span>
                <span class="text-xs font-bold text-slate-700">Delivered</span>
              </div>
              <div class="flex items-center gap-3">
                <span class="text-xs font-extrabold text-slate-900">1,158</span>
                <span class="text-xs font-medium text-slate-400 min-w-[28px] text-right">12%</span>
              </div>
            </div>

            <!-- Cancelled -->
            <div class="flex items-center justify-between py-1.5">
              <div class="flex items-center gap-2.5">
                <span class="flex h-5 w-5 items-center justify-center rounded-full bg-rose-50 text-rose-500 text-xs font-bold">
                  ✕
                </span>
                <span class="text-xs font-bold text-slate-700">Cancelled</span>
              </div>
              <div class="flex items-center gap-3">
                <span class="text-xs font-extrabold text-slate-900">773</span>
                <span class="text-xs font-medium text-slate-400 min-w-[28px] text-right">8%</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Bottom Section: Orders list Table Card -->
    <div class="rounded-2xl border border-slate-200/90 bg-white p-6 shadow-2xs">
      <!-- Table Header & Filter Bar -->
      <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
        <h2 class="text-lg font-bold text-slate-900">Orders list</h2>

        <div class="flex flex-wrap items-center gap-2.5">
          <!-- Search Input -->
          <div class="relative">
            <span class="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-xs">🔍</span>
            <input
              v-model="searchQuery"
              type="text"
              placeholder="Search"
              class="h-9 w-48 sm:w-56 rounded-xl border border-slate-200 bg-white pl-8 pr-3 text-xs text-slate-800 placeholder-slate-400 outline-none transition focus:border-[#4318ff] focus:ring-2 focus:ring-[#4318ff]/15"
            />
          </div>

          <!-- Date Filter Button -->
          <button
            type="button"
            class="h-9 inline-flex items-center gap-1.5 rounded-xl border border-slate-200 bg-white px-3 py-1.5 text-xs font-semibold text-slate-700 shadow-2xs hover:bg-slate-50 transition cursor-pointer"
          >
            <span>📅</span>
            <span>2 Jun - 6 Jun</span>
            <span class="text-[10px] text-slate-400">▼</span>
          </button>

          <!-- Sort Button -->
          <button
            type="button"
            class="h-9 inline-flex items-center gap-1.5 rounded-xl border border-slate-200 bg-white px-3 py-1.5 text-xs font-semibold text-slate-700 shadow-2xs hover:bg-slate-50 transition cursor-pointer"
          >
            <span>⇅</span>
            <span>Sort by</span>
            <span class="text-[10px] text-slate-400">▼</span>
          </button>
        </div>
      </div>

      <!-- Orders Data Table -->
      <div class="overflow-x-auto">
        <table class="w-full text-left border-collapse">
          <thead>
            <tr class="border-b border-slate-100 text-[11px] font-bold uppercase tracking-wider text-slate-400">
              <th class="py-3 px-3">
                <div class="flex items-center gap-1 cursor-pointer hover:text-slate-600">
                  <span>Order ID</span>
                  <span class="text-[10px]">↕</span>
                </div>
              </th>
              <th class="py-3 px-3">
                <div class="flex items-center gap-1 cursor-pointer hover:text-slate-600">
                  <span>Product</span>
                  <span class="text-[10px]">↕</span>
                </div>
              </th>
              <th class="py-3 px-3">
                <div class="flex items-center gap-1 cursor-pointer hover:text-slate-600">
                  <span>Customer</span>
                  <span class="text-[10px]">↕</span>
                </div>
              </th>
              <th class="py-3 px-3">
                <div class="flex items-center gap-1 cursor-pointer hover:text-slate-600">
                  <span>Order date</span>
                  <span class="text-[10px]">↕</span>
                </div>
              </th>
              <th class="py-3 px-3">
                <div class="flex items-center gap-1 cursor-pointer hover:text-slate-600">
                  <span>Status</span>
                  <span class="text-[10px]">↕</span>
                </div>
              </th>
              <th class="py-3 px-3 text-right">
                <div class="flex items-center justify-end gap-1 cursor-pointer hover:text-slate-600">
                  <span>Price($)</span>
                </div>
              </th>
            </tr>
          </thead>
          <tbody class="divide-y divide-slate-100 text-xs">
            <tr
              v-for="order in filteredOrders"
              :key="order.id"
              class="hover:bg-slate-50/70 transition-colors"
            >
              <!-- Order ID -->
              <td class="py-3.5 px-3 font-bold text-slate-900 whitespace-nowrap">
                {{ order.id }}
              </td>

              <!-- Product with Thumbnail -->
              <td class="py-3.5 px-3">
                <div class="flex items-center gap-3">
                  <div class="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-slate-100 border border-slate-200/60 overflow-hidden text-base">
                    <span>{{ order.icon }}</span>
                  </div>
                  <div>
                    <div class="font-bold text-slate-900 leading-tight">{{ order.product }}</div>
                    <div class="text-[11px] text-slate-400 mt-0.5">{{ order.subtitle }}</div>
                  </div>
                </div>
              </td>

              <!-- Customer -->
              <td class="py-3.5 px-3 font-semibold text-slate-700 whitespace-nowrap">
                {{ order.customer }}
              </td>

              <!-- Order Date -->
              <td class="py-3.5 px-3 text-slate-500 whitespace-nowrap">
                {{ order.date }}
              </td>

              <!-- Status Badge -->
              <td class="py-3.5 px-3 whitespace-nowrap">
                <span
                  class="inline-flex items-center px-2.5 py-0.5 rounded-full text-[11px] font-bold capitalize"
                  :class="statusBadgeClass(order.status)"
                >
                  {{ order.status }}
                </span>
              </td>

              <!-- Price -->
              <td class="py-3.5 px-3 font-extrabold text-slate-900 text-right whitespace-nowrap">
                ${{ order.price.toLocaleString() }}
              </td>
            </tr>

            <tr v-if="filteredOrders.length === 0">
              <td colspan="6" class="text-center py-8 text-xs text-slate-400">
                No orders found matching "{{ searchQuery }}".
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'

definePageMeta({
  layout: 'admin'
})

useHead({
  title: 'Dashboard - Khmer VTBiz',
  meta: [
    { name: 'description', content: 'Modern Analytics and Operations Dashboard.' }
  ]
})

// Current User Display
const auth = useAuth()
const userName = computed(() => {
  const meta = auth.user.value?.user_metadata
  if (meta?.full_name) return meta.full_name.split(' ')[0]
  if (meta?.name) return meta.name.split(' ')[0]
  return 'Andrew'
})

// Interactive Filter States
const chartView = ref<'bar' | 'line'>('bar')
const salesPeriod = ref('1Y')
const distPeriod = ref('1Y')
const searchQuery = ref('')

// Monthly Sales Performance Data (Dual-bar comparison matching screenshot)
const monthlyPerformance = ref([
  { month: 'Jan', lastYearPct: 45, thisYearPct: 65, lastYearVal: '$45k', thisYearVal: '$65k', highlighted: false },
  { month: 'Feb', lastYearPct: 40, thisYearPct: 58, lastYearVal: '$40k', thisYearVal: '$58k', highlighted: false },
  { month: 'Mar', lastYearPct: 55, thisYearPct: 78, lastYearVal: '$55k', thisYearVal: '$78k', highlighted: false },
  { month: 'Apr', lastYearPct: 50, thisYearPct: 62, lastYearVal: '$50k', thisYearVal: '$62k', highlighted: false },
  { month: 'May', lastYearPct: 38, thisYearPct: 75, lastYearVal: '$38k', thisYearVal: '$75k', highlighted: false },
  { month: 'Jun', lastYearPct: 80, thisYearPct: 100, lastYearVal: '$80k', thisYearVal: '$105k', highlighted: true },
  { month: 'Jul', lastYearPct: 58, thisYearPct: 68, lastYearVal: '$58k', thisYearVal: '$68k', highlighted: false },
  { month: 'Aug', lastYearPct: 48, thisYearPct: 72, lastYearVal: '$48k', thisYearVal: '$72k', highlighted: false },
  { month: 'Sep', lastYearPct: 70, thisYearPct: 88, lastYearVal: '$70k', thisYearVal: '$88k', highlighted: false },
  { month: 'Oct', lastYearPct: 62, thisYearPct: 80, lastYearVal: '$62k', thisYearVal: '$80k', highlighted: false },
  { month: 'Nov', lastYearPct: 55, thisYearPct: 84, lastYearVal: '$55k', thisYearVal: '$84k', highlighted: false },
  { month: 'Dec', lastYearPct: 68, thisYearPct: 96, lastYearVal: '$68k', thisYearVal: '$96k', highlighted: false }
])

// Orders List Table Data
const orders = ref([
  {
    id: '#05821',
    product: 'Apple studio display',
    subtitle: '27" Retina 5K, Nano-texture',
    icon: '🖥️',
    customer: 'Daniel Wesley',
    date: 'Jun 02, 2026',
    status: 'Pending',
    price: 1599
  },
  {
    id: '#05822',
    product: 'Ergonomic Chair Pro',
    subtitle: 'Lumbar support, mesh back',
    icon: '🪑',
    customer: 'Karen Page',
    date: 'Jun 02, 2026',
    status: 'Delivered',
    price: 2750
  },
  {
    id: '#05823',
    product: 'Wooden Bookshelf',
    subtitle: '6-tier, solid oak finish',
    icon: '📚',
    customer: 'Foggy Nelson',
    date: 'Jun 03, 2026',
    status: 'Delivered',
    price: 1900
  },
  {
    id: '#05824',
    product: 'MacBook Pro M3 Max',
    subtitle: '16-inch, 36GB RAM, 1TB SSD',
    icon: '💻',
    customer: 'Matt Murdock',
    date: 'Jun 04, 2026',
    status: 'Processing',
    price: 3499
  },
  {
    id: '#05825',
    product: 'Wireless Noise-Cancelling Headphones',
    subtitle: 'Spatial audio, 40h battery',
    icon: '🎧',
    customer: 'Claire Temple',
    date: 'Jun 05, 2026',
    status: 'Cancelled',
    price: 399
  }
])

// Filtered Orders
const filteredOrders = computed(() => {
  if (!searchQuery.value.trim()) return orders.value
  const q = searchQuery.value.toLowerCase()
  return orders.value.filter(
    (o) =>
      o.id.toLowerCase().includes(q) ||
      o.product.toLowerCase().includes(q) ||
      o.customer.toLowerCase().includes(q) ||
      o.status.toLowerCase().includes(q)
  )
})

// Status Badge Styling Helper
const statusBadgeClass = (status: string) => {
  switch (status.toLowerCase()) {
    case 'pending':
      return 'bg-amber-50 text-amber-800 border border-amber-200/80'
    case 'delivered':
      return 'bg-emerald-50 text-emerald-800 border border-emerald-200/80'
    case 'processing':
      return 'bg-sky-50 text-sky-800 border border-sky-200/80'
    case 'cancelled':
      return 'bg-rose-50 text-rose-800 border border-rose-200/80'
    default:
      return 'bg-slate-100 text-slate-700'
  }
}
</script>
