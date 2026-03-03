<template>
  <div>
    <!-- Content Header -->
    <div class="mb-6 flex justify-between items-center px-1">
      <h1 class="text-2xl font-semibold text-gray-800 m-0">Posts</h1>
      <ol class="flex text-sm text-gray-500 bg-transparent mb-0">
        <li class="mr-2"><NuxtLink to="/" class="text-blue-500 hover:underline">Home</NuxtLink></li>
        <li>/ Posts</li>
      </ol>
    </div>

    <!-- Main row -->
    <div class="flex flex-wrap -mx-3">
      <!-- Form Card -->
      <div class="w-full lg:w-1/3 px-3 mb-6">
        <div class="bg-white rounded shadow-sm border-t-4 border-[#28a745] flex flex-col h-fit">
          <div class="p-4 border-b border-gray-100">
            <h3 class="text-lg font-medium text-gray-800 m-0">{{ editingId ? 'Edit Post' : 'Create Post' }}</h3>
          </div>
          <div class="p-4">
            <form @submit.prevent="saveItem" class="flex flex-col gap-4">
              <div class="flex flex-col gap-1">
                <label class="text-sm font-semibold text-gray-700">Title</label>
                <input v-model="form.title" placeholder="Post Title" required class="p-2.5 border border-gray-300 rounded bg-white text-gray-900 focus:outline-none focus:ring-1 focus:ring-[#28a745] text-sm" />
              </div>
              
              <div class="flex flex-col gap-1">
                 <label class="text-sm font-semibold text-gray-700">Category</label>
                 <select v-model="form.category_id" class="p-2.5 border border-gray-300 rounded bg-white text-gray-900 focus:outline-none focus:ring-1 focus:ring-[#28a745] text-sm" required>
                  <option value="" disabled>Select a Category</option>
                  <option v-for="cat in categories" :key="cat.id" :value="cat.id">
                    {{ cat.name }}
                  </option>
                </select>
              </div>

              <div class="flex flex-col gap-1">
                <label class="text-sm font-semibold text-gray-700">Author</label>
                <select v-model="form.author_id" class="p-2.5 border border-gray-300 rounded bg-white text-gray-900 focus:outline-none focus:ring-1 focus:ring-[#28a745] text-sm" required>
                  <option value="" disabled>Select an Author</option>
                  <option v-for="author in authors" :key="author.id" :value="author.id">
                    {{ author.name }}
                  </option>
                </select>
              </div>

              <!-- Tags Multiselect (Checkboxes) -->
              <div class="flex flex-col gap-1">
                <label class="text-sm font-semibold text-gray-700 mb-1">Tags</label>
                <div class="flex flex-wrap gap-2 p-2.5 border border-gray-300 rounded bg-gray-50 max-h-40 overflow-y-auto">
                    <div v-if="tags.length === 0" class="text-xs text-gray-400 italic py-1 text-center w-full">No tags available. Create some first!</div>
                    <label v-for="tag in tags" :key="tag.id" class="flex items-center gap-1.5 bg-white px-2 py-1 rounded border border-gray-200 cursor-pointer hover:bg-green-50 transition-colors">
                        <input type="checkbox" :value="tag.id" v-model="form.tag_ids" class="rounded text-[#28a745] focus:ring-[#28a745] h-3.5 w-3.5" />
                        <span class="text-xs text-gray-700 select-none">#{{ tag.name }}</span>
                    </label>
                </div>
              </div>

              <div class="flex flex-col gap-1">
                <label class="text-sm font-semibold text-gray-700">Content</label>
                <textarea v-model="form.content" placeholder="Post Content" required rows="4" class="p-2.5 border border-gray-300 rounded bg-white text-gray-900 focus:outline-none focus:ring-1 focus:ring-[#28a745] text-sm"></textarea>
              </div>

              <div class="flex gap-2 mt-2">
                <button type="submit" class="flex-1 py-2.5 bg-[#28a745] text-white rounded hover:bg-green-700 transition font-medium text-sm shadow-sm">{{ editingId ? 'Update Post' : 'Create Post' }}</button>
                <button type="button" class="px-4 py-2.5 bg-gray-200 text-gray-800 rounded hover:bg-gray-300 transition font-medium text-sm border border-gray-300" v-if="editingId" @click="cancelEdit">Cancel</button>
              </div>
            </form>
          </div>
        </div>
      </div>

      <!-- Table Card -->
      <div class="w-full lg:w-2/3 px-3 mb-6">
        <div class="bg-white rounded shadow-sm border-t-4 border-gray-300 flex flex-col overflow-hidden">
           <div class="p-4 border-b border-gray-100 flex justify-between items-center bg-gray-50/50">
            <h3 class="text-lg font-medium text-gray-800 m-0">Post List</h3>
             <div class="relative">
                 <input type="text" placeholder="Search title or content" class="pl-3 pr-8 py-1.5 border border-gray-300 rounded text-sm focus:outline-none focus:border-[#28a745] w-64 text-gray-900 bg-white placeholder-gray-400"/>
                 <svg class="w-4 h-4 text-gray-400 absolute right-2.5 top-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
             </div>
          </div>
          <div class="p-0 overflow-x-auto">
            <table class="w-full text-left text-sm whitespace-nowrap">
              <thead class="bg-gray-50 border-b border-gray-200 text-gray-600 font-semibold uppercase text-xs">
                <tr>
                  <th class="px-5 py-3 w-16 text-center text-xs">ID</th>
                  <th class="px-5 py-3 w-48 text-xs">Title & Tags</th>
                  <th class="px-5 py-3 w-32 text-xs text-center border-l whitespace-normal">Relation Info</th>
                  <th class="px-1 py-3 w-16 text-center text-xs border-l">Actions</th>
                </tr>
              </thead>
              <tbody class="text-gray-800">
                <tr v-if="items.length === 0">
                    <td colspan="4" class="px-5 py-12 text-center text-gray-500 bg-gray-50/20">
                        <svg class="mx-auto h-12 w-12 text-gray-300" auto fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"></path></svg>
                        <p class="mt-2 font-medium">No posts found.</p>
                        <p class="text-xs text-gray-400 mt-1">Start by creating your first article on the left.</p>
                    </td>
                </tr>
                <tr v-for="item in items" :key="item.id" class="border-b border-gray-100 hover:bg-green-50/30 transition-colors align-top">
                  <td class="px-5 py-4 text-center align-middle text-gray-500 font-mono text-xs">{{ item.id }}</td>
                  <td class="px-5 py-4 align-middle">
                    <div class="font-bold text-gray-800 text-base mb-1 truncate max-w-sm" :title="item.title">{{ item.title }}</div>
                    <div class="flex flex-wrap gap-1.5 mt-1 animate-fadeIn">
                        <span v-for="tag in item.tags" :key="tag.id" class="bg-gray-100 text-gray-600 p-0.5 px-2 rounded-full text-[10px] font-bold border border-gray-200 hover:bg-white hover:text-[#28a745] hover:border-[#28a745] cursor-default transition-all">#{{ tag.name }}</span>
                        <span v-if="!item.tags || item.tags.length === 0" class="text-[10px] text-gray-400 italic px-1">no tags</span>
                    </div>
                  </td>
                  <td class="px-5 py-4 align-middle border-l bg-gray-50/30">
                    <div class="text-xs mb-1.5 flex items-center justify-between">
                        <span class="text-gray-400 mr-2 uppercase tracking-tighter font-extrabold text-[9px]">Category</span>
                        <span class="bg-blue-50 text-blue-700 px-2 py-0.5 rounded text-[10px] font-bold border border-blue-100" v-if="item.category">{{ item.category.name }}</span>
                        <span class="text-gray-300 italic text-[10px]" v-else>None</span>
                    </div>
                    <div class="text-xs flex items-center justify-between">
                        <span class="text-gray-400 mr-2 uppercase tracking-tighter font-extrabold text-[9px]">Author</span>
                        <span class="text-gray-700 font-bold text-[11px]" v-if="item.author">{{ item.author.name }}</span>
                        <span class="text-gray-300 italic text-[11px]" v-else>None</span>
                    </div>
                  </td>
                  <td class="px-1 py-4 align-middle text-center border-l bg-gray-50/50">
                    <div class="flex flex-col gap-1 items-center px-2">
                        <button @click="editItem(item)" class="w-full text-green-600 hover:text-white hover:bg-green-600 bg-white border border-green-100 p-1.5 rounded transition shadow-sm text-center flex justify-center" title="Edit">
                           <svg class="w-3.5 h-3.5" auto fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path></svg>
                        </button>
                        <button @click="deleteItem(item.id)" class="w-full text-red-400 hover:text-white hover:bg-red-500 bg-white border border-red-50 p-1.5 rounded transition shadow-sm text-center flex justify-center" title="Delete">
                            <svg class="w-3.5 h-3.5" auto fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path></svg>
                        </button>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'

