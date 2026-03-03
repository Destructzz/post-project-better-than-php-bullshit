<template>
  <div class="max-w-4xl mx-auto my-8 p-8 bg-white rounded-lg shadow-sm">
    <div class="flex justify-between items-center mb-8 border-b border-gray-200 pb-4">
      <h1 class="text-3xl font-bold">Posts</h1>
      <NuxtLink to="/" class="text-blue-500 hover:text-blue-600 hover:underline">Back to Dashboard</NuxtLink>
    </div>

    <div class="p-6 bg-gray-100 rounded-lg mb-8">
      <h3 class="text-xl font-semibold mb-4">{{ editingId ? 'Edit Post' : 'Create Post' }}</h3>
      <form @submit.prevent="saveItem" class="flex flex-col gap-4">
        <input v-model="form.title" placeholder="Post Title" required class="p-3 border border-gray-300 rounded bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500" />
        <textarea v-model="form.content" placeholder="Post Content" required rows="3" class="p-3 border border-gray-300 rounded bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"></textarea>
        <div class="flex gap-4 mt-2">
          <button type="submit" class="px-6 py-3 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors font-medium">{{ editingId ? 'Update' : 'Create' }}</button>
          <button type="button" class="px-6 py-3 bg-gray-500 text-white rounded hover:bg-gray-600 transition-colors font-medium" v-if="editingId" @click="cancelEdit">Cancel</button>
        </div>
      </form>
    </div>

    <div>
      <div v-if="items.length === 0" class="text-center text-gray-500 py-8">No posts found.</div>
      <div v-for="item in items" :key="item.id" class="p-6 border border-gray-200 rounded-lg flex justify-between items-center mb-4 bg-white hover:shadow-md transition-shadow">
        <div>
          <strong class="text-lg block text-gray-900">{{ item.title }}</strong>
          <p class="mt-2 text-gray-500">{{ item.content }}</p>
        </div>
        <div class="flex gap-2">
          <button @click="editItem(item)" class="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors">Edit</button>
          <button @click="deleteItem(item.id)" class="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition-colors">Delete</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'

const items = ref([])
const form = ref({ title: '', content: '' })
const editingId = ref(null)
const API_URL = 'http://localhost:3001/post'

const fetchItems = async () => {
  try {
    const res = await fetch(API_URL)
    items.value = await res.json()
  } catch (err) {
    console.error(err)
  }
}

const saveItem = async () => {
  try {
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
  form.value = { title: item.title, content: item.content }
  editingId.value = item.id
}

const cancelEdit = () => {
  form.value = { title: '', content: '' }
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
})
</script>
