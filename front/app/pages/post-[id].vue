<template>
  <div v-if="post" class="bg-white rounded-xl shadow-sm border border-gray-200 p-8 md:p-12 mb-8">
     <NuxtLink to="/" class="text-blue-500 hover:text-blue-700 font-semibold text-sm mb-6 inline-flex items-center transition-colors">
         <svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path></svg>
         Back to all posts
     </NuxtLink>
     
     <div class="flex gap-2 items-center mb-4">
        <span v-if="post.category" class="bg-blue-50 text-blue-700 font-bold text-xs px-2.5 py-1 rounded border border-blue-100 uppercase tracking-widest">{{ post.category.name }}</span>
     </div>
     
     <h1 class="text-4xl md:text-5xl font-extrabold text-gray-900 mb-6 leading-tight">{{ post.title }}</h1>
     
     <div class="text-gray-500 text-sm mb-8 flex items-center gap-4 border-b border-gray-100 pb-6">
        <span class="font-medium text-gray-700">By <strong class="text-gray-900">{{ post.author ? post.author.name : 'Unknown' }}</strong></span>
        <span class="text-gray-300">|</span>
        <span class="uppercase tracking-widest text-[11px] font-bold">Published</span>
     </div>
     
     <div class="prose max-w-none text-gray-800 text-lg mb-10 leading-relaxed whitespace-pre-wrap font-serif">
        {{ post.content }}
     </div>
     
     <div class="mt-8 pt-8 border-t border-gray-100" v-if="post.tags && post.tags.length">
        <h3 class="text-xs font-bold text-gray-400 mb-3 uppercase tracking-widest">Tags in this article</h3>
        <div class="flex flex-wrap gap-2">
            <span v-for="tag in post.tags" :key="tag.id" class="bg-gray-100 text-gray-600 hover:bg-gray-200 hover:text-gray-900 transition-colors px-3 py-1.5 rounded text-sm font-medium border border-gray-200 cursor-default">#{{ tag.name }}</span>
        </div>
     </div>
  </div>
  <div v-else class="text-center py-20">
      <div class="animate-pulse flex flex-col items-center">
          <div class="h-4 bg-gray-200 rounded w-1/4 mb-4"></div>
          <div class="h-8 bg-gray-200 rounded w-3/4 mb-6"></div>
          <div class="h-4 bg-gray-200 rounded w-full mb-2"></div>
          <div class="h-4 bg-gray-200 rounded w-full mb-2"></div>
          <div class="h-4 bg-gray-200 rounded w-5/6"></div>
      </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const post = ref(null)

onMounted(async () => {
    try {
        const res = await fetch(`http://localhost:3001/post/${route.params.id}`)
        if(res.ok) post.value = await res.json()
    } catch(err) {
        console.error(err)
    }
})
</script>
