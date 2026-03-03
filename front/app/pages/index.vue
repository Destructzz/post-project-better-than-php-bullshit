<template>
  <div>
    <h1 class="text-3xl font-extrabold text-gray-900 mb-8">Latest Posts</h1>
    <div class="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <div v-if="posts.length === 0" class="col-span-full text-center text-gray-500 py-12 bg-white rounded shadow-sm">
            No posts available yet.
        </div>
        <div v-for="post in posts" :key="post.id" class="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden hover:shadow-md hover:border-blue-300 transition-all flex flex-col group">
            <div class="flex items-center gap-2 mb-2 p-5 pb-0">
                <span v-if="post.category" class="text-[10px] font-bold text-blue-700 bg-blue-50 px-2 py-0.5 rounded uppercase tracking-widest">{{ post.category.name }}</span>
            </div>
            <div class="p-5 pt-3 flex flex-col flex-1">
                <h2 class="text-xl font-bold mb-2 text-gray-900 line-clamp-2 leading-tight group-hover:text-blue-600 transition-colors">
                    <NuxtLink :to="`/post-${post.id}`" class="block w-full h-full">{{ post.title }}</NuxtLink>
                </h2>
                <p class="text-gray-600 text-sm mb-4 line-clamp-3 overflow-hidden leading-relaxed">{{ post.content }}</p>
                
                <div class="mt-auto">
                    <div class="flex flex-wrap gap-1.5 mb-3" v-if="post.tags && post.tags.length">
                        <span v-for="tag in post.tags" :key="tag.id" class="text-[10px] font-medium bg-gray-100 text-gray-500 px-2 py-0.5 rounded-full border border-gray-200 hover:bg-gray-200 transition">#{{ tag.name }}</span>
                    </div>
                </div>
            </div>
            <div class="px-5 py-3 border-t border-gray-100 bg-gray-50/50 text-xs text-gray-500 flex justify-between items-center mt-auto font-medium">
                <span>By {{ post.author ? post.author.name : 'Unknown' }}</span>
                <NuxtLink :to="`/post-${post.id}`" class="text-blue-600 hover:text-blue-800 font-bold group-hover:underline">Read more &rarr;</NuxtLink>
            </div>
        </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'

const posts = ref([])

onMounted(async () => {
    try {
        const res = await fetch('http://localhost:3001/post')
        if(res.ok) posts.value = await res.json()
    } catch(err) {
        console.error(err)
    }
})
</script>
