<template>
  <div class="max-w-4xl mx-auto my-8 p-8 bg-white rounded-lg shadow-sm">
    <div class="flex justify-between items-center mb-8 border-b border-gray-200 pb-4">
      <h1 class="text-3xl font-bold">Dashboard</h1>
    </div>
    <div class="flex gap-4">
      <NuxtLink to="/category" class="flex-1 p-8 text-center border border-gray-200 rounded-lg text-xl font-bold hover:bg-gray-50 transition-colors text-gray-800">
        Categories
      </NuxtLink>
      <NuxtLink to="/post" class="flex-1 p-8 text-center border border-gray-200 rounded-lg text-xl font-bold hover:bg-gray-50 transition-colors text-gray-800">
        Posts
      </NuxtLink>
    </div>
  </div>
</template>
