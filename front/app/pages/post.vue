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
        <div class="bg-white rounded shadow-sm border-t-4 border-[#28a745] flex flex-col">
          <div class="p-4 border-b border-gray-100">
            <h3 class="text-lg font-medium text-gray-800 m-0">{{ editingId ? 'Edit Post' : 'Create Post' }}</h3>
          </div>
          <div class="p-4">
            <div class="p-6 bg-gray-100 rounded-lg mb-8">
      <h3 class="text-xl font-semibold mb-4">{{ editingId ? 'Edit Post' : 'Create Post' }}</h3>
      <form @submit.prevent="saveItem" class="flex flex-col gap-4">
        <input v-model="form.title" placeholder="Post Title" required class="p-3 border border-gray-300 rounded bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#28a745]" />
        
        <select v-model="form.category_id" class="p-3 border border-gray-300 rounded bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#28a745]" required>
          <option value="" disabled>Select a Category</option>
          <option v-for="cat in categories" :key="cat.id" :value="cat.id">
            {{ cat.name }}
          </option>
        </select>

        <select v-model="form.author_id" class="p-3 border border-gray-300 rounded bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#28a745]" required>
          <option value="" disabled>Select an Author</option>
          <option v-for="author in authors" :key="author.id" :value="author.id">
            {{ author.name }}
          </option>
        </select>

        <textarea v-model="form.content" placeholder="Post Content" required rows="3" class="p-3 border border-gray-300 rounded bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#28a745]"></textarea>
        <div class="flex gap-4 mt-2">
          <button type="submit" class="px-6 py-3 bg-[#28a745] text-white rounded hover:bg-green-700 transition font-medium">{{ editingId ? 'Update' : 'Create' }}</button>
          <button type="button" class="px-6 py-3 bg-gray-500 text-white rounded hover:bg-gray-600 transition font-medium" v-if="editingId" @click="cancelEdit">Cancel</button>
        </div>
      </form>
    </div>
          </div>
        </div>
      </div>

      <!-- Table Card -->
      <div class="w-full lg:w-2/3 px-3 mb-6">
        <div class="bg-white rounded shadow-sm border-t-4 border-gray-300 flex flex-col overflow-hidden">
           <div class="p-4 border-b border-gray-100 flex justify-between items-center bg-gray-50/50">
            <h3 class="text-lg font-medium text-gray-800 m-0">Post List</h3>
             <div class="relative">
                 <input type="text" placeholder="Search" class="pl-3 pr-8 py-1.5 border border-gray-300 rounded text-sm focus:outline-none focus:border-[#28a745] w-56 text-gray-900 bg-white placeholder-gray-400"/>
                 <svg class="w-4 h-4 text-gray-400 absolute right-2.5 top-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
             </div>
          </div>
          <div class="p-0 overflow-x-auto">
            <table class="w-full text-left text-sm whitespace-nowrap">
              <thead class="bg-gray-50 border-b border-gray-200 text-gray-600 font-semibold uppercase text-xs">
                <tr>
                  <th class="px-5 py-3 w-16 text-center">ID</th>
                  <th class="px-5 py-3 w-48">Title</th>
                  <th class="px-5 py-3 w-32">Category</th>
                  <th class="px-5 py-3 w-32">Author</th>
                  <th class="px-5 py-3">Content</th>
                  <th class="px-5 py-3 w-32 text-center">Actions</th>
                </tr>
              </thead>
              <tbody class="text-gray-800">
                <tr v-if="items.length === 0">
                    <td colspan="6" class="px-5 py-8 text-center text-gray-500">No posts found. Create one to see it here.</td>
                </tr>
                <tr v-for="item in items" :key="item.id" class="border-b border-gray-100 hover:bg-green-50/50 transition-colors">
                  <td class="px-5 py-3 text-center align-middle text-gray-600">{{ item.id }}</td>
                  <td class="px-5 py-3 align-middle font-medium truncate max-w-xs" :title="item.title">{{ item.title }}</td>
                  <td class="px-5 py-3 align-middle text-gray-600">
                    <span class="bg-gray-200 text-gray-700 py-1 px-2 rounded text-xs" v-if="item.category">{{ item.category.name }}</span>
                    <span class="text-gray-400 italic text-xs" v-else>None</span>
                  </td>
                  <td class="px-5 py-3 align-middle text-gray-600">
                    <span class="font-medium" v-if="item.author">{{ item.author.name }}</span>
                    <span class="text-gray-400 italic text-xs" v-else>None</span>
                  </td>
                  <td class="px-5 py-3 align-middle text-gray-600 truncate max-w-sm" :title="item.content">{{ item.content }}</td>
                  <td class="px-5 py-3 align-middle text-center">
                    <button @click="editItem(item)" class="text-green-600 hover:text-green-800 bg-green-50 hover:bg-green-200 p-1.5 rounded transition mr-2 inline-flex" title="Edit">
                       <svg class="w-4 h-4" auto fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path></svg>
                    </button>
                    <button @click="deleteItem(item.id)" class="text-red-500 hover:text-red-700 bg-red-50 hover:bg-red-100 p-1.5 rounded transition inline-flex" title="Delete">
                        <svg class="w-4 h-4" auto fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path></svg>
                    </button>
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
const form = ref({ title: '', content: '', category_id: '', author_id: '' })
const editingId = ref(null)
const API_URL = 'http://localhost:3001/post'
const CAT_API_URL = 'http://localhost:3001/category'
const AUTH_API_URL = 'http://localhost:3001/authors' // Updated to match AuthorController path

const fetchItems = async () => {
  try {
    const res = await fetch(API_URL)
    items.value = await res.json()
  } catch (err) {
    console.error(err)
  }
}

const fetchCategories = async () => {
  try {
    const res = await fetch(CAT_API_URL)
    categories.value = await res.json()
  } catch (err) {
    console.error(err)
  }
}

const fetchAuthors = async () => {
  try {
    const res = await fetch(AUTH_API_URL)
    authors.value = await res.json()
  } catch (err) {
    console.error(err)
  }
}

const saveItem = async () => {
  try {
    // Ensure relations are numbers
    form.value.category_id = Number(form.value.category_id)
    form.value.author_id = Number(form.value.author_id)
    
    if (editingId.value) {
      await fetch(`${API_URL}/${editingId.value}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form.value)
      })
    } else {
      await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form.value)
      })
    }
    cancelEdit()
    await fetchItems()
  } catch (err) {
    console.error(err)
  }
}

const editItem = (item) => {
  form.value = { 
    title: item.title, 
    content: item.content, 
    category_id: item.category?.id || item.category_id || '',
    author_id: item.author?.id || item.author_id || '' 
  }
  editingId.value = item.id
}

const cancelEdit = () => {
  form.value = { title: '', content: '', category_id: '', author_id: '' }
  editingId.value = null
}

const deleteItem = async (id) => {
  if (!confirm('Are you sure you want to delete this post?')) return
  try {
    await fetch(`${API_URL}/${id}`, { method: 'DELETE' })
    await fetchItems()
  } catch (err) {
    console.error(err)
  }
}

onMounted(() => {
  fetchItems()
  fetchCategories()
  fetchAuthors()
})
</script>