const items = ref([])
const categories = ref([])
const authors = ref([])
const tags = ref([])
const form = ref({ title: '', content: '', category_id: '', author_id: '', tag_ids: [] })
const editingId = ref(null)

const BASE_URL = 'http://localhost:3001'
const API_URL = `${BASE_URL}/post`
const CAT_API_URL = `${BASE_URL}/category`
const AUTH_API_URL = `${BASE_URL}/authors`
const TAG_API_URL = `${BASE_URL}/tags`

const fetchAll = async () => {
  try {
    const [resPosts, resCats, resAuthors, resTags] = await Promise.all([
      fetch(API_URL).then(r => r.json()),
      fetch(CAT_API_URL).then(r => r.json()),
      fetch(AUTH_API_URL).then(r => r.json()),
      fetch(TAG_API_URL).then(r => r.json())
    ])
    items.value = resPosts
    categories.value = resCats
    authors.value = resAuthors
    tags.value = resTags
  } catch (err) {
    console.error('Fetch error:', err)
  }
}

const saveItem = async () => {
  try {
    const payload = {
        ...form.value,
        category_id: Number(form.value.category_id),
        author_id: Number(form.value.author_id),
        tag_ids: form.value.tag_ids.map(Number)
    }
    
    if (editingId.value) {
      await fetch(`${API_URL}/${editingId.value}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      })
    } else {
      await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      })
    }
    cancelEdit()
    await fetchAll()
  } catch (err) {
    console.error('Save error:', err)
  }
}

const editItem = (item) => {
  form.value = { 
    title: item.title, 
    content: item.content, 
    category_id: item.category?.id || item.category_id || '',
    author_id: item.author?.id || item.author_id || '',
    tag_ids: item.tags ? item.tags.map(t => t.id) : []
  }
  editingId.value = item.id
}

const cancelEdit = () => {
  form.value = { title: '', content: '', category_id: '', author_id: '', tag_ids: [] }
  editingId.value = null
}

const deleteItem = async (id) => {
  if (!confirm('Are you sure you want to delete this post?')) return
  try {
    await fetch(`${API_URL}/${id}`, { method: 'DELETE' })
    await fetchAll()
  } catch (err) {
    console.error('Delete error:', err)
  }
}

onMounted(() => {
  fetchAll()
})
</script>

<style scoped>
.animate-fadeIn {
    animation: fadeIn 0.3s ease-in-out;
}
@keyframes fadeIn {
    from { opacity: 0; transform: translateY(2px); }
    to { opacity: 1; transform: translateY(0); }
}
</style>
