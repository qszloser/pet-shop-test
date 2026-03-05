<template>
  <div class="relative">
    <button 
      @click="toggleMenu"
      class="-mb-[6px] font-semibold rounded-full truncate px-3 py-1 text-sm border flex items-center hover:bg-gray-100 transition-colors"
    >
      Starter
      <span class="ml-1 transition-transform duration-200" :class="{ 'rotate-180': isOpen }">▼</span>
    </button>
    <div v-if="isOpen" class="absolute top-full left-0 mt-1 bg-white border rounded-md shadow-lg min-w-[200px] py-1 z-10">
      <a href="https://starter-template.nuxt.dev/" class="block px-4 py-2 text-sm hover:bg-gray-100">Starter</a>
      <a href="https://landing-template.nuxt.dev/" class="block px-4 py-2 text-sm hover:bg-gray-100">Landing</a>
      <a href="https://docs-template.nuxt.dev/" class="block px-4 py-2 text-sm hover:bg-gray-100">Docs</a>
      <a href="https://saas-template.nuxt.dev/" class="block px-4 py-2 text-sm hover:bg-gray-100">SaaS</a>
      <a href="https://dashboard-template.nuxt.dev/" class="block px-4 py-2 text-sm hover:bg-gray-100">Dashboard</a>
      <a href="https://chat-template.nuxt.dev/" class="block px-4 py-2 text-sm hover:bg-gray-100">Chat</a>
      <a href="https://portfolio-template.nuxt.dev/" class="block px-4 py-2 text-sm hover:bg-gray-100">Portfolio</a>
      <a href="https://changelog-template.nuxt.dev/" class="block px-4 py-2 text-sm hover:bg-gray-100">Changelog</a>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const isOpen = ref(false)

const toggleMenu = () => {
  isOpen.value = !isOpen.value
}
</script>
