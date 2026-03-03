<template>
  <div class="min-h-screen bg-[#f4f6f9] font-sans text-gray-800 flex">
    <!-- Sidebar -->
    <aside class="w-64 bg-[#343a40] text-gray-300 min-h-screen flex flex-col fixed h-full z-20 shadow-lg">
      <!-- Brand Logo -->
      <NuxtLink to="/" class="flex items-center px-4 py-4 text-xl border-b border-gray-600 hover:text-white transition-colors">
        <span class="font-semibold text-white ml-2">AdminLTE Nuxt</span>
      </NuxtLink>

      <!-- Sidebar Menu -->
      <div class="mt-4 flex-1 overflow-y-auto px-2">
         <nav class="flex flex-col gap-1">
            <NuxtLink to="/" class="flex items-center px-4 py-3 rounded hover:bg-white/10 transition-colors" active-class="bg-[#007bff] text-white hover:bg-[#007bff]">
              <span>Dashboard</span>
            </NuxtLink>
            <NuxtLink to="/category" class="flex items-center px-4 py-3 rounded hover:bg-white/10 transition-colors" active-class="bg-[#007bff] text-white hover:bg-[#007bff]">
              <span>Categories</span>
            </NuxtLink>
            <NuxtLink to="/authors" class="flex items-center px-4 py-3 rounded hover:bg-white/10 transition-colors" active-class="bg-[#007bff] text-white hover:bg-[#007bff]">
              <span>Authors</span>
            </NuxtLink>
            <NuxtLink to="/post" class="flex items-center px-4 py-3 rounded hover:bg-white/10 transition-colors" active-class="bg-[#007bff] text-white hover:bg-[#007bff]">
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
                <li><NuxtLink to="/" class="text-gray-500 hover:text-gray-700 font-medium pt-1">Home</NuxtLink></li>
            </ul>
        </div>
        <div>
            <!-- Header Right Menu -->
            <span class="text-sm text-gray-500 font-medium">Logged in</span>
        </div>
      </nav>

      <!-- Content -->
      <main class="p-6 flex-1">
        <NuxtRouteAnnouncer />
        <NuxtPage />
      </main>

      <!-- Footer -->
      <footer class="mt-auto bg-white border-t border-gray-200 px-6 py-4 flex justify-between items-center text-sm text-gray-600 shadow-inner">
        <div><strong>Copyright &copy; 2026 <a href="#" class="text-blue-500">AdminLTE Nuxt</a>.</strong> All rights reserved.</div>
        <div><b>Version</b> 1.0.0</div>
      </footer>
    </div>
  </div>
</template>

<style>
/* Make all pages inherit parent styling smoothly */
body {
  margin: 0;
}
</style>
