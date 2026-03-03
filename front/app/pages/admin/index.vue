<template>
  <div>
    <!-- Content Header -->
    <div class="mb-6 flex justify-between items-center">
      <h1 class="text-2xl font-semibold text-gray-800 m-0">Dashboard</h1>
      <ol class="flex text-sm text-gray-500 bg-transparent mb-0">
        <li class="mr-2"><NuxtLink to="/admin" class="text-blue-500 hover:underline">Home</NuxtLink></li>
        <li>/ Dashboard</li>
      </ol>
    </div>

    <!-- Small boxes -->
    <div class="flex flex-wrap -mx-3">
      <!-- Category Box -->
      <div class="w-full sm:w-1/2 lg:w-1/3 px-3 mb-6">
        <div class="bg-[#17a2b8] rounded p-4 text-white shadow-sm relative overflow-hidden group h-[140px] flex flex-col justify-between">
          <div class="relative z-10">
            <h3 class="text-4xl font-bold mb-1">{{ stats.categoriesCount }}</h3>
            <p class="text-lg opacity-90 font-medium font-medium">Categories</p>
          </div>
          <div class="absolute right-4 top-4 text-black/10 transition-transform duration-300 transform group-hover:scale-110">
            <svg class="w-16 h-16" fill="currentColor" viewBox="0 0 20 20"><path d="M4 3a2 2 0 100 4h12a2 2 0 100-4H4zM4 9a2 2 0 100 4h12a2 2 0 100-4H4zM4 15a2 2 0 100 4h12a2 2 0 100-4H4z"></path></svg>
          </div>
          <NuxtLink to="/admin/category" class="block w-full text-center bg-black/10 py-1.5 mt-4 text-sm font-medium hover:bg-black/20 hover:text-white transition-colors z-10 absolute bottom-0 left-0 right-0">
             More info <span class="ml-1 inline-block bg-white/20 rounded-full w-4 h-4 text-xs leading-4 text-center">→</span>
          </NuxtLink>
        </div>
      </div>

      <!-- Post Box -->
      <div class="w-full sm:w-1/2 lg:w-1/3 px-3 mb-6">
        <div class="bg-[#28a745] rounded p-4 text-white shadow-sm relative overflow-hidden group h-[140px] flex flex-col justify-between">
          <div class="relative z-10">
            <h3 class="text-4xl font-bold mb-1">{{ stats.postsCount }}</h3>
            <p class="text-lg opacity-90 font-medium font-medium">Posts</p>
          </div>
          <div class="absolute right-4 top-4 text-black/10 transition-transform duration-300 transform group-hover:scale-110">
             <svg class="w-16 h-16" fill="currentColor" viewBox="0 0 20 20"><path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z"></path><path fill-rule="evenodd" d="M4 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v11a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm3 4a1 1 0 000 2h.01a1 1 0 100-2H7zm3 0a1 1 0 000 2h3a1 1 0 100-2h-3zm-3 4a1 1 0 100 2h.01a1 1 0 100-2H7zm3 0a1 1 0 100 2h3a1 1 0 100-2h-3z" clip-rule="evenodd"></path></svg>
          </div>
          <NuxtLink to="/admin/post" class="block w-full text-center bg-black/10 py-1.5 mt-4 text-sm font-medium hover:bg-black/20 hover:text-white transition-colors z-10 absolute bottom-0 left-0 right-0">
             More info <span class="ml-1 inline-block bg-white/20 rounded-full w-4 h-4 text-xs leading-4 text-center">→</span>
          </NuxtLink>
        </div>
      </div>

      <!-- Author Box -->
      <div class="w-full sm:w-1/2 lg:w-1/3 px-3 mb-6">
        <div class="bg-[#ffc107] rounded p-4 shadow-sm relative overflow-hidden group h-[140px] flex flex-col justify-between">
          <div class="relative z-10 text-gray-800">
            <h3 class="text-4xl font-bold mb-1">{{ stats.authorsCount }}</h3>
            <p class="text-lg opacity-90 font-medium font-medium">Authors</p>
          </div>
          <div class="absolute right-4 top-4 text-black/10 transition-transform duration-300 transform group-hover:scale-110">
             <svg class="w-16 h-16" fill="currentColor" viewBox="0 0 20 20"><path d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"></path></svg>
          </div>
          <NuxtLink to="/admin/authors" class="block w-full text-center bg-black/20 py-1.5 mt-4 text-sm font-medium hover:bg-black/30 transition-colors z-10 absolute bottom-0 left-0 right-0 text-gray-800 font-bold">
             More info <span class="ml-1 inline-block bg-white/20 rounded-full w-4 h-4 text-xs leading-4 text-center">→</span>
          </NuxtLink>
        </div>
      </div>

      <!-- Tag Box -->
      <div class="w-full sm:w-1/2 lg:w-1/3 px-3 mb-6">
        <div class="bg-[#6c757d] rounded p-4 text-white shadow-sm relative overflow-hidden group h-[140px] flex flex-col justify-between">
          <div class="relative z-10">
            <h3 class="text-4xl font-bold mb-1">{{ stats.tagsCount }}</h3>
            <p class="text-lg opacity-90 font-medium">Tags</p>
          </div>
          <div class="absolute right-4 top-4 text-black/10 transition-transform duration-300 transform group-hover:scale-110">
             <svg class="w-16 h-16" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M17.707 9.293a1 1 0 010 1.414l-7 7a1 1 0 01-1.414 0l-7-7A.997.997 0 012 10V5a3 3 0 013-3h5c.266 0 .52.105.707.293l7 7zM5 6a1 1 0 100-2 1 1 0 000 2z" clip-rule="evenodd"></path></svg>
          </div>
          <NuxtLink to="/admin/tags" class="block w-full text-center bg-black/10 py-1.5 mt-4 text-sm font-medium hover:bg-black/20 hover:text-white transition-colors z-10 absolute bottom-0 left-0 right-0">
             More info <span class="ml-1 inline-block bg-white/20 rounded-full w-4 h-4 text-xs leading-4 text-center">→</span>
          </NuxtLink>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { authFetch } from '../../utils/api.js'

definePageMeta({ layout: 'admin' })

const stats = ref({ authorsCount: 0, categoriesCount: 0, postsCount: 0, tagsCount: 0 })
const API_URL = 'http://localhost:3001/dashboard/stats'

const fetchStats = async () => {
  try {
    const res = await authFetch(API_URL)
    if (res.ok) {
        stats.value = await res.json()
    }
  } catch (err) {
    console.error('Failed to fetch stats:', err)
  }
}

onMounted(() => {
  fetchStats()
})
</script>
