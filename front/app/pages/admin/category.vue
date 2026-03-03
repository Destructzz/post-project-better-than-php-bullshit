<template>
  <div>
    <!-- Content Header -->
    <div class="mb-6 flex justify-between items-center px-1">
      <h1 class="text-2xl font-semibold text-gray-800 m-0">Categories</h1>
      <ol class="flex text-sm text-gray-500 bg-transparent mb-0">
        <li class="mr-2"><NuxtLink to="/admin" class="text-blue-500 hover:underline">Home</NuxtLink></li>
        <li>/ Categories</li>
      </ol>
    </div>

    <!-- Main row -->
    <div class="flex flex-wrap -mx-3">
      <!-- Form Card -->
      <div class="w-full lg:w-1/3 px-3 mb-6">
        <div class="bg-white rounded shadow-sm border-t-4 border-blue-500 flex flex-col">
          <div class="p-4 border-b border-gray-100">
            <h3 class="text-lg font-medium text-gray-800 m-0">{{ editingId ? 'Edit Category' : 'Create Category' }}</h3>
          </div>
          <div class="p-4">
            <form @submit.prevent="saveItem">
              <div class="mb-4">
                <label class="block text-gray-700 text-sm font-bold mb-2">Category Name</label>
                <input v-model="form.name" placeholder="Enter name" required class="w-full px-3 py-2 border border-gray-300 rounded text-sm focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 text-gray-900 bg-white" />
              </div>
              <div class="mb-4">
                <label class="block text-gray-700 text-sm font-bold mb-2">Description</label>
                <textarea v-model="form.description" placeholder="Enter description" required rows="3" class="w-full px-3 py-2 border border-gray-300 rounded text-sm focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 text-gray-900 bg-white"></textarea>
              </div>
              <div class="flex items-center">
                <button type="submit" class="bg-blue-600 text-white px-4 py-2 rounded text-sm hover:bg-blue-700 transition font-medium">{{ editingId ? 'Update Category' : 'Submit' }}</button>
                <button type="button" class="bg-gray-200 text-gray-800 px-4 py-2 rounded text-sm hover:bg-gray-300 transition ml-2 font-medium" v-if="editingId" @click="cancelEdit">Cancel</button>
              </div>
            </form>
          </div>
        </div>
      </div>

      <!-- Table Card -->
      <div class="w-full lg:w-2/3 px-3 mb-6">
        <div class="bg-white rounded shadow-sm border-t-4 border-gray-300 flex flex-col overflow-hidden">
           <div class="p-4 border-b border-gray-100 flex justify-between items-center bg-gray-50/50">
            <h3 class="text-lg font-medium text-gray-800 m-0">Category List</h3>
             <div class="relative">
                 <input type="text" placeholder="Search" class="pl-3 pr-8 py-1.5 border border-gray-300 rounded text-sm focus:outline-none focus:border-blue-500 w-56 text-gray-900 bg-white placeholder-gray-400"/>
                 <svg class="w-4 h-4 text-gray-400 absolute right-2.5 top-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
             </div>
          </div>
          <div class="p-0 overflow-x-auto">
            <table class="w-full text-left text-sm whitespace-nowrap">
              <thead class="bg-gray-50 border-b border-gray-200 text-gray-600 font-semibold uppercase text-xs">
                <tr>
                  <th class="px-5 py-3 w-16 text-center">ID</th>
                  <th class="px-5 py-3">Category Name</th>
                  <th class="px-5 py-3">Description</th>
                  <th class="px-5 py-3 w-32 text-center">Actions</th>
                </tr>
              </thead>
              <tbody class="text-gray-800">
                <tr v-if="items.length === 0">
                    <td colspan="4" class="px-5 py-8 text-center text-gray-500">No categories found. Create one to see it here.</td>
                </tr>
                <tr v-for="item in items" :key="item.id" class="border-b border-gray-100 hover:bg-blue-50/50 transition-colors">
                  <td class="px-5 py-3 text-center align-middle text-gray-600">{{ item.id }}</td>
                  <td class="px-5 py-3 align-middle font-medium">{{ item.name }}</td>
                  <td class="px-5 py-3 align-middle text-gray-600 truncate max-w-xs" :title="item.description">{{ item.description }}</td>
                  <td class="px-5 py-3 align-middle text-center">
                    <button @click="editItem(item)" class="text-blue-500 hover:text-blue-700 bg-blue-50 hover:bg-blue-100 p-1.5 rounded transition mr-2 inline-flex" title="Edit">
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
import { authFetch } from '../../utils/api.js'

definePageMeta({ layout: 'admin' })

const items = ref([])
const form = ref({ name: '', description: '' })
const editingId = ref(null)
const API_URL = 'http://localhost:3001/category'

const fetchItems = async () => {
  try {
    const res = await authFetch(API_URL)
    items.value = await res.json()
  } catch (err) {
    console.error(err)
  }
}

const saveItem = async () => {
  try {
    if (editingId.value) {
      await authFetch(`${API_URL}/${editingId.value}`, {
        method: 'PATCH',
        body: JSON.stringify(form.value)
      })
    } else {
      await authFetch(API_URL, {
        method: 'POST',
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
  form.value = { name: item.name, description: item.description }
  editingId.value = item.id
}

const cancelEdit = () => {
  form.value = { name: '', description: '' }
  editingId.value = null
}

const deleteItem = async (id) => {
  if (!confirm('Are you sure you want to delete this category?')) return
  try {
    await authFetch(`${API_URL}/${id}`, { method: 'DELETE' })
    await fetchItems()
  } catch (err) {
    console.error(err)
  }
}

onMounted(() => {
  fetchItems()
})
</script>
