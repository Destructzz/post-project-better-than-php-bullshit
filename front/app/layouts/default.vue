<template>
  <div class="min-h-screen bg-gray-50 text-gray-900 font-sans flex flex-col">
    <header class="bg-white shadow-sm border-b border-gray-200">
      <div class="max-w-5xl mx-auto px-4 py-4 flex justify-between items-center">
        <NuxtLink to="/" class="text-2xl font-bold text-blue-600 hover:text-blue-700 transition">MyBlog</NuxtLink>
        <div class="flex gap-4">
            <NuxtLink to="/admin" class="text-sm font-semibold text-gray-600 hover:text-blue-600 transition bg-gray-100 hover:bg-gray-200 px-4 py-2 rounded">Dashboard</NuxtLink>
            <NuxtLink to="/login" class="text-sm font-semibold text-white hover:bg-blue-700 transition bg-blue-600 px-4 py-2 rounded shadow-sm">Login</NuxtLink>
        </div>
      </div>
    </header>
    <main class="flex-1 max-w-5xl mx-auto px-4 py-8 w-full">
      <slot />
    </main>
    <footer class="bg-white border-t border-gray-200 mt-auto py-6">
      <div class="max-w-5xl mx-auto px-4 text-center text-sm text-gray-500">
        &copy; 2026 MyBlog. All rights reserved.
      </div>
    </footer>
  </div>
</template>
