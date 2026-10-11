<template>
  <div class="flex min-h-screen items-center justify-center bg-slate-50 font-sans">
    <div class="text-center">
      <div class="mx-auto mb-4 h-8 w-8 animate-spin rounded-full border-4 border-blue-600 border-t-transparent"></div>
      <p class="text-sm font-medium text-slate-600">Loading Dashboard...</p>
    </div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  layout: false
})

navigateTo('/dashboard')
</script>