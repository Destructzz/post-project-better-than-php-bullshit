<template>
  <div class="min-h-screen bg-[#f4f6f9] font-sans text-gray-800 flex">
    <!-- Sidebar -->
    <aside class="w-64 bg-[#343a40] text-gray-300 min-h-screen flex flex-col fixed h-full z-20 shadow-lg">
      <!-- Brand Logo -->
      <NuxtLink to="/admin" class="flex items-center px-4 py-4 text-xl border-b border-gray-600 hover:text-white transition-colors">
        <span class="font-semibold text-white ml-2">AdminLTE Nuxt</span>
      </NuxtLink>

      <!-- Sidebar Menu -->
      <div class="mt-4 flex-1 overflow-y-auto px-2">
         <nav class="flex flex-col gap-1">
            <NuxtLink to="/admin" exact-active-class="bg-[#007bff] text-white hover:bg-[#007bff]" class="flex items-center px-4 py-3 rounded hover:bg-white/10 transition-colors">
              <span>Dashboard</span>
            </NuxtLink>
            <NuxtLink to="/admin/category" active-class="bg-[#007bff] text-white hover:bg-[#007bff]" class="flex items-center px-4 py-3 rounded hover:bg-white/10 transition-colors">
              <span>Categories</span>
            </NuxtLink>
            <NuxtLink to="/admin/authors" active-class="bg-[#007bff] text-white hover:bg-[#007bff]" class="flex items-center px-4 py-3 rounded hover:bg-white/10 transition-colors">
              <span>Authors</span>
            </NuxtLink>
            <NuxtLink to="/admin/tags" active-class="bg-[#007bff] text-white hover:bg-[#007bff]" class="flex items-center px-4 py-3 rounded hover:bg-white/10 transition-colors">
              <span>Tags</span>
            </NuxtLink>
            <NuxtLink to="/admin/post" active-class="bg-[#007bff] text-white hover:bg-[#007bff]" class="flex items-center px-4 py-3 rounded hover:bg-white/10 transition-colors">
              <span>Posts</span>
            </NuxtLink>
         </nav>
      </div>
    </aside>

    <!-- Main Content Wrapper -->
    <div class="flex-1 flex flex-col ml-64 min-h-screen">
      <!-- Navbar -->
      <nav class="bg-white border-b border-gray-200 px-4 py-3 flex justify-between items-center shadow-sm z-10 sticky top-0 h-[60px]">
        <div class="flex items-center">
            <ul class="flex space-x-4">
                <li><NuxtLink to="/admin" class="text-gray-500 hover:text-gray-700 font-medium pt-1">Home</NuxtLink></li>
                <li><NuxtLink to="/" class="text-gray-500 hover:text-gray-700 font-medium pt-1">To Client</NuxtLink></li>
            </ul>
        </div>
        <div>
            <!-- Header Right Menu -->
            <span v-if="user" class="text-sm text-gray-500 font-medium">Logged as: <strong class="text-gray-800">{{ user.email }}</strong></span>
            <span v-else class="text-sm text-gray-400 italic">Loading...</span>
        </div>
      </nav>

      <!-- Content -->
      <main class="p-6 flex-1">
        <slot />
      </main>

      <!-- Footer -->
      <footer class="mt-auto bg-white border-t border-gray-200 px-6 py-4 flex justify-between items-center text-sm text-gray-600 shadow-inner">
        <div><strong>Copyright &copy; 2026 <a href="#" class="text-blue-500">AdminLTE Nuxt</a>.</strong> All rights reserved.</div>
        <div><b>Version</b> 1.0.0</div>
      </footer>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { authFetch } from '../utils/api.js'

const user = ref(null)
const router = useRouter()

const fetchMe = async () => {
    try {
        const res = await authFetch('http://localhost:3001/auth/me')
        if (res.ok) {
            const userData = await res.json()
            user.value = userData
            
            // RBAC: Redirect to home if not admin
            if (userData.role !== 'admin') {
                alert('Access Denied: Admins Only')
                router.push('/')
            }
        } else {
            router.push('/login')
        }
    } catch (err) {
        console.error('Failed to fetch user info', err)
        router.push('/login')
    }
}

onMounted(() => {
    fetchMe()
})
</script>

<style>
/* Make all pages inherit parent styling smoothly */
body {
  margin: 0;
}
</style>
